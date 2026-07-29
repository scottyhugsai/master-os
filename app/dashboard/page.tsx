'use client';

import React, { useEffect } from 'react';
import { RootLayout } from '@/components/Layout';
import { Card, Badge } from '@/components/ui';
import { designTokens } from '@/config/designTokens';
import { useProjectsStore } from '@/stores/projectsStore';
import { useCrewStore } from '@/stores/crewStore';

interface StatCard {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  trend?: string;
}

export default function DashboardPage() {
  const { projects, fetchProjects } = useProjectsStore();
  const { crew, fetchCrew } = useCrewStore();

  useEffect(() => {
    fetchProjects();
    fetchCrew();
  }, [fetchProjects, fetchCrew]);

  const statCards: StatCard[] = [
    {
      label: 'Total Projects',
      value: projects.length,
      icon: '🏗️',
      color: designTokens.colors.primary,
      trend: '+5 this month',
    },
    {
      label: 'Active Projects',
      value: projects.filter((p) => p.status === 'in-progress').length,
      icon: '⚙️',
      color: designTokens.colors.secondary,
      trend: 'In progress',
    },
    {
      label: 'Team Members',
      value: crew.length,
      icon: '👥',
      color: designTokens.colors.accent,
      trend: 'Available',
    },
    {
      label: 'Total Revenue',
      value: `$${(Math.random() * 50000).toFixed(0)}`,
      icon: '💰',
      color: designTokens.colors.success,
      trend: 'YTD',
    },
  ];

  return (
    <RootLayout title="Dashboard" showSidebar={true}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: designTokens.spacing.lg,
          marginBottom: designTokens.spacing['2xl'],
        }}
      >
        {statCards.map((stat) => (
          <Card
            key={stat.label}
            style={{
              padding: designTokens.spacing.lg,
            }}
            hover
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: designTokens.spacing.md }}>
              <div
                style={{
                  fontSize: designTokens.fontSize['3xl'],
                  width: '60px',
                  height: '60px',
                  borderRadius: designTokens.borderRadius.lg,
                  backgroundColor: `${stat.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {stat.icon}
              </div>
              <div>
                <p
                  style={{
                    fontSize: designTokens.fontSize.sm,
                    color: designTokens.colors.neutral[500],
                    margin: 0,
                    marginBottom: designTokens.spacing.xs,
                  }}
                >
                  {stat.label}
                </p>
                <p
                  style={{
                    fontSize: designTokens.fontSize['2xl'],
                    fontWeight: 700,
                    color: designTokens.colors.neutral[900],
                    margin: 0,
                  }}
                >
                  {stat.value}
                </p>
                {stat.trend && (
                  <Badge variant="info" style={{ marginTop: designTokens.spacing.sm }}>
                    {stat.trend}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: designTokens.spacing.lg,
        }}
      >
        {/* Recent Projects */}
        <Card
          style={{
            padding: designTokens.spacing.lg,
          }}
        >
          <h2
            style={{
              fontSize: designTokens.fontSize.xl,
              fontWeight: 700,
              margin: 0,
              marginBottom: designTokens.spacing.lg,
            }}
          >
            Recent Projects
          </h2>
          {projects.length === 0 ? (
            <p
              style={{
                color: designTokens.colors.neutral[500],
                textAlign: 'center',
                padding: designTokens.spacing.lg,
              }}
            >
              No projects yet
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.md }}>
              {projects.slice(0, 3).map((project) => (
                <div
                  key={project.id}
                  style={{
                    padding: designTokens.spacing.md,
                    backgroundColor: designTokens.colors.neutral[50],
                    borderRadius: designTokens.borderRadius.md,
                    borderLeft: `4px solid ${designTokens.colors.primary}`,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'start',
                      marginBottom: designTokens.spacing.sm,
                    }}
                  >
                    <p
                      style={{
                        fontWeight: 600,
                        margin: 0,
                        color: designTokens.colors.neutral[900],
                      }}
                    >
                      {project.name}
                    </p>
                    <Badge variant={project.status === 'completed' ? 'success' : 'info'}>
                      {project.status}
                    </Badge>
                  </div>
                  <p
                    style={{
                      fontSize: designTokens.fontSize.sm,
                      color: designTokens.colors.neutral[500],
                      margin: 0,
                    }}
                  >
                    {project.address.city}, {project.address.state}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick Actions */}
        <Card
          style={{
            padding: designTokens.spacing.lg,
          }}
        >
          <h2
            style={{
              fontSize: designTokens.fontSize.xl,
              fontWeight: 700,
              margin: 0,
              marginBottom: designTokens.spacing.lg,
            }}
          >
            Quick Actions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: designTokens.spacing.md }}>
            {[
              { label: 'Create New Project', icon: '➕' },
              { label: 'Generate Quote', icon: '📋' },
              { label: 'Assign Crew', icon: '👥' },
              { label: 'Create Invoice', icon: '💵' },
            ].map((action) => (
              <button
                key={action.label}
                style={{
                  padding: designTokens.spacing.md,
                  backgroundColor: 'transparent',
                  border: `1px solid ${designTokens.colors.neutral[200]}`,
                  borderRadius: designTokens.borderRadius.md,
                  cursor: 'pointer',
                  textAlign: 'left',
                  display: 'flex',
                  alignItems: 'center',
                  gap: designTokens.spacing.md,
                  fontSize: designTokens.fontSize.sm,
                  fontWeight: 600,
                  color: designTokens.colors.neutral[900],
                  transition: `all ${designTokens.transition.fast}`,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget).style.backgroundColor = designTokens.colors.primary;
                  (e.currentTarget).style.color = 'white';
                  (e.currentTarget).style.borderColor = designTokens.colors.primary;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget).style.backgroundColor = 'transparent';
                  (e.currentTarget).style.color = designTokens.colors.neutral[900];
                  (e.currentTarget).style.borderColor = designTokens.colors.neutral[200];
                }}
              >
                <span>{action.icon}</span>
                {action.label}
              </button>
            ))}
          </div>
        </Card>
      </div>
    </RootLayout>
  );
}
