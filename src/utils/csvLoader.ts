import fs from 'node:fs';
import path from 'node:path';
import type { ScrapItem } from '../types/scrap';

/**
 * Loads scrap items from `src/data/prices.csv` if the file exists.
 * If the file is not yet created, returns an empty array or default template items.
 */
export function loadScrapPricesFromCsv(): ScrapItem[] {
  const csvPath = path.resolve(process.cwd(), 'src/data/prices.csv');

  if (!fs.existsSync(csvPath)) {
    return [];
  }

  try {
    const rawContent = fs.readFileSync(csvPath, 'utf-8');
    const lines = rawContent.split(/\r?\n/).filter((line) => line.trim().length > 0);

    if (lines.length <= 1) {
      return [];
    }

    // First line is header: name,price,unit,category,thumbnail
    const dataLines = lines.slice(1);
    const items: ScrapItem[] = [];

    for (const line of dataLines) {
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length >= 4) {
        items.push({
          name: parts[0] || '',
          price: parts[1] || '0',
          unit: parts[2] || 'kg',
          category: parts[3] || 'General',
          thumbnail: parts[4] || '',
        });
      }
    }

    return items;
  } catch (err) {
    console.warn('Could not read src/data/prices.csv:', err);
    return [];
  }
}

