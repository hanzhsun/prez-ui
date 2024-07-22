import type { Meta, StoryObj } from "@storybook/vue3";
import { vueRouter } from "storybook-vue3-router";
import PrezUILoading from "../components/PrezUILoading.vue";

const meta = {
  title: "Standard Components/PrezUILoading",
  component: PrezUILoading,
  tags: ["autodocs"],
  argTypes: {
    variant: { description: "Variant" },
  },
} satisfies Meta<typeof PrezUILoading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
  },
};

export const Item: Story = {
  args: {
    variant: 'item'
  },
};

export const List: Story = {
  args: {
    variant: 'list'
  },
};

export const Search: Story = {
  args: {
    variant: 'search'
  },
};

Default.decorators = [vueRouter()];