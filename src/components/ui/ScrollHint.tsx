export default function ScrollHint({ className }: { className?: string }) {
  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-2 text-tile-cream/50">
        <span className="text-[0.65rem] uppercase tracking-[0.32em]">
          Kaydır
        </span>
        <div className="relative h-10 w-[1px] overflow-hidden bg-white/10">
          <span className="absolute left-0 top-0 block h-3 w-full origin-top animate-[slide_2s_ease-in-out_infinite] bg-gradient-to-b from-tile-yellow to-transparent" />
        </div>
      </div>
      <style jsx>{`
        @keyframes slide {
          0% {
            transform: translateY(-100%);
          }
          50% {
            transform: translateY(100%);
          }
          50.01% {
            transform: translateY(-100%);
          }
          100% {
            transform: translateY(100%);
          }
        }
      `}</style>
    </div>
  );
}
