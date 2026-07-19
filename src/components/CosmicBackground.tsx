export function CosmicBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 bg-void" />
      <div className="absolute -left-1/4 top-[-10%] h-[55vh] w-[55vw] rounded-full bg-[#00E5FF]/10 blur-[120px]" />
      <div className="absolute -right-1/4 top-[20%] h-[50vh] w-[50vw] rounded-full bg-[#8B5CF6]/12 blur-[130px]" />
      <div className="absolute bottom-[-10%] left-1/3 h-[45vh] w-[40vw] rounded-full bg-[#00E5FF]/8 blur-[110px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(0,229,255,0.08),transparent_55%)]" />
      <div className="starfield absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-void/90" />
    </div>
  );
}
