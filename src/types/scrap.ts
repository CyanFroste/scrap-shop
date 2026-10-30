export interface ScrapItem {
  name: string;
  price: number | string;
  unit: string;
  category: string;
  thumbnail?: string;
}

export type ScrapCategory = 'All' | 'Paper' | 'Metals' | 'Plastics' | 'Appliances' | 'E-Waste' | string;

