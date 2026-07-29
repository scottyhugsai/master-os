'use client';

import React, { useState } from 'react';
import { RootLayout } from '@/components/Layout';
import { Card, Button, Input, Badge } from '@/components/ui';
import { designTokens } from '@/config/designTokens';

interface Quote {
  id: string;
  clientName: string;
  address: string;
  roofType: string;
  totalAmount: number;
  status: 'draft' | 'sent' | 'accepted' | 'rejected' | 'expired';
  createdAt: string;
}

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      clientName: 'John Smith',
      address: 'Denver, CO',
      roofType: 'Asphalt Shingle',
      totalAmount: 8500,
      status: 'sent',
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      clientName: 'Jane Doe',
      address: 'Boulder, CO',
      roofType: 'Metal',
      totalAmount: 12000,
      status: 'accepted',
      createdAt: '2024-01-10',
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  const statusColors: Record<string, string> = {
    draft: 'neutral',
    sent: 'info',
    accepted: 'success',
    rejected: 'error',
    expired: 'warning',
  };

  return (
    <RootLayout title="Quotes" showSidebar={true}>
      <div style={{ marginBottom: designTokens.spacing['2xl'] }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: designTokens.spacing.lg,
            marginBottom: designTokens.spacing.lg,
          }}
        >
          <Input
            placeholder="Search quotes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary">
            ➕ New Quote
          </Button>
        </div>

        {/* Status Filter */}
        <div
          style={{
            display: 'flex',
            gap: designTokens.spacing.md,
            flexWrap: 'wrap',
          }}
        >
          {['', 'draft', 'sent', 'accepted', 'rejected', 'expired'].map((status) => (
            <button
              key={status || 'all'}
              onClick={() => setStatusFilter(status)}
              style={{
                padding: `${designTokens.spacing.sm} ${designTokens.spacing.md}`,
                backgroundColor: statusFilter === status ? designTokens.colors.primary : designTokens.colors.neutral[200],
                color: statusFilter === status ? 'white' : designTokens.colors.neutral[700],
                border: 'none',
                borderRadius: designTokens.borderRadius.full,
                cursor: 'pointer',
                fontSize: designTokens.fontSize.sm,
                fontWeight: 600,
                transition: `all ${designTokens.transition.fast}`,
              }}
            >
              {status || 'All'}
            </button>
          ))}
        </div>
      </div>

      {/* Quotes Table */}
      <Card style={{ padding: 0, overflow: 'hidden' }}>
        <div
          style={{
            overflowX: 'auto',
          }}
        >
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
                {['Client', 'Address', 'Roof Type', 'Amount', 'Status', 'Date', 'Actions'].map(
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
              {quotes.map((quote) => (
                <tr
                  key={quote.id}
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
                  <td style={{ padding: designTokens.spacing.md, fontSize: designTokens.fontSize.sm }}>
                    {quote.clientName}
                  </td>
                  <td style={{ padding: designTokens.spacing.md, fontSize: designTokens.fontSize.sm }}>
                    {quote.address}
                  </td>
                  <td style={{ padding: designTokens.spacing.md, fontSize: designTokens.fontSize.sm }}>
                    {quote.roofType}
                  </td>
                  <td
                    style={{
                      padding: designTokens.spacing.md,
                      fontSize: designTokens.fontSize.sm,
                      fontWeight: 600,
                      color: designTokens.colors.primary,
                    }}
                  >
                    ${quote.totalAmount.toLocaleString()}
                  </td>
                  <td style={{ padding: designTokens.spacing.md }}>
                    <Badge variant={statusColors[quote.status] as any}>
                      {quote.status}
                    </Badge>
                  </td>
                  <td style={{ padding: designTokens.spacing.md, fontSize: designTokens.fontSize.sm }}>
                    {quote.createdAt}
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
                    <Button variant="primary" size="sm">
                      Send
                    </Button>
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
