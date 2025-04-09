'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import TechStack from '@/components/TechStack';
import ProjectModal from '@/components/ProjectModal';
import { createClient } from '@supabase/supabase-js';
import { techIcons } from '@/utils/techIcons';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
);

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchProjects();

    const handleScroll = () => {
      // 스크롤 위치에 따라 네비게이션 바 스타일 변경
      setIsScrolled(window.scrollY > 50);
      
      // 현재 보이는 섹션 확인
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

  const fetchProjects = async () => {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        console.error('Supabase credentials are not configured');
        setProjects([]);
        return;
      }

      const { data, error } = await supabase
        .from('db_projects')
        .select('*')
        .order('id', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setProjects([]);
    }
  };

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
        <div className="container mx-auto px-6 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-center"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-5xl mb-6 text-zinc-900"
            >
              {/* <span className="font-medium">게으르지만</span><br /> */}
              <span className="font-medium">풀스택 개발자 </span>
              <span className="font-bold">서성필</span>
              <span className="font-medium">입니다</span>
            </motion.h1>
            {/* <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-gray-600 mb-12 mt-2"
            >
              사용자 중심의 디자인과 혁신적인 기술로<br />
              멋진 웹 경험을 만들어내는 것을 좋아합니다.
            </motion.p> */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
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
              {projects.map((project, index) => (
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
