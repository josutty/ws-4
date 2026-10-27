import type { Meta, StoryObj } from '@storybook/react';
import { AbpStatusCard } from './AbpStatusCard';

const meta = { component: AbpStatusCard, args: { status: 'unavailable' } } satisfies Meta<typeof AbpStatusCard>;
export default meta;
type Story = StoryObj<typeof meta>;
export const NotYetAvailable: Story = {};
