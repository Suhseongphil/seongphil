'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from 'next/navigation';
import { techIcons } from '@/utils/techIcons';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// techIcons 객체에서 기술 스택 목록 추출
const techList = Object.keys(techIcons);

export default function AdminProjects() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    summary: '',
    description: '',
    image_url: '',
    tech_stack: [],
    start_date: '',
    end_date: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    // 페이지 로드 시 인증 상태 확인
    const checkAuth = () => {
      const isAuth = sessionStorage.getItem('isAdminAuthenticated') === 'true';
      setIsAuthenticated(isAuth);
      
      if (!isAuth) {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Tab 키 처리를 위한 함수 추가
  const handleDescriptionKeyDown = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.target.selectionStart;
      const end = e.target.selectionEnd;
      const value = e.target.value;
      
      // 탭 문자 삽입 (2칸 공백으로 구현)
      const newValue = value.substring(0, start) + '  ' + value.substring(end);
      
      setFormData(prev => ({
        ...prev,
        description: newValue
      }));

      // 커서 위치 조정
      setTimeout(() => {
        e.target.selectionStart = e.target.selectionEnd = start + 2;
      }, 0);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      // 이미지 미리보기 생성
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    try {
      setIsUploading(true);
      const fileExt = imageFile.name.split('.').pop();
      const fileName = `${uuidv4()}.${fileExt}`;
      const filePath = `project-images/${fileName}`;

      // 파일 크기 체크
      if (imageFile.size > 5 * 1024 * 1024) {
        throw new Error('이미지 크기는 5MB를 초과할 수 없습니다.');
      }

      // 파일 형식 체크
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
      if (!allowedTypes.includes(imageFile.type)) {
        throw new Error('지원되는 이미지 형식은 JPEG, PNG, GIF입니다.');
      }

      console.log('업로드 시작:', {
        fileName,
        fileSize: imageFile.size,
        fileType: imageFile.type
      });

      const { error: uploadError, data } = await supabase.storage
        .from('projects')
        .upload(filePath, imageFile);

      if (uploadError) {
        console.error('Supabase 업로드 에러:', uploadError);
        throw new Error(`이미지 업로드 실패: ${uploadError.message}`);
      }

      console.log('업로드 성공:', data);

      const { data: { publicUrl } } = supabase.storage
        .from('projects')
        .getPublicUrl(filePath);

      console.log('생성된 공개 URL:', publicUrl);

      return publicUrl;
    } catch (error) {
      console.error('이미지 업로드 중 상세 에러:', error);
      alert(error.message || '이미지 업로드 중 오류가 발생했습니다.');
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  const handleTechChange = (tech) => {
    setFormData(prev => {
      const newTechStack = prev.tech_stack.includes(tech)
        ? prev.tech_stack.filter(t => t !== tech)
        : [...prev.tech_stack, tech];
      
      return {
        ...prev,
        tech_stack: newTechStack
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsUploading(true);

      // 이미지 업로드 및 URL 받기
      let imageUrl = formData.image_url;
      if (imageFile) {
        try {
          imageUrl = await uploadImage();
          if (!imageUrl) {
            throw new Error('이미지 URL을 가져오는데 실패했습니다.');
          }
        } catch (uploadError) {
          console.error('이미지 업로드 에러:', uploadError);
          alert(uploadError.message || '이미지 업로드 중 오류가 발생했습니다.');
          return;
        }
      }

      console.log('프로젝트 데이터 저장 시작:', {
        ...formData,
        image_url: imageUrl
      });

      const { data, error } = await supabase
        .from('db_projects')
        .insert([
          {
            ...formData,
            image_url: imageUrl,
            start_date: new Date(formData.start_date + '-01').toISOString(),
            end_date: formData.end_date 
              ? new Date(formData.end_date + '-01').toISOString()
              : null
          }
        ]);

      if (error) {
        console.error('Supabase 데이터 저장 에러:', error);
        throw error;
      }

      console.log('프로젝트 저장 성공:', data);

      alert('프로젝트가 성공적으로 추가되었습니다!');
      // 폼 초기화
      setFormData({
        title: '',
        company: '',
        summary: '',
        description: '',
        image_url: '',
        tech_stack: [],
        start_date: '',
        end_date: ''
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (error) {
      console.error('Error:', error);
      alert('프로젝트 추가 중 오류가 발생했습니다.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAdminAuthenticated');
    router.push('/admin');
  };

  // 인증되지 않은 경우 로딩 상태를 표시
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-900 flex items-center justify-center">
        <div className="text-white">인증 확인 중...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white p-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">프로젝트 관리</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-zinc-800 text-white rounded hover:bg-zinc-700 transition-colors"
          >
            로그아웃
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2">프로젝트 제목</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2">회사명</label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            />
          </div>

          <div>
            <label className="block mb-2">간단 설명</label>
            <input
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2">상세 설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              onKeyDown={handleDescriptionKeyDown}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 h-32"
              required
            />
          </div>

          <div>
            <label className="block mb-2">이미지</label>
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              />
              {imagePreview && (
                <div className="mt-4">
                  <p className="mb-2">미리보기:</p>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-full h-auto max-h-48 rounded"
                  />
                </div>
              )}
              <p className="text-sm text-gray-400">또는 이미지 URL 직접 입력</p>
              <input
                type="url"
                name="image_url"
                value={formData.image_url}
                onChange={handleChange}
                className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
                placeholder="https://"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2">기술 스택</label>
            <div className="grid grid-cols-3 gap-4">
              {techList.map((tech) => (
                <label key={tech} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.tech_stack.includes(tech)}
                    onChange={() => handleTechChange(tech)}
                    className="form-checkbox h-5 w-5 text-blue-600 rounded bg-zinc-800 border-zinc-700"
                  />
                  <div className="flex items-center">
                    {techIcons[tech] && (
                      <img
                        src={techIcons[tech]}
                        alt={tech}
                        className="w-4 h-4 mr-2"
                      />
                    )}
                    <span>{tech}</span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block mb-2">시작일</label>
            <input
              type="month"
              name="start_date"
              value={formData.start_date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
              required
            />
          </div>

          <div>
            <label className="block mb-2">종료일 (진행 중인 경우 비워두세요)</label>
            <input
              type="month"
              name="end_date"
              value={formData.end_date}
              onChange={handleChange}
              className="w-full p-2 rounded bg-zinc-800 border border-zinc-700"
            />
          </div>

          <button
            type="submit"
            disabled={isUploading}
            className="w-full py-3 px-4 bg-white text-zinc-900 rounded hover:bg-gray-100 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isUploading ? '업로드 중...' : '프로젝트 추가'}
          </button>
        </form>
      </div>
    </div>
  );
} 