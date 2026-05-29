import Image from 'next/image';
import Reveal from '../../../../components/Reveal';

const reviews = [
  { id: 1, src: '/review/review-1.png', alt: 'รีวิวจากลูกค้า 1' },
  { id: 2, src: '/review/review-2.png', alt: 'รีวิวจากลูกค้า 2' },
  { id: 3, src: '/review/review-3.png', alt: 'รีวิวจากลูกค้า 3' },
  { id: 4, src: '/review/review-4.png', alt: 'รีวิวจากลูกค้า 4' },
];

const ReviewSection = () => {
  return (
    <div className="container flex flex-col gap-10 mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24">
      {/* Header */}
      <Reveal className="flex flex-col items-center space-y-3 text-center">
        <span className="font-mono inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
          <span className="h-px w-8 bg-secondary" />
          Reviews
          <span className="h-px w-8 bg-secondary" />
        </span>
        <h2 className="text-3xl font-bold text-gray-900 lg:text-5xl">รีวิวจากลูกค้า</h2>
        <p className="mx-auto max-w-lg text-gray-500">
          ความประทับใจจากลูกค้าที่ไว้วางใจเลือกใช้สินค้าของเรา
        </p>
        <div className="flex items-center justify-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Image
              key={i}
              src="/icon/star.png"
              alt="star"
              width={22}
              height={22}
              className="animate-fade-up"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
          <span className="ml-2 text-gray-700 font-semibold">5.0</span>
        </div>
      </Reveal>

      {/* Reviews Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {reviews.map((review, i) => (
          <Reveal key={review.id} delay={i * 100}>
            <div className="group relative overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-black/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/15 hover:-translate-y-1.5">
              <Image
                src={review.src}
                alt={review.alt}
                width={500}
                height={500}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary/30 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
