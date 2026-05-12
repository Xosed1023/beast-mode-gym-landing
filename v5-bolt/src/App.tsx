import { useState, useEffect } from 'react';
import { Menu, X, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [visibleElements, setVisibleElements] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => ({
              ...prev,
              [entry.target.id]: true,
            }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'horarios', 'planes', 'ubicacion', 'instagram'];
      const scrollY = window.scrollY;

      sections.forEach((section) => {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollY >= offsetTop - 100 && scrollY < offsetTop + offsetHeight - 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Scanlines Overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-50 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(0deg, rgba(100,200,255,0.1), rgba(100,200,255,0.1) 1px, transparent 1px, transparent 2px)',
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 backdrop-blur-md bg-black/40 border-b border-cyan-400/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => scrollToSection('home')}>
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="BeastMode Gym" className="h-8 md:h-10 w-auto" />
              <span className="text-lg md:text-xl font-black hidden sm:block" style={{ color: '#00d4ff', textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #0088ff' }}>
                BEASTMODE
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {['home', 'horarios', 'planes', 'ubicacion', 'instagram'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-semibold uppercase tracking-wider transition-all duration-300 ${
                    activeSection === section
                      ? 'text-cyan-300'
                      : 'text-gray-300 hover:text-cyan-300'
                  }`}
                  style={
                    activeSection === section
                      ? {
                          textShadow: '0 0 10px #00d4ff, 0 0 20px #00d4ff, 0 0 30px #0088ff',
                        }
                      : {}
                  }
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('planes')}
                className="px-6 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-md font-bold text-black transition-all duration-300"
                style={{ boxShadow: '0 0 20px #00d4ff, 0 0 40px rgba(0, 212, 255, 0.4)' }}
              >
                Unirse
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 space-y-3 border-t border-blue-500/20 pt-4">
              {['home', 'horarios', 'planes', 'ubicacion', 'instagram'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className="block w-full text-left px-4 py-2 rounded-lg hover:bg-cyan-500/20 transition-colors font-semibold"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </button>
              ))}
              <button
                onClick={() => scrollToSection('planes')}
                className="w-full px-4 py-2 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-bold text-black transition-all duration-300 mt-4"
                style={{ boxShadow: '0 0 15px #00d4ff' }}
              >
                Unirse
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(0deg, transparent 24%, rgba(0, 18, 211, 0.05) 25%, rgba(0, 18, 211, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 18, 211, 0.05) 75%, rgba(0, 18, 211, 0.05) 76%, transparent 77%, transparent),
                linear-gradient(90deg, transparent 24%, rgba(0, 18, 211, 0.05) 25%, rgba(0, 18, 211, 0.05) 26%, transparent 27%, transparent 74%, rgba(0, 18, 211, 0.05) 75%, rgba(0, 18, 211, 0.05) 76%, transparent 77%, transparent)
              `,
              backgroundSize: '50px 50px',
              animation: 'scroll 20s linear infinite',
            }}
          />
        </div>

        {/* Neon Glow Elements */}
        <div
          className="absolute top-1/4 left-10 w-96 h-96 rounded-full opacity-30 blur-3xl"
          style={{ backgroundColor: '#00d4ff' }}
        />
        <div
          className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full opacity-25 blur-3xl"
          style={{ backgroundColor: '#0088ff' }}
        />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6 leading-tight" data-animate id="hero-title">
            <span className="inline-block" style={{ animation: 'flicker 3s infinite' }}>
              BEAST
            </span>
            <br />
            <span className="block" style={{ color: '#00d4ff', textShadow: '0 0 30px #00d4ff, 0 0 60px #00d4ff, 0 0 90px #0088ff', animation: 'flicker 3s infinite 0.5s' }}>
              MODE
            </span>
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Tu Viaje Fitness Comienza Aquí. Entrena Como Una Bestia, Vive Como Un Campeón.
          </p>
          <button
            onClick={() => scrollToSection('planes')}
            className="px-10 py-4 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-bold text-lg text-black transition-all duration-300 hover:shadow-2xl transform hover:scale-105"
            style={{ boxShadow: '0 0 30px #00d4ff, 0 0 60px rgba(0, 212, 255, 0.4)' }}
          >
            Comenzar Hoy
          </button>
        </div>

        {/* Stats Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent py-8">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-3 gap-4 md:gap-8">
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black" style={{ color: '#00d4ff', textShadow: '0 0 10px #00d4ff' }}>
                500+
              </div>
              <div className="text-gray-400 text-sm md:text-base">Miembros Activos</div>
            </div>
            <div className="text-center border-l border-r border-cyan-400/30">
              <div className="text-2xl md:text-4xl font-black" style={{ color: '#00d4ff', textShadow: '0 0 10px #00d4ff' }}>
                15+
              </div>
              <div className="text-gray-400 text-sm md:text-base">Entrenadores</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-4xl font-black" style={{ color: '#00d4ff', textShadow: '0 0 10px #00d4ff' }}>
                5★
              </div>
              <div className="text-gray-400 text-sm md:text-base">Calificación</div>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section id="horarios" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">
            Nuestros <span style={{ color: '#00d4ff', textShadow: '0 0 20px #00d4ff, 0 0 40px #0088ff' }}>Horarios</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Disponible de lunes a domingo para que entrenes a tu ritmo
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { day: 'Lunes a Viernes', time: '5:00 AM - 10:00 PM', open: true },
              { day: 'Sábados', time: '8:00 AM - 4:00 PM', open: true },
              { day: 'Domingos', time: '8:00 AM - 2:00 PM', open: false },
            ].map((schedule, idx) => (
              <div
                key={idx}
                className="group relative p-6 rounded-lg bg-gray-900/50 backdrop-blur border border-gray-700 hover:border-cyan-400 transition-all duration-300 overflow-hidden cursor-pointer transform hover:scale-105"
                data-animate
                id={`schedule-${idx}`}
                style={{
                  opacity: visibleElements[`schedule-${idx}`] ? 1 : 0,
                  transform: visibleElements[`schedule-${idx}`] ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                }}
              >
                {/* Top Border Neon */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ boxShadow: '0 0 10px #00d4ff' }} />

                {/* Open Indicator */}
                {schedule.open && (
                  <div
                    className="absolute top-4 right-4 w-3 h-3 rounded-full animate-pulse"
                    style={{ backgroundColor: '#00d4ff', boxShadow: '0 0 15px #00d4ff, 0 0 25px #00d4ff' }}
                  />
                )}

                <Clock className="mb-4 text-cyan-400" size={32} style={{ filter: 'drop-shadow(0 0 8px #00d4ff)' }} />
                <h3 className="text-xl md:text-2xl font-bold mb-2">{schedule.day}</h3>
                <p className="text-gray-400 mb-4 font-semibold">{schedule.time}</p>
                <div className="text-sm font-semibold">
                  {schedule.open ? (
                    <span style={{ color: '#00d4ff', textShadow: '0 0 8px #00d4ff' }}>Abierto Hoy</span>
                  ) : (
                    <span className="text-gray-500">Cerrado</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans Section */}
      <section id="planes" className="py-20 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0, 212, 255, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0, 136, 255, 0.15) 0%, transparent 50%)`,
            }}
          />
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-4 text-center">
            Planes de <span style={{ color: '#00d4ff', textShadow: '0 0 20px #00d4ff, 0 0 40px #0088ff' }}>Membresía</span>
          </h2>
          <p className="text-gray-400 text-center mb-16 max-w-2xl mx-auto">
            Elige el plan perfecto para ti y comienza tu transformación
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {[
              { name: 'Básico', price: 'Consultar', features: ['Acceso Ilimitado', 'Áreas Comunes', 'Vestuarios'] },
              { name: 'Pro', price: 'Consultar', features: ['Acceso Ilimitado', 'Entrenador Personal', 'Nutricionista', 'Suplementos'], popular: true },
              { name: 'Elite', price: 'Consultar', features: ['Todo Pro', 'Planes Personalizados', 'Recuperación Avanzada', 'Prioridad 24/7'] },
            ].map((plan, idx) => (
              <div
                key={idx}
                className={`relative group p-8 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  plan.popular
                    ? 'bg-gradient-to-br from-cyan-900/30 to-blue-900/20 border-2 border-cyan-400'
                    : 'bg-gray-900/50 border border-gray-700 hover:border-cyan-400'
                }`}
                data-animate
                id={`plan-${idx}`}
                style={{
                  opacity: visibleElements[`plan-${idx}`] ? 1 : 0,
                  transform: visibleElements[`plan-${idx}`] ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${idx * 0.1}s`,
                }}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-4 right-8 px-4 py-1 bg-cyan-500 rounded-full text-sm font-bold text-black"
                    style={{ boxShadow: '0 0 20px #00d4ff, 0 0 40px rgba(0, 212, 255, 0.3)' }}
                  >
                    Más Popular
                  </div>
                )}

                <h3 className="text-2xl md:text-3xl font-black mb-2">{plan.name}</h3>
                <div className="text-3xl md:text-4xl font-black mb-6" style={{ color: '#00d4ff', textShadow: '0 0 15px #00d4ff' }}>
                  {plan.price}
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIdx) => (
                    <li key={featureIdx} className="flex items-center text-gray-300">
                      <span className="w-1.5 h-1.5 rounded-full mr-3" style={{ backgroundColor: '#00d4ff', boxShadow: '0 0 5px #00d4ff' }} />
                      {feature}
                    </li>
                  ))}
                </ul>

                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-cyan-500 hover:bg-cyan-400 text-black'
                      : 'bg-gray-700 hover:bg-gray-600 text-white'
                  }`}
                  style={
                    plan.popular
                      ? { boxShadow: '0 0 20px #00d4ff, 0 0 40px rgba(0, 212, 255, 0.3)' }
                      : {}
                  }
                >
                  Seleccionar Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="ubicacion" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-black mb-16 text-center">
            Nuestra <span style={{ color: '#00d4ff', textShadow: '0 0 20px #00d4ff, 0 0 40px #0088ff' }}>Ubicación</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Info */}
            <div
              className="space-y-6"
              data-animate
              id="contact-info"
              style={{
                opacity: visibleElements['contact-info'] ? 1 : 0,
                transform: visibleElements['contact-info'] ? 'translateX(0)' : 'translateX(-20px)',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors">
                <div className="flex items-start space-x-4">
                  <MapPin className="text-cyan-400 flex-shrink-0 mt-1" size={24} style={{ filter: 'drop-shadow(0 0 8px #00d4ff)' }} />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Dirección</h3>
                    <p className="text-gray-400">Cll 11 Sur # 1 b 39 Este</p>
                    <p className="text-gray-400">San Cristóbal Sur</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors">
                <div className="flex items-start space-x-4">
                  <Phone className="text-cyan-400 flex-shrink-0 mt-1" size={24} style={{ filter: 'drop-shadow(0 0 8px #00d4ff)' }} />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Teléfono</h3>
                    <p className="text-gray-400">+57 (1) 2345-6789</p>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-cyan-400 transition-colors">
                <div className="flex items-start space-x-4">
                  <Mail className="text-cyan-400 flex-shrink-0 mt-1" size={24} style={{ filter: 'drop-shadow(0 0 8px #00d4ff)' }} />
                  <div>
                    <h3 className="font-bold text-lg mb-1">Email</h3>
                    <p className="text-gray-400">info@beastmodegym.com</p>
                  </div>
                </div>
              </div>

              <a
                href="https://maps.app.goo.gl/QwfLKq4GPdfSsbFU8"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 py-3 bg-cyan-500 hover:bg-cyan-400 rounded-lg font-bold text-black transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                style={{ boxShadow: '0 0 20px #00d4ff, 0 0 40px rgba(0, 212, 255, 0.3)' }}
              >
                Ver en Google Maps
              </a>
            </div>

            {/* Map Embed */}
            <div
              className="relative h-96 rounded-lg overflow-hidden border border-cyan-400/30"
              data-animate
              id="map-container"
              style={{
                opacity: visibleElements['map-container'] ? 1 : 0,
                transform: visibleElements['map-container'] ? 'translateX(0)' : 'translateX(20px)',
                transition: 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.3621906369076!2d-74.1383!3d4.5960!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f7a8f8f8f8f8f%3A0x8f8f8f8f8f8f8f8f!2sCll%2011%20Sur%20%231%20b%2039%20Este%2C%20San%20Crist%C3%B3bal%20Sur!5e0!3m2!1ses!2sco"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'grayscale(100%) contrast(1.2) brightness(0.8)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Instagram Section */}
      <section id="instagram" className="py-24 px-4 sm:px-6 lg:px-8 bg-black relative overflow-hidden">
        {/* Background ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-3xl" style={{ background: 'radial-gradient(circle, #c026d3 0%, #7c3aed 40%, transparent 70%)' }} />
          <div className="absolute top-0 right-0 w-72 h-72 rounded-full opacity-8 blur-3xl" style={{ backgroundColor: '#f59e0b', opacity: 0.06 }} />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full opacity-8 blur-3xl" style={{ backgroundColor: '#00d4ff', opacity: 0.08 }} />
        </div>

        <div className="max-w-3xl mx-auto relative z-10">
          {/* Section header */}
          <div
            className="text-center mb-12"
            data-animate
            id="instagram-header"
            style={{
              opacity: visibleElements['instagram-header'] ? 1 : 0,
              transform: visibleElements['instagram-header'] ? 'translateY(0)' : 'translateY(-16px)',
              transition: 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            }}
          >
            <h2 className="text-4xl md:text-5xl font-black mb-3">
              Síguenos en{' '}
              <span style={{ color: '#e879f9', textShadow: '0 0 12px #e879f9, 0 0 28px rgba(232,121,249,0.5)' }}>
                Instagram
              </span>
            </h2>
            <p className="text-gray-400 text-base">Transformaciones reales · Tips diarios · Comunidad activa</p>
          </div>

          {/* Main Instagram Card */}
          <div
            className="instagram-neon-card relative rounded-2xl overflow-hidden cursor-pointer group"
            data-animate
            id="instagram-card"
            style={{
              opacity: visibleElements['instagram-card'] ? 1 : 0,
              transform: visibleElements['instagram-card'] ? 'translateY(0) scale(1)' : 'translateY(24px) scale(0.97)',
              transition: 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s, transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.1s',
            }}
          >
            {/* Dark base */}
            <div className="absolute inset-0 bg-[#060608]" />

            {/* Neon border gradient */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                padding: '1.5px',
                background: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 25%, #c026d3 50%, #7c3aed 75%, #00d4ff 100%)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />

            {/* Ambient inner glow from border */}
            <div
              className="absolute inset-0 rounded-2xl opacity-20 blur-md"
              style={{ background: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 25%, #c026d3 50%, #7c3aed 75%, #00d4ff 100%)' }}
            />

            {/* Scanlines texture */}
            <div
              className="absolute inset-0 opacity-5 pointer-events-none"
              style={{
                backgroundImage: 'repeating-linear-gradient(0deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 3px)',
                backgroundSize: '100% 3px',
              }}
            />

            {/* Content */}
            <div className="relative z-10 p-10 md:p-14">
              <div className="flex flex-col items-center text-center">
                {/* Instagram icon with neon ring */}
                <div className="relative mb-7">
                  <div
                    className="absolute inset-0 rounded-2xl blur-xl opacity-60"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #f43f5e, #c026d3)', transform: 'scale(1.3)' }}
                  />
                  <div
                    className="relative w-20 h-20 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, #f59e0b 0%, #f43f5e 40%, #c026d3 70%, #7c3aed 100%)',
                      boxShadow: '0 0 24px rgba(196, 38, 211, 0.6), 0 0 48px rgba(196, 38, 211, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
                    }}
                  >
                    <Instagram size={38} color="white" strokeWidth={1.8} />
                  </div>
                </div>

                {/* Handle */}
                <div className="mb-2">
                  <span
                    className="text-2xl md:text-3xl font-black tracking-tight"
                    style={{
                      color: '#f0abfc',
                      textShadow: '0 0 8px rgba(240,171,252,0.7), 0 0 20px rgba(196,38,211,0.4)',
                    }}
                  >
                    @beast_mode_colombia
                  </span>
                </div>

                <p className="text-gray-300 text-base md:text-lg max-w-md mb-2 leading-relaxed">
                  Inspírate con transformaciones reales, tips de entrenamiento y lo mejor del gym
                </p>

                {/* Divider neon line */}
                <div className="w-24 h-px my-7" style={{ background: 'linear-gradient(90deg, transparent, #c026d3, transparent)', boxShadow: '0 0 8px #c026d3' }} />

                {/* Stats row */}
                <div className="flex gap-10 mb-9">
                  {[
                    { label: 'Publicaciones', value: '240+' },
                    { label: 'Seguidores', value: '12K' },
                    { label: 'Siguiendo', value: '180' },
                  ].map(({ label, value }) => (
                    <div key={label} className="text-center">
                      <div className="text-xl font-black" style={{ color: '#e879f9', textShadow: '0 0 10px rgba(232,121,249,0.5)' }}>{value}</div>
                      <div className="text-gray-500 text-xs uppercase tracking-wider mt-0.5">{label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <a
                  href="https://instagram.com/beast_mode_colombia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="instagram-neon-btn relative inline-flex items-center gap-2.5 px-9 py-3.5 rounded-xl font-bold text-base text-white transition-all duration-300 group-hover:gap-3.5"
                  style={{
                    background: 'linear-gradient(135deg, rgba(245,158,11,0.15) 0%, rgba(244,63,94,0.15) 40%, rgba(196,38,211,0.15) 100%)',
                    border: '1px solid rgba(196,38,211,0.5)',
                    boxShadow: '0 0 16px rgba(196,38,211,0.2), inset 0 1px 0 rgba(255,255,255,0.07)',
                  }}
                >
                  <Instagram size={18} />
                  Visitar Perfil
                  <span className="text-lg leading-none" style={{ color: '#e879f9' }}>→</span>
                </a>
              </div>
            </div>

            {/* Hover glow overlay */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at 50% 100%, rgba(196,38,211,0.08) 0%, transparent 65%)' }}
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <img src={`${import.meta.env.BASE_URL}logo.jpg`} alt="BeastMode Gym" className="h-8 w-auto mb-4" />
              <p className="text-gray-400 text-sm">
                Tu destino para transformar tu cuerpo y mente
              </p>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Navegación</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                {['home', 'horarios', 'planes', 'ubicacion'].map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Términos</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Privacidad</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Cookies</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-white mb-4">Contacto</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="tel:+5712345678" className="hover:text-blue-400 transition-colors">+57 (1) 234-5678</a></li>
                <li><a href="mailto:info@beastmodegym.com" className="hover:text-blue-400 transition-colors">info@beastmodegym.com</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 BeastMode Gym. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>

      {/* CSS Animations */}
      <style>{`
        @keyframes flicker {
          0%, 19%, 21%, 23%, 53%, 57%, 100% {
            text-shadow: 0 0 8px #00d4ff, 0 0 18px #00d4ff, 0 0 36px rgba(0,136,255,0.7);
          }
          20%, 22%, 55% {
            text-shadow: 0 0 4px #00d4ff, 0 0 8px rgba(0,136,255,0.4);
          }
        }

        @keyframes scroll {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        @keyframes ig-border-rotate {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes ig-glow-pulse {
          0%, 100% { opacity: 0.18; }
          50% { opacity: 0.32; }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .instagram-neon-card {
          transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94),
                      box-shadow 0.4s ease;
          box-shadow: 0 0 0 1px rgba(196,38,211,0.2),
                      0 4px 40px rgba(196,38,211,0.12),
                      0 0 80px rgba(196,38,211,0.05);
        }

        .instagram-neon-card:hover {
          transform: translateY(-4px) scale(1.005);
          box-shadow: 0 0 0 1px rgba(196,38,211,0.4),
                      0 8px 60px rgba(196,38,211,0.22),
                      0 0 120px rgba(196,38,211,0.1);
        }

        .instagram-neon-card .absolute.inset-0.rounded-2xl:first-of-type {
          animation: ig-glow-pulse 3s ease-in-out infinite;
        }

        .instagram-neon-btn:hover {
          border-color: rgba(196,38,211,0.85) !important;
          box-shadow: 0 0 20px rgba(196,38,211,0.35), 0 0 40px rgba(196,38,211,0.15), inset 0 1px 0 rgba(255,255,255,0.1) !important;
          background: linear-gradient(135deg, rgba(245,158,11,0.22) 0%, rgba(244,63,94,0.22) 40%, rgba(196,38,211,0.22) 100%) !important;
        }
      `}</style>
    </div>
  );
}
