export function LoadingSpinner({ size = "md" }) {
  const sizeClasses = { sm: "w-6 h-6", md: "w-10 h-10", lg: "w-16 h-16" };

  return (
    <div className={`${sizeClasses[size]} animate-spin`}>
      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth="3"
        />
        <path
          d="M12 2a10 10 0 0 1 10 10"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
