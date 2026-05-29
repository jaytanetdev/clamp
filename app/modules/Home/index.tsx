import ContactSection from './components/ContactSection';
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

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24 bg-gradient-to-b from-white to-[#eef4f1]">
        <ContactSection />
      </section>

      <section id="review" className="scroll-mt-24 bg-white">
        <ReviewSection />
      </section>
    </div>
  );
};

export default HomeModule;
