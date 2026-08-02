import React, { useState, useEffect, useRef } from 'react';
import { 
  personalInfo, 
  services, 
  marqueeImagesRow1, 
  marqueeImagesRow2, 
  decorativeIcons, 
  completedProjects 
} from './portfolioData.js';

// --- REUSABLE COMPONENTS ---

// 1. ContactButton Component
export function ContactButton({ label = "Contact Me", onClick }) {
  return (
    <button
      onClick={onClick || (() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = `mailto:${personalInfo.contactEmail}`;
        }
      })}
      className="relative group overflow-hidden rounded-full font-medium uppercase tracking-widest text-white transition-all duration-300 transform hover:scale-105 active:scale-95 px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer"
      style={{
        background: 'linear-gradient(123deg, #18011F 7%, #B600A8 37%, #7621B0 72%, #BE4C00 100%)',
        boxShadow: '0px 4px 4px rgba(181, 1, 167, 0.25), inset 4px 4px 12px #7721B1',
        outline: '2px solid white',
        outlineOffset: '-3px'
      }}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {label}
      </span>
      <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
    </button>
  );
}

// 2. LiveProjectButton Component
export function LiveProjectButton({ label = "Live Project", href = "#" }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center rounded-full border-2 border-[#D7E2EA] text-[#D7E2EA] font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 text-sm sm:text-base hover:bg-[#D7E2EA]/10 transition-colors duration-200"
    >
      {label}
    </a>
  );
}

// 3. FadeIn Component
export function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "50px", threshold: 0 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0px, 0px)' : `translate(${x}px, ${y}px)`,
        transition: `opacity ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s, transform ${duration}s cubic-bezier(0.25, 0.1, 0.25, 1) ${delay}s`
      }}
    >
      {children}
    </div>
  );
}

// 4. Magnet Component (Mouse-following magnetic hover effect)
export function Magnet({ children, padding = 150, strength = 3, activeTransition = "transform 0.3s ease-out", inactiveTransition = "transform 0.6s ease-in-out", className = "" }) {
  const elementRef = useRef(null);
  const [transform, setTransform] = useState("translate3d(0px, 0px, 0px)");
  const [transition, setTransition] = useState(inactiveTransition);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!elementRef.current) return;
      const rect = elementRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const isNearby = 
        mouseX >= rect.left - padding &&
        mouseX <= rect.right + padding &&
        mouseY >= rect.top - padding &&
        mouseY <= rect.bottom + padding;

      if (isNearby) {
        const deltaX = (mouseX - centerX) / strength;
        const deltaY = (mouseY - centerY) / strength;
        setTransition(activeTransition);
        setTransform(`translate3d(${deltaX}px, ${deltaY}px, 0px)`);
      } else {
        setTransition(inactiveTransition);
        setTransform("translate3d(0px, 0px, 0px)");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [padding, strength, activeTransition, inactiveTransition]);

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        transform,
        transition,
        willChange: 'transform'
      }}
    >
      {children}
    </div>
  );
}

// 5. AnimatedText Component (Character-by-character scroll reveal)
export function AnimatedText({ text, className = "" }) {
  const containerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const startTrigger = windowHeight * 0.8;
      const endTrigger = windowHeight * 0.2;
      
      const current = rect.top;
      let progress = (startTrigger - current) / (startTrigger - endTrigger);
      progress = Math.min(Math.max(progress, 0), 1);
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const characters = text.split("");

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, index) => {
        const charProgress = index / characters.length;
        const opacity = scrollProgress >= charProgress ? 1 : Math.max(0.2, (scrollProgress - charProgress + 0.1) * 8);
        return (
          <span
            key={index}
            style={{
              opacity,
              transition: 'opacity 0.1s ease-out',
              display: char === ' ' ? 'inline' : 'inline-block'
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        );
      })}
    </p>
  );
}

// 6. ServiceDetailModal Component (Popup for Service details)
export function ServiceDetailModal({ service, onClose }) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md transition-all duration-300">
      <div className="bg-[#0C0C0C] border border-[#D7E2EA]/30 text-[#D7E2EA] rounded-[30px] p-6 sm:p-10 max-w-2xl w-full relative shadow-2xl overflow-hidden animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-[#D7E2EA]/60 hover:text-white text-2xl font-bold w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:border-white transition-colors"
        >
          &times;
        </button>

        {/* Modal Header */}
        <div className="flex items-baseline gap-4 mb-4">
          <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1 }}>
            {service.number}
          </span>
          <h3 className="font-medium uppercase text-xl sm:text-2xl md:text-3xl text-white">
            {service.name}
          </h3>
        </div>

        {/* Short Description */}
        <p className="text-[#D7E2EA]/80 font-light leading-relaxed mb-6 text-sm sm:text-base border-b border-white/10 pb-4">
          {service.shortDescription}
        </p>

        {/* Features Checklist */}
        <div className="mb-8">
          <h4 className="font-medium uppercase tracking-widest text-xs text-[#D7E2EA]/60 mb-3">Included Capabilities & Features:</h4>
          <ul className="space-y-2">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 text-sm sm:text-base font-light text-[#D7E2EA]">
                <span className="w-2 h-2 rounded-full bg-[#B600A8] inline-block shrink-0"></span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Action Button */}
        <div className="flex justify-end">
          <ContactButton label="Inquire Service" onClick={() => {
            onClose();
            const contactSection = document.getElementById('contact');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }} />
        </div>
      </div>
    </div>
  );
}

// --- MAIN SECTIONS ---

// SECTION 1: HERO SECTION
function HeroSection() {
  return (
    <section className="relative h-screen w-full flex flex-col justify-between overflow-x-clip px-6 md:px-10 bg-[#0C0C0C]">
      {/* Navbar */}
      <FadeIn delay={0} y={-20} className="w-full">
        <nav className="flex justify-between items-center w-full pt-6 md:pt-8 text-[#D7E2EA] font-medium uppercase tracking-wider text-sm md:text-lg lg:text-[1.4rem]">
          <a href="#about" className="hover:opacity-70 transition-opacity duration-200">About</a>
          <a href="#services" className="hover:opacity-70 transition-opacity duration-200">Price</a>
          <a href="#projects" className="hover:opacity-70 transition-opacity duration-200">Projects</a>
          <a href="#contact" className="hover:opacity-70 transition-opacity duration-200">Contact</a>
        </nav>
      </FadeIn>

      {/* Hero Portrait (Centered Absolutely) */}
      <FadeIn delay={0.6} y={30} className="absolute left-1/2 -translate-x-1/2 z-10 top-1/2 -translate-y-1/2 sm:top-auto sm:translate-y-0 sm:bottom-0 pointer-events-auto">
        <Magnet padding={150} strength={3} activeTransition="transform 0.3s ease-out" inactiveTransition="transform 0.6s ease-in-out">
          <img
            src={personalInfo.heroPortrait}
            alt={`${personalInfo.name} Portrait`}
            className="w-[260px] sm:w-[340px] md:w-[420px] lg:w-[480px] h-auto object-contain drop-shadow-2xl select-none rounded-b-3xl"
          />
        </Magnet>
      </FadeIn>

      {/* Hero Heading */}
      <div className="overflow-hidden w-full z-0 mt-6 sm:mt-4 md:-mt-5">
        <FadeIn delay={0.15} y={40} className="w-full">
          <h1 className="hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] text-center select-none">
            Hi, i&apos;m {personalInfo.headingName}
          </h1>
        </FadeIn>
      </div>

      {/* Bottom Bar */}
      <div className="flex justify-between items-end pb-7 sm:pb-8 md:pb-10 w-full z-20">
        {/* Left Subtext */}
        <FadeIn delay={0.35} y={20}>
          <p className="text-[#D7E2EA] font-light uppercase tracking-wide leading-snug max-w-[160px] sm:max-w-[220px] md:max-w-[260px]" style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}>
            {personalInfo.tagline}
          </p>
        </FadeIn>

        {/* Right Contact Button */}
        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}

// SECTION 2: MARQUEE SECTION
function MarqueeSection() {
  const sectionRef = useRef(null);
  const [scrollOffset, setScrollOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top + window.scrollY;
      const currentScroll = window.scrollY;
      const offset = (currentScroll - sectionTop + window.innerHeight) * 0.3;
      setScrollOffset(offset);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const row1Triple = [...marqueeImagesRow1, ...marqueeImagesRow1, ...marqueeImagesRow1];
  const row2Triple = [...marqueeImagesRow2, ...marqueeImagesRow2, ...marqueeImagesRow2];

  const row1Transform = `translateX(${scrollOffset - 200}px)`;
  const row2Transform = `translateX(${-(scrollOffset - 200)}px)`;

  return (
    <section ref={sectionRef} className="bg-[#0C0C0C] pt-24 sm:pt-32 md:pt-40 pb-10 overflow-hidden w-full">
      {/* Row 1: Moves Right */}
      <div className="mb-3 overflow-hidden">
        <div 
          className="flex gap-3 w-max"
          style={{ transform: row1Transform, willChange: 'transform' }}
        >
          {row1Triple.map((url, i) => (
            <div key={`r1-${i}`} className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
              <img src={url} alt={`Preview ${i}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Row 2: Moves Left */}
      <div className="overflow-hidden">
        <div 
          className="flex gap-3 w-max"
          style={{ transform: row2Transform, willChange: 'transform' }}
        >
          {row2Triple.map((url, i) => (
            <div key={`r2-${i}`} className="w-[420px] h-[270px] flex-shrink-0 rounded-2xl overflow-hidden bg-neutral-900 border border-white/5">
              <img src={url} alt={`Preview ${i}`} loading="lazy" className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// SECTION 3: ABOUT SECTION
function AboutSection() {
  return (
    <section id="about" className="relative min-h-screen flex flex-col justify-center items-center px-5 sm:px-8 md:px-10 py-20 bg-[#0C0C0C] overflow-hidden">
      {/* Decorative 3D Images */}
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%] pointer-events-none z-10">
        <img src={decorativeIcons.moon} alt="Moon Icon" className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl" />
      </FadeIn>

      <FadeIn delay={0.25} x={-80} y={0} duration={0.9} className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%] pointer-events-none z-10">
        <img src={decorativeIcons.p59} alt="3D Object" className="w-[100px] sm:w-[140px] md:w-[180px] h-auto object-contain drop-shadow-xl" />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%] pointer-events-none z-10">
        <img src={decorativeIcons.lego} alt="Lego Icon" className="w-[120px] sm:w-[160px] md:w-[210px] h-auto object-contain drop-shadow-xl" />
      </FadeIn>

      <FadeIn delay={0.3} x={80} y={0} duration={0.9} className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%] pointer-events-none z-10">
        <img src={decorativeIcons.group134} alt="3D Group" className="w-[130px] sm:w-[170px] md:w-[220px] h-auto object-contain drop-shadow-xl" />
      </FadeIn>

      {/* Main Content */}
      <div className="flex flex-col items-center text-center z-20 max-w-4xl mx-auto gap-10 sm:gap-14 md:gap-16">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase leading-none tracking-tight text-center" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
            {personalInfo.aboutHeading}
          </h2>
        </FadeIn>

        <AnimatedText
          text={personalInfo.aboutText}
          className="text-[#D7E2EA] font-medium text-center leading-relaxed max-w-[560px]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.35rem)' }}
        />

        <div className="pt-6 sm:pt-10">
          <FadeIn delay={0.4} y={20}>
            <ContactButton />
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// SECTION 4: SERVICES SECTION (With Interactive Popups)
function ServicesSection() {
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section id="services" className="bg-white text-[#0C0C0C] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] px-5 sm:px-8 md:px-10 py-20 sm:py-24 md:py-32 relative z-10">
      <div className="max-w-5xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="font-black uppercase text-center text-[#0C0C0C] mb-16 sm:mb-20 md:mb-28" style={{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}>
            Services
          </h2>
        </FadeIn>

        {/* Service Items (Clickable to open popup) */}
        <div className="divide-y divide-[#0C0C0C]/15 border-t border-b border-[#0C0C0C]/15">
          {services.map((service, i) => (
            <FadeIn key={service.number} delay={i * 0.1} y={30} className="py-8 sm:py-10 md:py-12">
              <div 
                onClick={() => setSelectedService(service)}
                className="group flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 sm:gap-12 cursor-pointer p-4 rounded-2xl hover:bg-[#0C0C0C]/5 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-4 sm:gap-12 md:gap-16">
                  <span className="font-black text-[#0C0C0C] shrink-0 group-hover:text-[#7621B0] transition-colors" style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}>
                    {service.number}
                  </span>

                  <div className="flex flex-col gap-2 sm:gap-3">
                    <h3 className="font-medium uppercase text-[#0C0C0C] group-hover:translate-x-2 transition-transform" style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}>
                      {service.name}
                    </h3>
                    <p className="font-light leading-relaxed max-w-2xl text-[#0C0C0C]/60" style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}>
                      {service.shortDescription}
                    </p>
                  </div>
                </div>

                {/* View Details Badge */}
                <div className="self-end sm:self-center shrink-0">
                  <span className="text-xs font-medium uppercase tracking-widest px-4 py-2 rounded-full border border-[#0C0C0C]/20 group-hover:bg-[#0C0C0C] group-hover:text-white transition-colors">
                    View Details &rarr;
                  </span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>

      {/* Service Popup Modal */}
      <ServiceDetailModal service={selectedService} onClose={() => setSelectedService(null)} />
    </section>
  );
}

// SECTION 5: PROJECTS SECTION (Sticky-Stacking Cards)
function ProjectsSection() {
  const containerRef = useRef(null);

  return (
    <section id="projects" ref={containerRef} className="bg-[#0C0C0C] text-[#D7E2EA] rounded-t-[40px] sm:rounded-t-[50px] md:rounded-t-[60px] -mt-10 sm:-mt-12 md:-mt-14 relative z-20 pt-20 sm:pt-24 md:pt-28 pb-32 px-4 sm:px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <FadeIn delay={0} y={40}>
          <h2 className="hero-heading font-black uppercase text-center mb-16 sm:mb-20 md:mb-24" style={{ fontSize: 'clamp(3rem, 12vw, 160px)', lineHeight: 1 }}>
            Project
          </h2>
        </FadeIn>

        {/* Cards Stack */}
        <div className="relative flex flex-col gap-12 sm:gap-16">
          {completedProjects.map((project, index) => {
            const topOffset = index * 28;

            return (
              <div
                key={project.id}
                className="sticky top-24 md:top-32 w-full transition-transform duration-300"
                style={{ top: `${96 + topOffset}px` }}
              >
                <div 
                  className="w-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:p-6 md:p-8 shadow-2xl flex flex-col justify-between gap-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#D7E2EA]/20">
                    <div className="flex items-center gap-4 sm:gap-8">
                      <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)', lineHeight: 1 }}>
                        {project.id}
                      </span>
                      <div>
                        <span className="text-xs sm:text-sm font-light uppercase tracking-widest text-[#D7E2EA]/60 block mb-1">
                          {project.category}
                        </span>
                        <h3 className="font-medium uppercase text-lg sm:text-2xl md:text-3xl text-[#D7E2EA]">
                          {project.name}
                        </h3>
                      </div>
                    </div>

                    <LiveProjectButton href={project.liveUrl} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-stretch">
                    <div className="md:col-span-5 flex flex-col gap-4 sm:gap-6">
                      <img 
                        src={project.images.col1_top} 
                        alt={`${project.name} preview 1`}
                        className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                        style={{ height: 'clamp(130px, 16vw, 230px)' }}
                      />
                      <img 
                        src={project.images.col1_bottom} 
                        alt={`${project.name} preview 2`}
                        className="w-full rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                        style={{ height: 'clamp(160px, 22vw, 340px)' }}
                      />
                    </div>

                    <div className="md:col-span-7 h-full">
                      <img 
                        src={project.images.col2} 
                        alt={`${project.name} full render`}
                        className="w-full h-full min-h-[300px] md:min-h-[420px] rounded-[30px] sm:rounded-[40px] md:rounded-[50px] object-cover border border-white/10"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// FOOTER / CONTACT SECTION
function ContactSection() {
  return (
    <footer id="contact" className="bg-[#0C0C0C] text-[#D7E2EA] pt-20 pb-12 px-6 md:px-10 border-t border-[#D7E2EA]/10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div>
          <h2 className="hero-heading font-black uppercase text-3xl sm:text-4xl md:text-5xl tracking-tight mb-2">
            Let&apos;s build together
          </h2>
          <p className="text-[#D7E2EA]/60 font-light text-sm sm:text-base max-w-lg">
            Ready to grow your business, automate workflows, or launch your next app? Let&apos;s talk.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <a 
            href={personalInfo.socialLinks.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-widest text-[#D7E2EA] hover:text-white px-6 py-3 rounded-full border border-[#D7E2EA]/30 hover:border-white transition-all"
          >
            LinkedIn Profile &rarr;
          </a>
          <a href={`mailto:${personalInfo.contactEmail}`} className="text-base font-medium text-[#D7E2EA] hover:text-white underline underline-offset-4">
            {personalInfo.contactEmail}
          </a>
          <ContactButton label="Send Email" onClick={() => window.location.href = `mailto:${personalInfo.contactEmail}`} />
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-16 pt-8 border-t border-[#D7E2EA]/10 flex flex-col sm:flex-row justify-between items-center text-xs text-[#D7E2EA]/40 gap-4">
        <p>&copy; {new Date().getFullYear()} {personalInfo.name}. All Rights Reserved.</p>
        <div className="flex gap-6 uppercase tracking-widest font-medium">
          <a href="#about" className="hover:text-[#D7E2EA]">About</a>
          <a href="#services" className="hover:text-[#D7E2EA]">Services</a>
          <a href="#projects" className="hover:text-[#D7E2EA]">Projects</a>
        </div>
      </div>
    </footer>
  );
}

// MAIN APP COMPONENT
export default function App() {
  return (
    <div className="bg-[#0C0C0C] min-h-screen text-[#D7E2EA] font-sans overflow-x-clip selection:bg-[#B600A8] selection:text-white">
      <HeroSection />
      <MarqueeSection />
      <AboutSection />
      <ServicesSection />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}

// Render into DOM
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<App />);
}
