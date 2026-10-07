import profilePhoto from '../assets/images/profile_avatar_user.jpg';

export default function ProfileImage() {
  const onlinePhotoUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS177eJI0gBSWHtv3DvOIo2ifl4-kAD86Xiz_xzpvVHCw&s=10";

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div 
        className="relative w-64 h-64 md:w-76 md:h-76 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-850/60 shadow-lg flex items-center justify-center transition-all duration-300 hover:border-teal-500/50"
        id="profile-picture-container"
      >
        {/* Soft atmospheric gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent opacity-60 pointer-events-none z-20" />
        
        {/* Crisp design corners */}
        <div className="absolute top-3.5 left-3.5 w-2.5 h-2.5 border-t-2 border-l-2 border-zinc-300 dark:border-zinc-600 pointer-events-none z-20" />
        <div className="absolute top-3.5 right-3.5 w-2.5 h-2.5 border-t-2 border-r-2 border-zinc-300 dark:border-zinc-600 pointer-events-none z-20" />
        <div className="absolute bottom-3.5 left-3.5 w-2.5 h-2.5 border-b-2 border-l-2 border-zinc-300 dark:border-zinc-600 pointer-events-none z-20" />
        <div className="absolute bottom-3.5 right-3.5 w-2.5 h-2.5 border-b-2 border-r-2 border-zinc-300 dark:border-zinc-600 pointer-events-none z-20" />

        {/* Profile Photo requested by user */}
        <img 
          src={profilePhoto || onlinePhotoUrl} 
          alt="Muhammad Arhum" 
          className="w-full h-full object-cover object-center relative z-10 transition-transform duration-500 hover:scale-105"
          loading="eager"
          decoding="async"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = onlinePhotoUrl;
          }}
        />
      </div>
    </div>
  );
}
