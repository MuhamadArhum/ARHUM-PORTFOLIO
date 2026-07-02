import React, { useState, useEffect, useRef } from 'react';
import { Camera, RefreshCw } from 'lucide-react';
import defaultAvatar from '../assets/images/profile_avatar_user_uploaded_1783015244781.jpg';

export default function ProfileImage() {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved profile photo from localStorage
  useEffect(() => {
    const savedImage = localStorage.getItem('arhum_profile_image');
    if (savedImage) {
      setImageSrc(savedImage);
    }
  }, []);

  const processFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
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

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
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
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`cursor-pointer relative w-64 h-64 md:w-76 md:h-76 rounded-2xl overflow-hidden border bg-zinc-50 dark:bg-zinc-850/60 shadow-xs flex items-center justify-center transition-all duration-300 transform group-hover:scale-[1.005] ${
          isDragging 
            ? 'border-teal-500 ring-4 ring-teal-500/15 bg-teal-50/20' 
            : 'border-zinc-200 dark:border-zinc-800 group-hover:border-teal-500 hover:shadow-md'
        }`}
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
          <img 
            src={defaultAvatar} 
            alt="Muhammad Arhum Avatar" 
            className="w-full h-full object-cover object-center relative z-10"
            referrerPolicy="no-referrer"
          />
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

      <div className="mt-3.5 text-center px-4 max-w-xs">
        <p className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
          ✨ <span className="font-semibold text-teal-600 dark:text-teal-400">Tip:</span> Apni original pic yahan drag karke ya click karke set karein!
        </p>
      </div>

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
