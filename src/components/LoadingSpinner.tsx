interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function LoadingSpinner({ size = 'md', className = '' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-12 w-12',
    lg: 'h-16 w-16'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer rotating ring */}
        <div className={`animate-spin rounded-full ${sizeClasses[size]} border-4 border-transparent border-t-indigo-500 border-r-purple-500`}></div>
        {/* Inner counter-rotating ring */}
        <div 
          className={`absolute inset-2 animate-spin rounded-full ${size === 'sm' ? 'h-4 w-4' : size === 'md' ? 'h-8 w-8' : 'h-12 w-12'} border-4 border-transparent border-b-cyan-400 border-l-blue-400`}
          style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}
        ></div>
        {/* Center pulsing dot */}
        <div className={`absolute ${size === 'sm' ? 'inset-3' : size === 'md' ? 'inset-5' : 'inset-7'} animate-pulse bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full`}></div>
      </div>
    </div>
  );
}
