import React from 'react';
import { motion } from 'motion/react';
import { MascotMood } from '../types';

interface MascotProps {
  mood: MascotMood;
  className?: string;
  speechBubble?: string;
}

export const Mascot: React.FC<MascotProps> = ({ mood, className = '', speechBubble }) => {
  // Color Palette Flat 2.0
  const catColor = '#708090'; // Slate Grey
  const earInner = '#FFB6C1'; // Light Pink
  const eyesColor = '#ADFF2F'; // Green-Yellow glow
  const noseColor = '#FF69B4'; // Hot Pink
  const labCoat = '#FFFFFF'; // White Lab coat
  const shirtColor = '#00CED1'; // Cyan inner shirt

  return (
    <div className={`flex flex-col items-center justify-center relative select-none ${className}`}>
      {/* Speech bubble */}
      {speechBubble && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute -top-24 bg-white text-slate-800 px-4 py-2 bg-opacity-95 rounded-2xl shadow-lg border border-slate-200 text-sm font-medium z-10 max-w-[240px] text-center"
        >
          {speechBubble}
          <div className="absolute left-1/2 -bottom-2 -translate-x-1/2 w-4 h-4 bg-white border-r border-b border-slate-200 rotate-45" />
        </motion.div>
      )}

      {/* Main Mascot SVG */}
      <motion.div
        animate={
          mood === 'happy' || mood === 'celebrating'
            ? { y: [0, -12, 0], scale: [1, 1.05, 1] }
            : mood === 'sad'
            ? { y: [0, 4, 0], rotate: [-2, 2, -2] }
            : mood === 'thinking'
            ? { rotate: [0, 1, -1, 0] }
            : mood === 'charging'
            ? { x: [-1, 2, -1, 1, 0], y: [-1, 1, -1, 0] }
            : {}
        }
        transition={
          mood === 'happy' || mood === 'celebrating'
            ? { repeat: Infinity, duration: 1.2 }
            : mood === 'sad'
            ? { repeat: Infinity, duration: 2 }
            : mood === 'thinking'
            ? { repeat: Infinity, duration: 2.5 }
            : mood === 'charging'
            ? { repeat: Infinity, duration: 0.1 }
            : {}
        }
        className="w-40 h-40 flex items-center justify-center"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
          {/* Background Sparks for Energy/Charging */}
          {mood === 'charging' && (
            <g>
              <motion.path
                d="M 20,40 L 40,50 L 30,70"
                stroke="#FCD34D"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
              />
              <motion.path
                d="M 180,40 L 160,55 L 175,75"
                stroke="#FCD34D"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ repeat: Infinity, duration: 0.2 }}
              />
              <motion.path
                d="M 100,10 L 95,28 L 105,32"
                stroke="#6EE7B7"
                strokeWidth="3"
                strokeLinecap="round"
                fill="none"
                animate={{ scale: [0.8, 1.2, 0.8] }}
                transition={{ repeat: Infinity, duration: 0.4 }}
              />
            </g>
          )}

          {/* Sparkles for Celebrating */}
          {mood === 'celebrating' && (
            <g>
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <motion.circle
                  key={i}
                  cx={100 + 75 * Math.cos((i * Math.PI) / 3)}
                  cy={100 + 75 * Math.sin((i * Math.PI) / 3)}
                  r="6"
                  fill={i % 2 === 0 ? '#FCD34D' : '#60A5FA'}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0.5, 1.2, 0], opacity: [0, 1, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
                />
              ))}
            </g>
          )}

          {/* Thinking lightbulb bulb */}
          {mood === 'thinking' && (
            <g transform="translate(140, 20)">
              <motion.circle
                cx="15"
                cy="15"
                r="10"
                fill="#FCD34D"
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
              <path d="M 11,21 L 19,21" stroke="#475569" strokeWidth="2" />
              <path d="M 13,24 L 17,24" stroke="#475569" strokeWidth="2" />
              {/* Rays */}
              <line x1="15" y1="2" x2="15" y2="5" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
              <line x1="2" y1="15" x2="5" y2="15" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
              <line x1="25" y1="15" x2="28" y2="15" stroke="#FCD34D" strokeWidth="2" strokeLinecap="round" />
            </g>
          )}

          {/* Cat Tail */}
          <motion.path
            d="M 50,150 Q 20,170 30,130"
            stroke={catColor}
            strokeWidth="10"
            strokeLinecap="round"
            fill="none"
            animate={
              mood === 'happy' || mood === 'celebrating'
                ? { rotate: [-10, 10, -10] }
                : mood === 'sad'
                ? { rotate: [-2, 2, -2] }
                : { rotate: [-5, 5, -5] }
            }
            transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
            style={{ transformOrigin: '50px 150px' }}
          />

          {/* Cat Body & Arms */}
          <path d="M 60,110 L 140,110 L 150,170 L 50,170 Z" fill={catColor} />

          {/* White Lab Coat (Blouse trắng) */}
          <path d="M 60,120 L 140,120 L 155,170 L 45,170 Z" fill={labCoat} stroke="#E2E8F0" strokeWidth="2" />
          {/* Collar lapels */}
          <path d="M 60,120 L 85,145 L 85,120 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
          <path d="M 140,120 L 115,145 L 115,120 Z" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1.5" />
          {/* Cyan tie or inner neck */}
          <path d="M 85,120 L 115,120 L 100,135 Z" fill={shirtColor} />
          {/* Lab Coat Buttons / Pocket */}
          <circle cx="100" cy="150" r="3" fill="#94A3B8" />
          <circle cx="100" cy="162" r="3" fill="#94A3B8" />
          <rect x="115" y="132" width="15" height="12" rx="2" fill="#E2E8F0" />
          {/* Pen poking out of pocket */}
          <line x1="120" y1="128" x2="120" y2="135" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />

          {/* Cat Head */}
          <rect x="50" y="45" width="100" height="80" rx="40" fill={catColor} />

          {/* Ears Left */}
          <g>
            <path d="M 55,50 L 35,15 L 75,45 Z" fill={catColor} />
            <path d="M 58,47 L 43,23 L 70,43 Z" fill={earInner} />
          </g>

          {/* Ears Right */}
          <g>
            <path d="M 145,50 L 165,15 L 125,45 Z" fill={catColor} />
            <path d="M 142,47 L 157,23 L 130,43 Z" fill={earInner} />
          </g>

          {/* Eyes Left */}
          <g>
            <ellipse cx="80" cy="75" rx="14" ry="14" fill="#000000" />
            <ellipse cx="80" cy="75" rx="12" ry="12" fill={eyesColor} />
            {/* Pupil */}
            <motion.ellipse
              cx="80"
              cy="75"
              rx={mood === 'sad' ? '2' : '4'}
              ry={mood === 'sad' ? '6' : '10'}
              fill="#000000"
            />
            {/* Eye highlight */}
            <circle cx="77" cy="70" r="4" fill="#FFFFFF" />
          </g>

          {/* Eyes Right */}
          <g>
            <ellipse cx="120" cy="75" rx="14" ry="14" fill="#000000" />
            <ellipse cx="120" cy="75" rx="12" ry="12" fill={eyesColor} />
            {/* Pupil */}
            <motion.ellipse
              cx="120"
              cy="75"
              rx={mood === 'sad' ? '2' : '4'}
              ry={mood === 'sad' ? '6' : '10'}
              fill="#000000"
            />
            {/* Eye highlight */}
            <circle cx="117" cy="70" r="4" fill="#FFFFFF" />
          </g>

          {/* Sad Watery Eyes Overlays */}
          {mood === 'sad' && (
            <g>
              <ellipse cx="80" cy="80" rx="10" ry="4" fill="#60A5FA" opacity="0.8" />
              <ellipse cx="120" cy="80" rx="10" ry="4" fill="#60A5FA" opacity="0.8" />
              {/* Tear roll */}
              <motion.circle
                cx="75"
                cy="85"
                r="3"
                fill="#93C5FD"
                animate={{ y: [0, 15, 30], opacity: [1, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            </g>
          )}

          {/* Dynamic Sunglasses for Happy/Celebrating */}
          {(mood === 'happy' || mood === 'celebrating') && (
            <g>
              {/* Retro Science Google glasses */}
              <rect x="63" y="65" width="74" height="20" rx="4" fill="#1E293B" opacity="0.9" />
              <circle cx="80" cy="75" r="14" stroke="#60A5FA" strokeWidth="2.5" fill="none" />
              <circle cx="120" cy="75" r="14" stroke="#60A5FA" strokeWidth="2.5" fill="none" />
              <line x1="94" y1="75" x2="106" y2="75" stroke="#60A5FA" strokeWidth="3" />
            </g>
          )}

          {/* Nose */}
          <polygon points="96,87 104,87 100,92" fill={noseColor} />

          {/* Mouth */}
          {mood === 'sad' ? (
            // Sad curved down mouth
            <path d="M 94,103 Q 100,97 106,103" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : mood === 'happy' || mood === 'celebrating' ? (
            // Happy open mouth
            <path d="M 92,97 Q 100,111 108,97" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="#EF4444" />
          ) : (
            // Standard smile / thin line
            <path d="M 92,98 Q 100,104 108,98" stroke="#475569" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          )}

          {/* Whiskers */}
          <g stroke="#E2E8F0" strokeWidth="2" strokeLinecap="round">
            {/* Left */}
            <line x1="45" y1="88" x2="25" y2="85" />
            <line x1="45" y1="95" x2="20" y2="96" />
            {/* Right */}
            <line x1="155" y1="88" x2="175" y2="85" />
            <line x1="155" y1="95" x2="180" y2="96" />
          </g>

          {/* Blushing cheeks */}
          {mood === 'happy' && (
            <g opacity="0.6">
              <circle cx="65" cy="92" r="6" fill="#F43F5E" />
              <circle cx="135" cy="92" r="6" fill="#F43F5E" />
            </g>
          )}

          {/* Cat Paws holding an Erlenmeyer Flask (Bình tam giác) */}
          <g transform="translate(85, 138)">
            {/* Flask base */}
            <path d="M 15,22 L 3,36 C 0,40 4,44 10,44 L 20,44 L 30,44 C 36,44 40,40 37,36 L 25,22 Z" fill="#60A5FA" opacity="0.8" />
            {/* Flask liquid */}
            <path d="M 8,32 L 6,36 C 5,39 8,42 12,42 L 20,42 L 28,42 C 32,42 35,39 34,36 L 32,32 Z" fill="#EC4899" />
            {/* Bubbles */}
            <circle cx="16" cy="27" r="2" fill="#FFFFFF" opacity="0.7" />
            <circle cx="23" cy="33" r="1.5" fill="#FFFFFF" opacity="0.9" />
            {/* Flask neck */}
            <rect x="15" y="10" width="10" height="12" rx="1" fill="#FFFFFF" opacity="0.8" stroke="#60A5FA" strokeWidth="1" />
            {/* Paws */}
            <circle cx="4" cy="25" r="7" fill={catColor} />
            <circle cx="36" cy="25" r="7" fill={catColor} />
          </g>
        </svg>
      </motion.div>
    </div>
  );
};
