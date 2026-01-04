import ContactSection from './components/ContactSection';
import HeaderSection from './components/HeaderSection';
import ProductSection from './components/ProductSection';
import ReviewSection from './components/ReviewSection';

const HomeModule = () => {
  return (
    <div className="flex flex-col gap-10">
      {/* Home Section */}
      <section id="home" className="bg-primary">
        <HeaderSection />
      </section>

      {/* Products Section */}
      <section id="products" className="scroll-mt-24">
        <ProductSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="scroll-mt-24">
        <ContactSection />
      </section>

      <section id="review" className="scroll-mt-24">
        <ReviewSection />
      </section>
    </div>
  );
};

export default HomeModule;
