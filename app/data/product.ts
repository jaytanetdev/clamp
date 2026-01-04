import type {
  MaterialType,
  HoleType,
  VariantType,
  BaseType1Hole,
  BaseType2Hole,
  SelectionItem,
  SizeGroup,
} from '../types/product.type';

// ตัวเลือกวัสดุ
export const materials: SelectionItem<MaterialType>[] = [
  { id: 'plastic', name: 'พลาสติก', description: 'น้ำหนักเบา ราคาประหยัด' },
  { id: 'aluminum', name: 'อลูมิเนียม', description: 'แข็งแรง ทนทาน' },
];

// ตัวเลือกจำนวนรู
export const holes: SelectionItem<HoleType>[] = [
  { id: '1hole', name: '1 รู', description: 'แคลมป์รูเดียว' },
  { id: '2hole', name: '2 รู', description: 'แคลมป์สองรู' },
];

// ตัวเลือกรุ่น
export const variants: SelectionItem<VariantType>[] = [
  { id: 'standard', name: 'Standard', description: 'รุ่นมาตรฐาน' },
  { id: 'heavy', name: 'Heavy', description: 'รุ่นงานหนัก' },
];

// ตัวเลือกฐานสำหรับ 1 รู
export const bases1Hole: SelectionItem<BaseType1Hole>[] = [
  { id: 'normal', name: 'ปกติ', description: 'ฐานมาตรฐาน' },
  { id: 'duckfoot', name: 'ตีนเป็ด', description: 'ฐานตีนเป็ด' },
  { id: 'longplate', name: 'เพลทยาว', description: 'ฐานเพลทยาว' },
];

// ตัวเลือกฐานสำหรับ 2 รู
export const bases2Hole: SelectionItem<BaseType2Hole>[] = [
  { id: 'normal', name: 'ปกติ', description: 'ฐานมาตรฐาน' },
  { id: 'duckfoot', name: 'ตีนเป็ด', description: 'ฐานตีนเป็ด' },
];

// ราคาฐานตาม Series และวัสดุ (สำหรับฐานปกติ)
export const seriesPrices: Record<string, Record<MaterialType, number>> = {
  // Standard (L1-L8)
  L1: { plastic: 70, aluminum: 200 },
  L2: { plastic: 90, aluminum: 220 },
  L3: { plastic: 110, aluminum: 260 },
  L4: { plastic: 130, aluminum: 300 },
  L5: { plastic: 170, aluminum: 360 },
  L6: { plastic: 260, aluminum: 520 },
  L7: { plastic: 500, aluminum: 840 },
  L8: { plastic: 700, aluminum: 1240 },
  // Heavy (H1-H7)
  H1: { plastic: 170, aluminum: 280 },
  H2: { plastic: 200, aluminum: 300 },
  H3: { plastic: 240, aluminum: 360 },
  H4: { plastic: 500, aluminum: 1100 },
  H5: { plastic: 960, aluminum: 2800 },
  H6: { plastic: 1900, aluminum: 8000 },
  H7: { plastic: 3100, aluminum: 9000 },
};

// ราคาเพิ่มสำหรับฐานตีนเป็ด Standard (บวก 50 บาท)
export const DUCKFOOT_STANDARD_EXTRA = 50;

// ราคาเพิ่มสำหรับฐานตีนเป็ด Heavy (บวกตาม Series)
export const duckfootHeavyExtraPrices: Record<string, number> = {
  H1: 300,
  H2: 300,
  H3: 300,
  H4: 340,
  // H5-H7 ไม่มีตีนเป็ด
};

// ราคาเพิ่มสำหรับฐานเพลทยาว Standard (บวกตาม Series)
export const longplateStandardExtraPrices: Record<string, number> = {
  L1: 50,
  L2: 70,
  L3: 110,
  L4: 140,
  L5: 190,
  L6: 200,
  L7: 240,
  L8: 270,
};

// ราคาเพิ่มสำหรับฐานเพลทยาว Heavy (บวกตาม Series)
export const longplateHeavyExtraPrices: Record<string, number> = {
  H1: 70,
  H2: 80,
  H3: 110,
  H4: 240,
  // H5-H7 ไม่มีเพลทยาว
};

// Series ที่รองรับฐานตีนเป็ดและเพลทยาว (Heavy เฉพาะ H1-H4)
export const HEAVY_SPECIAL_BASE_SERIES = ['H1', 'H2', 'H3', 'H4'];

// ตรวจสอบว่า series รองรับฐานพิเศษหรือไม่
export const isSpecialBaseAvailable = (series: string): boolean => {
  // Standard (L series) รองรับทุกฐาน
  if (series.startsWith('L')) return true;
  // Heavy (H series) รองรับเฉพาะ H1-H4
  return HEAVY_SPECIAL_BASE_SERIES.includes(series);
};

// ฟังก์ชันคำนวณราคารวม
export const calculatePrice = (
  series: string | null,
  material: MaterialType | null,
  baseType: BaseType1Hole | null
): number | null => {
  if (!series || !material) return null;

  const basePrice = seriesPrices[series]?.[material];
  if (!basePrice) return null;

  // ราคาปกติ
  if (baseType === 'normal' || !baseType) {
    return basePrice;
  }

  const isHeavy = series.startsWith('H');

  // ตีนเป็ด
  if (baseType === 'duckfoot') {
    if (isHeavy) {
      const extraPrice = duckfootHeavyExtraPrices[series] || 0;
      return basePrice + extraPrice;
    }
    return basePrice + DUCKFOOT_STANDARD_EXTRA;
  }

  // เพลทยาว
  if (baseType === 'longplate') {
    if (isHeavy) {
      const extraPrice = longplateHeavyExtraPrices[series] || 0;
      return basePrice + extraPrice;
    }
    const extraPrice = longplateStandardExtraPrices[series] || 0;
    return basePrice + extraPrice;
  }

  return basePrice;
};

// ขนาด OD ตาม Variant (1 รู)
export const variantSizes: Record<VariantType, SizeGroup<number>[]> = {
  standard: [
    { series: 'L1', items: [6, 6.4, 8, 9.5, 10, 12] },
    { series: 'L2', items: [12.7, 13.5, 14, 15, 16, 17.2, 18] },
    { series: 'L3', items: [19, 20, 21.3, 22, 25] },
    { series: 'L4', items: [26.9, 28, 30] },
    { series: 'L5', items: [32, 33.7, 35, 38, 40, 42] },
    { series: 'L6', items: [44.5, 48.3, 50.8] },
    { series: 'L7', items: [57.2, 60.3, 63.5, 70, 73, 76.1] },
    { series: 'L8', items: [88.9, 102] },
  ],
  heavy: [
    { series: 'H1', items: [6, 8, 9.5, 12.7, 13.5, 14, 15, 16, 17.2] },
    { series: 'H2', items: [18, 19, 20, 21.3, 22, 23, 24, 25, 26.9, 28, 30, 32] },
    { series: 'H3', items: [33.7, 35, 38, 40, 42, 44.5, 48.3, 50.8] },
    { series: 'H4', items: [55, 57, 60.3, 63.5, 70, 75] },
    { series: 'H5', items: [76.1, 80, 82.5, 88.9] },
    { series: 'H6', items: [102, 108, 114, 127, 133] },
    { series: 'H7', items: [140, 152, 159, 165, 168] },
  ],
};

// ขนาด OD สำหรับ 2 รู (Twin)
export const twinSizes: SizeGroup<string>[] = [
  { series: 'L1', items: ['6/6', '6.4/6.4', '8/8', '9.5/9.5', '10/10', '12/12'] },
  {
    series: 'L2',
    items: ['12.7/12.7', '13.5/13.5', '14/14', '15/15', '16/16', '17.2/17.2', '18/18'],
  },
  { series: 'L3', items: ['19/19', '20/20', '21.3/21.3', '22/22', '25/25'] },
  { series: 'L4', items: ['26.9/26.9', '28/28', '30/30'] },
  { series: 'L5', items: ['32/32', '33.7/33.7', '35/35', '38/38', '40/40', '42/42'] },
];

// ราคา 2 รู (Twin) ตาม Series
export const twinPrices: Record<string, number> = {
  L1: 100,
  L2: 120,
  L3: 180,
  L4: 220,
  L5: 280,
};

// ราคาเพิ่มสำหรับ 2 รู ตีนเป็ด
export const twinDuckfootExtraPrices: Record<string, number> = {
  L1: 30,
  L2: 50,
  L3: 50,
  L4: 50,
  L5: 50,
};

// ฟังก์ชันคำนวณราคา 2 รู
export const calculateTwinPrice = (
  series: string | null,
  baseType: BaseType2Hole | null
): number | null => {
  if (!series) return null;

  const basePrice = twinPrices[series];
  if (!basePrice) return null;

  // ราคาปกติ
  if (baseType === 'normal' || !baseType) {
    return basePrice;
  }

  // ตีนเป็ด
  if (baseType === 'duckfoot') {
    const extraPrice = twinDuckfootExtraPrices[series] || 0;
    return basePrice + extraPrice;
  }

  return basePrice;
};

// รูปภาพ 1 รู แยกตามฐาน, วัสดุ และรุ่น
export const baseImages1Hole: Record<
  BaseType1Hole,
  Record<MaterialType, Record<VariantType, string[]>>
> = {
  normal: {
    plastic: {
      standard: ['/product/st/st-1.jpg', '/product/st/st-2.jpg', '/product/st/st-3.jpg'],
      heavy: ['/product/hv/hv-1.jpg', '/product/hv/hv-2.jpg', '/product/hv/hv-3.jpg'],
    },
    aluminum: {
      standard: ['/product/st/st-ar-1.jpg', '/product/st/st-ar-2.jpg', '/product/st/st-ar-3.jpg'],
      heavy: ['/product/hv/hv-ar-1.jpg', '/product/hv/hv-ar-2.jpg', '/product/hv/hv-ar-3.jpg'],
    },
  },
  duckfoot: {
    plastic: {
      standard: ['/product/st/st-teen-1.png'],
      heavy: ['/product/hv/hv-teen-1.png'],
    },
    aluminum: {
      standard: ['/product/st/st-ar-teen-1.png'],
      heavy: ['/product/hv/hv-ar-teen-1.png'],
    },
  },
  longplate: {
    plastic: {
      standard: ['/product/st/st-plate-1.png'],
      heavy: ['/product/hv/hv-plate-1.png'],
    },
    aluminum: {
      standard: ['/product/st/st-ar-plate-1.png'],
      heavy: ['/product/hv/hv-ar-plate-1.png'],
    },
  },
};

// รูปภาพ 2 รู แยกตามฐาน
export const baseImages2Hole: Record<BaseType2Hole, string[]> = {
  normal: ['/product/tw/tw-1.jpg', '/product/tw/tw-2.jpg', '/product/tw/tw-3.jpg'],
  duckfoot: ['/product/tw/tw-teen-1.png'],
};

// รูป default เมื่อยังไม่เลือก
export const defaultImages = [
  ...baseImages1Hole.normal.plastic.standard,
  ...baseImages1Hole.normal.plastic.heavy,
  ...baseImages1Hole.normal.aluminum.standard,
  ...baseImages1Hole.normal.aluminum.heavy,
  ...baseImages2Hole.normal,
];
