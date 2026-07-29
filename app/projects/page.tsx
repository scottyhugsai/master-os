'use client';

import React, { useEffect, useState } from 'react';
import { RootLayout } from '@/components/Layout';
import { Card, Button, Input, Badge } from '@/components/ui';
import { designTokens } from '@/config/designTokens';
import { useProjectsStore } from '@/stores/projectsStore';

export default function ProjectsPage() {
  const { projects, fetchProjects, setFilters, filters } = useProjectsStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('');

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setFilters({ searchTerm: value });
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setFilters({ status: status || undefined });
  };

  const statusColors: Record<string, string> = {
    quoted: 'info',
    approved: 'warning',
    'in-progress': 'info',
    completed: 'success',
    cancelled: 'error',
  };

  return (
    <RootLayout title="Projects" showSidebar={true}>
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
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <Button variant="primary">
            ➕ New Project
          </Button>
        </div>

        {/* Status Filter */}
        <div
          style={{
            display: 'flex',
            gap: designTokens.spacing.md,
            flexWrap: 'wrap',
            marginBottom: designTokens.spacing.lg,
          }}
        >
          {['', 'quoted', 'approved', 'in-progress', 'completed', 'cancelled'].map((status) => (
            <button
              key={status || 'all'}
              onClick={() => handleStatusFilter(status)}
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

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: designTokens.spacing.lg,
        }}
      >
        {projects.length === 0 ? (
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
              No projects found. Create your first project to get started!
            </p>
          </Card>
        ) : (
          projects.map((project) => (
            <Card
              key={project.id}
              style={{
                padding: designTokens.spacing.lg,
              }}
              hover
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  marginBottom: designTokens.spacing.md,
                }}
              >
                <div>
                  <h3
                    style={{
                      fontSize: designTokens.fontSize.lg,
                      fontWeight: 700,
                      margin: 0,
                      marginBottom: designTokens.spacing.xs,
                      color: designTokens.colors.neutral[900],
                    }}
                  >
                    {project.name}
                  </h3>
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
                <Badge variant={statusColors[project.status] as any}>
                  {project.status}
                </Badge>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: designTokens.spacing.md,
                  padding: `${designTokens.spacing.md} 0`,
                  borderTop: `1px solid ${designTokens.colors.neutral[200]}`,
                  borderBottom: `1px solid ${designTokens.colors.neutral[200]}`,
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
                    Roof Type
                  </p>
                  <p
                    style={{
                      fontSize: designTokens.fontSize.sm,
                      fontWeight: 600,
                      color: designTokens.colors.neutral[900],
                      margin: 0,
                    }}
                  >
                    {project.roofType}
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
                    Contract Amount
                  </p>
                  <p
                    style={{
                      fontSize: designTokens.fontSize.sm,
                      fontWeight: 600,
                      color: designTokens.colors.primary,
                      margin: 0,
                    }}
                  >
                    ${project.contractAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: designTokens.spacing.sm,
                }}
              >
                <Button variant="ghost" size="sm" style={{ flex: 1 }}>
                  View
                </Button>
                <Button variant="primary" size="sm" style={{ flex: 1 }}>
                  Edit
                </Button>
              </div>
            </Card>
          ))
        )}
      </div>
    </RootLayout>
  );
}
