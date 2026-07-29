'use client';

import React, { useState } from 'react';
import { RootLayout } from '@/components/Layout';
import { Card, Button, Badge } from '@/components/ui';
import { designTokens } from '@/config/designTokens';

interface Invoice {
  id: string;
  invoiceNumber: string;
  clientName: string;
  amount: number;
  dueDate: string;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
}

export default function InvoicingPage() {
  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      clientName: 'John Smith',
      amount: 8500,
      dueDate: '2024-02-15',
      status: 'paid',
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      clientName: 'Jane Doe',
      amount: 12000,
      dueDate: '2024-02-20',
      status: 'sent',
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      clientName: 'Bob Johnson',
      amount: 6750,
      dueDate: '2024-01-20',
      status: 'overdue',
    },
  ]);

  const statusColors: Record<string, string> = {
    draft: 'neutral',
    sent: 'info',
    paid: 'success',
    overdue: 'error',
    cancelled: 'error',
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paidAmount = invoices
    .filter((inv) => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);
  const pendingAmount = totalRevenue - paidAmount;

  return (
    <RootLayout title="Invoicing" showSidebar={true}>
      {/* Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: designTokens.spacing.lg,
          marginBottom: designTokens.spacing['2xl'],
        }}
      >
        {[
          {
            label: 'Total Revenue',
            value: `$${totalRevenue.toLocaleString()}`,
            color: designTokens.colors.success,
            icon: '💰',
          },
          {
            label: 'Paid Invoices',
            value: `$${paidAmount.toLocaleString()}`,
            color: designTokens.colors.primary,
            icon: '✅',
          },
          {
            label: 'Pending Amount',
            value: `$${pendingAmount.toLocaleString()}`,
            color: designTokens.colors.warning,
            icon: '⏳',
          },
          {
            label: 'Total Invoices',
            value: invoices.length,
            color: designTokens.colors.accent,
            icon: '📄',
          },
        ].map((stat) => (
          <Card
            key={stat.label}
            style={{
              padding: designTokens.spacing.lg,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.md }}>
              <div
                style={{
                  fontSize: designTokens.fontSize['3xl'],
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: designTokens.fontSize.xs,
                    color: designTokens.colors.neutral[500],
                    margin: 0,
                    marginBottom: designTokens.spacing.xs,
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: designTokens.fontSize.xl,
                    fontWeight: 700,
                    color: stat.color,
                    margin: 0,
                  }}
                >
                  {stat.value}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Actions */}
      <div style={{ marginBottom: designTokens.spacing.lg }}>
        <Button variant="primary">
          ➕ Create Invoice
        </Button>
      </div>

      {/* Invoices Table */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr
                style={{
                  backgroundColor: designTokens.colors.neutral[100],
                  borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
                }}
              >
                {['Invoice #', 'Client', 'Amount', 'Due Date', 'Status', 'Actions'].map(
                  (header) => (
                    <th
                      key={header}
                      style={{
                        padding: designTokens.spacing.md,
                        textAlign: 'left',
                        fontSize: designTokens.fontSize.sm,
                        fontWeight: 600,
                        color: designTokens.colors.neutral[700],
                      }}
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr
                  key={invoice.id}
                  style={{
                    borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
                    transition: `background-color ${designTokens.transition.fast}`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget).style.backgroundColor = designTokens.colors.neutral[50];
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget).style.backgroundColor = 'transparent';
                  }}
                >
                  <td
                    style={{
                      padding: designTokens.spacing.md,
                      fontSize: designTokens.fontSize.sm,
                      fontWeight: 600,
                      color: designTokens.colors.primary,
                    }}
                  >
                    {invoice.invoiceNumber}
                  </td>
                  <td style={{ padding: designTokens.spacing.md, fontSize: designTokens.fontSize.sm }}>
                    {invoice.clientName}
                  </td>
                  <td
                    style={{
                      padding: designTokens.spacing.md,
                      fontSize: designTokens.fontSize.sm,
                      fontWeight: 600,
                    }}
                  >
                    ${invoice.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: designTokens.spacing.md, fontSize: designTokens.fontSize.sm }}>
                    {invoice.dueDate}
                  </td>
                  <td style={{ padding: designTokens.spacing.md }}>
                    <Badge variant={statusColors[invoice.status] as any}>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td
                    style={{
                      padding: designTokens.spacing.md,
                      display: 'flex',
                      gap: designTokens.spacing.sm,
                    }}
                  >
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                    {invoice.status !== 'paid' && (
                      <Button variant="primary" size="sm">
                        Send
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </RootLayout>
  );
}
