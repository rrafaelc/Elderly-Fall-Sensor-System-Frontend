import type { Meta, StoryObj } from "@storybook/react";
import { withRouter } from "storybook-addon-remix-react-router";

import { withoutAuth } from "utils";

import { Navbar } from "./index";

const meta = {
  component: Navbar,
  decorators: [withRouter],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [withoutAuth],
};

export const WithAuthentication: Story = {};
