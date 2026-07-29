'use client';

import Link from 'next/link';
import { ReactNode } from 'react';

interface CTACardProps {
  icon: ReactNode;
  title: string;
  description: string;
  href: string;
  isExternal?: boolean;
}

interface CTAGridProps {
  title: string;
  subtitle?: string;
  cards: CTACardProps[];
  className?: string;
}

export function CTAGrid({
  title,
  subtitle,
  cards,
  className = ''
}: CTAGridProps) {
  return (
    <section className={`py-12 sm:py-16 md:py-20 border-t border-color-border-default px-safe ${className}`}>
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        {/* Section Header - Responsive spacing */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{title}</h2>
          {subtitle && (
            <p className="lead max-w-2xl mx-auto text-sm sm:text-base md:text-lg">{subtitle}</p>
          )}
        </div>

        {/* CTA Grid - Responsive: 1 col (mobile) → 2 col (tablet) → 3 col (desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {cards.map((card, i) => (
            <Link
              key={i}
              href={card.href}
              {...(card.isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
              className="card cursor-pointer group stagger animate-fade-in-up hover:shadow-lg transition-shadow touch-target"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              {/* Icon - Responsive sizing */}
              <div className="text-3xl sm:text-4xl md:text-5xl mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              {/* Title - Responsive typography */}
              <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3">{card.title}</h3>
              {/* Description - Responsive text */}
              <p className="text-xs sm:text-sm text-color-text-tertiary mb-4 sm:mb-6">{card.description}</p>
              {/* CTA Arrow - Responsive spacing */}
              <div className="text-color-teal-400 text-xs sm:text-sm font-semibold flex items-center gap-2 group-hover:gap-3 transition-all">
                Explore
                <span>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
