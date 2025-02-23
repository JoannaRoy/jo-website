import { useState } from "react";
import { motion } from "framer-motion";

const prizes = [
  "1. New book",
  "2. New gadget",
  "3. IKEA trip",
  "4. Nice meal out",
  "5. Massage",
  "6. New sports gear :)",
  "7. Concert ticket",
  "8. Spa day",
  "9. Home decor",
  "10. Clothing article",
];

export default function WOW() {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const segmentAngle = 360 / prizes.length;

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);

    // Generate a random spin between 3 and 6 full rotations + a random segment
    const randomSpin = 1080 + Math.floor(Math.random() * 360);
    setRotation((prev) => prev + randomSpin);

    setTimeout(() => setSpinning(false), 3000); // Adjusted to match animation duration
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-6">
      <div className="relative w-64 h-64">
        {/* Spinning Wheel */}
        <motion.div
          className="absolute w-full h-full rounded-full border-4 border-gray-300 shadow-lg"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: "easeOut" }} // Ensure this matches the setTimeout
          style={{
            background:
              "conic-gradient(#6fbf73 0% 10%, #4aa8a1 10% 20%, #6fbf73 20% 30%, #4aa8a1 30% 40%, #6fbf73 40% 50%, #4aa8a1 50% 60%, #6fbf73 60% 70%, #4aa8a1 70% 80%, #6fbf73 80% 90%, #4aa8a1 90% 100%)",
          }}
        >
          {/* Prize labels */}
          {prizes.map((prize, i) => (
            <div
              key={i}
              className="absolute w-1/2 h-1/2 flex items-center justify-center transform"
              style={{
                transform: `rotate(${
                  segmentAngle * i
                }deg) translateX(50%) rotate(-${
                  segmentAngle * i + segmentAngle / 2
                }deg)`, // Adjusted for correct alignment
              }}
            >
              <span className="text-xs font-semibold text-white">{prize}</span>
            </div>
          ))}
        </motion.div>

        {/* Pointer Indicator */}
        <div className="absolute left-1/2 top-0 w-6 h-6 -ml-3 bg-green-500 rotate-45 transform origin-bottom"></div>
      </div>

      {/* Spin Button */}
      <button
        className="px-6 py-3 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition"
        onClick={spinWheel}
        disabled={spinning}
      >
        {spinning ? "Spinning..." : "Spin the Wheel!"}
      </button>
    </div>
  );
}
