import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Bell, Award, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { Question } from '../types';
import { Mascot } from './Mascot';
import { playTing, playBloop, playBell, playPowerUp } from '../utils/audio';

interface Stage3Props {
  questions: Question[]; // filtered for stage 3 (Q31 - Q45)
  currentQuestionIndex: number;
  sfxEnabled: boolean;
  onAnswer: (questionId: number, selectedIndex: number, isCorrect: boolean) => void;
  onNext: () => void;
  onStageComplete: () => void;
  score: number;
  lives: number;
  setLives: React.Dispatch<React.SetStateAction<number>>;
}

export const Stage3: React.FC<Stage3Props> = ({
  questions,
  currentQuestionIndex,
  sfxEnabled,
  onAnswer,
  onNext,
  onStageComplete,
  score,
  lives,
  setLives,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [mascotText, setMascotText] = useState("Chào mừng bạn tới Điện thờ Rung Chuông Vàng! Thủy phân ester trong kiềm và axit là vũ khí sắc bén nhất ở đây!");
  const [showBellRing, setShowBellRing] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQuestion.answer;
    if (isCorrect) {
      playTing(sfxEnabled);
      setMascotText("Quá xuất sắc! Bạn đang ở rất gần bục vinh quang Rung chuông rồi!");
    } else {
      playBloop(sfxEnabled);
      const nextLives = Math.max(0, lives - 1);
      setLives(nextLives);
      if (nextLives === 0) {
        setMascotText("Hết lượt rồi! Nhưng đừng lo, Atom sẽ kích hoạt bình cứu trợ hóa học để bạn tiếp tục!");
      } else {
        setMascotText("Sai rồi! Sức nóng của môi trường kiềm đang làm kiệt sức chúng ta. Hãy cố lên!");
      }
    }

    onAnswer(currentQuestion.id, optionIdx, isCorrect);
  };

  const handleRescue = () => {
    setLives(3);
    setMascotText("Hồi sinh thành công! Hãy cẩn trọng hơn với các sản phẩm tạo muối xà phòng hóa nhé!");
  };

  const handleNextClick = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    if (currentQuestionIndex + 1 >= totalQuestions) {
      // Trigger the spectacular Bell ring sequence!
      playBell(sfxEnabled);
      setShowBellRing(true);
    } else {
      onNext();
    }
  };

  const handleBellRingUnlock = () => {
    playPowerUp(sfxEnabled);
    onStageComplete();
  };

  let activeMood: 'thinking' | 'happy' | 'sad' | 'celebrating' = 'thinking';
  if (isAnswered) {
    if (selectedOption === currentQuestion.answer) {
      activeMood = 'happy';
    } else {
      activeMood = 'sad';
    }
  } else {
    activeMood = 'thinking';
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Sàn đấu Arena stats / Bell indicator */}
      <div className="lg:col-span-4 bg-yellow-500/10 border border-yellow-500/30 rounded-3xl p-6 shadow-xl flex flex-col gap-6 text-slate-800">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-6 h-6 text-yellow-600 animate-bounce shrink-0" />
            <h4 className="font-extrabold text-lg text-yellow-950 tracking-tight">Sàn Trí Tuệ</h4>
          </div>
          <span className="text-xs bg-yellow-400/20 text-yellow-800 font-bold px-2 px-2.5 py-1 rounded-full">
            Chuông Vàng
          </span>
        </div>

        {/* Lives indicators */}
        <div className="p-4 bg-white/70 backdrop-blur rounded-2xl border border-yellow-200/50 space-y-2.5">
          <span className="text-xs font-mono text-slate-500 block">SỐ LƯỢT TRẢ LỜI CÒN LẠI:</span>
          <div className="flex items-center gap-2">
            {[1, 2, 3].map((heart) => (
              <motion.div
                key={heart}
                animate={lives >= heart ? { scale: [1, 1.15, 1] } : { scale: 1 }}
                transition={{ repeat: lives >= heart ? Infinity : 0, duration: 2, delay: heart * 0.1 }}
              >
                <Heart
                  className={`w-8 h-8 ${
                    lives >= heart ? 'text-red-500 fill-red-500' : 'text-slate-300'
                  } transition-all`}
                />
              </motion.div>
            ))}
          </div>
          {lives === 0 && (
            <button
              onClick={handleRescue}
              className="mt-2 w-full flex items-center justify-center gap-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadow transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Kích hoạt cứu trợ hồi sinh (Đầy Tim)
            </button>
          )}
        </div>

        {/* Progress gauge inside the bell */}
        <div className="relative flex flex-col items-center justify-center p-6 bg-amber-50 rounded-2xl border border-amber-200 shadow-inner">
          <motion.div
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
            className="w-24 h-24 text-yellow-500 flex items-center justify-center"
          >
            <Bell className="w-20 h-20 filter drop-shadow" />
          </motion.div>
          <div className="text-center mt-2">
            <span className="text-xs font-bold text-amber-900">
              ĐÃ VƯỢT QUA: {currentQuestionIndex} / {totalQuestions} CÂU
            </span>
            <div className="w-32 bg-amber-200/50 h-2 rounded-full overflow-hidden mt-1.5 mx-auto">
              <div
                className="bg-yellow-500 h-full transition-all duration-300"
                style={{ width: `${(currentQuestionIndex / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed text-center font-medium">
          Mục tiêu: Hoàn thiện 15 câu xà phòng hóa trong môi trường kiềm và axit để khai thông khóa cửa của phòng thí nghiệm ở chặng cuối!
        </p>
      </div>

      {/* Main quiz interface */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Mascot companion speech */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <Mascot mood={activeMood} speechBubble={mascotText} className="shrink-0 w-28 h-28" />
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="text-xs font-mono text-slate-400 font-bold text-yellow-700">ĐẠI ĐIỆN RUNG CHUÔNG:</span>
            <h3 className="text-slate-800 font-extrabold text-base sm:text-lg leading-normal">
              Sân chơi này đòi hỏi sự thông thấu về gốc Ester! CH3COOC2H5 hay HCOOCH3 khi tác dụng NaOH sẽ ra chất gì?
            </h3>
            <p className="text-xs text-slate-500">
              Mỗi câu đúng là bước đệm lớn thắp sáng đỉnh chuông vàng linh thiêng.
            </p>
          </div>
        </div>

        {/* Question card */}
        <div id="stage3-card" className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-yellow-700 bg-yellow-50 px-3 py-1 rounded-full flex items-center gap-1">
              🔔 CHẶNG 3: RUNG CHUÔNG VÀNG
            </span>
            <span className="text-sm font-semibold text-slate-500">
              Câu {currentQuestionIndex + 1} / {totalQuestions}
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
                  disabled={isAnswered || lives === 0}
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
              className="mt-4 p-5 rounded-xl bg-yellow-50/40 border border-yellow-200/40 space-y-3"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-yellow-700" />
                <span className="font-extrabold text-sm text-yellow-950">Bảo bối lý thuyết:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextClick}
                  className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-white py-2.5 px-6 rounded-xl font-bold hover:bg-neutral-950 shadow-sm transition-all text-sm group"
                >
                  {currentQuestionIndex + 1 === totalQuestions ? 'Rung Chuông Vàng! 🎉' : 'Tiếp tục đấu trường'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Spectacular Golden Bell Ring Animation Overlay */}
      <AnimatePresence>
        {showBellRing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-slate-900 border border-yellow-400 rounded-3xl p-8 max-w-md w-full text-center space-y-6 shadow-[0_0_50px_rgba(234,179,8,0.3)] text-white"
            >
              <motion.div
                animate={{ rotate: [-10, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, ease: 'easeInOut', repeat: Infinity }}
                className="w-28 h-28 mx-auto text-yellow-400 bg-yellow-500/10 p-4 rounded-full flex items-center justify-center border-2 border-yellow-400/30"
              >
                <Bell className="w-20 h-20 filter drop-shadow-[0_0_15px_rgba(234,179,8,0.5)]" />
              </motion.div>

              <div className="space-y-2">
                <h3 className="text-2xl font-extrabold text-yellow-400 tracking-tight">Keng! Keng! Keng! 🎉</h3>
                <p className="text-sm text-slate-300">
                  Tiếng chuông vàng hoàng gia ngân vang huy hoàng! Bạn đã vượt qua 15 thử thách phức tạp về phản ứng xà phòng hóa thế học.
                </p>
              </div>

              <div className="p-4 bg-slate-800/80 rounded-2xl border border-slate-700 space-y-2 text-xs text-slate-400 font-mono text-left list-none">
                <li className="flex items-center gap-1.5 text-emerald-400">✔ Thủy phân tạo sodium acetate hoàn tất.</li>
                <li className="flex items-center gap-1.5 text-emerald-400">✔ Nhận diện rượu ethyl alcohol hoàn tất.</li>
                <li className="flex items-center gap-1.5 text-yellow-400">🔒 Giải mã cửa hầm thí nghiệm: Sẵn sàng tuyển chọn!</li>
              </div>

              <button
                onClick={handleBellRingUnlock}
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 hover:from-yellow-600 hover:to-amber-700 text-slate-950 font-extrabold py-3.5 px-6 rounded-2xl shadow-lg hover:shadow-yellow-500/20 transition-all font-sans"
              >
                Tiến Vào Phòng Thí Nghiệm & Trốn Thoát! 🚀
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
