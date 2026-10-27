import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PrototypePersonaControl } from './PrototypePersonaControl';

const meta = { component: PrototypePersonaControl, args: { value: 'dealer', onChange: fn() } } satisfies Meta<typeof PrototypePersonaControl>;
export default meta;
type Story = StoryObj<typeof meta>;
export const Dealer: Story = {};
