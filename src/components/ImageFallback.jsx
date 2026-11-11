import { useState } from 'react';

export default function ImageFallback({ src, alt, className = '', fallbackText, ...props }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-gradient-to-br from-royal-purple/30 to-lavender/10 ${className}`}
        {...props}
      >
        <span className="text-lavender/40 text-sm font-medium text-center px-4">
          {fallbackText || alt || 'Image'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
}
