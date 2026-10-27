import type { Meta, StoryObj } from '@storybook/react';
import { ThemeToggleButton } from './ThemeToggleButton';

const meta = {
  title: 'Features/ThemeToggleButton',
  component: ThemeToggleButton,
} satisfies Meta<typeof ThemeToggleButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
