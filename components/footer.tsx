import React from 'react'

import { cn } from '@/lib/utils'
import { ExternalLink } from '@/components/external-link'
import Image from 'next/image'

export function FooterText({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      className={cn(
        'px-2 text-center text-xs leading-normal text-muted-foreground',
        className
      )}
      {...props}
    >
      Type your question and press <kbd>Enter</kbd> to get started.{' '}
    </p>
  )
}
