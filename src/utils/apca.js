// sRGB → Y (luminance)
export function sRGBtoY(rgb) {
  const mainTRC = 2.4;
  const r = Math.pow(rgb[0] / 255, mainTRC);
  const g = Math.pow(rgb[1] / 255, mainTRC);
  const b = Math.pow(rgb[2] / 255, mainTRC);
  return 0.2126729 * r + 0.7151522 * g + 0.0721750 * b;
}

export function APCAcontrast(txtY, bgY) {
  const normBG = 0.56;
  const normTXT = 0.57;
  const revTXT = 0.62;
  const revBG = 0.65;
  const blkThrs = 0.022;
  const blkClmp = 1.414;
  const loClip = 0.1;
  const deltaYmin = 0.0005;
  const scaleBoW = 1.14;
  const scaleWoB = 1.14;

  // black level soft clamp
  txtY = txtY > blkThrs ? txtY : txtY + Math.pow(blkThrs - txtY, blkClmp);
  bgY  = bgY  > blkThrs ? bgY  : bgY  + Math.pow(blkThrs - bgY,  blkClmp);

  if (Math.abs(bgY - txtY) < deltaYmin) return 0;

  let SAPC = 0;
  let outputContrast = 0;

  if (bgY > txtY) { // light bg, dark text
    SAPC = (Math.pow(bgY, normBG) - Math.pow(txtY, normTXT)) * scaleBoW;
    outputContrast = SAPC < loClip ? 0 : SAPC - 0.027;
  } else { // dark bg, light text
    SAPC = (Math.pow(bgY, revBG) - Math.pow(txtY, revTXT)) * scaleWoB;
    outputContrast = SAPC > -loClip ? 0 : SAPC + 0.027;
  }
  return outputContrast * 100;
}

export function hexToRgb(hex) {
  hex = hex.replace('#', '');
  if (hex.length === 3) hex = hex.split('').map(c => c+c).join('');
  const n = parseInt(hex, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function rgbToHex(rgb) {
  return '#' + rgb.map(v => {
    const h = Math.max(0, Math.min(255, Math.round(v))).toString(16);
    return h.length === 1 ? '0' + h : h;
  }).join('');
}

// WCAG 2.x relative luminance
export function relLuminance(rgb) {
  const a = rgb.map(v => {
    v = v / 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

export function wcagRatio(fg, bg) {
  const L1 = relLuminance(fg);
  const L2 = relLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

export function apca(fgHex, bgHex) {
  const fg = hexToRgb(fgHex);
  const bg = hexToRgb(bgHex);
  return APCAcontrast(sRGBtoY(fg), sRGBtoY(bg));
}

export function wcag(fgHex, bgHex) {
  return wcagRatio(hexToRgb(fgHex), hexToRgb(bgHex));
}

// APCA guidance (approx) for body text
export function apcaLevel(Lc) {
  const abs = Math.abs(Lc);
  if (abs >= 90) return { label: 'Excelente', grade: 'AAA+', pass: true };
  if (abs >= 75) return { label: 'Corpo de texto', grade: 'Lc 75+', pass: true };
  if (abs >= 60) return { label: 'Corpo de texto (escuro)', grade: 'Lc 60+', pass: true };
  if (abs >= 45) return { label: 'UI / rótulos', grade: 'Lc 45+', pass: 'ui' };
  if (abs >= 30) return { label: 'Decorativo', grade: 'Lc 30+', pass: false };
  return { label: 'Insuficiente', grade: '< 30', pass: false };
}

export function wcagLevel(ratio) {
  if (ratio >= 7) return { grade: 'AAA', pass: true };
  if (ratio >= 4.5) return { grade: 'AA', pass: true };
  if (ratio >= 3) return { grade: 'AA Grande', pass: 'large' };
  return { grade: 'Falha', pass: false };
}

export const APCAtool = {
  apca, wcag, apcaLevel, wcagLevel, hexToRgb, rgbToHex, relLuminance
};
