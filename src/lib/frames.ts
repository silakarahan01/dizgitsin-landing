export const TOTAL_FRAMES = 160;

export function frameUrl(index: number): string {
  const padded = String(index).padStart(3, '0');
  return `/frames/frame-${padded}.jpg`;
}

export function getFrameIndices(isMobile: boolean): number[] {
  if (isMobile) {
    // Her 2. frame: 1, 3, 5, ... 159 (80 adet)
    return Array.from({ length: 80 }, (_, i) => i * 2 + 1);
  }
  // Tüm 160 frame
  return Array.from({ length: TOTAL_FRAMES }, (_, i) => i + 1);
}

/**
 * Bir grup frame'i preload eder. Promise.all ile paralel yukler.
 * Hatali yukleme durumunda yine de devam eder (resolve).
 */
export function preloadFrames(indices: number[]): Promise<HTMLImageElement[]> {
  return Promise.all(
    indices.map(
      (idx) =>
        new Promise<HTMLImageElement>((resolve) => {
          const img = new Image();
          img.decoding = 'async';
          img.src = frameUrl(idx);
          img.onload = () => resolve(img);
          img.onerror = () => {
            // Hata olsa bile bos image dondur ki sequence kirilmasin
            resolve(img);
          };
        })
    )
  );
}
