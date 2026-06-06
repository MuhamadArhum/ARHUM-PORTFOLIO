import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw } from 'lucide-react';

export default function ProfileImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved profile photo from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('arhum_profile_image');
    if (savedImage) {
      setImageSrc(savedImage);
    }
  }, []);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        try {
          localStorage.setItem('arhum_profile_image', base64String);
          setImageSrc(base64String);
        } catch (error) {
          console.error('Failed to save image in localStorage (file might be too large):', error);
          setImageSrc(base64String);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    localStorage.removeItem('arhum_profile_image');
    setImageSrc(null);
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative group flex flex-col items-center justify-center">
      <div 
        onClick={triggerUpload}
        className="cursor-pointer relative w-64 h-64 md:w-76 md:h-76 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850/60 shadow-xs flex items-center justify-center group-hover:border-teal-500 hover:shadow-md transition-all duration-300 transform group-hover:scale-[1.005]"
        id="profile-picture-container"
      >
        {/* Soft high-end visual gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-100/50 dark:from-zinc-900/50 via-transparent to-transparent opacity-80 pointer-events-none" />
        
        {/* Crisp design corners */}
        <div className="absolute top-3.5 left-3.5 w-2 h-2 border-t border-l border-zinc-300 dark:border-zinc-700 pointer-events-none" />
        <div className="absolute top-3.5 right-3.5 w-2 h-2 border-t border-r border-zinc-300 dark:border-zinc-700 pointer-events-none" />
        <div className="absolute bottom-3.5 left-3.5 w-2 h-2 border-b border-l border-zinc-300 dark:border-zinc-700 pointer-events-none" />
        <div className="absolute bottom-3.5 right-3.5 w-2 h-2 border-b border-r border-zinc-300 dark:border-zinc-700 pointer-events-none" />

        {imageSrc ? (
          <img 
            src={imageSrc} 
            alt="Muhammad Arhum Avatar" 
            className="w-full h-full object-cover object-center relative z-10"
            referrerPolicy="no-referrer"
          />
        ) : (
          /* High-end modern SVGs representation aligned securely to professional specifications */
          <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-850/20 relative">
            <svg 
              viewBox="0 0 200 200" 
              className="w-44 h-44 drop-shadow-[0_4px_10px_rgba(13,148,136,0.08)]"
            >
              <defs>
                <linearGradient id="tealGlow" cx="50%" cy="50%" r="50%" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F0FDFA" />
                  <stop offset="100%" stopColor="#CCFBF1" />
                </linearGradient>
              </defs>
              <circle cx="100" cy="100" r="95" fill="url(#tealGlow)" stroke="#5EEAD4" strokeWidth="1" />
              
              {/* Sleek Dark Charcoal / Indigo clothing */}
              <path 
                d="M45,170 C45,145 70,135 100,135 C130,135 155,145 155,170 Z" 
                fill="#18181B" 
                stroke="#27272A" 
                strokeWidth="1.5"
              />
              <polygon points="100,148 78,135 100,135" fill="#0d9488" />
              <polygon points="100,148 122,135 100,135" fill="#0d9488" />
              
              {/* Neck */}
              <rect x="90" y="115" width="20" height="25" fill="#fbcfe8" />
              <rect x="90" y="125" width="20" height="15" fill="#0d9488" opacity="0.08" />

              {/* Head / Ears */}
              <circle cx="80" cy="98" r="9" fill="#fbcfe8" />
              <circle cx="120" cy="98" r="9" fill="#fbcfe8" />
              <rect x="82" y="70" width="36" height="50" rx="18" fill="#fbcfe8" />

              {/* Stylized Hair */}
              <path 
                d="M80,72 Q100,55 120,72 Q125,75 118,65 Q110,60 100,60 Q85,60 81,65 C78,70 78,72 80,72 Z" 
                fill="#09090B" 
              />
              <path d="M81,66 C75,70 79,80 81,85 C83,83 83,75 81,66 Z" fill="#09090B" />
              <path d="M119,66 C125,70 121,80 119,85 C117,83 117,75 119,66 Z" fill="#09090B" />

              {/* Eyes */}
              <ellipse cx="92" cy="88" rx="2.5" ry="3" fill="#18181B" />
              <ellipse cx="108" cy="88" rx="2.5" ry="3" fill="#18181B" />

              {/* Eyebrows */}
              <path d="M87,83 Q92,80 97,84" fill="transparent" stroke="#09090B" strokeWidth="2" strokeLinecap="round" />
              <path d="M103,84 Q108,80 113,83" fill="transparent" stroke="#09090B" strokeWidth="2" strokeLinecap="round" />

              {/* Nose */}
              <path d="M100,88 L100,98 Q100,101 102,100" fill="transparent" stroke="#fda4af" strokeWidth="1.2" strokeLinecap="round" />

              {/* Smile */}
              <path d="M94,108 Q100,111 106,108" fill="transparent" stroke="#f43f5e" strokeWidth="1.2" strokeLinecap="round" />

              {/* Groomed stubble */}
              <path 
                d="M81,95 Q80,118 100,126 Q120,118 119,95 C121,114 115,123 100,123 C85,123 79,114 81,95 Z" 
                fill="#27272A" 
                opacity="0.9"
              />
              <path 
                d="M90,103 Q100,105 110,103 Q112,106 100,107 Q88,106 90,103 Z" 
                fill="#27272A" 
                opacity="0.9"
              />
            </svg>
            <div className="mt-3.5 flex flex-col items-center">
              <span className="text-sm font-bold text-zinc-950 dark:text-zinc-50">Muhammad Arhum</span>
              <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono mt-1 font-semibold uppercase tracking-wider animate-pulse">
                Click to Set Photo
              </span>
            </div>
          </div>
        )}

        {/* Action overlap */}
        <div className="absolute inset-0 bg-teal-600/10 backdrop-blur-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-250 z-20">
          <div className="bg-zinc-950 text-white px-4 py-2 rounded-xl flex items-center gap-1.5 border border-zinc-800 shadow-lg text-xs font-semibold uppercase tracking-wider">
            <Camera size={13} className="text-teal-400" />
            <span>Upload Photo</span>
          </div>
        </div>
      </div>

      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleImageUpload} 
        accept="image/*" 
        className="hidden" 
      />

      {imageSrc && (
        <button 
          onClick={clearImage}
          className="mt-3 flex items-center gap-1 px-2.5 py-1 text-xs text-zinc-500 dark:text-zinc-400 hover:text-teal-600 dark:hover:text-teal-400 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 rounded-lg hover:border-zinc-300 dark:hover:border-zinc-600 transition-all duration-200 cursor-pointer font-semibold shadow-xs"
          id="clear-avatar-btn"
        >
          <RefreshCw size={11} /> Reset Avatar
        </button>
      )}
    </div>
  );
}
