import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Zap, HelpCircle, ArrowRight, Award } from 'lucide-react';
import { Question } from '../types';
import { Mascot } from './Mascot';
import { playTing, playBloop, playPowerUp } from '../utils/audio';

interface Stage1Props {
  questions: Question[]; // filtered for stage 1 (15 questions)
  currentQuestionIndex: number;
  sfxEnabled: boolean;
  onAnswer: (questionId: number, selectedIndex: number, isCorrect: boolean) => void;
  onNext: () => void;
  onStageComplete: () => void;
  score: number;
}

export const Stage1: React.FC<Stage1Props> = ({
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
  const [mascotText, setMascotText] = useState("Chào các nhà hóa học trẻ! Hãy vượt qua cỗ máy sấm sét này nào!");

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQuestion.answer;
    if (isCorrect) {
      playTing(sfxEnabled);
      setMascotText("Tuyệt vời! Sấm sét đang nạp năng lượng cho ta!");
    } else {
      playBloop(sfxEnabled);
      setMascotText("Chưa đúng rồi! Đừng lo, đọc kỹ giải thích nhé!");
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
      setMascotText("Tiến lên nấc thang tiếp theo! Tốc độ lên nào!");
      onNext();
    }
  };

  // Determine mascot mood based on response
  let activeMood: 'thinking' | 'happy' | 'sad' | 'charging' = 'thinking';
  if (isAnswered) {
    if (selectedOption === currentQuestion.answer) {
      activeMood = 'charging'; // lightning charging!
    } else {
      activeMood = 'sad';
    }
  } else {
    activeMood = currentQuestionIndex % 2 === 0 ? 'thinking' : 'happy';
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Flight Ladder / Voltage indicators */}
      <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col gap-4 text-slate-100">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-6 h-6 text-yellow-400 animate-pulse shrink-0" />
          <h4 className="font-bold text-lg tracking-tight">Thang Điện Sấm Sét</h4>
        </div>

        <p className="text-xs text-slate-400 leading-normal">
          Mỗi câu trả lời đúng sẽ thắp sáng một nấc thang năng lượng. Chạm mốc 15 để nhận Bản đồ Kho báu!
        </p>

        {/* 15 indicator dots */}
        <div className="flex flex-col-reverse gap-1.5 mt-2">
          {questions.map((q, idx) => {
            const isCurrent = idx === currentQuestionIndex;
            const isPassed = idx < currentQuestionIndex;
            return (
              <motion.div
                key={q.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.03 }}
                className={`flex items-center gap-3 p-1.5 rounded-xl text-xs font-semibold border transition-all ${
                  isCurrent
                    ? 'bg-yellow-500/20 border-yellow-400 text-yellow-300 shadow-[0_0_12px_rgba(234,179,8,0.2)]'
                    : isPassed
                    ? 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300'
                    : 'bg-slate-800/40 border-slate-700/50 text-slate-500'
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-lg flex items-center justify-center font-mono font-bold shrink-0 text-[10px] ${
                    isCurrent
                      ? 'bg-yellow-400 text-slate-900 animate-pulse'
                      : isPassed
                      ? 'bg-emerald-500 text-slate-950'
                      : 'bg-slate-700 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </div>
                <div className="flex-1 truncate">
                  {isPassed ? '⚡ ĐÃ HOÀN THÀNH' : isCurrent ? '👉 HIỆN TẠI' : `Khóa mức ${idx + 1}`}
                </div>
                {isPassed && <span className="text-[10px] text-emerald-400">⚡</span>}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Main Question view */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Mascot Speech Bubble & Avatar container */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <Mascot mood={activeMood} speechBubble={mascotText} className="shrink-0 w-28 h-28" />
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="text-xs font-mono text-slate-400">MASCOT ATOM ĐỒNG HÀNH:</span>
            <h3 className="text-slate-800 font-bold text-lg leading-snug">
              Nhà nghiên cứu nhí sẽ giúp bạn vượt qua những rào cản khái niệm ban đầu của Ester!
            </h3>
            <p className="text-xs text-slate-500">
              Công thức tổng quát, đồng phân học và tên gọi gốc acid-alcohol cơ bản sẽ được củng cố ở đây.
            </p>
          </div>
        </div>

        {/* Question Card */}
        <div id="stage1-card" className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 relative overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-yellow-600 bg-yellow-50 px-3 py-1 rounded-full flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-yellow-500 text-yellow-500" /> CHẶNG 1: NHANH NHƯ CHỚP
            </span>
            <span className="text-sm font-semibold text-slate-500">
              Câu {currentQuestionIndex + 1} / {totalQuestions}
            </span>
          </div>

          {/* Question title */}
          <div className="space-y-2">
            <h2 className="text-slate-800 font-extrabold text-base sm:text-xl leading-relaxed">
              {currentQuestion.question}
            </h2>
          </div>

          {/* 4 Choices Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {currentQuestion.options.map((opt, idx) => {
              const isSelected = selectedOption === idx;
              const isCorrectTarget = currentQuestion.answer === idx;

              let buttonStyle = 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/70 text-slate-700';

              if (isAnswered) {
                if (isCorrectTarget) {
                  buttonStyle = 'border-emerald-500 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-400/20';
                } else if (isSelected) {
                  buttonStyle = 'border-rose-500 bg-rose-50 text-rose-800 ring-2 ring-rose-400/20';
                } else {
                  buttonStyle = 'border-slate-100 bg-slate-50/50 text-slate-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleOptionClick(idx)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center gap-3 font-mono text-sm sm:text-base cursor-pointer ${buttonStyle}`}
                >
                  <span
                    className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold font-sans text-sm ${
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

          {/* Answer explanation panel */}
          {isAnswered && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-5 rounded-2xl bg-slate-50 border border-slate-100 space-y-3"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
                <span className="font-extrabold text-sm text-slate-700">Giải thích chi tiết:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextClick}
                  className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 text-white py-2.5 px-6 rounded-xl font-bold hover:bg-neutral-950 shadow-sm transition-all text-sm group"
                >
                  {currentQuestionIndex + 1 === totalQuestions ? 'Hoàn thành chặng 1' : 'Tiếp tục'}
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
