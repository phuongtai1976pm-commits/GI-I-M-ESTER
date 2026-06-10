import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, BookOpen, Award, Zap, Anchor, Bell, Lock, CheckCircle2, Trophy, HelpCircle } from 'lucide-react';
import { QUESTIONS } from './questions';
import { GameState } from './types';
import { Stage1 } from './components/Stage1';
import { Stage2 } from './components/Stage2';
import { Stage3 } from './components/Stage3';
import { Stage4, VictoryScreen } from './components/Stage4';
import { ReviewModal } from './components/ReviewModal';

export default function App() {
  // Load initial state from LocalStorage or build default values
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem('ester_decipher_game_state');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Lỗi khi khôi phục tiến trình từ localStorage:", e);
    }
    return {
      currentStage: 1,
      currentQuestionIndex: 0,
      stageScores: { 1: 0, 2: 0, 3: 0, 4: 0 },
      answersHistory: {},
      unlockedStages: [1],
      mascotMood: 'happy',
      lives: 3,
      sfxEnabled: true,
      isCompleted: false,
    };
  });

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'play' | 'info'>('play');

  // Sync state to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('ester_decipher_game_state', JSON.stringify(gameState));
    } catch (e) {
      console.error("Lỗi khi lưu trữ tiến trình vào localStorage:", e);
    }
  }, [gameState]);

  // Separate questions by stages
  const stage1Questions = QUESTIONS.filter((q) => q.stage === 1);
  const stage2Questions = QUESTIONS.filter((q) => q.stage === 2);
  const stage3Questions = QUESTIONS.filter((q) => q.stage === 3);
  const stage4Questions = QUESTIONS.filter((q) => q.stage === 4);

  // Helper score calculator
  const calculateTotalScore = () => {
    return (Object.values(gameState.stageScores) as number[]).reduce((a, b) => a + b, 0);
  };

  const calculateTotalCorrect = () => {
    return (Object.values(gameState.answersHistory) as Array<{ selectedIndex: number; isCorrect: boolean }>)
      .filter((x) => x.isCorrect).length;
  };

  // State handlers
  const handleAnswerQuestion = (questionId: number, selectedIndex: number, isCorrect: boolean) => {
    setGameState((prev) => {
      const nextHistory = {
        ...prev.answersHistory,
        [questionId]: { selectedIndex, isCorrect },
      };

      const scoreAddition = isCorrect ? 10 : 0;
      const nextStageScores = {
        ...prev.stageScores,
        [prev.currentStage]: (prev.stageScores[prev.currentStage] || 0) + scoreAddition,
      };

      return {
        ...prev,
        answersHistory: nextHistory,
        stageScores: nextStageScores,
        mascotMood: isCorrect ? 'happy' : 'sad',
      };
    });
  };

  const handleNextQuestion = () => {
    setGameState((prev) => ({
      ...prev,
      currentQuestionIndex: prev.currentQuestionIndex + 1,
      mascotMood: 'thinking',
    }));
  };

  const handleStageComplete = () => {
    setGameState((prev) => {
      const nextStage = prev.currentStage + 1;
      const unlocked = [...prev.unlockedStages];
      if (!unlocked.includes(nextStage) && nextStage <= 4) {
        unlocked.push(nextStage);
      }

      const isGameFinished = prev.currentStage === 4;

      return {
        ...prev,
        currentStage: isGameFinished ? 4 : nextStage,
        currentQuestionIndex: 0,
        unlockedStages: unlocked,
        isCompleted: isGameFinished,
        lives: 3, // Reset lives for next stage
        mascotMood: 'celebrating',
      };
    });
  };

  const handleSwitchStage = (stageNum: number) => {
    if (gameState.unlockedStages.includes(stageNum)) {
      setGameState((prev) => ({
        ...prev,
        currentStage: stageNum,
        currentQuestionIndex: 0,
        isCompleted: false,
      }));
    }
  };

  const handleRestartFullGame = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa lịch sử chơi và bắt đầu lại từ Chặng 1?")) {
      setGameState({
        currentStage: 1,
        currentQuestionIndex: 0,
        stageScores: { 1: 0, 2: 0, 3: 0, 4: 0 },
        answersHistory: {},
        unlockedStages: [1],
        mascotMood: 'happy',
        lives: 3,
        sfxEnabled: true,
        isCompleted: false,
      });
      localStorage.removeItem('ester_decipher_game_state');
    }
  };

  const toggleSound = () => {
    setGameState((prev) => ({
      ...prev,
      sfxEnabled: !prev.sfxEnabled,
    }));
  };

  // Compute progress bar variables
  const totalCorrectInGame = calculateTotalCorrect();
  const totalCompletedQuestions = Object.keys(gameState.answersHistory).length;
  const gameProgressPercent = Math.min(100, Math.round((totalCompletedQuestions / 60) * 100));

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col selection:bg-emerald-100 selection:text-emerald-900">
      
      {/* 1. Global Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-emerald-600 to-teal-500 rounded-xl flex items-center justify-center text-white shadow-md shadow-emerald-500/10">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold tracking-tight text-slate-900 uppercase">
                Hành Trình Giải Mã Ester
              </h1>
              <span className="text-[10px] sm:text-xs font-bold text-slate-400 block tracking-wider uppercase">
                Chinh Phục Đỉnh Cao Hóa Học 🏆
              </span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {/* XP Points */}
            <div className="bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/50 flex items-center gap-1.5 text-xs font-bold font-mono">
              <span className="text-teal-600">⚡ XP:</span>
              <span className="text-slate-800">{calculateTotalScore()}</span>
            </div>

            {/* Answer completion count */}
            <div className="bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/50 flex items-center gap-1.5 text-xs font-bold font-mono">
              <span className="text-emerald-600">✔ Đúng:</span>
              <span className="text-slate-800">{totalCorrectInGame} / 60</span>
            </div>

            {/* Stage indicator */}
            <div className="bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100 flex items-center gap-1.5 text-xs font-bold text-emerald-800">
              <span>🎯 Chặng:</span>
              <span>{gameState.currentStage} / 4</span>
            </div>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              className={`p-2 rounded-xl border hover:bg-slate-100 transition-all cursor-pointer ${
                gameState.sfxEnabled ? 'text-slate-755 border-slate-200' : 'text-slate-400 border-slate-200 bg-slate-50'
              }`}
              title="Bật/Tắt âm thanh hiệu ứng"
            >
              {gameState.sfxEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Study Manual Open Button */}
            <button
              onClick={() => setIsReviewOpen(true)}
              className="flex items-center gap-1.5 bg-neutral-900 border border-neutral-800 text-white font-bold text-xs py-2 px-4 rounded-xl shadow-sm hover:bg-neutral-950 transition-all cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Sổ Tay Ôn Tập ({totalCompletedQuestions})
            </button>
          </div>
        </div>
      </header>

      {/* 2. Global Stage Progress Path Indicators */}
      <div className="bg-white border-b border-slate-100 py-3 px-4 shadow-inner">
        <div className="max-w-4xl mx-auto space-y-3.5">
          {/* Progress bar line */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-bold text-slate-500">
              <span className="uppercase tracking-wider">Tiến trình chuỗi liên hoàn: {gameProgressPercent}% hoàn thành</span>
              <span>{totalCompletedQuestions} / 60 câu</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200/50">
              <motion.div
                className="bg-gradient-to-r from-teal-500 to-emerald-500 h-full"
                initial={{ width: 0 }}
                animate={{ width: `${gameProgressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>

          {/* Connected Step Nodes */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { num: 1, label: "1. Khởi động", icon: Zap, sub: "Nhanh Như Chớp (1-15)" },
              { num: 2, label: "2. Khám phá", icon: Anchor, sub: "Kho Báu Hải Tặc (16-30)" },
              { num: 3, label: "3. Đối đầu", icon: Bell, sub: "Rung Chuông Vàng (31-45)" },
              { num: 4, label: "4. Về đích", icon: Trophy, sub: "Vượt Trốn Trốn Thoát (46-60)" },
            ].map((node) => {
              const isActive = gameState.currentStage === node.num && !gameState.isCompleted;
              const isUnlocked = gameState.unlockedStages.includes(node.num);
              const isCompleted = node.num < gameState.currentStage || (gameState.isCompleted && node.num === 4);
              const NodeIcon = node.icon;

              return (
                <button
                  key={node.num}
                  disabled={!isUnlocked}
                  onClick={() => handleSwitchStage(node.num)}
                  className={`relative p-2.5 rounded-2xl border-2 text-left transition-all ${
                    isActive
                      ? 'bg-emerald-500/10 border-emerald-500 text-emerald-900 shadow-md ring-2 ring-emerald-500/20'
                      : isCompleted
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : isUnlocked
                      ? 'bg-white border-slate-200 text-slate-700 hover:border-slate-300'
                      : 'bg-slate-100/50 border-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive
                          ? 'bg-emerald-500 text-white'
                          : isCompleted
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <NodeIcon className="w-3.5 h-3.5" />}
                    </div>
                    <div className="truncate flex-1">
                      <span className="text-[10px] sm:text-xs font-extrabold block leading-none">
                        {node.label}
                      </span>
                      <span className="text-[8px] text-slate-400 block truncate leading-none mt-1 font-mono">
                        {node.sub}
                      </span>
                    </div>
                    {!isUnlocked && (
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0 absolute right-2.5 top-2.5" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Navigation Tab Selector (Play vs Curriculum details) */}
      <div className="max-w-7xl mx-auto w-full px-4 pt-6 flex justify-center">
        <div className="flex bg-slate-200/60 p-1 rounded-xl gap-2 w-full max-w-md">
          <button
            onClick={() => setActiveTab('play')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'play' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            🕹️ ĐẤU TRƯỜNG CHUNG SỨC
          </button>
          <button
            onClick={() => setActiveTab('info')}
            className={`flex-1 py-2 px-4 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'info' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            📋 HƯỚNG DẪN HỌC THUẬT
          </button>
        </div>
      </div>

      {/* 4. Main Body Workspace */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {activeTab === 'info' ? (
          /* Info Curriculum Guide Panel */
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 max-w-3xl mx-auto"
          >
            <div className="space-y-2 border-b border-slate-150 pb-4">
              <h3 className="text-xl font-extrabold text-slate-900">Sổ tay lí thuyết gốc Ester</h3>
              <p className="text-xs sm:text-sm text-slate-500">
                Ôn luyện nhanh cấu trúc phân tử, tính chất vật lí và cơ chế xà phòng hóa để chuẩn bị vượt mọi chặng đèo.
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
              <section className="space-y-2">
                <span className="font-extrabold text-emerald-800 text-sm block">1. Khái niệm và công thức chung:</span>
                <p>
                  Khi thay thế nhóm -OH ở nhóm carboxyl của carboxylic acid bằng nhóm -OR' của alcohol ta thu được ester.
                </p>
                <div className="p-3 bg-slate-50 border rounded-xl font-mono text-center text-slate-750">
                  Công thức chung Ester no, đơn chức, mạch hở: CnH2nO2 {"(n >= 2)"}
                </div>
              </section>

              <section className="space-y-2">
                <span className="font-extrabold text-emerald-800 text-sm block">2. Danh pháp (Đọc tên):</span>
                <p className="bg-emerald-50/50 p-3 rounded-lg border border-emerald-100/60 leading-normal">
                  <span className="font-bold text-emerald-950">Tên gốc Y (của alcohol) + gốc acid X-ate (thay đuôi -ic bằng -ate)</span>
                  <br />
                  Ví dụ: <code className="font-mono font-bold bg-white px-1">CH3COOC2H5</code> gồm gốc ethyl (-C2H5) và acetate (CH3COO-) {"=>"} <strong className="text-emerald-800">Ethyl acetate</strong>.
                </p>
              </section>

              <section className="space-y-2">
                <span className="font-extrabold text-emerald-800 text-sm block">3. Tính chất vật lí & Mùi thơm quen thuộc:</span>
                <p>Ester không tạo được liên kết hydro liên phân tử nên nhiệt độ sôi thấp hơn hẳn acid và alcohol có cùng khối lượng.</p>
                <div className="grid grid-cols-2 gap-3 font-mono text-[11px] sm:text-xs">
                  <div className="p-2 bg-yellow-50 rounded-lg border border-yellow-250">
                    🍌 Isoamyl acetate: Mùi chuối chín
                  </div>
                  <div className="p-2 bg-pink-50 rounded-lg border border-pink-250">
                    🌸 Benzyl acetate: Mùi hoa nhài
                  </div>
                  <div className="p-2 bg-sky-50 rounded-lg border border-sky-250">
                    🍍 Ethyl propionate: Mùi dứa chín
                  </div>
                  <div className="p-2 bg-emerald-50 rounded-lg border border-emerald-250">
                    🍑 Ethyl formate: Mùi quả đào chín
                  </div>
                </div>
              </section>

              <section className="space-y-2">
                <span className="font-extrabold text-emerald-800 text-sm block">4. Phản ứng hóa học quan trọng:</span>
                <p>
                  Phản ứng xà phòng hóa là phản ứng thủy phân ester trong môi trường bazơ kiềm (NaOH, KOH,...), xúc tác nhiệt độ là phản ứng một chiều tạo muối carboxylate và alcohol.
                </p>
                <div className="p-3 bg-neutral-900 border text-emerald-400 font-mono rounded-xl leading-normal text-[11px]">
                  {"R-COO-R' + NaOH -(t°) -> R-COONa + R'-OH"}
                </div>
              </section>
            </div>
            
            <div className="pt-4 border-t border-slate-150 flex justify-end">
              <button
                onClick={() => setActiveTab('play')}
                className="py-2.5 px-6 bg-slate-900 text-white font-bold rounded-xl text-sm hover:bg-slate-950"
              >
                Tiến Vào Đấu Trường Chơi Ngay 🕹️
              </button>
            </div>
          </motion.div>
        ) : gameState.isCompleted ? (
          /* Victory screen showing final stats & leaderboard */
          <AnimatePresence mode="wait">
            <VictoryScreen
              score={calculateTotalScore()}
              totalCorrectInGame={totalCorrectInGame}
              onRestart={handleRestartFullGame}
              history={gameState.answersHistory}
              onOpenReview={() => setIsReviewOpen(true)}
            />
          </AnimatePresence>
        ) : (
          /* Active Game Stage Component router */
          <div className="space-y-6">
            {gameState.currentStage === 1 && (
              <Stage1
                questions={stage1Questions}
                currentQuestionIndex={gameState.currentQuestionIndex}
                sfxEnabled={gameState.sfxEnabled}
                onAnswer={handleAnswerQuestion}
                onNext={handleNextQuestion}
                onStageComplete={handleStageComplete}
                score={gameState.stageScores[1] || 0}
              />
            )}

            {gameState.currentStage === 2 && (
              <Stage2
                questions={stage2Questions}
                currentQuestionIndex={gameState.currentQuestionIndex}
                sfxEnabled={gameState.sfxEnabled}
                onAnswer={handleAnswerQuestion}
                onNext={handleNextQuestion}
                onStageComplete={handleStageComplete}
                score={gameState.stageScores[2] || 0}
              />
            )}

            {gameState.currentStage === 3 && (
              <Stage3
                questions={stage3Questions}
                currentQuestionIndex={gameState.currentQuestionIndex}
                sfxEnabled={gameState.sfxEnabled}
                onAnswer={handleAnswerQuestion}
                onNext={handleNextQuestion}
                onStageComplete={handleStageComplete}
                score={gameState.stageScores[3] || 0}
                lives={gameState.lives}
                setLives={(newLives) => {
                  setGameState((prev) => ({
                    ...prev,
                    lives: typeof newLives === 'function' ? newLives(prev.lives) : newLives,
                  }));
                }}
              />
            )}

            {gameState.currentStage === 4 && (
              <Stage4
                questions={stage4Questions}
                currentQuestionIndex={gameState.currentQuestionIndex}
                sfxEnabled={gameState.sfxEnabled}
                onAnswer={handleAnswerQuestion}
                onNext={handleNextQuestion}
                onStageComplete={handleStageComplete}
                score={gameState.stageScores[4] || 0}
                globalHistory={gameState.answersHistory}
                totalCorrectInGame={totalCorrectInGame}
                onRestartGame={handleRestartFullGame}
              />
            )}
          </div>
        )}
      </main>

      {/* 5. Clean, Professional Footer with restart controls */}
      <footer className="mt-12 bg-white border-t border-slate-100 py-6 text-center text-xs text-slate-400 font-medium space-y-2">
        <p>
          HÀNH TRÌNH GIẢI MÃ ESTER - CHINH PHỤC ĐỈNH CAO HÓA HỌC © 2026. Lập trình bằng Vector Flat 2.0 & Motion.
        </p>
        <p className="font-mono text-[10px]">
          Mascot: Atom Chú mèo Chemist. Phiên bản học tập Trung học phổ thông.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={handleRestartFullGame}
            className="text-red-500 hover:text-red-600 font-bold hover:underline cursor-pointer"
          >
            ⚠️ Xóa tiến trình học tập (Chơi lại từ đầu)
          </button>
        </div>
      </footer>

      {/* 6. Comprehensive Review Study Modal */}
      <ReviewModal
        isOpen={isReviewOpen}
        onClose={() => setIsReviewOpen(false)}
        questions={QUESTIONS}
        history={gameState.answersHistory}
      />
    </div>
  );
}
