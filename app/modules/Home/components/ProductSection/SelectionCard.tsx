interface SelectionCardProps<T extends string> {
  id: T;
  name: string;
  description: string;
  isSelected: boolean;
  onClick: () => void;
  size?: 'sm' | 'md';
}

const SelectionCard = <T extends string>({
  name,
  description,
  isSelected,
  onClick,
  size = 'md',
}: SelectionCardProps<T>) => {
  const padding = size === 'sm' ? 'p-3' : 'p-4';

  return (
    <button
      onClick={onClick}
      aria-pressed={isSelected}
      className={`
        group relative flex-1 ${padding} rounded-2xl border-2 text-left cursor-pointer
        transition-all duration-300 ease-out overflow-hidden
        hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
        ${
          isSelected
            ? 'border-primary bg-gradient-to-br from-primary/10 to-primary/5 shadow-lg shadow-primary/15'
            : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
        }
      `}
    >
      {/* Animated check badge */}
      <span
        className={`absolute top-2 right-2 flex items-center justify-center w-5 h-5 rounded-full bg-primary text-white transition-all duration-300 ${
          isSelected ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </span>

      <p
        className={`font-bold transition-colors duration-300 pr-5 ${
          isSelected ? 'text-primary' : 'text-gray-800 group-hover:text-primary'
        }`}
      >
        {name}
      </p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </button>
  );
};

export default SelectionCard;
