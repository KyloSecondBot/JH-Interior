export default function AuroraBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden bg-black">
      {/* Single gold crown glow at top — keeps it luxury without tinting everything warm */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 80% 40% at 50% -5%, rgba(251,191,36,0.09), transparent 65%)',
        }}
      />
      {/* Subtle noise texture for depth */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.15), transparent 40%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1), transparent 35%)' }} />
    </div>
  );
}
