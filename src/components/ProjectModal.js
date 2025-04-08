'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { techIcons } from '@/utils/techIcons';

export default function ProjectModal({ isOpen, onClose, project }) {
  if (!isOpen || !project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-75"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="relative z-50 w-full max-w-4xl bg-zinc-800 rounded-lg overflow-hidden mx-4 max-h-[90vh] flex flex-col"
        >
          <div className="p-8 space-y-6 overflow-y-auto">
            <button
              onClick={onClose}
              className="fixed top-4 right-4 text-gray-400 hover:text-white bg-zinc-900 rounded-full p-2 z-50"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">{project.title}</h3>
              
              {project.company && (
                <div className="text-gray-300">
                  <span className="font-semibold">회사:</span> {project.company}
                </div>
              )}
              
              <div className="text-gray-300">
                <span className="font-semibold">기간:</span>{' '}
                {new Date(project.start_date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })}
                {' ~ '}
                {project.end_date 
                  ? new Date(project.end_date).toLocaleDateString('ko-KR', { year: 'numeric', month: 'long' })
                  : '진행중'}
              </div>

              <div className="space-y-4">
                <div className="font-semibold text-white">사용 기술</div>
                <div className="flex flex-wrap gap-3">
                  {project.tech_stack && project.tech_stack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-zinc-700 px-3 py-1 rounded"
                    >
                      {techIcons[tech] && (
                        <img
                          src={techIcons[tech]}
                          alt={tech}
                          className="w-4 h-4 mr-1"
                        />
                      )}
                      <span className="text-sm text-white">{tech}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="font-semibold text-white">프로젝트 설명</div>
                <div className="text-gray-300 whitespace-pre-line">
                  {project.description}
                </div>
              </div>

              {project.image_url && (
                <div className="space-y-4">
                  <div className="font-semibold text-white">프로젝트 이미지</div>
                  <div className="relative w-full h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-contain bg-zinc-900"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
} 