'use client';

import React, { useState } from 'react';
import { RootLayout } from '@/components/Layout';
import { Card, Input, Button, Badge } from '@/components/ui';
import { designTokens } from '@/config/designTokens';

export default function SettingsPage() {
  const [companyName, setCompanyName] = useState('Master OS Roofing');
  const [email, setEmail] = useState('admin@masteros.com');
  const [phone, setPhone] = useState('(303) 555-0100');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState({
    projectUpdates: true,
    crewAssignments: true,
    invoiceReminders: true,
  });

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <RootLayout title="Settings" showSidebar={true}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: designTokens.spacing['2xl'],
        }}
      >
        {/* Company Settings */}
        <Card style={{ padding: designTokens.spacing.xl }}>
          <h2
            style={{
              fontSize: designTokens.fontSize.xl,
              fontWeight: 700,
              margin: 0,
              marginBottom: designTokens.spacing.lg,
            }}
          >
            Company Information
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: designTokens.spacing.lg,
            }}
          >
            <Input
              label="Company Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
            />

            <Input
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Input
              label="Street Address"
              placeholder="123 Main St"
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: designTokens.spacing.md,
              }}
            >
              <Input label="City" placeholder="Denver" />
              <Input label="State" placeholder="CO" />
              <Input label="ZIP Code" placeholder="80202" />
            </div>

            <Button variant="primary" fullWidth>
              Save Changes
            </Button>
          </div>
        </Card>

        {/* App Settings */}
        <Card style={{ padding: designTokens.spacing.xl }}>
          <h2
            style={{
              fontSize: designTokens.fontSize.xl,
              fontWeight: 700,
              margin: 0,
              marginBottom: designTokens.spacing.lg,
            }}
          >
            App Settings
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: designTokens.spacing.lg,
            }}
          >
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: designTokens.fontSize.sm,
                  fontWeight: 600,
                  color: designTokens.colors.neutral[700],
                  marginBottom: designTokens.spacing.md,
                }}
              >
                Theme
              </label>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gap: designTokens.spacing.sm,
                }}
              >
                {['light', 'dark', 'auto'].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    style={{
                      padding: designTokens.spacing.md,
                      backgroundColor:
                        theme === t ? designTokens.colors.primary : designTokens.colors.neutral[200],
                      color: theme === t ? 'white' : designTokens.colors.neutral[700],
                      border: 'none',
                      borderRadius: designTokens.borderRadius.md,
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: designTokens.fontSize.sm,
                      textTransform: 'capitalize',
                      transition: `all ${designTokens.transition.fast}`,
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div
              style={{
                borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
                paddingTop: designTokens.spacing.lg,
              }}
            >
              <h3
                style={{
                  fontSize: designTokens.fontSize.base,
                  fontWeight: 700,
                  margin: 0,
                  marginBottom: designTokens.spacing.lg,
                }}
              >
                Notifications
              </h3>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: designTokens.spacing.md,
                }}
              >
                {[
                  {
                    key: 'projectUpdates' as const,
                    label: 'Project Updates',
                    description: 'Get notified about project status changes',
                  },
                  {
                    key: 'crewAssignments' as const,
                    label: 'Crew Assignments',
                    description: 'Receive notifications for crew assignments',
                  },
                  {
                    key: 'invoiceReminders' as const,
                    label: 'Invoice Reminders',
                    description: 'Get reminded about due invoices',
                  },
                ].map((notif) => (
                  <div
                    key={notif.key}
                    style={{
                      display: 'flex',
                      alignItems: 'start',
                      justifyContent: 'space-between',
                      padding: designTokens.spacing.md,
                      backgroundColor: designTokens.colors.neutral[50],
                      borderRadius: designTokens.borderRadius.md,
                    }}
                  >
                    <div>
                      <p
                        style={{
                          fontWeight: 600,
                          margin: 0,
                          marginBottom: designTokens.spacing.xs,
                          fontSize: designTokens.fontSize.sm,
                        }}
                      >
                        {notif.label}
                      </p>
                      <p
                        style={{
                          fontSize: designTokens.fontSize.xs,
                          color: designTokens.colors.neutral[500],
                          margin: 0,
                        }}
                      >
                        {notif.description}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={notifications[notif.key]}
                      onChange={() => handleNotificationChange(notif.key)}
                      style={{
                        width: '20px',
                        height: '20px',
                        cursor: 'pointer',
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <Button variant="primary" fullWidth>
              Save Preferences
            </Button>
          </div>
        </Card>

        {/* Danger Zone */}
        <Card
          style={{
            padding: designTokens.spacing.xl,
            borderColor: designTokens.colors.error,
            borderWidth: '2px',
            gridColumn: '1 / -1',
          }}
        >
          <h2
            style={{
              fontSize: designTokens.fontSize.xl,
              fontWeight: 700,
              margin: 0,
              marginBottom: designTokens.spacing.lg,
              color: designTokens.colors.error,
            }}
          >
            Danger Zone
          </h2>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: designTokens.spacing.md,
            }}
          >
            <div
              style={{
                padding: designTokens.spacing.md,
                backgroundColor: '#fee2e2',
                borderRadius: designTokens.borderRadius.md,
                borderLeft: `4px solid ${designTokens.colors.error}`,
              }}
            >
              <p
                style={{
                  fontSize: designTokens.fontSize.sm,
                  color: designTokens.colors.error,
                  margin: 0,
                }}
              >
                ⚠️ Deleting your account is permanent and cannot be undone. All data will be lost.
              </p>
            </div>

            <Button
              variant="secondary"
              fullWidth
              style={{
                backgroundColor: designTokens.colors.error,
              }}
            >
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
    </RootLayout>
  );
}
