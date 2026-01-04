interface ProductSummaryProps {
  title: string;
  subtitle: string;
  price: number | null;
}

const ProductSummary = ({ title, subtitle, price }: ProductSummaryProps) => {
  return (
    <div className="p-4 bg-gray-200 from-primary/10 to-primary/5 rounded-xl border border-primary/20">
      <p className="text-sm text-gray-600 mb-2">สินค้าที่เลือก:</p>
      <div className="flex justify-between items-center">
        <div>
          <p className="font-bold text-lg">{title}</p>
          <p className="text-sm text-gray-500">{subtitle}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">ราคา</p>
          <p className="text-2xl font-bold text-primary">฿{price?.toLocaleString() ?? '-'}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductSummary;
