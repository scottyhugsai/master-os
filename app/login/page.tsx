'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/authStore';
import { Button, Input, Card } from '@/components/ui';
import { designTokens } from '@/config/designTokens';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors: Record<string, string> = {};

    if (!email) errors.email = 'Email is required';
    if (!password) errors.password = 'Password is required';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    await login(email, password);

    if (!error) {
      router.push('/dashboard');
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: designTokens.colors.neutral[50],
        padding: designTokens.spacing.lg,
      }}
    >
      <Card
        style={{
          maxWidth: '400px',
          width: '100%',
          padding: designTokens.spacing['3xl'],
        }}
      >
        <div
          style={{
            marginBottom: designTokens.spacing['2xl'],
            textAlign: 'center',
          }}
        >
          <h1
            style={{
              fontSize: designTokens.fontSize['3xl'],
              fontWeight: 700,
              color: designTokens.colors.primary,
              margin: 0,
              marginBottom: designTokens.spacing.sm,
            }}
          >
            Master OS
          </h1>
          <p
            style={{
              fontSize: designTokens.fontSize.sm,
              color: designTokens.colors.neutral[500],
              margin: 0,
            }}
          >
            Roofing Project Management
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.lg }}>
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={validationErrors.email}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={validationErrors.password}
            />

            {error && (
              <div
                style={{
                  padding: designTokens.spacing.md,
                  backgroundColor: '#fee2e2',
                  color: '#991b1b',
                  borderRadius: designTokens.borderRadius.md,
                  fontSize: designTokens.fontSize.sm,
                }}
              >
                {error}
              </div>
            )}

            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Sign In
            </Button>
          </div>
        </form>

        <div
          style={{
            marginTop: designTokens.spacing.xl,
            paddingTop: designTokens.spacing.lg,
            borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
            textAlign: 'center',
            fontSize: designTokens.fontSize.sm,
            color: designTokens.colors.neutral[500],
          }}
        >
          <p style={{ margin: 0 }}>
            Demo credentials: admin@masteros.com / password
          </p>
        </div>
      </Card>
    </div>
  );
}
