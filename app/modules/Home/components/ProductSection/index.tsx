'use client';

import { useState, useMemo, useCallback } from 'react';
import Carousel from '../../../../components/Carousel/Carousel';
import Reveal from '../../../../components/Reveal';
import SelectionCard from './SelectionCard';
import SizeSelector from './SizeSelector';
import ProductSummary from './ProductSummary';
import type {
  MaterialType,
  HoleType,
  VariantType,
  BaseType1Hole,
  BaseType2Hole,
} from '../../../../types/product.type';
import {
  materials,
  holes,
  variants,
  bases1Hole,
  bases2Hole,
  variantSizes,
  twinSizes,
  baseImages1Hole,
  baseImages2Hole,
  defaultImages,
  calculatePrice,
  calculateTwinPrice,
  isSpecialBaseAvailable,
} from '../../../../data/product';

const ProductSection = () => {
  // States
  const [selectedHole, setSelectedHole] = useState<HoleType | null>('1hole');
  const [selectedBase1Hole, setSelectedBase1Hole] = useState<BaseType1Hole | null>('normal');
  const [selectedBase2Hole, setSelectedBase2Hole] = useState<BaseType2Hole | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialType | null>('plastic');
  const [selectedVariant, setSelectedVariant] = useState<VariantType | null>('standard');
  const [selectedSeries, setSelectedSeries] = useState<string | null>('L1');
  const [selectedSize, setSelectedSize] = useState<number | null>(6);
  const [selectedTwinSize, setSelectedTwinSize] = useState<string | null>(null);

  // useCallback - Reset functions
  const resetAll = useCallback(() => {
    setSelectedBase1Hole(null);
    setSelectedBase2Hole(null);
    setSelectedMaterial(null);
    setSelectedVariant(null);
    setSelectedSeries(null);
    setSelectedSize(null);
    setSelectedTwinSize(null);
  }, []);

  const resetFromBase = useCallback(() => {
    setSelectedMaterial(null);
    setSelectedVariant(null);
    setSelectedSeries(null);
    setSelectedSize(null);
  }, []);

  const resetFromMaterial = useCallback(() => {
    setSelectedVariant(null);
    setSelectedSeries(null);
    setSelectedSize(null);
  }, []);

  // useCallback - เลือกขนาดแรกอัตโนมัติ สำหรับ 1 รู
  const selectFirstSize = useCallback((variant: VariantType, base: BaseType1Hole) => {
    const sizes = variantSizes[variant];
    const filteredSizes =
      base === 'normal' ? sizes : sizes.filter((g) => isSpecialBaseAvailable(g.series));

    if (filteredSizes.length > 0 && filteredSizes[0].items.length > 0) {
      setSelectedSeries(filteredSizes[0].series);
      setSelectedSize(filteredSizes[0].items[0]);
    }
  }, []);

  // useCallback - เลือกขนาดแรกอัตโนมัติ สำหรับ 2 รู
  const selectFirstTwinSize = useCallback(() => {
    if (twinSizes.length > 0 && twinSizes[0].items.length > 0) {
      setSelectedSeries(twinSizes[0].series);
      setSelectedTwinSize(twinSizes[0].items[0]);
    }
  }, []);

  // useCallback - onSelect handlers
  const handleSizeSelect = useCallback((series: string, size: number) => {
    setSelectedSeries(series);
    setSelectedSize(size);
  }, []);

  const handleTwinSizeSelect = useCallback((series: string, size: string) => {
    setSelectedSeries(series);
    setSelectedTwinSize(size);
  }, []);

  // useMemo - Get images based on selection
  const images = useMemo(() => {
    if (selectedHole === '2hole' && selectedBase2Hole) {
      return baseImages2Hole[selectedBase2Hole];
    }
    if (selectedHole === '1hole' && selectedBase1Hole && selectedMaterial && selectedVariant) {
      return baseImages1Hole[selectedBase1Hole][selectedMaterial][selectedVariant];
    }
    if (selectedHole === '1hole' && selectedBase1Hole && selectedMaterial) {
      return baseImages1Hole[selectedBase1Hole][selectedMaterial].standard;
    }
    return defaultImages;
  }, [selectedHole, selectedBase1Hole, selectedBase2Hole, selectedMaterial, selectedVariant]);

  // useMemo - กรองขนาดตามฐานที่เลือก
  const currentSizes = useMemo(() => {
    if (!selectedVariant) return [];
    const sizes = variantSizes[selectedVariant];

    if (selectedBase1Hole === 'normal') return sizes;

    return sizes.filter((group) => isSpecialBaseAvailable(group.series));
  }, [selectedVariant, selectedBase1Hole]);

  // useMemo - Check completion status
  const is1HoleComplete = useMemo(
    () =>
      selectedHole === '1hole' &&
      selectedBase1Hole &&
      selectedMaterial &&
      selectedVariant &&
      selectedSeries &&
      selectedSize,
    [
      selectedHole,
      selectedBase1Hole,
      selectedMaterial,
      selectedVariant,
      selectedSeries,
      selectedSize,
    ]
  );

  const is2HoleComplete = useMemo(
    () => selectedHole === '2hole' && selectedBase2Hole && selectedSeries && selectedTwinSize,
    [selectedHole, selectedBase2Hole, selectedSeries, selectedTwinSize]
  );

  // useMemo - Price calculations
  const price1Hole = useMemo(
    () => calculatePrice(selectedSeries, selectedMaterial, selectedBase1Hole),
    [selectedSeries, selectedMaterial, selectedBase1Hole]
  );

  const price2Hole = useMemo(
    () => calculateTwinPrice(selectedSeries, selectedBase2Hole),
    [selectedSeries, selectedBase2Hole]
  );

  // useMemo - Summary text
  const summary1Hole = useMemo(() => {
    const base = bases1Hole.find((b) => b.id === selectedBase1Hole)?.name;
    const material = materials.find((m) => m.id === selectedMaterial)?.name;
    const variant = variants.find((v) => v.id === selectedVariant)?.name;
    return {
      title: `1 รู - ${base} - ${material} - ${variant} (${selectedSeries})`,
      subtitle: `ขนาด ${selectedSize} mm`,
    };
  }, [selectedBase1Hole, selectedMaterial, selectedVariant, selectedSeries, selectedSize]);

  const summary2Hole = useMemo(() => {
    const base = bases2Hole.find((b) => b.id === selectedBase2Hole)?.name;
    return {
      title: `2 รู - ${base} - พลาสติก (${selectedSeries})`,
      subtitle: `ขนาด D1/D2: ${selectedTwinSize} mm`,
    };
  }, [selectedBase2Hole, selectedSeries, selectedTwinSize]);

  return (
    <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-20">
      <Reveal className="relative mb-12">
        <span className="font-mono inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
          <span className="h-px w-8 bg-secondary" />
          Product Configurator
        </span>
        <h2 className="mt-4 max-w-2xl text-4xl font-bold leading-tight text-gray-900 sm:text-5xl lg:text-6xl">
          เลือกสเปกสินค้า
          <span className="text-primary"> ของคุณเอง</span>
        </h2>
        <p className="mt-4 max-w-xl text-gray-500">
          กำหนดจำนวนรู ฐาน วัสดุ รุ่น และขนาด แล้วดูราคาทันที — เลือกง่ายในไม่กี่ขั้นตอน
        </p>
      </Reveal>

      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Carousel */}
        <div className="w-full lg:w-1/2">
          <div className="lg:sticky lg:top-28">
            <div className="font-mono mb-3 flex items-center justify-between text-[11px] uppercase tracking-widest text-primary/50">
              <span>// preview</span>
              <span>Ø6 – 168 mm</span>
            </div>
            <Carousel
              images={images}
              showThumbnails={images.length > 1}
              thumbnailsToShow={images.length > 1 ? 4 : 0}
              heightMainImg={500}
            />
          </div>
        </div>

        {/* Selection Panel */}
        <div className="bp-corners w-full space-y-6 rounded-2xl border border-primary/15 bg-white p-5 text-primary shadow-xl shadow-primary/5 sm:p-7 lg:w-1/2">
          {/* Step 1: เลือกจำนวนรู */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2.5">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/15">
                1
              </span>
              เลือกจำนวนรู
            </h3>
            <div className="flex gap-3">
              {holes.map((hole) => (
                <SelectionCard
                  key={hole.id}
                  {...hole}
                  isSelected={selectedHole === hole.id}
                  onClick={() => {
                    setSelectedHole(hole.id);
                    resetAll();
                  }}
                />
              ))}
            </div>
          </div>

          {/* Step 2: เลือกฐาน (1 รู) */}
          {selectedHole === '1hole' && (
            <div className="animate-fade-up">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/15">
                  2
                </span>
                เลือกประเภทฐาน
              </h3>
              <div className="flex gap-3">
                {bases1Hole.map((base) => (
                  <SelectionCard
                    key={base.id}
                    {...base}
                    isSelected={selectedBase1Hole === base.id}
                    size="sm"
                    onClick={() => {
                      setSelectedBase1Hole(base.id);
                      resetFromBase();
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 2: เลือกฐาน (2 รู) */}
          {selectedHole === '2hole' && (
            <div className="animate-fade-up">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/15">
                  2
                </span>
                เลือกประเภทฐาน
              </h3>
              <div className="flex gap-3">
                {bases2Hole.map((base) => (
                  <SelectionCard
                    key={base.id}
                    {...base}
                    isSelected={selectedBase2Hole === base.id}
                    size="sm"
                    onClick={() => {
                      setSelectedBase2Hole(base.id);
                      setSelectedMaterial('plastic');
                      setSelectedVariant('standard');
                      selectFirstTwinSize();
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 3: เลือกวัสดุ (1 รู) */}
          {selectedHole === '1hole' && selectedBase1Hole && (
            <div className="animate-fade-up">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/15">
                  3
                </span>
                เลือกวัสดุ
              </h3>
              <div className="flex gap-3">
                {materials.map((material) => (
                  <SelectionCard
                    key={material.id}
                    {...material}
                    isSelected={selectedMaterial === material.id}
                    onClick={() => {
                      setSelectedMaterial(material.id);
                      const firstVariant = variants[0].id;
                      setSelectedVariant(firstVariant);
                      selectFirstSize(firstVariant, selectedBase1Hole);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 4: เลือกรุ่น (1 รู) */}
          {selectedHole === '1hole' && selectedBase1Hole && selectedMaterial && (
            <div className="animate-fade-up">
              <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2.5">
                <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/15">
                  4
                </span>
                เลือกรุ่น
              </h3>
              <div className="flex gap-3">
                {variants.map((variant) => (
                  <SelectionCard
                    key={variant.id}
                    {...variant}
                    isSelected={selectedVariant === variant.id}
                    size="sm"
                    onClick={() => {
                      setSelectedVariant(variant.id);
                      selectFirstSize(variant.id, selectedBase1Hole);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Step 5: เลือกขนาด (1 รู) */}
          {selectedHole === '1hole' && selectedBase1Hole && selectedMaterial && selectedVariant && (
            <SizeSelector
              title="เลือกขนาด (mm)"
              step={5}
              sizes={currentSizes}
              selectedSeries={selectedSeries}
              selectedSize={selectedSize}
              onSelect={handleSizeSelect}
            />
          )}

          {/* Step 3: เลือกขนาด (2 รู) */}
          {selectedHole === '2hole' && selectedBase2Hole && (
            <SizeSelector
              title="เลือกขนาด D1/D2 (mm)"
              step={3}
              sizes={twinSizes}
              selectedSeries={selectedSeries}
              selectedSize={selectedTwinSize}
              onSelect={handleTwinSizeSelect}
            />
          )}

          {/* Summary - 1 รู */}
          {is1HoleComplete && <ProductSummary {...summary1Hole} price={price1Hole} />}

          {/* Summary - 2 รู */}
          {is2HoleComplete && <ProductSummary {...summary2Hole} price={price2Hole} />}
        </div>
      </div>
    </div>
  );
};

export default ProductSection;
