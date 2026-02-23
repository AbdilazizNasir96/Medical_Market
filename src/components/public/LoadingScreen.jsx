import { useEffect, useState } from 'react';
import { FiHeart, FiActivity, FiZap } from 'react-icons/fi';

const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => {
              onLoadingComplete();
            }, 800);
          }, 300);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 150);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center transition-all duration-800 ${
        isExiting ? 'opacity-0 scale-110' : 'opacity-100 scale-100'
      }`}
      style={{ perspective: '1000px' }}
    >
      {/* Animated Gradient Background with 3D effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900" style={{
        animation: 'gradient-rotate 10s ease infinite',
        backgroundSize: '400% 400%'
      }}></div>

      {/* 3D Rotating Cubes - Mobile Optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              animation: `cube-float-3d ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              transformStyle: 'preserve-3d'
            }}
          >
            <div
              className="w-8 h-8 md:w-12 md:h-12"
              style={{
                background: `linear-gradient(135deg, ${['#ec4899', '#8b5cf6', '#06b6d4'][i % 3]}, transparent)`,
                borderRadius: '4px',
                boxShadow: `0 0 20px ${['#ec4899', '#8b5cf6', '#06b6d4'][i % 3]}`,
                animation: `cube-rotate-3d ${3 + i * 0.3}s linear infinite`,
                transformStyle: 'preserve-3d'
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* 3D Rotating Rings with Depth */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
        <div className="relative w-48 h-48 md:w-96 md:h-96" style={{ transformStyle: 'preserve-3d' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute inset-0 rounded-full"
              style={{
                border: `3px solid ${['rgba(236, 72, 153, 0.3)', 'rgba(139, 92, 246, 0.3)', 'rgba(6, 182, 212, 0.3)'][i]}`,
                animation: `ring-rotate-3d-${i} ${4 + i}s linear infinite`,
                transformStyle: 'preserve-3d',
                transform: `rotateX(${i * 30}deg) rotateY(${i * 30}deg)`,
                boxShadow: `0 0 30px ${['#ec4899', '#8b5cf6', '#06b6d4'][i]}`
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Main Content with 3D Transform */}
      <div className="relative z-10 flex flex-col items-center space-y-4 sm:space-y-6 px-4" style={{
        animation: 'content-float-3d 3s ease-in-out infinite',
        transformStyle: 'preserve-3d'
      }}>
        {/* 3D Logo with Depth - MOBILE OPTIMIZED */}
        <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Multiple shadow layers for 3D depth */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-3xl opacity-60" style={{
            animation: 'glow-pulse-3d 2s ease-in-out infinite',
            transform: 'translateZ(-50px)'
          }}></div>
          
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10" style={{
            animation: 'card-tilt-3d 4s ease-in-out infinite',
            transformStyle: 'preserve-3d',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 50px rgba(139, 92, 246, 0.3)'
          }}>
            <div className="flex items-center space-x-2 sm:space-x-3 md:space-x-4">
              <div className="relative" style={{ transformStyle: 'preserve-3d' }}>
                <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50" style={{
                  animation: 'icon-bounce-3d 2s ease-in-out infinite',
                  transformStyle: 'preserve-3d',
                  transform: 'translateZ(30px)'
                }}>
                  <FiHeart className="text-white" size={window.innerWidth < 640 ? 20 : 32} />
                </div>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center" style={{
                  animation: 'ping-3d 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                  transformStyle: 'preserve-3d'
                }}>
                  <FiActivity className="text-white" size={window.innerWidth < 640 ? 8 : 12} />
                </div>
              </div>
              <div style={{ transform: 'translateZ(20px)' }}>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black text-white tracking-tight" style={{
                  textShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(236, 72, 153, 0.5)'
                }}>
                  ReyanMedical
                </h1>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent" style={{
                  animation: 'gradient-shift 3s ease infinite',
                  backgroundSize: '200% 200%'
                }}>
                  Market
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text with 3D Effect - MOBILE OPTIMIZED */}
        <div className="flex items-center space-x-2 sm:space-x-3" style={{
          animation: 'text-wave-3d 2s ease-in-out infinite',
          transformStyle: 'preserve-3d'
        }}>
          <FiZap className="text-yellow-400" size={window.innerWidth < 640 ? 16 : 20} style={{
            animation: 'icon-spin-3d 2s linear infinite',
            filter: 'drop-shadow(0 0 10px #facc15)'
          }} />
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white" style={{
            textShadow: '0 2px 10px rgba(255, 255, 255, 0.5)',
            animation: 'text-glow-pulse 2s ease-in-out infinite'
          }}>
            Loading Amazing Experience
          </p>
          <FiZap className="text-yellow-400" size={window.innerWidth < 640 ? 16 : 20} style={{
            animation: 'icon-spin-3d 2s linear infinite reverse',
            filter: 'drop-shadow(0 0 10px #facc15)'
          }} />
        </div>

        {/* 3D Progress Bar - MOBILE OPTIMIZED */}
        <div className="w-full max-w-xs sm:max-w-sm md:w-80" style={{
          transform: 'translateZ(10px)',
          transformStyle: 'preserve-3d'
        }}>
          <div className="relative h-3 sm:h-4 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10" style={{
            boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.3)'
          }}>
            <div
              className="absolute inset-y-0 left-0 rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                background: 'linear-gradient(90deg, #ec4899, #8b5cf6, #06b6d4)',
                backgroundSize: '200% 100%',
                animation: 'progress-shimmer-3d 2s linear infinite',
                boxShadow: '0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(139, 92, 246, 0.6)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent" style={{
                animation: 'shimmer-move 1.5s linear infinite'
              }}></div>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-400 font-medium" style={{
              textShadow: '0 1px 2px rgba(0, 0, 0, 0.5)'
            }}>
              {Math.round(progress)}%
            </span>
            <span className="text-xs sm:text-sm font-bold" style={{
              background: 'linear-gradient(90deg, #ec4899, #06b6d4)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'gradient-shift 2s ease infinite',
              backgroundSize: '200% 200%'
            }}>
              Almost there...
            </span>
          </div>
        </div>

        {/* 3D Floating Icons - MOBILE FRIENDLY */}
        <div className="flex space-x-3 sm:space-x-4 md:space-x-6 mt-2 sm:mt-4 md:mt-8" style={{ transformStyle: 'preserve-3d' }}>
          {[
            { icon: FiHeart, color: 'from-pink-500 to-rose-500', delay: '0s' },
            { icon: FiActivity, color: 'from-purple-500 to-indigo-500', delay: '0.2s' },
            { icon: FiZap, color: 'from-cyan-500 to-blue-500', delay: '0.4s' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative"
              style={{ 
                animationDelay: item.delay,
                transformStyle: 'preserve-3d'
              }}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-br ${item.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg`} style={{
                animation: `icon-float-3d ${2 + idx * 0.3}s ease-in-out infinite`,
                animationDelay: item.delay,
                transformStyle: 'preserve-3d',
                boxShadow: `0 10px 25px -5px ${idx === 0 ? 'rgba(236, 72, 153, 0.5)' : idx === 1 ? 'rgba(139, 92, 246, 0.5)' : 'rgba(6, 182, 212, 0.5)'}`
              }}>
                <item.icon className="text-white" size={window.innerWidth < 640 ? 16 : 20} />
              </div>
            </div>
          ))}
        </div>

        {/* 3D Loading Dots */}
        <div className="flex space-x-2" style={{ transformStyle: 'preserve-3d' }}>
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 sm:w-3 sm:h-3 rounded-full"
              style={{ 
                background: 'linear-gradient(135deg, #ec4899, #8b5cf6)',
                animation: `dot-bounce-3d 1.4s ease-in-out ${i * 0.15}s infinite`,
                boxShadow: '0 0 10px rgba(236, 72, 153, 0.8)'
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* 3D Corner Decorations */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-pink-500/20 rounded-full blur-3xl" style={{
        animation: 'corner-pulse-3d 3s ease-in-out infinite',
        transform: 'translateZ(-100px)'
      }}></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-cyan-500/20 rounded-full blur-3xl" style={{
        animation: 'corner-pulse-3d 3s ease-in-out infinite',
        animationDelay: '1.5s',
        transform: 'translateZ(-100px)'
      }}></div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes gradient-rotate {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes cube-float-3d {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotateX(0deg) rotateY(0deg);
          }
          50% {
            transform: translate3d(0, -30px, 50px) rotateX(180deg) rotateY(180deg);
          }
        }

        @keyframes cube-rotate-3d {
          0% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        @keyframes ring-rotate-3d-0 {
          0% { transform: rotateX(0deg) rotateY(0deg); }
          100% { transform: rotateX(360deg) rotateY(360deg); }
        }

        @keyframes ring-rotate-3d-1 {
          0% { transform: rotateX(30deg) rotateY(30deg) rotateZ(0deg); }
          100% { transform: rotateX(30deg) rotateY(30deg) rotateZ(360deg); }
        }

        @keyframes ring-rotate-3d-2 {
          0% { transform: rotateX(60deg) rotateY(60deg) rotateZ(0deg); }
          100% { transform: rotateX(60deg) rotateY(60deg) rotateZ(-360deg); }
        }

        @keyframes content-float-3d {
          0%, 100% {
            transform: translateY(0) translateZ(0) rotateX(0deg);
          }
          50% {
            transform: translateY(-10px) translateZ(20px) rotateX(2deg);
          }
        }

        @keyframes glow-pulse-3d {
          0%, 100% {
            opacity: 0.4;
            transform: translateZ(-50px) scale(1);
          }
          50% {
            opacity: 0.8;
            transform: translateZ(-50px) scale(1.1);
          }
        }

        @keyframes card-tilt-3d {
          0%, 100% {
            transform: perspective(1000px) rotateX(0deg) rotateY(0deg);
          }
          25% {
            transform: perspective(1000px) rotateX(5deg) rotateY(-5deg);
          }
          75% {
            transform: perspective(1000px) rotateX(-5deg) rotateY(5deg);
          }
        }

        @keyframes icon-bounce-3d {
          0%, 100% {
            transform: translateZ(30px) translateY(0) scale(1);
          }
          50% {
            transform: translateZ(50px) translateY(-10px) scale(1.1);
          }
        }

        @keyframes ping-3d {
          0% {
            transform: scale(1) translateZ(20px);
            opacity: 1;
          }
          75%, 100% {
            transform: scale(2) translateZ(40px);
            opacity: 0;
          }
        }

        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes text-wave-3d {
          0%, 100% {
            transform: translateY(0) rotateX(0deg);
          }
          50% {
            transform: translateY(-5px) rotateX(5deg);
          }
        }

        @keyframes icon-spin-3d {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }

        @keyframes text-glow-pulse {
          0%, 100% {
            text-shadow: 0 2px 10px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 2px 20px rgba(255, 255, 255, 0.8), 0 0 30px rgba(236, 72, 153, 0.5);
          }
        }

        @keyframes progress-shimmer-3d {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }

        @keyframes shimmer-move {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }

        @keyframes icon-float-3d {
          0%, 100% {
            transform: translateY(0) translateZ(0) rotateZ(0deg);
          }
          50% {
            transform: translateY(-15px) translateZ(30px) rotateZ(10deg);
          }
        }

        @keyframes dot-bounce-3d {
          0%, 80%, 100% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          40% {
            transform: translateY(-15px) scale(1.2);
            opacity: 0.8;
          }
        }

        @keyframes corner-pulse-3d {
          0%, 100% {
            opacity: 0.2;
            transform: translateZ(-100px) scale(1);
          }
          50% {
            opacity: 0.4;
            transform: translateZ(-80px) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
