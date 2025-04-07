'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <header className="fixed top-0 w-full py-6 z-50">
      <div className="container mx-auto px-6">
        <nav className="flex items-center justify-end">
          <ul className="flex items-center space-x-12">
            <li>
              <Link href="#about" className="text-sm text-gray-500 hover:text-black transition-colors">
                ABOUT
              </Link>
            </li>
            <li>
              <Link href="#works" className="text-sm text-gray-500 hover:text-black transition-colors">
                WORKS
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-sm text-gray-500 hover:text-black transition-colors">
                CONTACT
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
} 