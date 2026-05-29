'use client';

import Image from 'next/image';
import ButtonCommon from '../../../../components/Button/ButtonCommon';
import CountUp from '../../../../components/CountUp';
import { useCallback } from 'react';

const stats = [
  { value: 100, suffix: '+', label: 'รีวิวจากลูกค้า', code: 'REVIEWS' },
  { value: 3, suffix: '+', label: 'ปีประสบการณ์', code: 'YEARS' },
  { value: 100, suffix: '%', label: 'รับประกันคุณภาพ', code: 'QUALITY' },
];

const marquee = [
  'รองรับแรงดันสูง',
  'Ø6 – 168 mm',
  'พลาสติก / อลูมิเนียม',
  'มาตรฐานอุตสาหกรรม',
  '1 รู / 2 รู',
  'ส่งไว ทันใจ',
  'ฐานปกติ · ตีนเป็ด · เพลทยาว',
];

const HeaderSection = () => {
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-dark">
      {/* Blueprint + ambient layers */}
      <div className="pointer-events-none absolute inset-0 bg-blueprint-dark opacity-70" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(245,179,1,0.08)_40deg,transparent_120deg,rgba(42,122,92,0.12)_220deg,transparent_320deg)] animate-spotlight" />
      <div className="pointer-events-none absolute -top-32 -left-24 h-[30rem] w-[30rem] rounded-full bg-primary-light/30 blur-3xl animate-blob" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[28rem] w-[28rem] rounded-full bg-accent/15 blur-3xl animate-blob animation-delay-500" />

      <div className="relative z-10 container mx-auto flex flex-1 flex-col items-center gap-10 px-4 pb-10 pt-28 sm:px-8 md:px-12 lg:flex-row lg:gap-8 lg:px-16 lg:pt-32">
        {/* Left Content */}
        <div className="w-full text-center text-white lg:w-[55%] lg:text-left">
          {/* mono spec eyebrow */}
          <div
            className="font-mono inline-flex animate-fade-up items-center gap-2.5 rounded-md border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] tracking-widest text-accent sm:text-xs"
            style={{ animationDelay: '0.05s' }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            MODEL · JTL-HYD / Ø6–168mm
          </div>

          <h1
            className="mt-5 animate-fade-up text-[2.6rem] font-bold leading-[1.04] sm:text-6xl md:text-7xl lg:text-[5.2rem]"
            style={{ animationDelay: '0.15s' }}
          >
            <span className="block">แคล้มรัดท่อ</span>
            <span className="block">ไฮดรอลิก</span>
            <span className="mt-2 block text-gradient-gold drop-shadow">สินค้าดีมีคุณภาพ</span>
          </h1>

          <p
            className="mx-auto mt-6 max-w-xl animate-fade-up text-base leading-relaxed text-white/75 sm:text-lg lg:mx-0 lg:text-xl"
            style={{ animationDelay: '0.25s' }}
          >
            ทนทาน แข็งแรง รองรับแรงดันสูง — ออกแบบมาเพื่องานอุตสาหกรรมทุกประเภท
          </p>

          {/* Stats — spec readout style */}
          <div
            className="mx-auto mt-8 grid max-w-lg animate-fade-up grid-cols-3 divide-x divide-white/15 rounded-xl border border-white/10 bg-white/[0.04] lg:mx-0"
            style={{ animationDelay: '0.35s' }}
          >
            {stats.map((stat) => (
              <div key={stat.label} className="px-2 py-4 text-center">
                <div className="font-mono text-2xl font-bold text-gradient-gold sm:text-3xl lg:text-4xl">
                  <CountUp end={stat.value} suffix={stat.suffix} duration={2000} />
                </div>
                <div className="font-mono mt-1 text-[9px] tracking-widest text-accent/70 sm:text-[10px]">
                  {stat.code}
                </div>
                <div className="text-[11px] text-white/55 sm:text-xs">{stat.label}</div>
              </div>
            ))}
          </div>

          <div
            className="mt-8 flex animate-fade-up flex-col justify-center gap-3 sm:flex-row sm:gap-4 lg:justify-start"
            style={{ animationDelay: '0.45s' }}
          >
            <ButtonCommon
              className="sm:w-[220px]! shimmer-sweep shadow-lg shadow-secondary/30 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-secondary/40"
              onClick={() => scrollToSection('products')}
              variant="secondary"
              size="md"
            >
              เริ่มเลือกสเปกสินค้า →
            </ButtonCommon>
            <ButtonCommon
              className="sm:w-[160px]! backdrop-blur-sm hover:-translate-y-0.5"
              variant="outline-white"
              onClick={() => scrollToSection('contact')}
              size="md"
            >
              ติดต่อเรา
            </ButtonCommon>
          </div>
        </div>

        {/* Right Image — technical frame */}
        <div className="flex w-full items-center justify-center lg:w-[45%]">
          <div className="relative animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <div className="absolute -inset-8 rounded-[2.5rem] bg-gradient-to-tr from-accent/30 via-emerald-300/15 to-transparent blur-2xl" />

            {/* measurement labels */}
            <span className="font-mono absolute -left-3 top-1/2 hidden -translate-y-1/2 -rotate-90 text-[10px] tracking-widest text-white/40 lg:block">
              HEAVY DUTY
            </span>
            <span className="font-mono absolute -top-6 left-1/2 hidden -translate-x-1/2 text-[10px] tracking-widest text-white/40 lg:block">
              ◄ — — — Ø — — — ►
            </span>

            <div className="bp-corners relative animate-float-slow text-accent">
              <div className="glass bg-white/10! relative overflow-hidden rounded-2xl border border-white/25 p-2 shadow-2xl sm:rounded-3xl sm:p-4">
                {/* scan line */}
                <span className="pointer-events-none absolute left-0 right-0 top-0 z-10 h-px animate-scan bg-gradient-to-r from-transparent via-accent to-transparent" />
                <Image
                  src="/product/banner-1.png"
                  alt="Hydraulic Clamps"
                  className="relative rounded-xl sm:rounded-2xl"
                  priority
                  width={550}
                  height={550}
                />
              </div>

              <div className="glass absolute -bottom-3 -left-3 flex items-center gap-2 rounded-xl px-3 py-2 text-gray-800 shadow-xl sm:-bottom-4 sm:-left-4 sm:px-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 ring-2 ring-green-200 sm:h-10 sm:w-10">
                  <span className="text-base font-bold text-primary sm:text-xl">✓</span>
                </div>
                <span className="text-xs font-bold sm:text-sm">คุณภาพผ่านมาตรฐาน</span>
              </div>

              <div className="font-mono absolute -right-3 -top-3 animate-float rounded-md bg-secondary px-3 py-1.5 text-[10px] font-bold text-white shadow-lg sm:-right-4 sm:-top-4 sm:text-xs">
                IN STOCK
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee trust strip */}
      <div className="relative z-10 overflow-hidden border-y border-white/10 bg-black/15 py-3">
        <div className="flex w-max animate-marquee whitespace-nowrap">
          {[...marquee, ...marquee].map((item, i) => (
            <span
              key={i}
              className="font-mono mx-6 inline-flex items-center gap-3 text-xs tracking-wide text-white/60 sm:text-sm"
            >
              <span className="text-accent">◆</span>
              {item}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeaderSection;
