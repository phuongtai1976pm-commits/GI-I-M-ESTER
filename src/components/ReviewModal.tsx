import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, X, CheckCircle2, AlertCircle } from 'lucide-react';
import { Question } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  questions: Question[];
  history: Record<number, { selectedIndex: number; isCorrect: boolean }>;
  currentStageOnly?: number; // Optional filter to only show current stage's review
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  questions,
  history,
  currentStageOnly,
}) => {
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'correct'>('all');

  if (!isOpen) return null;

  // Filter questions that have been answered in history
  const answeredQuestions = questions.filter((q) => {
    const hasHistory = history[q.id] !== undefined;
    const matchesStage = currentStageOnly ? q.stage === currentStageOnly : true;
    return hasHistory && matchesStage;
  });

  const filteredQuestions = answeredQuestions.filter((q) => {
    const record = history[q.id];
    if (filter === 'correct') return record?.isCorrect;
    if (filter === 'incorrect') return !record?.isCorrect;
    return true;
  });

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-3xl max-h-[85vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-slate-100"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/10 rounded-xl">
                <BookOpen className="w-6 h-6 text-emerald-100" />
              </div>
              <div>
                <h3 className="text-xl font-bold tracking-tight">Sổ Tay Ôn Tập Ester</h3>
                <p className="text-xs text-teal-100">
                  {currentStageOnly ? `Xem lại kết quả Chặng ${currentStageOnly}` : 'Tổng hợp kết quả hành trình của bạn'}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-white/10 transition-colors"
              aria-label="Đóng"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex bg-slate-50 border-b border-slate-100 p-2 gap-2">
            {(['all', 'incorrect', 'correct'] as const).map((tab) => {
              const label =
                tab === 'all'
                  ? 'Tất cả câu trả lời'
                  : tab === 'incorrect'
                  ? 'Câu làm sai ❌'
                  : 'Câu làm đúng  ';
              const active = filter === tab;
              return (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`flex-1 py-2 px-3 text-sm font-semibold rounded-xl transition-all ${
                    active
                      ? 'bg-neutral-800 text-white shadow-sm'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Content list */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
            {filteredQuestions.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                  <AlertCircle className="w-8 h-8" />
                </div>
                <h4 className="text-slate-700 font-bold">Không tìm thấy câu hỏi phù hợp</h4>
                <p className="text-sm text-slate-500 mt-1">
                  {filter === 'incorrect'
                    ? 'Tuyệt vời! Bạn chưa làm sai câu hỏi nào.'
                    : 'Hãy tham gia chơi game để tích lũy dữ liệu bài tập.'}
                </p>
              </div>
            ) : (
              filteredQuestions.map((q, idx) => {
                const record = history[q.id];
                const isCorrect = record?.isCorrect;
                const chosenIdx = record?.selectedIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-5 rounded-2xl border bg-white shadow-sm transition-all ${
                      isCorrect ? 'border-emerald-100 hover:border-emerald-200' : 'border-rose-100 hover:border-rose-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span
                        className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0 mt-0.5 ${
                          isCorrect ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                        }`}
                      >
                        {q.id}
                      </span>
                      <div className="space-y-4 flex-1">
                        <h4 className="text-slate-800 font-bold text-sm sm:text-base leading-snug">
                          {q.question}
                        </h4>

                        {/* Options Display */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, oIdx) => {
                            const isThisCorrect = oIdx === q.answer;
                            const isThisChosen = oIdx === chosenIdx;

                            let optionStyle = 'border-slate-200 text-slate-700 bg-white';
                            if (isThisCorrect) {
                              optionStyle = 'border-emerald-300 bg-emerald-50 text-emerald-800 font-medium';
                            } else if (isThisChosen && !isCorrect) {
                              optionStyle = 'border-rose-300 bg-rose-50/70 text-rose-800';
                            }

                            return (
                              <div
                                key={oIdx}
                                className={`flex items-center gap-2 p-2.5 rounded-xl border text-xs sm:text-sm ${optionStyle}`}
                              >
                                {isThisCorrect ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                                ) : isThisChosen ? (
                                  <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-[10px] shrink-0">
                                    ✗
                                  </span>
                                ) : (
                                  <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-slate-400 font-mono text-[10px] shrink-0">
                                    {String.fromCharCode(65 + oIdx)}
                                  </span>
                                )}
                                <span className="font-mono">{opt}</span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Explanation Box */}
                        <div className="p-4 rounded-xl bg-teal-50/40 border border-teal-100/60 text-xs sm:text-sm">
                          <span className="font-bold text-teal-800 block mb-1">💡 Giải thích chi tiết:</span>
                          <p className="text-slate-600 leading-relaxed text-xs sm:text-sm font-sans">{q.explanation}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
            <button
              onClick={onClose}
              className="py-2.5 px-6 bg-slate-800 text-slate-100 hover:bg-slate-900 text-sm font-semibold rounded-xl transition-all"
            >
              Đã hiểu, đóng ôn tập
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
