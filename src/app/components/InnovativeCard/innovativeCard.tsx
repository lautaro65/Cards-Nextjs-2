"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, Beer } from "lucide-react";
import Image from "next/image";

interface InnovativeCardProps {
  title: string;
  description: string;
}

const InnovativeCard: React.FC<InnovativeCardProps> = ({
  title,
  description,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [count, setCount] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isSparkleActive, setIsSparkleActive] = useState(false);
  const [beerCount, setBeerCount] = useState(0);

  useEffect(() => {
    if (isHovering) {
      const interval = setInterval(() => {
        setCount((prevCount) => (prevCount + 1) % 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [isHovering]);

  const handleSparkleClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene que la tarjeta se voltee
    setIsSparkleActive((prev) => !prev);
  };

  const handleBeerClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Previene que la tarjeta se voltee
    setBeerCount((prev) => prev + 1);
    // Efecto de vibración en la tarjeta
    const card = document.querySelector(".card-container");
    card?.classList.add("shake");
    setTimeout(() => card?.classList.remove("shake"), 500);
  };

  return (
    <div className="w-full max-w-md mx-auto" style={{ perspective: "1000px" }}>
      <motion.div
        className="relative w-full h-[400px] cursor-pointer card-container"
        onClick={() => setIsFlipped(!isFlipped)}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${isFlipped ? 180 : 0}deg)`,
          transition: "transform 0.6s",
        }}
      >
        {/* Front of card */}
        <div
          className="absolute inset-0 w-full h-full rounded-xl overflow-hidden"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 transition-opacity duration-500 ${
              isSparkleActive ? "opacity-50" : "opacity-100"
            }`}
          />
          <div className="absolute inset-0 bg-black/30" />
          <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000"
            alt="Fiesta"
            className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            layout="fill"
            objectFit="cover"
          />
          <div className="absolute inset-0 p-6 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{title}</h2>
              <p className="text-lg text-white/80">{description}</p>
              {beerCount > 0 && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2 bg-yellow-500/20 backdrop-blur-sm rounded-full px-3 py-1 inline-block"
                >
                  <span className="text-white">🍺 x {beerCount}</span>
                </motion.div>
              )}
            </div>
            <motion.button
              className="self-start px-4 py-2 bg-white/20 backdrop-blur-lg rounded-full text-white font-semibold flex items-center gap-2 hover:bg-white/30 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explorar</span>
              <ArrowUpRight className="w-5 h-5" />
            </motion.button>
          </div>
          <div className="absolute top-4 right-4 flex items-center space-x-2">
            <motion.button
              onClick={handleSparkleClick}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-full transition-colors ${
                isSparkleActive ? "bg-yellow-500/50" : "hover:bg-white/10"
              }`}
            >
              <Sparkles
                className={`w-6 h-6 ${
                  isSparkleActive
                    ? "text-white animate-spin"
                    : "text-yellow-300 animate-pulse"
                }`}
              />
            </motion.button>
            <motion.button
              onClick={handleBeerClick}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-full hover:bg-white/10"
            >
              <Beer className="w-6 h-6 text-yellow-300 animate-bounce" />
            </motion.button>
          </div>
          {isSparkleActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 pointer-events-none"
            >
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-yellow-300 rounded-full"
                  animate={{
                    x: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    y: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
                    scale: [0, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                />
              ))}
            </motion.div>
          )}
        </div>

        {/* Back of card */}
        <div
          className="absolute inset-0 w-full h-full bg-gray-900 rounded-xl overflow-hidden flex items-center justify-center"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="text-center p-6">
            <h3 className="text-2xl font-bold mb-4 text-white">
              ¡A darle duro!
            </h3>
            <p className="text-gray-300 mb-6">
              Haz clic para volver al frente de la tarjeta y seguir la fiesta.
            </p>
            <motion.div
              className="inline-block relative"
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
            >
              <Beer className="w-16 h-16 text-yellow-500 animate-pulse" />
              <motion.div
                className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white"
                animate={{ rotate: count * 36 }}
              >
                {count}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default InnovativeCard;
