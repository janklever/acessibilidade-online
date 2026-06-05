import React from 'react';

export function VisionFilters() {
  return (
    <svg
      style={{
        position: 'absolute',
        width: 0,
        height: 0,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
      aria-hidden="true"
    >
      <defs>
        {/* Protanopia (Inabilidade de perceber a cor vermelha) */}
        <filter id="sim-protanopia">
          <feColorMatrix
            type="matrix"
            values="
              0.567, 0.433, 0.000, 0.000, 0.000
              0.558, 0.442, 0.000, 0.000, 0.000
              0.000, 0.242, 0.758, 0.000, 0.000
              0.000, 0.000, 0.000, 1.000, 0.000
            "
          />
        </filter>

        {/* Deuteranopia (Inabilidade de perceber a cor verde) */}
        <filter id="sim-deuteranopia">
          <feColorMatrix
            type="matrix"
            values="
              0.625, 0.375, 0.000, 0.000, 0.000
              0.700, 0.300, 0.000, 0.000, 0.000
              0.000, 0.300, 0.700, 0.000, 0.000
              0.000, 0.000, 0.000, 1.000, 0.000
            "
          />
        </filter>

        {/* Tritanopia (Inabilidade de perceber a cor azul) */}
        <filter id="sim-tritanopia">
          <feColorMatrix
            type="matrix"
            values="
              0.950, 0.050, 0.000, 0.000, 0.000
              0.000, 0.433, 0.567, 0.000, 0.000
              0.000, 0.475, 0.525, 0.000, 0.000
              0.000, 0.000, 0.000, 1.000, 0.000
            "
          />
        </filter>

        {/* Acromatopsia (Ausência total de percepção de cor) */}
        <filter id="sim-acromatopsia">
          <feColorMatrix
            type="matrix"
            values="
              0.299, 0.587, 0.114, 0.000, 0.000
              0.299, 0.587, 0.114, 0.000, 0.000
              0.299, 0.587, 0.114, 0.000, 0.000
              0.000, 0.000, 0.000, 1.000, 0.000
            "
          />
        </filter>
      </defs>
    </svg>
  );
}
