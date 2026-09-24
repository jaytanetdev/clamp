import ContactSection from './components/ContactSection';
import FaqSection from './components/FaqSection';
import HeaderSection from './components/HeaderSection';
import ProductSection from './components/ProductSection';
import ReviewSection from './components/ReviewSection';

const HomeModule = () => {
  return (
    <div className="flex flex-col">
      {/* Home Section */}
      <section id="home">
        <HeaderSection />
      </section>

      {/* Products Section */}
      <section id="products" className="scroll-mt-24 bg-blueprint bg-[#f7f9f8]">
        <ProductSection />
      </section>

      <section aria-labelledby="catalog-heading" className="bg-[#f7f9f8] pb-20">
        <div className="container mx-auto px-4 sm:px-8 md:px-12 lg:px-16">
          <h2 id="catalog-heading" className="text-3xl font-bold text-primary sm:text-4xl">เลือกดูกลุ่มสินค้า</h2>
          <p className="mt-3 text-gray-600">ดูขนาดและราคาฐานปกติของแต่ละรุ่นก่อนเลือกสเปกที่ต้องการ</p>
          <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((item) => (
              <Link key={item.slug} href={`/products/${item.slug}`} className="group overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm transition-shadow hover:shadow-lg">
                <Image src={item.image} alt={item.title} width={600} height={360} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="h-48 w-full object-cover" />
                <div className="p-5">
                  <h3 className="text-lg font-bold text-primary">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.description}</p>
                  <span className="mt-4 inline-block font-semibold text-secondary group-hover:underline">ดูสเปกและขนาด →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 bg-gradient-to-b from-white to-[#eef4f1]">
        <ContactSection />
      </section>

      <section id="review" className="scroll-mt-24 bg-white">
        <ReviewSection />
      </section>

      {/* FAQ Section */}
      <section id="faq" className="scroll-mt-24 bg-[#f7f9f8]">
        <FaqSection />
      </section>
    </div>
  );
};

export default HomeModule;
import Image from 'next/image';
import Link from 'next/link';
import { catalog } from '../../data/catalog';
