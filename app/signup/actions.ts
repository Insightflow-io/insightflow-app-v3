'use server'

import { signIn } from '@/auth'
import { ResultCode, getStringFromBuffer } from '@/lib/utils'
import { z } from 'zod'
import { kv } from '@vercel/kv'
import { getUser } from '../login/actions'
import { AuthError } from 'next-auth'

export async function createUser(
  email: string,
  org: string,
  hashedPassword: string,
  salt: string
) {
  //console.log('Sign up', email, hashedPassword, salt)
  const existingUser = await getUser(email)
  console.log('Existing user', existingUser)

  if (existingUser) {
    return {
      type: 'error',
      resultCode: ResultCode.UserAlreadyExists
    }
  } else {
    console.log('Creating user', email, hashedPassword, salt)
    const user = {
      id: crypto.randomUUID(),
      email,
      org,
      password: hashedPassword,
      salt
    }

    await kv.hmset(`user:${email}`, user)

    return {
      type: 'success',
      resultCode: ResultCode.UserCreated
    }
  }
}

interface Result {
  type: string
  resultCode: ResultCode
}

function getDomainFromEmail(email: string): string {
  const parts = email.split('@');
  if (parts.length !== 2) {
    throw new Error('Invalid email address format'); 
  }

  return parts[1]; 
}

export async function signup(
  _prevState: Result | undefined,
  formData: FormData
): Promise<Result | undefined> {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const org = getDomainFromEmail(email).split('.')[0];

  const parsedCredentials = z
    .object({
      email: z.string().email(),
      org: z.string().min(2).max(50),
      password: z.string().min(6)
    })
    .safeParse({
      email,
      org,
      password
    })

  if (parsedCredentials.success) {
    const salt = crypto.randomUUID()

    const encoder = new TextEncoder()
    const saltedPassword = encoder.encode(password + salt)
    const hashedPasswordBuffer = await crypto.subtle.digest(
      'SHA-256',
      saltedPassword
    )
    const hashedPassword = getStringFromBuffer(hashedPasswordBuffer)

    try {
      const result = await createUser(email, org, hashedPassword, salt)
      console.log('Result', result)

      if (result.resultCode === ResultCode.UserCreated) {
        await signIn('credentials', {
          email,
          password,
          redirect: false
        })
      }

      return result
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return {
              type: 'error',
              resultCode: ResultCode.InvalidCredentials
            }
          default:
            return {
              type: 'error',
              resultCode: ResultCode.UnknownError
            }
        }
      } else {
        return {
          type: 'error',
          resultCode: ResultCode.UnknownError
        }
      }
    }
  } else {
    return {
      type: 'error',
      resultCode: ResultCode.InvalidCredentials
    }
  }
}
