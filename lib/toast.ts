/**
 * Toast Notification System
 * Simple client-side notifications for form feedback
 */

export type ToastVariant = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  message: string;
  variant: ToastVariant;
  duration?: number;
}

let toastListeners: Set<(toast: Toast) => void> = new Set();
let toastId = 0;

/**
 * Show a toast notification
 */
export function showToast(
  message: string,
  variant: ToastVariant = 'info',
  duration: number = 3000
): string {
  const id = String(++toastId);
  const toast: Toast = {
    id,
    message,
    variant,
    duration,
  };

  toastListeners.forEach((listener) => listener(toast));

  if (duration > 0) {
    setTimeout(() => {
      removeToast(id);
    }, duration);
  }

  return id;
}

/**
 * Remove a toast notification
 */
export function removeToast(id: string): void {
  // Toast removal is handled by the ToastContainer
}

/**
 * Subscribe to toast notifications
 */
export function onToastChange(listener: (toast: Toast) => void): () => void {
  toastListeners.add(listener);
  return () => {
    toastListeners.delete(listener);
  };
}

/**
 * Show success toast
 */
export const toast = {
  success: (message: string, duration?: number) =>
    showToast(message, 'success', duration),
  error: (message: string, duration?: number) =>
    showToast(message, 'error', duration ?? 5000),
  warning: (message: string, duration?: number) =>
    showToast(message, 'warning', duration),
  info: (message: string, duration?: number) =>
    showToast(message, 'info', duration),
};
