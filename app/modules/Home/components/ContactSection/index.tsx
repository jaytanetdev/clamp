import Image from 'next/image';

const contactChannels = [
  {
    id: 'line',
    name: 'LINE',
    description: 'แชทสอบถามได้ตลอด 24 ชม.',
    icon: '/icon/line.png',
    url: 'https://line.me/R/ti/p/@934bnkrg',
    color: 'bg-[#06C755]',
    hoverColor: 'hover:bg-[#05b34d]',
  },
  {
    id: 'shopee',
    name: 'Shopee',
    description: 'สั่งซื้อผ่าน Shopee',
    icon: '/icon/shopee.png',
    url: 'https://shopee.co.th/jtl.hydraulic?categoryId=100636&entryPoint=ShopByPDP&itemId=20076526020',
    color: 'bg-[#EE4D2D]',
    hoverColor: 'hover:bg-[#d94429]',
  },
  {
    id: 'lazada',
    name: 'Lazada',
    description: 'สั่งซื้อผ่าน Lazada',
    icon: '/icon/lazada.png',
    url: 'https://www.lazada.co.th/shop/jtl-hydraulic/?spm=a2o4m.pdp_revamp.seller.1.2942231b1gJMcb&itemId=4466996119&channelSource=pdp',
    color: 'bg-[#0F146D]',
    hoverColor: 'hover:bg-[#0d1260]',
  },
];

const ContactSection = () => {
  return (
    <div className="container flex flex-col gap-10 mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 md:py-16">
      {/* Header */}
      <div className="text-center space-y-4">
        <h2 className="lg:text-4xl text-2xl font-bold text-gray-800">
          ช่องทางติดต่อสอบถามและสั่งซื้อ
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          เลือกช่องทางที่สะดวกสำหรับคุณ หรือโทรหาเราได้โดยตรง
        </p>
        <a
          href="tel:0982846992"
          className="inline-flex items-center gap-2 bg-linear-to-r from-primary to-primary/80 text-white px-6 py-3 rounded-full font-semibold text-lg hover:shadow-lg hover:shadow-primary/30 transition-all duration-300 hover:scale-105"
        >
          <Image src="/icon/phone.png" alt="phone" width={20} height={20} />
          098-284-6992
        </a>
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 ">
        {contactChannels.map((channel) => (
          <a
            key={channel.id}
            href={channel.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`
              ${channel.color} ${channel.hoverColor}
              p-6 rounded-2xl text-white transition-all duration-300
              transform hover:scale-105 hover:shadow-xl
              flex flex-col items-center text-center gap-4
            `}
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Image src={channel.icon} alt={channel.name} width={40} height={40} />
            </div>

            {/* Text */}
            <div>
              <h3 className="text-xl font-bold mb-1">{channel.name}</h3>
              <p className="text-white/80 text-sm">{channel.description}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactSection;
