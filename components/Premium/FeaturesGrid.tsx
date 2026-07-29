'use client';

import { ReactNode } from 'react';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  title: string;
  subtitle?: string;
  features: Feature[];
  columns?: 3 | 4;
  className?: string;
}

export function FeaturesGrid({
  title,
  subtitle,
  features,
  columns = 4,
  className = ''
}: FeaturesGridProps) {
  // Responsive grid: 1 col (mobile) → 2 col (tablet) → 3-4 col (desktop)
  const gridClass = columns === 3 
    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';

  return (
    <section className={`py-12 sm:py-16 md:py-20 px-safe ${className}`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Header - Responsive spacing */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
          {subtitle && (
            <p className="lead max-w-2xl mx-auto text-sm sm:text-base md:text-lg">{subtitle}</p>
          )}
        </div>

        {/* Features Grid - Responsive gap and columns */}
        <div className={`grid ${gridClass} gap-4 sm:gap-5 md:gap-6 lg:gap-6`}>
          {features.map((feature, i) => (
            <div
              key={i}
              className="card card-feature group stagger animate-fade-in-up touch-target"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="text-base sm:text-lg font-bold">{feature.title}</h3>
              <p className="text-xs sm:text-sm text-color-text-tertiary">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
