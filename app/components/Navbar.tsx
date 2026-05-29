'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';

const navItems = [
  { id: 'home', label: 'หน้าแรก' },
  { id: 'products', label: 'สินค้า' },
  { id: 'contact', label: 'ติดต่อ' },
  { id: 'review', label: 'รีวิว' },
  { id: 'faq', label: 'FAQ' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('home');

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, []);

  // Shrink / add depth on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 md:px-10 lg:px-16 pt-3 sm:pt-4">
      <div className="container mx-auto">
        <div
          className={`flex justify-between items-center rounded-2xl px-3 sm:px-4 transition-all duration-500 ${
            scrolled
              ? 'glass shadow-lg shadow-primary/10 py-1.5 ring-1 ring-primary/10'
              : 'bg-white/95 shadow-md py-2'
          }`}
        >
          {/* Logo */}
          <button
            type="button"
            className="group flex items-center gap-2 cursor-pointer"
            onClick={() => scrollToSection('home')}
          >
            <span className="relative inline-flex">
              <span className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Image
                src="/logo/logo.webp"
                alt="JTL Hydraulic โลโก้ - แคลมป์ท่อไฮดรอลิก"
                width={46}
                height={46}
                className="relative transition-transform duration-500 group-hover:rotate-[8deg] group-hover:scale-105"
              />
            </span>
            <span className="flex flex-col leading-none text-left">
              <span className="text-primary font-bold lg:text-xl text-sm tracking-tight">
                JTL Hydraulic
              </span>
              <span className="hidden sm:block text-[10px] font-medium text-primary/50 tracking-[0.2em] uppercase">
                Industrial Clamps
              </span>
            </span>
          </button>

          {/* Nav Items */}
          <div className="flex gap-1 sm:gap-2 lg:gap-3">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`relative px-2.5 sm:px-4 py-2 rounded-xl lg:text-base text-sm font-semibold cursor-pointer transition-colors duration-300 ${
                    isActive ? 'text-primary' : 'text-gray-500 hover:text-primary'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  <span
                    className={`absolute left-1/2 -translate-x-1/2 bottom-1 h-0.5 rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-300 ${
                      isActive ? 'w-5 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                  <span
                    className={`absolute inset-0 rounded-xl bg-primary/5 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
