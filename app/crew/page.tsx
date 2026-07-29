'use client';

import React, { useEffect, useState } from 'react';
import { RootLayout } from '@/components/Layout';
import { Card, Button, Input, Badge } from '@/components/ui';
import { designTokens } from '@/config/designTokens';
import { useCrewStore } from '@/stores/crewStore';

export default function CrewPage() {
  const { crew, fetchCrew } = useCrewStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    fetchCrew();
  }, [fetchCrew]);

  const statusColors: Record<string, string> = {
    active: 'success',
    inactive: 'error',
    'on-leave': 'warning',
  };

  return (
    <RootLayout title="Crew Management" showSidebar={true}>
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
            placeholder="Search crew members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button variant="primary">
            ➕ Add Crew
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
          {['', 'active', 'inactive', 'on-leave'].map((status) => (
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

      {/* Crew Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: designTokens.spacing.lg,
        }}
      >
        {crew.length === 0 ? (
          <Card
            style={{
              padding: designTokens.spacing['3xl'],
              gridColumn: '1 / -1',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                fontSize: designTokens.fontSize.lg,
                color: designTokens.colors.neutral[500],
                margin: 0,
              }}
            >
              No crew members yet. Add your first team member!
            </p>
          </Card>
        ) : (
          crew.map((member) => (
            <Card
              key={member.id}
              style={{
                padding: designTokens.spacing.lg,
              }}
              hover
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: designTokens.spacing.md,
                  marginBottom: designTokens.spacing.lg,
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: designTokens.borderRadius.full,
                    backgroundColor: designTokens.colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontWeight: 700,
                    fontSize: designTokens.fontSize.lg,
                  }}
                >
                  {member.name.charAt(0)}
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: designTokens.fontSize.base,
                      fontWeight: 700,
                      margin: 0,
                      marginBottom: designTokens.spacing.xs,
                      color: designTokens.colors.neutral[900],
                    }}
                  >
                    {member.name}
                  </h3>
                  <Badge variant={statusColors[member.status] as any}>
                    {member.status}
                  </Badge>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: designTokens.spacing.sm,
                  paddingTop: designTokens.spacing.md,
                  borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
                  marginBottom: designTokens.spacing.md,
                }}
              >
                <div>
                  <p
                    style={{
                      fontSize: designTokens.fontSize.xs,
                      color: designTokens.colors.neutral[500],
                      margin: 0,
                      marginBottom: designTokens.spacing.xs,
                    }}
                  >
                    Role
                  </p>
                  <p
                    style={{
                      fontSize: designTokens.fontSize.sm,
                      fontWeight: 600,
                      color: designTokens.colors.neutral[900],
                      margin: 0,
                    }}
                  >
                    {member.role}
                  </p>
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
                    Expertise
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: designTokens.spacing.sm,
                      flexWrap: 'wrap',
                    }}
                  >
                    {member.expertise.slice(0, 2).map((skill) => (
                      <Badge key={skill} variant="info">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <Button variant="primary" fullWidth size="sm">
                View Profile
              </Button>
            </Card>
          ))
        )}
      </div>
    </RootLayout>
  );
}
