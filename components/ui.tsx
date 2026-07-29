'use client';

import React from 'react';
import { designTokens } from '@/config/designTokens';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  isLoading = false,
  children,
  disabled,
  className,
  ...props
}) => {
  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: designTokens.colors.primary,
      color: 'white',
      border: 'none',
    },
    secondary: {
      backgroundColor: designTokens.colors.secondary,
      color: 'white',
      border: 'none',
    },
    accent: {
      backgroundColor: designTokens.colors.accent,
      color: designTokens.colors.neutral[900],
      border: 'none',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: designTokens.colors.primary,
      border: `2px solid ${designTokens.colors.primary}`,
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
      fontSize: designTokens.fontSize.sm,
    },
    md: {
      padding: `${designTokens.spacing.md} ${designTokens.spacing.lg}`,
      fontSize: designTokens.fontSize.base,
    },
    lg: {
      padding: `${designTokens.spacing.lg} ${designTokens.spacing.xl}`,
      fontSize: designTokens.fontSize.lg,
    },
  };

  return (
    <button
      style={{
        ...variantStyles[variant],
        ...sizeStyles[size],
        width: fullWidth ? '100%' : 'auto',
        borderRadius: designTokens.borderRadius.md,
        cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
        opacity: disabled || isLoading ? 0.6 : 1,
        transition: `all ${designTokens.transition.fast}`,
        fontWeight: 600,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: designTokens.spacing.sm,
      }}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? '⏳' : children}
    </button>
  );
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, hover = false, style, ...props }) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: designTokens.borderRadius.lg,
        border: `1px solid ${designTokens.colors.neutral[200]}`,
        boxShadow: designTokens.shadow.sm,
        transition: `all ${designTokens.transition.fast}`,
        ...(hover && {
          cursor: 'pointer',
          boxShadow: designTokens.shadow.md,
          borderColor: designTokens.colors.neutral[300],
        }),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helpText?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helpText,
  type = 'text',
  ...props
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: designTokens.spacing.sm,
      }}
    >
      {label && (
        <label
          style={{
            fontSize: designTokens.fontSize.sm,
            fontWeight: 600,
            color: designTokens.colors.neutral[700],
          }}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        style={{
          width: '100%',
          padding: designTokens.spacing.md,
          fontSize: designTokens.fontSize.base,
          border: `1px solid ${error ? designTokens.colors.error : designTokens.colors.neutral[300]}`,
          borderRadius: designTokens.borderRadius.md,
          transition: `border-color ${designTokens.transition.fast}`,
          boxSizing: 'border-box',
        }}
        {...props}
        onFocus={(e) => {
          if (!error) {
            e.currentTarget.style.borderColor = designTokens.colors.primary;
            e.currentTarget.style.boxShadow = `0 0 0 3px rgba(0, 102, 204, 0.1)`;
          }
        }}
        onBlur={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          if (!error) {
            e.currentTarget.style.borderColor = designTokens.colors.neutral[300];
          }
        }}
      />
      {error && (
        <span style={{ fontSize: designTokens.fontSize.xs, color: designTokens.colors.error }}>
          {error}
        </span>
      )}
      {helpText && !error && (
        <span style={{ fontSize: designTokens.fontSize.xs, color: designTokens.colors.neutral[500] }}>
          {helpText}
        </span>
      )}
    </div>
  );
};

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ variant = 'neutral', children, style, ...props }) => {
  const variantColors: Record<string, { bg: string; text: string }> = {
    success: { bg: '#d1fae5', text: '#065f46' },
    warning: { bg: '#fef3c7', text: '#92400e' },
    error: { bg: '#fee2e2', text: '#991b1b' },
    info: { bg: '#dbeafe', text: '#1e40af' },
    neutral: { bg: designTokens.colors.neutral[200], text: designTokens.colors.neutral[700] },
  };

  const colors = variantColors[variant];

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: `${designTokens.spacing.xs} ${designTokens.spacing.sm}`,
        fontSize: designTokens.fontSize.xs,
        fontWeight: 600,
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: designTokens.borderRadius.full,
        ...style,
      }}
      {...props}
    >
      {children}
    </span>
  );
};
