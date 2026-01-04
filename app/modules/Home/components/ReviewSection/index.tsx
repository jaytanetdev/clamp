import Image from 'next/image';

const reviews = [
  { id: 1, src: '/review/review-1.png', alt: 'รีวิวจากลูกค้า 1' },
  { id: 2, src: '/review/review-2.png', alt: 'รีวิวจากลูกค้า 2' },
  { id: 3, src: '/review/review-3.png', alt: 'รีวิวจากลูกค้า 3' },
  { id: 4, src: '/review/review-4.png', alt: 'รีวิวจากลูกค้า 4' },
];

const ReviewSection = () => {
  return (
    <div className="container flex flex-col gap-10 mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16">
      {/* Header */}
      <div className="text-center space-y-3">
        <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">รีวิวจากลูกค้า</h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          ความประทับใจจากลูกค้าที่ไว้วางใจเลือกใช้สินค้าของเรา
        </p>
        <div className="flex items-center justify-center gap-1 text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Image key={i} src="/icon/star.png" alt="star" width={20} height={20} />
          ))}
          <span className="ml-2 text-gray-600 font-medium">5.0</span>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="group relative  rounded-2xl bg-white shadow-md hover:shadow-2xl transition-all duration-300"
          >
            <div className=" ">
              <Image
                src={review.src}
                alt={review.alt}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
