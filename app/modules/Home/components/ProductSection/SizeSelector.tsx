import type { SizeGroup } from '../../../../types/product.type';

interface SizeSelectorProps<T extends string | number> {
  title: string;
  step?: string | number;
  sizes: SizeGroup<T>[];
  selectedSeries: string | null;
  selectedSize: T | null;
  onSelect: (series: string, size: T) => void;
}

const SizeSelector = <T extends string | number>({
  title,
  step,
  sizes,
  selectedSeries,
  selectedSize,
  onSelect,
}: SizeSelectorProps<T>) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center gap-2.5">
        {step != null && (
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary ring-1 ring-primary/15">
            {step}
          </span>
        )}
        {title}
      </h3>
      <div className="space-y-3">
        {sizes.map((group) => (
          <div key={group.series} className="flex items-start gap-3">
            <span className="text-sm font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-lg shrink-0 ring-1 ring-primary/15">
              {group.series}
            </span>
            <div className="flex gap-2 flex-wrap flex-1">
              {group.items.map((size) => {
                const active = selectedSize === size && selectedSeries === group.series;
                return (
                  <button
                    key={String(size)}
                    onClick={() => onSelect(group.series, size)}
                    aria-pressed={active}
                    className={`
                      px-3 py-1.5 text-sm font-semibold rounded-lg border-2 cursor-pointer
                      transition-all duration-200 ease-out active:scale-95
                      ${
                        active
                          ? 'border-primary bg-primary text-white shadow-md shadow-primary/25 scale-105'
                          : 'border-gray-200 bg-white text-gray-700 hover:border-primary hover:text-primary hover:-translate-y-0.5'
                      }
                    `}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
