import Header from '@/components/Header';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="h-screen flex items-center">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-light mb-6">
              Hello, I'm a<br />
              <span className="font-normal">Frontend Developer</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              Crafting digital experiences with clean and functional design.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light mb-12">About</h2>
            <div className="space-y-6 text-gray-600">
              <p>
                안녕하세요, 프론트엔드 개발자입니다. 사용자 경험과 깨끗한 코드를 중요시합니다.
              </p>
              <p>
                새로운 기술을 배우는 것을 좋아하며, 문제 해결에 열정을 가지고 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Works Section */}
      <section id="works" className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-light mb-12">Selected Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Work items will go here */}
            <div className="group cursor-pointer">
              <div className="aspect-video bg-neutral-100 mb-4"></div>
              <h3 className="text-lg mb-2 group-hover:text-neutral-600 transition-colors">Project Name</h3>
              <p className="text-sm text-gray-500">Short project description</p>
            </div>
            <div className="group cursor-pointer">
              <div className="aspect-video bg-neutral-100 mb-4"></div>
              <h3 className="text-lg mb-2 group-hover:text-neutral-600 transition-colors">Project Name</h3>
              <p className="text-sm text-gray-500">Short project description</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-light mb-12">Contact</h2>
            <div className="space-y-4">
              <p className="text-gray-600">
                관심이 있으시다면 연락주세요.
              </p>
              <a 
                href="mailto:your.email@example.com" 
                className="inline-block text-lg hover:text-gray-600 transition-colors"
              >
                your.email@example.com
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
