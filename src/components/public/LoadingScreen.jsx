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
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 animate-gradient-shift"></div>

      {/* Animated Particles - REDUCED ON MOBILE */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(10)].map((_, i) => (
          <div
            key={i}
            className="hidden md:block absolute w-2 h-2 bg-white rounded-full opacity-20 animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Rotating Rings - DESKTOP ONLY */}
      <div className="hidden md:flex absolute inset-0 items-center justify-center">
        <div className="relative w-96 h-96">
          <div className="absolute inset-0 border-4 border-pink-500/30 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-8 border-4 border-purple-500/30 rounded-full animate-spin-reverse"></div>
          <div className="absolute inset-16 border-4 border-cyan-500/30 rounded-full animate-spin-slow"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center space-y-6 sm:space-y-8 px-4">
        {/* Logo with Pulse Animation - MOBILE OPTIMIZED */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-3xl blur-2xl sm:blur-3xl opacity-60 animate-pulse"></div>
          <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/10">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50 animate-bounce">
                  <FiHeart className="text-white" size={32} />
                </div>
                <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center animate-ping">
                  <FiActivity className="text-white" size={12} />
                </div>
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
                  ReyanMedical
                </h1>
                <p className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Market
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Loading Text with Animation - MOBILE OPTIMIZED */}
        <div className="flex items-center space-x-2 sm:space-x-3">
          <FiZap className="text-yellow-400 animate-pulse" size={20} />
          <p className="text-lg sm:text-xl md:text-2xl font-bold text-white animate-pulse">
            Loading Amazing Experience
          </p>
          <FiZap className="text-yellow-400 animate-pulse" size={20} />
        </div>

        {/* Progress Bar - MOBILE OPTIMIZED */}
        <div className="w-full max-w-xs sm:max-w-sm md:w-80">
          <div className="relative h-2.5 sm:h-3 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/10">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-500 rounded-full transition-all duration-300 ease-out shadow-lg shadow-purple-500/50"
              style={{ width: `${Math.min(progress, 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
          <div className="mt-2 sm:mt-3 flex justify-between items-center">
            <span className="text-xs sm:text-sm text-gray-400 font-medium">
              {Math.round(progress)}%
            </span>
            <span className="text-xs sm:text-sm text-transparent bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text font-bold">
              Almost there...
            </span>
          </div>
        </div>

        {/* Floating Icons - MOBILE FRIENDLY */}
        <div className="flex space-x-4 sm:space-x-6 mt-4 sm:mt-8">
          {[
            { icon: FiHeart, color: 'from-pink-500 to-rose-500', delay: '0s' },
            { icon: FiActivity, color: 'from-purple-500 to-indigo-500', delay: '0.2s' },
            { icon: FiZap, color: 'from-cyan-500 to-blue-500', delay: '0.4s' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="relative"
              style={{ animationDelay: item.delay }}
            >
              <div className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br ${item.color} rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg animate-float-icon`}>
                <item.icon className="text-white" size={20} />
              </div>
            </div>
          ))}
        </div>

        {/* Loading Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.15}s` }}
            ></div>
          ))}
        </div>
      </div>

      {/* Corner Decorations - DESKTOP ONLY */}
      <div className="hidden md:block absolute top-0 left-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="hidden md:block absolute bottom-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default LoadingScreen;
