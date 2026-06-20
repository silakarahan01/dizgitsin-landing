'use client';

import { RefObject, useEffect, useRef, useState } from 'react';
import { ensureGsap } from '@/lib/gsap-setup';
import { getFrameIndices, preloadFrames } from '@/lib/frames';

interface Options {
  triggerRef: RefObject<HTMLElement>;
  canvasRef: RefObject<HTMLCanvasElement>;
  isMobile: boolean;
  /** Scrub miktari (saniye). Daha dusuk = daha hizli takip. */
  scrub?: number;
}

interface State {
  loaded: boolean;
  progress: number;
}

/**
 * Apple-stili scroll-bound canvas image sequence animasyonu.
 * Frame'leri preload eder, canvas'i devicePixelRatio'ya gore boyutlar,
 * ScrollTrigger ile section progress'i frame index'e map'ler.
 */
export function useScrollSequence({
  triggerRef,
  canvasRef,
  isMobile,
  scrub = 0.5,
}: Options): State {
  const [state, setState] = useState<State>({ loaded: false, progress: 0 });
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentIndexRef = useRef<number>(-1);

  useEffect(() => {
    const { ScrollTrigger } = ensureGsap();
    const canvas = canvasRef.current;
    const trigger = triggerRef.current;
    if (!canvas || !trigger) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let cleanup: (() => void) | undefined;
    let cancelled = false;

    // Reduced motion: tum frame'leri yukleme, sadece son frame'i bir kere ciz
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const indices = getFrameIndices(isMobile);

    // Canvas'i parent boyutuna ve DPR'a gore resize et
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      // Yüksek-DPI ekranlarda native piksel yoğunluğu, 5x'e kadar
      const dpr = Math.min(window.devicePixelRatio || 1, 5);
      canvas.width = Math.floor(rect.width * dpr);
      canvas.height = Math.floor(rect.height * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
    };

    // Frame'i canvas'a object-fit: cover mantigiyla ciz
    const drawFrame = (img: HTMLImageElement) => {
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const iw = img.naturalWidth;
      const ih = img.naturalHeight;

      const canvasRatio = cw / ch;
      const imgRatio = iw / ih;

      let dw: number, dh: number, dx: number, dy: number;
      if (imgRatio > canvasRatio) {
        // image daha genis -> canvas yuksekligine sigdir, yataydan kirp
        dh = ch;
        dw = ch * imgRatio;
        dx = (cw - dw) / 2;
        dy = 0;
      } else {
        // image daha dar -> canvas genisligine sigdir, dikeyden kirp
        dw = cw;
        dh = cw / imgRatio;
        dx = 0;
        dy = (ch - dh) / 2;
      }

      ctx.fillStyle = '#0F0F10';
      ctx.fillRect(0, 0, cw, ch);
      ctx.drawImage(img, dx, dy, dw, dh);
    };

    const start = async () => {
      // Reduced motion: sadece son frame'i yukle, ScrollTrigger kurma
      if (prefersReduced) {
        const lastIdx = indices[indices.length - 1];
        const lastImage = await preloadFrames([lastIdx]);
        if (cancelled) return;
        imagesRef.current = lastImage;
        resizeCanvas();
        if (lastImage[0]) drawFrame(lastImage[0]);
        setState({ loaded: true, progress: 1 });

        const onResize = () => {
          resizeCanvas();
          if (lastImage[0]) drawFrame(lastImage[0]);
        };
        window.addEventListener('resize', onResize);
        cleanup = () => window.removeEventListener('resize', onResize);
        return;
      }

      // Onyukleme (normal mod)
      const images = await preloadFrames(indices);
      if (cancelled) return;

      imagesRef.current = images;
      resizeCanvas();

      // Ilk frame'i hemen ciz
      if (images[0]) drawFrame(images[0]);

      setState((s) => ({ ...s, loaded: true }));

      const total = images.length;

      // ScrollTrigger
      const st = ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          // Hero animasyonu icin: ilk %85'inde frame'leri tamamla, geri kalan
          // %15'te full board sabit kalsin (headline fade-out icin alan).
          const accel = Math.min(1, p / 0.85);
          const idx = Math.min(total - 1, Math.floor(accel * total));

          if (idx !== currentIndexRef.current) {
            currentIndexRef.current = idx;
            const img = imagesRef.current[idx];
            if (img) drawFrame(img);
          }
          setState((s) => (s.progress === p ? s : { ...s, progress: p }));
        },
      });

      // Resize handler
      const onResize = () => {
        resizeCanvas();
        const img = imagesRef.current[Math.max(0, currentIndexRef.current)];
        if (img) drawFrame(img);
        ScrollTrigger.refresh();
      };
      window.addEventListener('resize', onResize);

      cleanup = () => {
        st.kill();
        window.removeEventListener('resize', onResize);
      };
    };

    start();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [triggerRef, canvasRef, isMobile, scrub]);

  return state;
}
