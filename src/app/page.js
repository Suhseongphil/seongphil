'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TechStack from '@/components/TechStack';
import ProjectModal from '@/components/ProjectModal';
import { techIcons } from '@/utils/techIcons';

// 프로젝트 데이터
const projectsData = [
  {
    id: 1,
    title: "사내시스템",
    company: "다운포스",
    summary: "사내시스템 쇼핑몰 통합 솔루션",
    description: "쇼핑몰의 판매, 배송, 재고관리, cs 처리 등 쇼핑몰 관리 통합 시스템입니다.\n쇼핑몰 통합 시스템 개발에 초기 멤버로 참여하였습니다.\n초기 화면구성과 DB 설계 등에 참여하였습니다.\n\n주요수행업무\n\n• 주문 수집 화면 개발 (하단 이미지 화면)\n\t- 쿠팡, 네이버, 카카오 등 기존에 상품을 판매하는 이커머스 업체의 api를 연결하여\n\t  들어온 주문 내역들을 한 번에 수집하여 DB에 적재하는 화면입니다.\n\t- 여러 개의 이커머스 api를 javascript의 Promise.allSettled 을 사용하여 동시에 호출하여 DB에 적재합니다.\n\t- 먼저 완료된 주문 순서대로 로그를 남기고 원하는 이커머스의 주문 내역들만 삭제 가능하게 만들었습니다.\n\n• 상품명, 재고 매칭\n\t- 수집된 주문 내역에 있는 상품과 사내에 보유한 재고와 매칭을 할 수 있는 기능입니다.\n\t- 이커머스에 등록된 상품과 사내에 보유한 제품의 이름이 달라서 수집된 api 데이터를 매칭 시켜주는 기능입니다.\n\t- 매칭은 초기에는 직접 수동으로 매칭하여야 하지만 한 번이라도 매칭 한 적 있는 상품은\n\t  자동 매칭을 통해 한 번에 매칭할 수 있습니다.\n\t- DB에 매칭 테이블을 만들어 매칭 정보를 저장했습니다.\n\n• 재고할당\n\t- 수집된 주문들의 재고가 있는지 확인하여 할당하는 기능입니다.\n\t- 기본적으로 선입선출로 할당되는데 보유 재고보다 주문 재고가 많을 경우\n\t  넘어가고 그다음 주문에 할당되게 개발했습니다.\n\t- SQL 문과 SQL window 함수를 사용하여 개발했습니다.\n\n• 메시지 관리\n\t- 알리고 문자 API 서비스를 연동하여 DB 설계부터 실제 문자발송할 수 있는 화면입니다.\n\t- 소비자가 주문을 완료하면 발송해 주는 문자, 카톡을 보내주는 기능으로\n\t  외부업체(알리고)의 api를 연결하여 만든 기능입니다.",
    tech_stack: ["Node.js", "MySQL", "CSS", "JavaScript", "HTML", "Express", "jQuery"],
    image_url: "/images/order_input_screenshot.png"
  },
  {
    id: 2,
    title: "위탁판매 중개 사이트",
    company: "위셀글로벌",
    summary: "위탁판매 중개사이트 개발 및 유지보수",
    description: "위탁판매 중개 사이트로 사용자 화면과 관리자 화면으로 구성되어 있습니다\n위탁판매 중개 사이트의 개발팀으로 중도 합류하였습니다.\n\n주요수행업무\n\n• 쿠폰 관리 화면\n\t- 관리자 화면은 쿠폰을 발행하고 관리하는 화면을 개발했습니다.\n\t- 관리자가 쿠폰을 생성하면 쿠폰 정보를 DB에 저장하고 지정한 사용자에게 지급하는 방식입니다.\n\t- 사용자 화면은 보유한 쿠폰 목록을 보여주는 화면을 개발했습니다.\n\n• 세금계산서 화면\n\t- 사용자가 본인에게 발행된 세금계산서를 보여주는 화면을 개발했습니다.\n\t- 사용자의 판매 데이터를 바탕으로 자동으로 세금 계산식을 적용하여 보여주는 화면입니다.\n\t- 세금계산서 양식을 첨부하여 PDF 파일로 저장할 수 있게 개발했습니다.",
    tech_stack: ["HTML", "CSS", "JavaScript", "Java", "MySQL", "Spring", "jQuery"]
  }
];

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'works', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop,
        behavior: 'smooth'
      });
    }
  };

  const navItems = [
    { id: 'about', label: 'About' },
    { id: 'career', label: '경력' },
    { id: 'works', label: '프로젝트' },
    { id: 'education', label: '학력' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <main className="min-h-screen bg-zinc-900 text-white font-medium">
      {/* Hero Section */}
      <section id="home" className="h-screen flex items-center justify-center bg-neutral-200">
        <div className="container mx-auto px-6 flex flex-col items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-80 h-80 bg-cover bg-center rounded-full mb-8"
            style={{ backgroundImage: "url('/images/hero-circle.png')" }}
          ></motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="max-w-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center space-x-4 mb-12"
            >
              <Image
                src="/favicon.ico"
                alt="SeongPhil Logo"
                width={64}
                height={64}
                className="rounded-sm"
              />
              <span className="text-4xl font-extrabold text-zinc-900">SeongPhil</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="text-5xl mb-6 text-zinc-900"
            >
              <span className="font-medium">풀스택 개발자 </span>
              <span className="font-bold">서성필</span>
              <span className="font-medium">입니다</span>
            </motion.h1>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0 }}
              className="flex justify-center gap-4 mt-12"
            >
              <a 
                href="#works" 
                onClick={(e) => { e.preventDefault(); scrollToSection('works'); }} 
                className="px-8 py-3 bg-zinc-900 text-white rounded-lg hover:bg-black transition-colors"
              >
                프로젝트 보기
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-zinc-800">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Introduction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold text-white">소개</h2>
              <div className="h-px w-12 bg-white"></div>
              <div className="space-y-6 text-gray-300">
                <p className="text-lg">
                  안녕하세요, 풀스택 개발자 <span className="font-black text-white">서성필</span> 입니다. 사용자 경험과 깨끗한 코드를 중요시합니다.
                </p>
                <p className="text-lg">
                  새로운 기술을 배우는 것을 좋아하며, 문제 해결을 위한 창의적인 접근 방식을 추구합니다.
                </p>
              </div>
            </motion.div>

            {/* Tech Stack */}
            <TechStack />
          </div>
        </div>
      </section>

      {/* Career Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        id="career"
        className="py-32 bg-zinc-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">경력</h2>
            <div className="h-px w-12 bg-white mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 첫 번째 경력 카드 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="min-h-[400px] bg-zinc-800 rounded-lg mb-6 overflow-hidden border border-zinc-700 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">(주) 다운포스</h3>
                      <p className="text-gray-400">웹 개발</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white mb-2">담당 업무</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-400">
                          <li>Node.js 기반 웹 서비스 개발</li>
                          <li>데이터베이스 설계 및 관리</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-4">
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Express", "MySQL", "jQuery", "JavaScript", "CSS", "HTML"].map((tech, i) => (
                        <div key={i} className="flex items-center bg-zinc-900 px-3 py-1 rounded">
                          {techIcons[tech] && (
                            <img
                              src={techIcons[tech]}
                              alt={tech}
                              className="w-4 h-4 mr-1"
                            />
                          )}
                          <span className="text-sm text-gray-300">{tech}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-xl font-light text-gray-400">2023.06 - 2024.06</span>
                      <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-gray-300 whitespace-nowrap max-w-max flex-shrink-0">1년 1개월</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 두 번째 경력 카드 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="min-h-[400px] bg-zinc-800 rounded-lg mb-6 overflow-hidden border border-zinc-700 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">(주) 위셀글로벌</h3>
                      <p className="text-gray-400">웹 개발</p>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-white mb-2">담당 업무</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-400">
                          <li>Java 기반 웹 서비스 개발 및 유지보수</li>
                          <li>데이터베이스 관리</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 mt-4">
                    <div className="flex flex-wrap gap-2">
                      {["Java", "Spring", "MySQL", "jQuery", "JavaScript", "CSS", "HTML"].map((tech, i) => (
                        <div key={i} className="flex items-center bg-zinc-900 px-3 py-1 rounded">
                          {techIcons[tech] && (
                            <img
                              src={techIcons[tech]}
                              alt={tech}
                              className="w-4 h-4 mr-1"
                            />
                          )}
                          <span className="text-sm text-gray-300">{tech}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-xl font-light text-gray-400">2023.03 - 2023.05</span>
                      <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-gray-300 whitespace-nowrap max-w-max flex-shrink-0">3개월</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Works Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        id="works"
        className="py-32 bg-zinc-800"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5 }}
            className="max-w-[1400px]"
          >
            <h2 className="text-3xl font-bold text-white mb-2">프로젝트</h2>
            <div className="h-px w-12 bg-white mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {projectsData.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow p-6"
                >
                  <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech_stack.map((tech, i) => (
                      <div key={i} className="flex items-center bg-zinc-800 px-3 py-1 rounded">
                        {techIcons[tech] && (
                          <img
                            src={techIcons[tech]}
                            alt={tech}
                            className="w-4 h-4 mr-1"
                          />
                        )}
                        <span className="text-sm">{tech}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setIsModalOpen(true);
                    }}
                    className="px-4 py-2 bg-white text-zinc-900 rounded hover:bg-gray-100 transition-colors flex items-center gap-2"
                  >
                    자세히 보기
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        id="education"
        className="py-32 bg-zinc-900"
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-white">학력</h2>
            <div className="h-px w-12 bg-white mb-12"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* 대학교 카드 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="min-h-[400px] bg-zinc-800 rounded-lg mb-6 overflow-hidden border border-zinc-700 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">유한대학교 <span className="text-lg font-normal text-gray-400">(전문학사)</span></h3>
                      <div className="space-y-2">
                        <div>
                          <p className="text-gray-400">1학년: 임베디드응용전공학과</p>
                          <div className="flex items-center gap-2 mt-1 ml-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                            <span className="text-sm text-gray-500">학과 통폐합으로 인한 전과</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-gray-400">2학년: 전자공학과</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <span className="inline-block px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-gray-300 whitespace-nowrap max-w-max flex-shrink-0">
                        학점: 3.56/4.5
                      </span>
                    </div>
                  </div>
                  <div className="space-y-4 mt-4">
                    <div className="flex flex-wrap gap-2">
                      {["C++", "Java"].map((tech, i) => (
                        <div key={i} className="flex items-center bg-zinc-900 px-3 py-1 rounded">
                          {techIcons[tech] && (
                            <img
                              src={techIcons[tech]}
                              alt={tech}
                              className="w-4 h-4 mr-1"
                            />
                          )}
                          <span className="text-sm text-gray-300">{tech}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-xl font-light text-gray-400">2017.02 - 2021.02</span>
                      <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-gray-300 whitespace-nowrap max-w-max flex-shrink-0">졸업</span>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* 교육기관 카드 */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="min-h-[400px] bg-zinc-800 rounded-lg mb-6 overflow-hidden border border-zinc-700 p-8 flex flex-col justify-between">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">인천일보아카데미</h3>
                      <p className="text-gray-400">JAVA 웹개발자 양성과정</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-gray-400">
                        <span className="text-white">프로젝트:</span> 커피 원두 판매 쇼핑몰
                      </p>
                      <p className="text-gray-400">
                        <span className="text-white">수행 역할:</span> 팀장으로써 팀원들에게 적절한 개발분량 분배 및 전체적인 프로젝트 설계
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-4">
                    <div className="flex flex-wrap gap-2">
                      {["Node.js", "Express", "MySQL", "jQuery", "JavaScript", "CSS", "HTML"].map((tech, i) => (
                        <div key={i} className="flex items-center bg-zinc-900 px-3 py-1 rounded">
                          {techIcons[tech] && (
                            <img
                              src={techIcons[tech]}
                              alt={tech}
                              className="w-4 h-4 mr-1"
                            />
                          )}
                          <span className="text-sm text-gray-300">{tech}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                      <span className="text-xl font-light text-gray-400">2022.03 - 2022.09</span>
                      <span className="px-3 py-1 bg-zinc-900 border border-zinc-700 rounded-full text-sm text-gray-300 whitespace-nowrap max-w-max flex-shrink-0">수료</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.7 }}
        id="contact"
        className="py-32 bg-neutral-200"
      >
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl font-bold mb-4 text-zinc-900">Thank you</h2>
            <div className="h-px w-12 bg-zinc-900 mb-12"></div>
            <div className="space-y-6">
              <p className="text-xl text-zinc-900">
                방문해주셔서 감사합니다.
              </p>
              <div className="space-y-4">
                <a 
                  href="mailto:karlly980404@gmail.com" 
                  className="inline-block text-lg text-zinc-900 hover:text-zinc-600 transition-colors"
                >
                  karlly980404@gmail.com
                </a>
                <div className="flex gap-4">
                  <a href="https://github.com/Suhseongphil" className="text-zinc-900 hover:text-zinc-900 transition-colors">
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="py-6 bg-neutral-200">
        <div className="container mx-auto px-6">
          <div className="flex flex-col items-center justify-center space-y-2 text-sm text-zinc-600">
            <p>© 2025 서성필. All rights reserved.</p>
            <p>Icons by <a href="https://devicon.dev" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900">Devicon</a> (MIT License)</p>
          </div>
        </div>
      </footer>

      {/* Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
      />
    </main>
  );
}
