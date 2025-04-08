'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="fixed w-full z-50 bg-black shadow-md">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            <a 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                scrollToTop();
              }}
              className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors"
            >
              <Image
                src="/favicon.ico"
                alt="SeongPhil Logo"
                width={24}
                height={24}
                className="rounded-sm"
              />
              <span className="text-xl font-medium">SeongPhil</span>
            </a>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#about" className="text-gray-300 hover:text-white transition-colors">About</a>
              <a href="#works" className="text-gray-300 hover:text-white transition-colors">Works</a>
              <a href="#contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
            </div>
            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-black">
            <a href="#about" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">About</a>
            <a href="#works" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Works</a>
            <a href="#contact" className="block px-3 py-2 text-gray-300 hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </nav>
      
      {/* Hero Section */}
      <section className="h-screen flex items-center bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <p className="text-blue-600 font-medium mb-4">풀스택 개발자</p>
            <h1 className="text-5xl font-light mb-6">
              안녕하세요,<br />
              <span className="font-normal">창의적인 웹 경험을 만드는<br/>개발자입니다</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              사용자 중심의 인터페이스와 깨끗한 코드로<br/>
              최적의 디지털 경험을 구현합니다
            </p>
            <div className="flex gap-4">
              <a href="#works" className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                프로젝트 보기
              </a>
              <a href="#contact" className="px-6 py-3 border border-gray-200 rounded-lg hover:border-gray-400 transition-colors">
                연락하기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-light mb-4">About</h2>
            <div className="h-px w-12 bg-blue-600 mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6 text-gray-600">
                <p className="text-lg">
                  안녕하세요, 풀스택 개발자 <span className="font-bold">서성필</span> 입니다. 
                  <br></br>가독성이 높고 효율적인 코드를 추구합니다.
                </p>
                <p className="text-lg">
                  새로운 기술을 배우는 것을 좋아하며, 문제 해결에 열정을 가지고 있습니다.
                </p>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">기술 스택</h3>
                  <div className="flex flex-wrap gap-2">
                    {['MySQL', 'Java', 'JavaScript', 'CSS', 'HTML', 'Node.js'].map((tech) => (
                      <span key={tech} className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-32 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light mb-4">Selected Works</h2>
          <div className="h-px w-12 bg-blue-600 mb-12"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="group cursor-pointer">
              <div className="aspect-video bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="w-full h-full bg-gray-100 group-hover:scale-105 transition-transform duration-300"></div>
              </div>
              <h3 className="text-xl mb-2 group-hover:text-blue-600 transition-colors">프로젝트 이름</h3>
              <p className="text-gray-600 mb-4">프로젝트에 대한 간단한 설명이 들어갑니다.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Next.js</span>
              </div>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-video bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
                <div className="w-full h-full bg-gray-100 group-hover:scale-105 transition-transform duration-300"></div>
              </div>
              <h3 className="text-xl mb-2 group-hover:text-blue-600 transition-colors">프로젝트 이름</h3>
              <p className="text-gray-600 mb-4">프로젝트에 대한 간단한 설명이 들어갑니다.</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light mb-4">Contact</h2>
            <div className="h-px w-12 bg-blue-600 mb-12"></div>
            <div className="space-y-6">
              <p className="text-xl text-gray-600">
                새로운 프로젝트나 협업 기회에 대해 이야기하고 싶으시다면 연락주세요.
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:your.email@example.com" 
                  className="inline-block text-lg hover:text-blue-600 transition-colors"
                >
                  your.email@example.com
                </a>
                <div className="flex gap-4">
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    GitHub
                  </a>
                  <a href="#" className="text-gray-600 hover:text-blue-600 transition-colors">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
