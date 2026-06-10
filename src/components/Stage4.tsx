import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, Unlock, HelpCircle, ArrowRight, Award, Trophy, UserCheck, RefreshCw } from 'lucide-react';
import { Question } from '../types';
import { Mascot } from './Mascot';
import { playTing, playBloop, playVictory } from '../utils/audio';

interface Stage4Props {
  questions: Question[]; // filtered for stage 4 (Q46 - Q60)
  currentQuestionIndex: number;
  sfxEnabled: boolean;
  onAnswer: (questionId: number, selectedIndex: number, isCorrect: boolean) => void;
  onNext: () => void;
  onStageComplete: () => void;
  score: number;
  globalHistory: Record<number, { selectedIndex: number; isCorrect: boolean }>;
  totalCorrectInGame: number;
  onRestartGame: () => void;
}

export const Stage4: React.FC<Stage4Props> = ({
  questions,
  currentQuestionIndex,
  sfxEnabled,
  onAnswer,
  onNext,
  onStageComplete,
  score,
  globalHistory,
  totalCorrectInGame,
  onRestartGame,
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [mascotText, setMascotText] = useState("Ta đã bị khóa trong phòng thí nghiệm hóa hợp! Mỗi mã đáp án Ester đúng sẽ là một mấu chốt để bẻ bánh răng khóa!");
  const [studentName, setStudentName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Array<{ name: string; score: number; stage: string }>>([
    { name: "Phạm Hữu Bằng", score: 58, stage: "Đã trốn thoát" },
    { name: "Lê Minh Hằng", score: 54, stage: "Đã trốn thoát" },
    { name: "Nguyễn Vũ Thái", score: 49, stage: "Đã trốn thoát" },
    { name: "Trần Bảo Long", score: 45, stage: "Đã trốn thoát" },
  ]);

  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;

  const handleOptionClick = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    const isCorrect = optionIdx === currentQuestion.answer;
    if (isCorrect) {
      playTing(sfxEnabled);
      setMascotText("Mật mã liên kết chính xác! Một bánh răng khóa cơ học vừa quay tạch mở!");
    } else {
      playBloop(sfxEnabled);
      setMascotText("Oái, điện trở chặn lại rồi! Hãy suy ngẫm lý thuyết điều chế!");
    }

    onAnswer(currentQuestion.id, optionIdx, isCorrect);
  };

  const handleNextClick = () => {
    setIsAnswered(false);
    setSelectedOption(null);
    if (currentQuestionIndex + 1 >= totalQuestions) {
      playVictory(sfxEnabled);
      onStageComplete();
    } else {
      setMascotText("Nốt khóa điện tử tiếp theo! Ta sắp trốn thoát rồi!");
      onNext();
    }
  };

  const handleRegisterLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const newLeaderboard = [
      ...leaderboard,
      { name: studentName.trim(), score: totalCorrectInGame, stage: "Đã trốn thoát 🏆" }
    ].sort((a, b) => b.score - a.score);

    setLeaderboard(newLeaderboard);
    setIsRegistered(true);
  };

  let activeMood: 'thinking' | 'happy' | 'sad' | 'charging' = 'thinking';
  if (isAnswered) {
    if (selectedOption === currentQuestion.answer) {
      activeMood = 'charging';
    } else {
      activeMood = 'sad';
    }
  } else {
    activeMood = 'thinking';
  }

  // Is game finished fully? Let's check status
  const isAllDone = currentQuestionIndex >= totalQuestions;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Encryption panel devices */}
      <div className="lg:col-span-4 bg-slate-950 border border-emerald-500/30 rounded-3xl p-6 shadow-xl flex flex-col gap-6 text-emerald-400 font-mono">
        <div className="flex items-center justify-between border-b border-emerald-500/20 pb-3">
          <div className="flex items-center gap-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
            >
              <RefreshCw className="w-5 h-5 text-emerald-500 shrink-0" />
            </motion.div>
            <h4 className="font-extrabold text-sm tracking-tight">KÍNH GIẢI TRÌNH</h4>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
            ONLINE
          </span>
        </div>

        {/* 15 Cipher lock dots */}
        <div className="space-y-3">
          <span className="text-xs text-slate-400 block font-sans font-semibold">CÁC NỐT KHOÁ ĐIỆN TỬ (15):</span>
          <div className="grid grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isCurrent = idx === currentQuestionIndex;
              const isPassed = idx < currentQuestionIndex;
              return (
                <div
                  key={q.id}
                  className={`h-11 rounded-xl flex flex-col items-center justify-center border text-xs font-bold transition-all ${
                    isCurrent
                      ? 'border-yellow-400 bg-yellow-500/10 text-yellow-300 shadow-[0_0_8px_rgba(234,179,8,0.3)] animate-pulse'
                      : isPassed
                      ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400'
                      : 'border-slate-800 bg-slate-900/40 text-slate-600'
                  }`}
                >
                  <span className="text-[9px] text-slate-500">#{idx + 46}</span>
                  {isPassed ? <Unlock className="w-3.5 h-3.5 text-emerald-400" /> : <Lock className="w-3.5 h-3.5" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Decoder parameters */}
        <div className="p-4 bg-emerald-950/40 border border-emerald-500/20 rounded-2xl space-y-2 text-xs text-emerald-300/80 font-sans leading-relaxed">
          <h5 className="font-bold text-emerald-400 font-mono">🔒 SƠ ĐỒ ĐIỀU CHẾ CHUNG:</h5>
          <p>
            R-COOH + R'-OH (H2SO4 đặc, t°) ⇆ R-COOR' + H2O.
          </p>
          <p className="text-[11px] text-slate-400">
            Hãy chú ý: các gốc formic HCOO- giúp Ester phản ứng tráng bạc. Methanol sinh rượu methyl alcohol.
          </p>
        </div>
      </div>

      {/* Main question cards list */}
      <div className="lg:col-span-8 flex flex-col gap-6">
        {/* Mascot partner */}
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col sm:flex-row items-center gap-6">
          <Mascot mood={activeMood} speechBubble={mascotText} className="shrink-0 w-28 h-28" />
          <div className="space-y-1 text-center sm:text-left flex-1">
            <span className="text-xs font-mono text-slate-400 font-bold">CỔNG BẢO MẬT PHÒNG THÍ NGHIỆM:</span>
            <h3 className="text-slate-800 font-extrabold text-base sm:text-lg leading-normal">
              Bạn đang ở chặng cuối cùng để thoát ra! Mọi nỗ lực học thuật Ester của bạn đều hội tụ tại đây.
            </h3>
            <p className="text-xs text-slate-500">
              Hãy cẩn trọng đưa ra quyết định để giải phóng an toàn cho Mascot Atom.
            </p>
          </div>
        </div>

        {/* Panel Question */}
        <div id="stage4-card" className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-1">
              🧪 CHẶNG 4: THỬ THÁCH TRỐN THOÁT
            </span>
            <span className="text-sm font-semibold text-slate-500">
              Mã bảo mật {currentQuestionIndex + 1} / {totalQuestions}
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
              className="mt-4 p-5 rounded-xl bg-emerald-50/20 border border-emerald-100/50 space-y-3"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-800" />
                <span className="font-extrabold text-sm text-emerald-950">Giải mã khóa hóa học:</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                {currentQuestion.explanation}
              </p>

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleNextClick}
                  className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-white py-2.5 px-6 rounded-xl font-bold hover:bg-neutral-950 shadow-sm transition-all text-sm group"
                >
                  {currentQuestionIndex + 1 === totalQuestions ? 'Giải Mã Thành Công! 🚪' : 'Tiếp tục giải mã'}
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

// COMPONENT VICTORY SUMMARY
interface VictoryScreenProps {
  score: number;
  totalCorrectInGame: number;
  onRestart: () => void;
  history: Record<number, { selectedIndex: number; isCorrect: boolean }>;
  onOpenReview: () => void;
}

export const VictoryScreen: React.FC<VictoryScreenProps> = ({
  score,
  totalCorrectInGame,
  onRestart,
  history,
  onOpenReview,
}) => {
  const [studentName, setStudentName] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [leaderboard, setLeaderboard] = useState<Array<{ name: string; score: number; stage: string }>>([
    { name: "Phạm Hữu Bằng", score: 58, stage: "Đã trốn thoát" },
    { name: "Lê Minh Hằng", score: 54, stage: "Đã trốn thoát" },
    { name: "Nguyễn Vũ Thái", score: 49, stage: "Đã trốn thoát" },
    { name: "Trần Bảo Long", score: 45, stage: "Đã trốn thoát" },
  ]);

  const handleRegisterLeaderboard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim()) return;

    const newLeaderboard = [
      ...leaderboard,
      { name: studentName.trim(), score: totalCorrectInGame, stage: "Đã trốn thoát 🏆" }
    ].sort((a, b) => b.score - a.score);

    setLeaderboard(newLeaderboard);
    setIsRegistered(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-2xl max-w-4xl mx-auto"
    >
      {/* Upper header */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-yellow-600 text-white p-8 text-center space-y-2 relative overflow-hidden">
        {/* Particle circles background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,#ffffff10_8px,transparent_8px)] [background-size:20px_20px] pointer-events-none" />
        <Trophy className="w-16 h-16 text-yellow-300 mx-auto animate-bounce filter drop-shadow" />
        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">HÀNH TRÌNH GIẢI MÃ ESTER THÀNH CÔNG!</h2>
        <p className="text-teal-100 text-sm sm:text-base max-w-xl mx-auto font-medium">
          Xin chúc mừng! Bạn đã xuất sắc giải mã toàn bộ 60 câu hỏi, bẻ mọi nấc thang sấm sét, thu hết hòm vàng rương bau, rung chuông vàng và trốn thoát khỏi phòng thí nghiệm hóa học!
        </p>
      </div>

      {/* Grid details */}
      <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        {/* Certificate card stats */}
        <div className="md:col-span-7 space-y-6">
          <div className="border-3 border-dashed border-emerald-500/20 p-6 rounded-2xl bg-slate-50/50 space-y-4">
            <div className="flex items-center gap-3">
              <Award className="w-8 h-8 text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-extrabold text-slate-800 text-lg leading-tight">Chứng Nhận Chinh Phục Ester</h4>
                <span className="text-xs text-slate-400">CỦA BỘ MÔN HÓA HỌC SƠ CẤP</span>
              </div>
            </div>

            <div className="border-t border-slate-200/60 pt-4 grid grid-cols-2 gap-4">
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-mono">TỔNG SỐ ĐIỂM:</span>
                <span className="text-2xl font-extrabold text-slate-800">{score} XP</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-100">
                <span className="text-[10px] text-slate-400 block font-mono">SỐ CÂU ĐÚNG:</span>
                <span className="text-2xl font-extrabold text-emerald-600">{totalCorrectInGame} / 60</span>
              </div>
            </div>

            <div className="text-xs text-slate-500 leading-relaxed font-sans">
              🏆 **Thành tựu đạt được**: Thâu tóm 100% kiến thức trọng tâm Trung học phổ thông Quốc gia về phân nhóm chức ester, đồng phân C2/C3/C4, tên gọi danh pháp gốc và phản ứng thủy phân đặc trưng một chiều sút muối.
            </div>
          </div>

          {/* Add score to leaderboard form */}
          {!isRegistered ? (
            <form onSubmit={handleRegisterLeaderboard} className="p-6 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
              <h4 className="font-extrabold text-sm text-slate-800">Khắc tên lên bảng vàng chiến tích:</h4>
              <p className="text-xs text-slate-500">Hãy nhập tên của bạn để lưu kết quả vào Bảng xếp hạng vinh dự của tuần!</p>
              <div className="flex gap-2.5">
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="flex-1 bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-white font-extrabold text-sm py-2.5 px-6 rounded-xl flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                >
                  <UserCheck className="w-4 h-4" /> Ghi danh
                </button>
              </div>
            </form>
          ) : (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-emerald-800 text-sm font-bold flex items-center gap-2">
              🎉 Bạn đã ghi danh bảng vàng học tập thành công!
            </div>
          )}

          {/* Dual Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenReview}
              className="flex-1 bg-neutral-900 hover:bg-neutral-950 text-white font-bold py-3 px-6 rounded-xl text-sm transition-all text-center cursor-pointer"
            >
              📓 Xem lại toàn bộ 60 câu giải thích
            </button>
            <button
              onClick={onRestart}
              className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 px-6 rounded-xl text-sm transition-all text-center cursor-pointer"
            >
              🔄 Chơi lại từ đầu (Reset game)
            </button>
          </div>
        </div>

        {/* Leaderboard panel list */}
        <div className="md:col-span-5 bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
            <Trophy className="w-5 h-5 text-yellow-500 shrink-0" />
            <h4 className="font-extrabold text-slate-800 text-base">BẢNG VÀNG DANH DỰ</h4>
          </div>

          <div className="space-y-2.5">
            {leaderboard.map((player, pIdx) => {
              const isUser = player.name === studentName;
              return (
                <div
                  key={pIdx}
                  className={`p-3 rounded-xl flex items-center justify-between text-xs sm:text-sm border transition-all ${
                    isUser
                      ? 'bg-yellow-50 border-yellow-300 text-yellow-950 font-bold scale-[1.02]'
                      : 'bg-white border-slate-150 text-slate-650'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] sm:text-xs ${
                        pIdx === 0
                          ? 'bg-yellow-400 text-yellow-950'
                          : pIdx === 1
                          ? 'bg-slate-300 text-slate-800'
                          : pIdx === 2
                          ? 'bg-amber-600 text-[#FFF5EB]'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      #{pIdx + 1}
                    </span>
                    <span className="truncate max-w-[120px]">{player.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] text-slate-400 font-mono italic">{player.stage}</span>
                    <span className="font-bold text-slate-800">{player.score}/60 đúng</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
