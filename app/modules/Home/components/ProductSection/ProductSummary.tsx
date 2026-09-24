interface ProductSummaryProps {
  title: string;
  subtitle: string;
  price: number | null;
}

const ProductSummary = ({ title, subtitle, price }: ProductSummaryProps) => {
  return (
    <div className="bp-corners relative animate-scale-in overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-primary to-primary-dark p-5 text-accent shadow-xl shadow-primary/25">
      {/* decorative texture */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-50" />
      <div className="pointer-events-none absolute -top-10 -right-10 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

      <div className="relative text-white">
        <p className="font-mono mb-3 flex items-center justify-between text-[11px] uppercase tracking-widest text-white/60">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            // สรุปสเปก
          </span>
          <span className="text-accent/80">CONFIG ✓</span>
        </p>
        <div className="flex flex-wrap items-end justify-between gap-3 border-t border-white/10 pt-4">
          <div className="min-w-0">
            <p className="text-lg font-bold leading-snug">{title}</p>
            <p className="font-mono text-sm text-white/70">{subtitle}</p>
          </div>
          <div className="text-right">
            <p className="font-mono text-[11px] uppercase tracking-widest text-white/50">ราคา / PRICE</p>
            <p className="font-mono text-4xl font-bold leading-none text-gradient-gold">
              ฿{price?.toLocaleString() ?? '-'}
            </p>
          </div>
        </div>

        <a
          href="#contact"
          className="shimmer-sweep mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-accent py-3.5 text-sm font-bold text-primary-dark transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
        >
          สอบถาม / สั่งซื้อสินค้านี้
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ProductSummary;
