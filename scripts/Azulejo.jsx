// Azulejo pattern — decorative SVG used as cultural cue
function AzulejoGrid({ opacity = 0.12, className = '' }) {
  return (
    <svg className={`azulejo ${className}`} aria-hidden="true" viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="az-tile" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
          {/* frame */}
          <rect x="0" y="0" width="80" height="80" fill="none" stroke="currentColor" strokeWidth="0.6"/>
          {/* diamond */}
          <path d="M40 8 L72 40 L40 72 L8 40 Z" fill="none" stroke="currentColor" strokeWidth="0.6"/>
          {/* inner square rotated */}
          <path d="M40 22 L58 40 L40 58 L22 40 Z" fill="currentColor" opacity="0.5"/>
          {/* corner dots */}
          <circle cx="0" cy="0" r="1.4" fill="currentColor"/>
          <circle cx="80" cy="0" r="1.4" fill="currentColor"/>
          <circle cx="0" cy="80" r="1.4" fill="currentColor"/>
          <circle cx="80" cy="80" r="1.4" fill="currentColor"/>
          {/* crosshair lines */}
          <path d="M40 0 L40 22 M40 58 L40 80 M0 40 L22 40 M58 40 L80 40" stroke="currentColor" strokeWidth="0.6"/>
        </pattern>
      </defs>
      <rect width="480" height="480" fill="url(#az-tile)" style={{ opacity }}/>
    </svg>
  );
}

window.AzulejoGrid = AzulejoGrid;
