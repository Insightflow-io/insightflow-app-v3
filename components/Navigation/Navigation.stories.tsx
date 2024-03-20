
import type { Meta, StoryObj } from "@storybook/react"
import React from 'react';
import Navigation from './Navigation';

const meta: Meta<typeof Navigation> = {
    title: "Navigation",
    component: Navigation,
    args: {
      intent: "primary",
      size: "md",
      orientation: "horizontal",
    },
    argTypes: {
      intent: {
        options: ["primary", "secondary"],
        control: { type: "select" },
      },
      size: {
        options: ["sm", "lg"],
        control: { type: "select" },
      },
      orientation: {
        options: ["horizontal", "vertical"],
        control: { type: "select" },
      },
    },
  }

  
  type Story = StoryObj<typeof Navigation>
  
  export const Default: Story = {
    render: () => <Navigation />,
  }
  
  export default meta