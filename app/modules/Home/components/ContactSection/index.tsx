import Image from 'next/image';
import Reveal from '../../../../components/Reveal';

const contactChannels = [
  {
    id: 'line',
    name: 'LINE',
    description: 'แชทสอบถามได้ตลอด 24 ชม.',
    icon: '/icon/line.png',
    url: 'https://line.me/R/ti/p/@934bnkrg',
    color: 'bg-[#06C755]',
    hoverColor: 'hover:bg-[#05b34d]',
    glow: 'hover:shadow-[#06C755]/40',
  },
  {
    id: 'shopee',
    name: 'Shopee',
    description: 'สั่งซื้อผ่าน Shopee',
    icon: '/icon/shopee.png',
    url: 'https://shopee.co.th/jtl.hydraulic?categoryId=100636&entryPoint=ShopByPDP&itemId=20076526020',
    color: 'bg-[#EE4D2D]',
    hoverColor: 'hover:bg-[#d94429]',
    glow: 'hover:shadow-[#EE4D2D]/40',
  },
  {
    id: 'lazada',
    name: 'Lazada',
    description: 'สั่งซื้อผ่าน Lazada',
    icon: '/icon/lazada.png',
    url: 'https://www.lazada.co.th/shop/jtl-hydraulic/?spm=a2o4m.pdp_revamp.seller.1.2942231b1gJMcb&itemId=4466996119&channelSource=pdp',
    color: 'bg-[#0F146D]',
    hoverColor: 'hover:bg-[#0d1260]',
    glow: 'hover:shadow-[#0F146D]/40',
  },
];

const ContactSection = () => {
  return (
    <div className="container flex flex-col gap-10 mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-16 md:py-24">
      {/* Header */}
      <Reveal className="flex flex-col items-center space-y-3 text-center">
        <span className="font-mono inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-secondary">
          <span className="h-px w-8 bg-secondary" />
          Contact
          <span className="h-px w-8 bg-secondary" />
        </span>
        <h2 className="text-3xl font-bold text-gray-900 lg:text-5xl">
          ช่องทางติดต่อสอบถามและสั่งซื้อ
        </h2>
        <p className="mx-auto max-w-md text-gray-500">
          เลือกช่องทางที่สะดวกสำหรับคุณ หรือโทรหาเราได้โดยตรง
        </p>
        <a
          href="tel:0982846992"
          className="shimmer-sweep group inline-flex items-center gap-2 bg-gradient-to-r from-primary to-primary-light text-white px-7 py-3.5 rounded-full font-semibold text-lg shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 animate-pulse-ring">
            <Image src="/icon/phone.png" alt="phone" width={18} height={18} />
          </span>
          098-284-6992
        </a>
      </Reveal>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactChannels.map((channel, i) => (
          <Reveal key={channel.id} delay={i * 120}>
            <a
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`
                ${channel.color} ${channel.hoverColor} ${channel.glow}
                shimmer-sweep group relative block overflow-hidden
                p-6 rounded-3xl text-white transition-all duration-300
                transform hover:-translate-y-2 hover:shadow-2xl shadow-lg
                flex flex-col items-center text-center gap-4
              `}
            >
              {/* subtle texture */}
              <span className="pointer-events-none absolute inset-0 bg-grid opacity-20" />

              {/* Icon */}
              <div className="relative w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center ring-1 ring-white/30 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                <Image src={channel.icon} alt={channel.name} width={40} height={40} />
              </div>

              {/* Text */}
              <div className="relative">
                <h3 className="text-xl font-bold mb-1">{channel.name}</h3>
                <p className="text-white/80 text-sm">{channel.description}</p>
              </div>

              <span className="relative mt-1 inline-flex items-center gap-1 text-sm font-semibold text-white/90 opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                เปิดดูเลย
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
