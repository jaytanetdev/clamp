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
      className={`
        flex-1 ${padding} rounded-xl border-2 transition-all cursor-pointer text-left
        ${isSelected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/50'}
      `}
    >
      <p className={`font-bold ${isSelected ? 'text-primary' : ''}`}>{name}</p>
      <p className="text-xs text-gray-500 mt-1">{description}</p>
    </button>
  );
};

export default SelectionCard;
