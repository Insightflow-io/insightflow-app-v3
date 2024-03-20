import type { Meta, StoryObj } from "@storybook/react"
import { Tooltip } from "./Tooltip"

const meta: Meta<typeof Tooltip> = {
  title: "Tooltip",
  component: Tooltip,
  args: {
    children: <span>Tooltip</span>,
    explainer: "This is a tooltip",
    open: true,
    defaultOpen: false,
    onOpenChange: () => console.log("onOpenChange"),
    intent: "primary",
    size: "md",
    side: "top",
    className: "tooltip",
    withArrow: true,
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
  },
}

type Story = StoryObj<typeof Tooltip>

export const Default: Story = {
  render: (args) => <Tooltip {...args} />,
}

export default meta
