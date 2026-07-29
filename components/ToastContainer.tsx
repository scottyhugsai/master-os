'use client';

import React, { useState, useEffect } from 'react';
import { Toast, onToastChange } from '@/lib/toast';
import { designTokens } from '@/config/designTokens';

const variantStyles = {
  success: {
    bg: '#10b981',
    icon: '✓',
  },
  error: {
    bg: '#ef4444',
    icon: '✕',
  },
  warning: {
    bg: '#f59e0b',
    icon: '⚠',
  },
  info: {
    bg: '#3b82f6',
    icon: 'ℹ',
  },
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    const unsubscribe = onToastChange((toast: Toast) => {
      setToasts((prev) => {
        const filtered = prev.filter((t) => t.id !== toast.id);
        return [...filtered, toast];
      });

      // Auto-remove after duration
      if (toast.duration && toast.duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== toast.id));
        }, toast.duration);
      }
    });

    return unsubscribe;
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: designTokens.spacing.lg,
        right: designTokens.spacing.lg,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: designTokens.spacing.md,
        maxWidth: '400px',
      }}
    >
      {toasts.map((toast) => {
        const style = variantStyles[toast.variant];
        return (
          <div
            key={toast.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: designTokens.spacing.md,
              padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
              backgroundColor: style.bg,
              color: 'white',
              borderRadius: designTokens.borderRadius.md,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
              animation: 'slideIn 0.3s ease-out',
              fontWeight: 500,
            }}
          >
            <span style={{ fontSize: '18px' }}>{style.icon}</span>
            <span style={{ flex: 1 }}>{toast.message}</span>
            <button
              onClick={() =>
                setToasts((prev) => prev.filter((t) => t.id !== toast.id))
              }
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                fontSize: '18px',
                padding: 0,
              }}
            >
              ×
            </button>
          </div>
        );
      })}

      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(400px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
