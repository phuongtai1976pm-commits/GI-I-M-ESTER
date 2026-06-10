import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Key, Gift, Anchor, HelpCircle, ArrowRight } from 'lucide-react';
import { Question } from '../types';
import { Mascot } from './Mascot';
import { playTing, playBloop, playPowerUp } from '../utils/audio';

interface Stage2Props {
  questions: Question[]; // filtered for stage 2 (Q16 - Q30)
  currentQuestionIndex: number;
  sfxEnabled: boolean;
  onAnswer: (questionId: number, selectedIndex: number, isCorrect: boolean) => void;
  onNext: () => void;
  onStageComplete: () => void;
  score: number;
}

export const Stage2: React.FC<Stage2Props> = ({
  questions,
  currentQuestionIndex,
  sfxEnabled,
  onAnswer,
  onNext,
  onStageComplete,
  score,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [mascotText, setMascotText] = useState("Vùng biển cấu trúc ester kì bí! Hãy nhổ neo tìm kho báu dứa chín và chuối thơm thôi nào!");

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQuestion.answer;
    if (isCorrect) {
      playTing(sfxEnabled);
      setMascotText("A ha! Đào được hòm vàng ròng rồi! Bạn có trí tuệ của thuyền trưởng!");
    } else {
      playBloop(sfxEnabled);
      setMascotText("Oái, có đá ngầm! Hãy xem lại sơ đồ công thức cấu tạo nhé!");
    }

    onAnswer(currentQuestion.id, optionIdx, isCorrect);
  };

  const handleNextClick = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    if (currentQuestionIndex + 1 >= totalQuestions) {
      playPowerUp(sfxEnabled);
      onStageComplete();
    } else {
      setMascotText("Hòn đảo tiếp theo đang vẫy gọi! Lên buồm!");
      onNext();
    }
  };

  // SVG Island map definitions coordinate math
  // We'll distribute 15 items in a beautiful zig-zag grid
  const getCoordinates = (idx: number) => {
    const row = Math.floor(idx / 3);
    const col = idx % 3;
    const isEvenRow = row % 2 === 0;
    const actualCol = isEvenRow ? col : 2 - col;
    const x = 18 + actualCol * 32; // percent width
    const y = 8 + row * 18; // percent height
    return { x, y };
  };

  let activeMood: 'thinking' | 'happy' | 'sad' | 'celebrating' = 'thinking';
  if (isAnswered) {
    if (selectedOption === currentQuestion.answer) {
      activeMood = 'celebrating';
    } else {
      activeMood = 'sad';
    }
  } else {
    activeMood = 'happy';
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Nautical Grid Island Map */}
      <div className="lg:col-span-5 bg-sky-50 border border-sky-100 rounded-3xl p-6 shadow-md flex flex-col gap-4 relative overflow-hidden">
        {/* Soft waves backgrounds */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#0ea5e9_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

        <div className="flex items-center justify-between mb-1 relative z-10">
          <div className="flex items-center gap-2">
            <Anchor className="w-6 h-6 text-sky-700 shrink-0" />
            <h4 className="font-extrabold text-sky-800 text-lg tracking-tight">Quần Đảo Kho Báu</h4>
          </div>
          <span className="text-xs bg-sky-100 font-bold text-sky-800 px-2.5 py-1 rounded-md">
            ⚓ Hải Trình
          </span>
        </div>

        {/* The visual vector map */}
        <div className="h-80 relative bg-amber-50 rounded-2xl border-2 border-amber-200/80 p-2 overflow-hidden shadow-inner">
          <div className="absolute inset-0 bg-amber-100/30 opacity-70 bg-[radial-gradient(#b45309_1.5px,transparent_1.5px)] [background-size:24px_24px] pointer-events-none" />

          {/* Dotted route lines in SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d={questions
                .map((_, idx) => {
                  const { x, y } = getCoordinates(idx);
                  return `${idx === 0 ? 'M' : 'L'} ${x}% ${y}%`;
                })
                .join(' ')}
              fill="none"
              stroke="#D97706"
              strokeWidth="2.5"
              strokeDasharray="6 6"
              className="opacity-70 animate-[dash_40s_linear_infinite]"
            />
          </svg>

          {/* Drawing Islands */}
          {questions.map((q, idx) => {
            const { x, y } = getCoordinates(idx);
            const isCurrent = idx === currentQuestionIndex;
            const isAnsweredCorrectly = idx < currentQuestionIndex; // Simplified representation of progress

            return (
              <motion.div
                key={q.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10"
                whileHover={{ scale: 1.15 }}
              >
                {/* Island shape button */}
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shadow-md transition-all ${
                    isCurrent
                      ? 'bg-amber-500 text-white ring-4 ring-amber-300 ring-offset-2 scale-110'
                      : isAnsweredCorrectly
                      ? 'bg-emerald-600 text-emerald-100 border-2 border-emerald-300'
                      : 'bg-amber-100 text-amber-800 border border-amber-300/60'
                  }`}
                >
                  {isCurrent ? (
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                    >
                      ☠️
                    </motion.div>
                  ) : isAnsweredCorrectly ? (
                    <Gift className="w-3.5 h-3.5" />
                  ) : (
                    idx + 1
                  )}
                </div>
                <span className="text-[9px] font-bold text-amber-900 bg-amber-150/70 px-1 rounded shadow-sm scale-90 whitespace-nowrap mt-1">
                  Đảo {idx + 16}
                </span>
              </motion.div>
            );
          })}
        </div>

        <div className="text-xs text-amber-900 font-medium bg-amber-100/50 p-3 rounded-xl border border-amber-200/50">
          📍 **Mẹo hải tặc**: Tháp cấu tạo của Ester gồm gốc acid R-COO- liên kết với gốc hydrocarbon R' của alcohol. Mùi hương tự nhiên xuất phát từ các Ester tinh chất này!
        </div>
      </div>

      {/* Main Question view */}
      <div className="lg:col-span-7 flex flex-col gap-6">
        {/* Mascot companion speech */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <Mascot mood={activeMood} speechBubble={mascotText} className="shrink-0 w-28 h-28" />
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="text-xs font-mono text-slate-400">HẢI TRÌNH CÙNG ATOM:</span>
            <h3 className="text-slate-800 font-extrabold text-base sm:text-lg leading-normal">
              Đồng hành vượt khơi xa, khui mở cấu tạo và ngửi mùi hương quý của dứa chín, chuối xiêm!
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Chỉ có sự tinh nhạy về công thức cấu tạo mới giúp ta bẻ khóa được các rương cổ ngập vàng này.
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div id="stage2-card" className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-sky-700 bg-sky-50 px-3 py-1 rounded-full flex items-center gap-1">
              ⚓ CHẶNG 2: TRUY TÌM KHO BÁU
            </span>
            <span className="text-sm font-semibold text-slate-500">
              Hòn đảo {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>

          <h2 className="text-slate-800 font-extrabold text-base sm:text-xl leading-relaxed">
            {currentQuestion.question}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectTarget = currentQuestion.answer === idx;

              let buttonStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700';

              if (isAnswered) {
                if (isCorrectTarget) {
                  buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400/20';
                } else if (isSelected) {
                  buttonStyle = 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-400/20';
                } else {
                  buttonStyle = 'border-slate-150 bg-slate-50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-3 font-mono text-sm sm:text-base cursor-pointer ${buttonStyle}`}
                >
                  <span
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold font-sans text-xs shrink-0 ${
                      isAnswered && isCorrectTarget
                        ? 'bg-emerald-500 text-white'
                        : isAnswered && isSelected
                        ? 'bg-rose-500 text-white'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-5 rounded-xl bg-amber-50/50 border border-amber-100 space-y-3"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-amber-700" />
                <span className="font-extrabold text-sm text-amber-950">Kho tri thức biển khơi:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextClick}
                  className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-white py-2.5 px-6 rounded-xl font-bold hover:bg-neutral-950 shadow-sm transition-all text-sm group"
                >
                  {currentQuestionIndex + 1 === totalQuestions ? 'Nhận chuông hoàng gia' : 'Khai phá tiếp'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
