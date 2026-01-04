// ประเภทต่างๆ
export type MaterialType = 'aluminum' | 'plastic';
export type HoleType = '1hole' | '2hole';
export type VariantType = 'standard' | 'heavy';
export type BaseType1Hole = 'normal' | 'duckfoot' | 'longplate';
export type BaseType2Hole = 'normal' | 'duckfoot';

// Interface สำหรับ Selection Item
export interface SelectionItem<T extends string> {
  id: T;
  name: string;
  description: string;
}

// Interface สำหรับ Size Group
export interface SizeGroup<T = number> {
  series: string;
  items: T[];
}
