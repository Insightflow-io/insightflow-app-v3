import { CaretDownIcon } from '@radix-ui/react-icons';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
//import './styles.css';
import { cva, VariantProps } from "class-variance-authority"
// import classNames from "classnames"
import React from 'react';
import { twMerge } from "tailwind-merge"

const navigation = cva([
    'flex', 'flew-row', 'cursor-pointer', 'hover:text-gray-300', 'px-4', 'py-2', 'rounded-md', 'text-white'
], {
  variants: {
    intent: {
      primary: ["rounded-0.5md", "bg-zinc-700", "font-open-sans", "text-white"],
    },
    size: {
      md: ["px-4", "py-2.5", "text-2xs"],
    },
    orientation: {
        horizontal: ["flex-row"],
        vertical: ["flex-col"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
    orientation: "horizontal",
  },
}
)



export interface NavigationMenuProps extends VariantProps<typeof navigation> {
    //children: React.ReactNode;
    className?: string;
}

interface ListItemProps {
    className?: string;
    children: React.ReactNode;
    title: string;
    href: string;
  }


const Navigation = ({ className, intent, size, orientation }: NavigationMenuProps) => {
  return (
    <NavigationMenu.Root >
      <NavigationMenu.List className={twMerge(navigation({ intent, size, orientation, className }))}>
        <NavigationMenu.Item className={twMerge(navigation({ intent, size, orientation, className }))}>
          <NavigationMenu.Trigger >
            Learn <CaretDownIcon aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content >
            <ul >
              <li style={{ gridRow: 'span 3' }}>
                <NavigationMenu.Link asChild>
                  <a href="/">
                    <svg aria-hidden width="38" height="38" viewBox="0 0 25 25" fill="white">
                      <path d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"></path>
                      <path d="M12 0H4V8H12V0Z"></path>
                      <path d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"></path>
                    </svg>
                    <div >Radix Primitives</div>
                    <p >Unstyled, accessible components for React.</p>
                  </a>
                </NavigationMenu.Link>
              </li>

              <ListItem href="https://stitches.dev/" title="Stitches">
                CSS-in-JS with best-in-class developer experience.
              </ListItem>
              <ListItem href="/colors" title="Colors">
                Beautiful, thought-out palettes with auto dark mode.
              </ListItem>
              <ListItem href="https://icons.radix-ui.com/" title="Icons">
                A crisp set of 15x15 icons, balanced and consistent.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item>

        <NavigationMenu.Item  className={twMerge(navigation({ intent, size, orientation, className }))}>
          <NavigationMenu.Trigger className="NavigationMenuTrigger">
            Overview <CaretDownIcon className="CaretDown" aria-hidden />
          </NavigationMenu.Trigger>
          <NavigationMenu.Content className="NavigationMenuContent">
            <ul className="List two">
              <ListItem title="Introduction" href="/primitives/docs/overview/introduction">
                Build high-quality, accessible design systems and web apps.
              </ListItem>
              <ListItem title="Getting started" href="/primitives/docs/overview/getting-started">
                A quick tutorial to get you up and running with Radix Primitives.
              </ListItem>
              <ListItem title="Styling" href="/primitives/docs/guides/styling">
                Unstyled and compatible with any styling solution.
              </ListItem>
              <ListItem title="Animation" href="/primitives/docs/guides/animation">
                Use CSS keyframes or any animation library of your choice.
              </ListItem>
              <ListItem title="Accessibility" href="/primitives/docs/overview/accessibility">
                Tested in a range of browsers and assistive technologies.
              </ListItem>
              <ListItem title="Releases" href="/primitives/docs/overview/releases">
                Radix Primitives releases and their changelogs.
              </ListItem>
            </ul>
          </NavigationMenu.Content>
        </NavigationMenu.Item >

        <NavigationMenu.Item  className={twMerge(navigation({ intent, size, orientation, className }))}>
          <NavigationMenu.Link className="NavigationMenuLink" href="https://github.com/radix-ui">
            Github
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        <NavigationMenu.Indicator  className={twMerge(navigation({ intent, size, orientation, className }))}>
          <div className="Arrow" />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className="ViewportPosition">
        <NavigationMenu.Viewport  className={twMerge(navigation({ intent, size, orientation, className }))} />
      </div>
    </NavigationMenu.Root>
  );
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(function ListItem({ className, children, title, ...props }, forwardedRef) {
    return (
      <li>
        <NavigationMenu.Link asChild>
          <a className={twMerge('ListItemLink', className)} {...props} ref={forwardedRef}>
            <div className="ListItemHeading">{title}</div>
            <p className="ListItemText">{children}</p>
          </a>
        </NavigationMenu.Link>
      </li>
    );
  });

export default Navigation;