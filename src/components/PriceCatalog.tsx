import React, { useState, useMemo } from 'react';
import clsx from 'clsx';
import type { ScrapItem } from '../types/scrap';

interface PriceCatalogProps {
  items: ScrapItem[];
  whatsappNumber: string;
  companyPhone?: string;
  companyPhoneClean?: string;
}

const DEFAULT_PREVIEW_ITEMS: ScrapItem[] = [
  { name: 'Newspaper', price: '16', unit: 'kg', category: 'Paper' },
  { name: 'Carton Box', price: '11', unit: 'kg', category: 'Paper' },
  { name: 'Iron Scrap', price: '24', unit: 'kg', category: 'Metals' },
  { name: 'Copper Wire', price: '480', unit: 'kg', category: 'Metals' },
  { name: 'Plastic Bottles (PET)', price: '12', unit: 'kg', category: 'Plastics' },
  { name: 'Split AC (1.5 Ton)', price: '85', unit: 'kg', category: 'Appliances' },
];

export default function PriceCatalog({
  items,
  whatsappNumber,
  companyPhone,
  companyPhoneClean,
}: PriceCatalogProps) {
  const isUsingPreviewData = items.length === 0;
  const displayItems = isUsingPreviewData ? DEFAULT_PREVIEW_ITEMS : items;

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = useMemo(() => {
    const set = new Set<string>();
    displayItems.forEach((item) => {
      if (item.category) set.add(item.category);
    });
    return ['All', ...Array.from(set)];
  }, [displayItems]);

  const filteredItems = useMemo(() => {
    return displayItems.filter((item) => {
      const matchesCategory = selectedCategory === 'All' || item.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [displayItems, selectedCategory, searchQuery]);

  const handleBookItem = (item: ScrapItem) => {
    const text = `Hi, I would like to sell/schedule pickup for *${item.name}* (Listed rate: ₹${item.price}/${item.unit}).`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="space-y-8">
      {/* Informational banner when in preview mode */}
      {isUsingPreviewData && (
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 text-sm space-y-2">
          <div className="flex items-center gap-2 font-bold text-base text-amber-800 dark:text-amber-300">
            <span>ℹ️</span>
            <span>Live Prices Catalog (Ready for CSV Data)</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
            This catalog is configured to dynamically read from <code>src/data/prices.csv</code>.
            Once you add your CSV file, your custom items, categories, and live scrap rates will display here automatically.
          </p>
          <div className="p-2.5 rounded-lg bg-amber-100/60 dark:bg-amber-900/40 font-mono text-xs overflow-x-auto text-amber-900 dark:text-amber-100">
            name,price,unit,category,thumbnail<br />
            Newspaper,16,kg,Paper,newspaper.svg<br />
            Iron,24,kg,Metals,iron.svg
          </div>
        </div>
      )}

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400">🔍</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items (e.g. Iron, Paper)..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-white placeholder-zinc-400 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  'px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer',
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Items Grid */}
      {filteredItems.length === 0 ? (
        <div className="text-center py-16 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 p-8 space-y-3">
          <span className="text-4xl">🔍</span>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">No items found</h3>
          <p className="text-xs text-zinc-500">Try searching for a different keyword or category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="bg-white dark:bg-zinc-900 rounded-2xl p-5 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start gap-4">
                {/* Thumbnail / Icon Container */}
                <div className="w-14 h-14 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-100 dark:border-emerald-800/60 flex items-center justify-center shrink-0 text-2xl group-hover:scale-105 transition-transform overflow-hidden">
                  {item.thumbnail ? (
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        // Fallback icon if custom image file not found yet
                        (e.currentTarget as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : null}
                  <span className="select-none">♻️</span>
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold tracking-wider uppercase bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {item.category}
                  </span>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white leading-snug">
                    {item.name}
                  </h3>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-500 block">Rate</span>
                  <span className="text-lg font-extrabold text-emerald-600 dark:text-emerald-400 font-mono">
                    ₹{item.price}
                  </span>
                  <span className="text-xs text-zinc-500 font-medium"> / {item.unit}</span>
                </div>

                <a
                  href={companyPhoneClean ? `tel:${companyPhoneClean}` : `https://wa.me/${whatsappNumber}`}
                  className="px-3.5 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-600 hover:text-white text-emerald-700 dark:text-emerald-300 text-xs font-semibold border border-emerald-200 dark:border-emerald-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Call us to sell this item"
                >
                  <span>📞 Call Us</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

