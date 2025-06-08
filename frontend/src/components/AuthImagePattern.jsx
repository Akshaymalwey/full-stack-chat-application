import { useEffect, useRef, useState } from "react";

const AnimatedGrid = ({ title, subtitle }) => {
  const [pattern, setPattern] = useState([]);


  const generatePattern = () => {
    const newPattern = [...Array(25)].map(() => Math.random() < 0.25); // 25% animate
    setPattern(newPattern);
  };


  const timerRef = useRef(null);

  useEffect(() => {
    generatePattern(); 

    const timerEl = timerRef.current;
    if (!timerEl) return;

    const handleAnimation = () => generatePattern();
    timerEl.addEventListener("animationiteration", handleAnimation);

    return () => {
      timerEl.removeEventListener("animationiteration", handleAnimation);
    };
  }, []);

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 relative z-0">
      <div
        ref={timerRef}
        className="absolute w-0 h-0 animate-pulse-sync"
        aria-hidden
      ></div>

      <div className="max-w-md text-center">
        <div className="grid grid-cols-5 gap-3 mb-8">
          {pattern.map((animate, i) => (
            <div
              key={i}
              className={`aspect-square rounded-2xl bg-primary opacity-10 transition-opacity duration-500 ${
                animate ? "opacity-100" : ""
              }`}
            />
          ))}
        </div>
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>
      </div>
    </div>
  );
};

export default AnimatedGrid;
