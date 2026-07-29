'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface HeroProps {
  title: string;
  subtitle: string;
  cta?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  badges?: string[];
  children?: ReactNode;
  className?: string;
}

export function Hero({
  title,
  subtitle,
  cta,
  secondaryCTA,
  badges,
  children,
  className = ''
}: HeroProps) {
  return (
    <section className={`py-12 sm:py-16 md:py-20 lg:py-32 px-safe ${className}`}>
      <div className="container mx-auto max-w-4xl px-3 sm:px-4 md:px-6">
        <div className="text-center animate-fade-in">
          {/* Badges - Responsive wrapping */}
          {badges && badges.length > 0 && (
            <div className="mb-6 sm:mb-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {badges.map((badge, i) => (
                <span
                  key={i}
                  className="badge badge-primary text-xs sm:text-sm"
                >
                  ✨ {badge}
                </span>
              ))}
            </div>
          )}

          {/* Main Title - Fluid typography */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
            <span className="gradient-primary-text">{title}</span>
          </h1>

          {/* Subtitle - Responsive sizing */}
          <p className="lead text-base sm:text-lg md:text-xl max-w-3xl mx-auto mb-6 sm:mb-8">
            {subtitle}
          </p>

          {/* CTA Buttons - Mobile stacked, desktop side-by-side */}
          {(cta || secondaryCTA) && (
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12">
              {cta && (
                <Link
                  href={cta.href}
                  className={`btn ${
                    cta.variant === 'secondary' ? 'btn-secondary' : 'btn-primary'
                  } btn-lg`}
                >
                  {cta.text}
                  <span>→</span>
                </Link>
              )}
              {secondaryCTA && (
                <Link
                  href={secondaryCTA.href}
                  className="btn btn-secondary btn-lg"
                >
                  {secondaryCTA.text}
                </Link>
              )}
            </div>
          )}

          {/* Additional Content */}
          {children}
        </div>
      </div>
    </section>
  );
}
