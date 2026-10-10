import React, { useState } from 'react';
import { Sparkles, Film, Music, Flame, Camera, Globe, Tv, Clapperboard, Heart, ExternalLink } from 'lucide-react';
import { resourceCategories } from '../data/resources';
import { ResourceCategory, ResourceItem } from '../types';

export default function ResourceGallery() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(resourceCategories[0].id);

  const currentCategory: ResourceCategory =
    resourceCategories.find((c) => c.id === activeCategoryId) || resourceCategories[0];

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'mvs': return Film;
      case 'concerts': return Music;
      case 'dance-practices': return Flame;
      case 'behind-the-scenes': return Camera;
      case 'interviews': return Globe;
      case 'variety': return Tv;
      case 'documentaries': return Clapperboard;
      case 'charity': return Heart;
      default: return ExternalLink;
    }
  };

  return (
    <section id="resource-universe" className="relative min-h-screen py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-purple-900/30 border border-purple-500/30 mb-3 backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 text-purple-300" />
          <span className="text-xs font-montserrat uppercase tracking-[0.25em] text-purple-200">
            05 • THE RESOURCE UNIVERSE
          </span>
        </div>
        <h2 className="font-cinzel text-3xl sm:text-5xl font-extrabold text-white tracking-wider">
          OFFICIAL ARCHIVES & IMPACT
        </h2>
        <p className="font-cormorant italic text-lg sm:text-2xl text-purple-300/80 mt-2 max-w-2xl mx-auto">
          "A curated library of official music videos, concert milestones, global philanthropy, and variety archives."
        </p>
      </div>

      {/* Category Pills Scroller */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
        {resourceCategories.map((category) => {
          const Icon = getCategoryIcon(category.id);
          const isSelected = activeCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setActiveCategoryId(category.id)}
              className={`flex items-center space-x-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-medium transition-all focus:outline-none focus:ring-1 focus:ring-purple-400 ${
                isSelected
                  ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)] border border-purple-300'
                  : 'bg-[#150a2b]/80 border border-purple-800/50 text-purple-300/80 hover:text-white hover:border-purple-600'
              }`}
            >
              <Icon className="w-4 h-4 text-purple-300" />
              <span>{category.category}</span>
            </button>
          );
        })}
      </div>

      {/* Resource Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-14">
        {currentCategory.items.map((item: ResourceItem, idx: number) => (
          <div
            key={idx}
            className="group relative rounded-2xl border border-purple-800/40 bg-[#130927]/90 p-5 backdrop-blur-md shadow-lg hover:border-purple-400 hover:shadow-[0_10px_30px_rgba(168,85,247,0.25)] transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-mono text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-800">
                  {item.year || item.seasons || item.runtime || item.impact || 'Official Archive'}
                </span>
                {item.verified && (
                  <span className="text-[10px] font-mono text-purple-300 px-2 py-0.5 rounded bg-purple-900/60 border border-purple-500/40">
                    ✓ Verified
                  </span>
                )}
              </div>

              <h4 className="font-cinzel text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                {item.title}
              </h4>

              {item.highlight && (
                <p className="text-xs text-purple-300/80 font-montserrat mt-2 leading-relaxed">
                  {item.highlight}
                </p>
              )}
              {item.venue && (
                <p className="text-[11px] font-mono text-purple-400 mt-1">
                  📍 {item.venue}
                </p>
              )}
              {item.context && (
                <p className="text-xs text-purple-200 mt-1 font-cormorant italic">
                  "{item.context}"
                </p>
              )}
            </div>

            {/* External Destination Link */}
            <div className="mt-4 pt-3 border-t border-purple-900/50 flex items-center justify-between">
              <span className="text-[11px] font-mono text-purple-400/80">
                {item.views ? `Views: ${item.views}` : item.platform || 'BTS Official'}
              </span>
              <a
                href={item.destinationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-xs text-purple-300 hover:text-white font-medium group-hover:translate-x-1 transition-transform focus:outline-none focus:ring-1 focus:ring-purple-400 rounded p-1"
                aria-label={`Open ${item.title} on official destination`}
              >
                <span>Explore Source</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
