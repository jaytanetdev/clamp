'use client';

import Image from 'next/image';
import ButtonCommon from '../../../../components/Button/ButtonCommon';
import CountUp from '../../../../components/CountUp';
import { useCallback } from 'react';

const stats = [
  { value: 100, suffix: '+', label: 'รีวิวจากลูกค้า' },
  { value: 3, suffix: '+', label: 'ปีประสบการณ์' },
  { value: 100, suffix: '%', label: 'รับประกันคุณภาพ' },
];

const HeaderSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  return (
    <div className="container mx-auto flex flex-col lg:flex-row items-center px-4 sm:px-8 md:px-12 lg:px-16 py-8 md:py-12 lg:py-16 gap-8 lg:gap-4">
      {/* Left Content */}
      <div className="pt-30 w-full lg:w-1/2 text-white space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
        <div className="inline-flex items-center gap-2 bg-white/10 px-3 sm:px-4 py-2 rounded-full border border-white/20">
          <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs sm:text-sm font-medium">มาตรฐาน ส่งเร็ว ทันใจ</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold leading-tight">
          <span className="block">แคล้มรัดท่อไฮดรอลิก</span>
          <span className="block text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-orange-400">
            สินค้าดีมีคุณภาพ
          </span>
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-lg mx-auto lg:mx-0 leading-relaxed">
          <span className="block">ทนทาน แข็งแรง รองรับแรงดันสูง</span>
          <span className="block">เหมาะสำหรับงานอุตสาหกรรมทุกประเภท</span>
        </p>

        <div className="flex justify-center lg:justify-start gap-4 sm:gap-6 lg:gap-8 py-4">
          {stats.map((stat, index) => (
            <div key={stat.label} className="flex items-center gap-4 sm:gap-6 lg:gap-8">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <div className="text-xs sm:text-sm text-white/60">{stat.label}</div>
              </div>
              {index < stats.length - 1 && <div className="w-px h-10 sm:h-12 bg-white/20" />}
            </div>
          ))}
        </div>

        <div className="flex gap-3 sm:gap-4 pt-2 justify-center lg:justify-start">
          <ButtonCommon
            className="sm:w-[200px]!"
            onClick={() => scrollToSection('products')}
            variant="secondary"
            size="md"
          >
            ดูสินค้าทั้งหมด
          </ButtonCommon>
          <ButtonCommon
            className="sm:w-[150px]!"
            variant="outline-white"
            onClick={() => scrollToSection('contact')}
            size="md"
          >
            ติดต่อเรา
          </ButtonCommon>
        </div>
      </div>

      {/* Right Image */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="relative">
          <div className="bg-white/10 p-2 sm:p-4 rounded-2xl sm:rounded-3xl border border-white/20 shadow-2xl">
            <Image
              src="/product/banner-1.png"
              alt="Hydraulic Clamps"
              className="rounded-xl sm:rounded-2xl "
              priority
              width={550}
              height={550}
            />
          </div>

          <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 bg-white px-3 py-2 sm:px-4  rounded-lg sm:rounded-xl shadow-xl flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-base sm:text-xl">✓</span>
            </div>
            <span className="text-xs sm:text-sm font-bold text-gray-800">คุณภาพผ่านมาตรฐาน</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
