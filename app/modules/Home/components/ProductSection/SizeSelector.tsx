import type { SizeGroup } from '../../../../types/product.type';

interface SizeSelectorProps<T extends string | number> {
  title: string;
  sizes: SizeGroup<T>[];
  selectedSeries: string | null;
  selectedSize: T | null;
  onSelect: (series: string, size: T) => void;
}

const SizeSelector = <T extends string | number>({
  title,
  sizes,
  selectedSeries,
  selectedSize,
  onSelect,
}: SizeSelectorProps<T>) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>
      <div className="space-y-3">
        {sizes.map((group) => (
          <div key={group.series} className="flex items-start gap-3">
            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-1 rounded shrink-0">
              {group.series}
            </span>
            <div className="flex gap-2 flex-wrap flex-1">
              {group.items.map((size) => (
                <button
                  key={String(size)}
                  onClick={() => onSelect(group.series, size)}
                  className={`
                    px-3 py-1.5 text-sm font-semibold rounded-lg border-2 transition-all cursor-pointer
                    ${
                      selectedSize === size && selectedSeries === group.series
                        ? 'border-primary bg-primary text-white'
                        : 'border-gray-200 hover:border-primary hover:text-primary'
                    }
                  `}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
