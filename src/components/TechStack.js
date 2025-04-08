'use client';

import { motion } from 'framer-motion';
import { techIcons } from '@/utils/techIcons';

export default function TechStack() {
  const techList = Object.entries(techIcons);

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-white">기술 스택</h2>
      <div className="h-px w-12 bg-white"></div>
      <div className="grid grid-cols-3 md:grid-cols-5 gap-8 justify-items-center pt-6">
        {techList.map(([name, src], index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="w-16 h-16 relative hover:scale-110 transition-transform"
          >
            <img
              src={src}
              alt={name}
              className="w-full h-full"
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 