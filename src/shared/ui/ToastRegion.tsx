import type { ReactNode } from 'react';
import { Toaster } from 'sonner';

export type ToastRegionProps = {
  message?: ReactNode;
  visible?: boolean;
};

export function ToastRegion({ message, visible = Boolean(message) }: ToastRegionProps) {
  return (
    <>
      <Toaster position="top-right" />
      <div role="status" aria-live="polite" aria-atomic="true">
        {visible ? message : null}
      </div>
    </>
  );
}
