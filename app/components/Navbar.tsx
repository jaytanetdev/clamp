'use client';

import { useCallback } from 'react';
import Image from 'next/image';

const navItems = [
  { id: 'home', label: 'หน้าแรก' },
  { id: 'products', label: 'สินค้า' },
  { id: 'contact', label: 'ติดต่อ' },
  { id: 'review', label: 'รีวิว' },
];

const Navbar = () => {
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
    <nav className="fixed top-0 left-0 right-0 px-4 sm:px-8 md:px-12 lg:px-16 py-4 z-50  container mx-auto">
      <div className="bg-white rounded-lg shadow-md flex justify-between items-center px-3 py-1">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => scrollToSection('home')}
        >
          <Image src="/logo/logo.webp" alt="logo" width={50} height={50} />
          <h2 className="text-primary font-semibold lg:text-xl text-sm">JTL Hydraulic</h2>
        </div>

        {/* Nav Items */}
        <div className="flex gap-3 lg:gap-6 pr-4">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-gray-600 hover:text-primary transition-colors lg:text-base text-sm font-semibold cursor-pointer "
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
