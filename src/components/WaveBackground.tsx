const WaveBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background">
      {/* Wave layers */}
      <svg
        className="absolute bottom-0 w-full h-[60%] min-w-[1400px]"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Wave 1 - Back layer */}
        <path
          className="animate-wave-slow fill-wave-back"
          d="M0,320 C180,280 360,200 540,200 C720,200 900,280 1080,300 C1260,320 1380,280 1440,260 L1440,400 L0,400 Z"
        />
        {/* Wave 2 - Middle layer */}
        <path
          className="animate-wave-medium fill-wave-mid"
          d="M0,340 C120,300 240,260 420,260 C600,260 780,320 960,330 C1140,340 1320,300 1440,280 L1440,400 L0,400 Z"
        />
        {/* Wave 3 - Front layer */}
        <path
          className="animate-wave-fast fill-wave-front"
          d="M0,360 C200,330 400,300 600,310 C800,320 1000,360 1200,350 C1300,345 1380,335 1440,320 L1440,400 L0,400 Z"
        />
      </svg>
      
      {/* Floating orbs for extra depth */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-float-delayed" />
    </div>
  );
};

export default WaveBackground;
