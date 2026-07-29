'use client';

import React, { useState } from 'react';
import { RootLayout } from '@/components/Layout';
import { Card, Badge } from '@/components/ui';
import { designTokens } from '@/config/designTokens';

interface GalleryItem {
  id: string;
  title: string;
  location: string;
  roofType: string;
  imageCount: number;
  featured: boolean;
  thumbnail: string;
}

export default function GalleryPage() {
  const [galleryItems] = useState<GalleryItem[]>([
    {
      id: '1',
      title: 'Modern Asphalt Roof Installation',
      location: 'Denver, CO',
      roofType: 'Asphalt Shingle',
      imageCount: 8,
      featured: true,
      thumbnail: '🏠',
    },
    {
      id: '2',
      title: 'Premium Metal Roofing Project',
      location: 'Boulder, CO',
      roofType: 'Metal',
      imageCount: 12,
      featured: true,
      thumbnail: '🏘️',
    },
    {
      id: '3',
      title: 'Luxury Tile Roof Restoration',
      location: 'Fort Collins, CO',
      roofType: 'Tile',
      imageCount: 15,
      featured: false,
      thumbnail: '🏛️',
    },
  ]);

  return (
    <RootLayout title="Project Gallery" showSidebar={true}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: designTokens.spacing.lg,
        }}
      >
        {galleryItems.map((item) => (
          <Card
            key={item.id}
            style={{
              overflow: 'hidden',
              cursor: 'pointer',
            }}
            hover
          >
            {/* Image Placeholder */}
            <div
              style={{
                width: '100%',
                height: '200px',
                backgroundColor: designTokens.colors.neutral[200],
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '60px',
              }}
            >
              {item.thumbnail}
            </div>

            {/* Content */}
            <div style={{ padding: designTokens.spacing.lg }}>
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
                    {item.title}
                  </h3>
                  <p
                    style={{
                      fontSize: designTokens.fontSize.sm,
                      color: designTokens.colors.neutral[500],
                      margin: 0,
                    }}
                  >
                    {item.location}
                  </p>
                </div>
                {item.featured && (
                  <Badge variant="success">Featured</Badge>
                )}
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
                    {item.roofType}
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
                    Images
                  </p>
                  <p
                    style={{
                      fontSize: designTokens.fontSize.sm,
                      fontWeight: 600,
                      color: designTokens.colors.neutral[900],
                      margin: 0,
                    }}
                  >
                    {item.imageCount} photos
                  </p>
                </div>
              </div>

              <button
                style={{
                  width: '100%',
                  padding: designTokens.spacing.md,
                  backgroundColor: designTokens.colors.primary,
                  color: 'white',
                  border: 'none',
                  borderRadius: designTokens.borderRadius.md,
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: designTokens.fontSize.sm,
                  transition: `all ${designTokens.transition.fast}`,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = designTokens.colors.primary;
                  (e.target as HTMLElement).style.opacity = '0.9';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = designTokens.colors.primary;
                  (e.target as HTMLElement).style.opacity = '1';
                }}
              >
                View Gallery
              </button>
            </div>
          </Card>
        ))}
      </div>
    </RootLayout>
  );
}
