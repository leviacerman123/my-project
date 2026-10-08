import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Heart, RotateCcw, ChevronDown, Globe } from 'lucide-react';
import confetti from 'canvas-confetti';

/* ============================================================================
 * КРИТИЧЕСКИЙ КОНФИГУРАЦИОННЫЙ ОБЪЕКТ (CONFIG)
 * Меняйте весь текст, имена и фразы здесь, не затрагивая код приложения!
 * ============================================================================ */
const CONFIG = {
  recipientName: "Ясмина", // Имя получателя
  senderName: "Твой любимый А", // Имя отправителя
  sealInitials: "Я", // Буква на сургучной печати
  letterTitle: "Для тебя 🤍", // Заголовок письма
  // Текст поздравления на листе бумаги (каждый пункт — красивый абзац)
  letterParagraphs: [
    "С днём рождения, моя хорошая! ❤️",
    "Я хочу пожелать тебе самого главного — чтобы ты всегда была счастлива и улыбалась так же искренне, как ты умеешь. Пусть в твоей жизни будет как можно больше радостных моментов, приятных сюрпризов и людей, рядом с которыми ты можешь быть собой.",
    "Спасибо тебе за то, что ты есть. За твою улыбку, за твою доброту, за те моменты, которые благодаря тебе становятся особенными. Я очень ценю тебя и надеюсь, что этот день подарит тебе столько же тепла, сколько ты даришь окружающим.",
    "Желаю, чтобы все твои мечты постепенно становились реальностью, чтобы у тебя всегда были силы идти к своим целям и чтобы рядом были люди, которые искренне тебя любят и поддерживают.",
    "С днём рождения тебя! Пусть этот новый год твоей жизни будет ещё красивее и счастливее предыдущего. ❤️"
  ],
  // Список фраз «Я тебя люблю» на разных языках мира
  loveLanguages: [
    { phrase: "Je t'aime", language: "Французский", flag: "🇫🇷", transcription: "Жё тэм" },
    { phrase: "Ti amo", language: "Итальянский", flag: "🇮🇹", transcription: "Ти амо" },
    { phrase: "Te quiero", language: "Испанский", flag: "🇪🇸", transcription: "Те кьеро" },
    { phrase: "I love you", language: "Английский", flag: "🇬🇧", transcription: "Ай лав ю" },
    { phrase: "愛してる", language: "Японский", flag: "🇯🇵", transcription: "Аиситеру" },
    { phrase: "사랑해", language: "Корейский", flag: "🇰🇷", transcription: "Саранхэ" },
    { phrase: "Seni seviyorum", language: "Турецкий", flag: "🇹🇷", transcription: "Сени севиёрум" },
    { phrase: "Ich liebe dich", language: "Немецкий", flag: "🇩🇪", transcription: "Ихь либе дихь" },
    { phrase: "أحبك", language: "Арабский", flag: "🌙", transcription: "Ухиббуки" },
    { phrase: "我爱你", language: "Китайский", flag: "🇨🇳", transcription: "Во ай ни" },
    { phrase: "Σ' αγαπώ", language: "Греческий", flag: "🇬🇷", transcription: "С'агапо" },
    { phrase: "Eu te amo", language: "Португальский", flag: "🇵🇹", transcription: "Эу чи аму" }
  ],
  replyTelegramUsername: "lev1_acermannn" // Telegram username для ответа (без знака @)
};

export default function App() {
  // Состояния: 'envelope' -> 'opening' -> 'letter'
  const [stage, setStage] = useState('envelope');

  // Плавающие сердечки при тапе на фразу
  const [floatingHearts, setFloatingHearts] = useState([]);

  // Обработчик вскрытия печати
  const handleOpenEnvelope = () => {
    if (stage !== 'envelope') return;
    setStage('opening');

    // Праздничный салют конфетти
    try {
      confetti({
        particleCount: 50,
        spread: 75,
        origin: { y: 0.58 },
        colors: ['#fda4af', '#f43f5e', '#fbbf24', '#fef08a', '#ffffff'],
        disableForReducedMotion: true,
      });
      setTimeout(() => {
        confetti({
          particleCount: 35,
          spread: 90,
          origin: { y: 0.65 },
          colors: ['#fb7185', '#e11d48', '#f59e0b', '#ffffff'],
        });
      }, 200);
    } catch {
      // игнорируем, если canvas недоступен
    }

    // Переход к экрану с письмом
    setTimeout(() => {
      setStage('letter');
    }, 1100);
  };

  // Плавный скролл к блоку с летящими признаниями
  const scrollToLanguages = () => {
    const section = document.getElementById('love-languages-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Реакция на клик по плывущей фразе (появление взлетающего сердечка)
  const handlePhraseClick = (e, item) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const newHeart = {
      id: Date.now() + Math.random(),
      x: rect.left + rect.width / 2,
      y: rect.top,
      phrase: item.phrase
    };
    setFloatingHearts(prev => [...prev, newHeart]);
    setTimeout(() => {
      setFloatingHearts(prev => prev.filter(h => h.id !== newHeart.id));
    }, 1200);
  };

  // Перезапуск открытки
  const handleReset = () => {
    setStage('envelope');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Подготовка строк для бегущих дорожек (дублируем элементы для бесшовного зацикливания)
  const track1Items = [...CONFIG.loveLanguages.slice(0, 4), ...CONFIG.loveLanguages.slice(0, 4), ...CONFIG.loveLanguages.slice(0, 4)];
  const track2Items = [...CONFIG.loveLanguages.slice(4, 8), ...CONFIG.loveLanguages.slice(4, 8), ...CONFIG.loveLanguages.slice(4, 8)];
  const track3Items = [...CONFIG.loveLanguages.slice(8, 12), ...CONFIG.loveLanguages.slice(8, 12), ...CONFIG.loveLanguages.slice(8, 12)];

  // Telegram ссылка
  const telegramUrl = `https://t.me/${CONFIG.replyTelegramUsername.replace(/^@/, '')}?text=${encodeURIComponent("Спасибо за открытку! 🤍")}`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-between relative overflow-x-hidden font-sans-modern selection:bg-rose-500/30 selection:text-rose-200">

      {/* Мягкие фоновые атмосферные свечения */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-rose-900/15 rounded-full blur-[130px]" />
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-amber-900/10 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 left-1/3 w-80 h-80 bg-rose-950/25 rounded-full blur-[110px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(244,63,94,0.04),transparent_70%)]" />
      </div>

      {/* Всплывающие сердечки при тапе на фразы */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        <AnimatePresence>
          {floatingHearts.map(heart => (
            <motion.div
              key={heart.id}
              initial={{ opacity: 1, scale: 0.8, x: heart.x - 12, y: heart.y }}
              animate={{ opacity: 0, scale: 1.5, y: heart.y - 80 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
              className="absolute text-2xl filter drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]"
            >
              ❤️
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence mode="wait">

        {/* ============================================================
         * ЭКРАН 1: КОНВЕРТ С СУРГУЧНОЙ ПЕЧАТЬЮ (ПОЛНОЭКРАННЫЙ)
         * ============================================================ */}
        {(stage === 'envelope' || stage === 'opening') && (
          <motion.div
            key="envelope-screen"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.04, y: -30, transition: { duration: 0.5 } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="w-full min-h-[100dvh] flex flex-col items-center justify-center relative z-10 px-4 py-8"
          >
            {/* Верхняя подсказка */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8 text-center"
            >
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-950/40 border border-rose-500/20 text-rose-300 text-xs tracking-widest uppercase mb-3 backdrop-blur-sm">
                <Sparkles className="w-3 h-3 text-rose-400" />
                <span>Личное послание</span>
              </div>
              <h1 className="font-serif-letter text-2xl sm:text-3xl text-slate-100 font-medium tracking-wide">
                Для {CONFIG.recipientName}
              </h1>
            </motion.div>

            {/* Интерактивный 3D-конверт */}
            <div className="relative w-72 sm:w-88 h-48 sm:h-56 select-none perspective-[1200px]">

              {/* Задняя часть конверта */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#dfd5c2] to-[#c7b99f] shadow-2xl border border-amber-900/10 overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#7c2d12_1px,transparent_1px)] [background-size:12px_12px]" />
              </div>

              {/* Выдвигающийся лист бумаги при открытии конверта */}
              <motion.div
                initial={{ y: 0, opacity: 0 }}
                animate={
                  stage === 'opening'
                    ? { y: -75, opacity: 1, transition: { delay: 0.3, duration: 0.75, ease: "easeOut" } }
                    : { y: 0, opacity: 0 }
                }
                className="absolute inset-x-4 top-2 h-44 rounded-xl letter-sheet shadow-md p-4 flex flex-col items-center justify-center text-center z-10 border border-amber-300/40"
              >
                <Heart className="w-5 h-5 text-rose-500 fill-rose-500 mb-2 animate-bounce" />
                <p className="font-serif-letter text-lg text-slate-800 font-semibold">
                  {CONFIG.recipientName}
                </p>
                <p className="text-xs text-slate-500 tracking-wider uppercase mt-1">
                  Открываем послание...
                </p>
              </motion.div>

              {/* Клапаны конверта (SVG карман) */}
              <div className="absolute inset-0 z-20 pointer-events-none drop-shadow-md">
                <svg className="w-full h-full" viewBox="0 0 352 224" fill="none" preserveAspectRatio="none">
                  <path
                    d="M 0 0 L 176 112 L 0 224 Z"
                    fill="url(#leftFlapGradient)"
                    opacity="0.98"
                  />
                  <path
                    d="M 352 0 L 176 112 L 352 224 Z"
                    fill="url(#rightFlapGradient)"
                    opacity="0.98"
                  />
                  <path
                    d="M 0 224 L 176 96 L 352 224 Z"
                    fill="url(#bottomFlapGradient)"
                  />
                  <defs>
                    <linearGradient id="leftFlapGradient" x1="0%" y1="50%" x2="100%" y2="50%">
                      <stop offset="0%" stopColor="#e5dccb" />
                      <stop offset="100%" stopColor="#d5caa0" />
                    </linearGradient>
                    <linearGradient id="rightFlapGradient" x1="100%" y1="50%" x2="0%" y2="50%">
                      <stop offset="0%" stopColor="#e5dccb" />
                      <stop offset="100%" stopColor="#d5caa0" />
                    </linearGradient>
                    <linearGradient id="bottomFlapGradient" x1="50%" y1="100%" x2="50%" y2="0%">
                      <stop offset="0%" stopColor="#ece4d4" />
                      <stop offset="100%" stopColor="#ded1ba" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>

              {/* Верхний откидной клапан конверта (3D откидывание) */}
              <motion.div
                className="absolute inset-x-0 top-0 h-1/2 origin-top z-30"
                animate={stage === 'opening' ? { rotateX: 180, zIndex: 5 } : { rotateX: 0 }}
                transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1], delay: 0.15 }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                <svg className="w-full h-full drop-shadow-md" viewBox="0 0 352 112" fill="none" preserveAspectRatio="none">
                  <path
                    d="M 0 0 L 176 112 L 352 0 Z"
                    fill="url(#topFlapGradient)"
                  />
                  <defs>
                    <linearGradient id="topFlapGradient" x1="50%" y1="0%" x2="50%" y2="100%">
                      <stop offset="0%" stopColor="#f3ede2" />
                      <stop offset="100%" stopColor="#e0d4be" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>

              {/* СУРГУЧНАЯ ПЕЧАТЬ */}
              <div className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
                <motion.div
                  whileHover={stage === 'envelope' ? { scale: 1.08 } : {}}
                  whileTap={stage === 'envelope' ? { scale: 0.95 } : {}}
                  onClick={handleOpenEnvelope}
                  className="relative cursor-pointer group"
                >
                  {stage === 'envelope' && (
                    <span className="absolute -inset-2.5 rounded-full bg-rose-500/25 blur-sm animate-pulse group-hover:bg-rose-500/40 transition-colors" />
                  )}

                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 flex items-center justify-center">
                    {/* Левая половинка сургуча */}
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center"
                      animate={
                        stage === 'opening'
                          ? { x: -35, y: 15, rotate: -25, opacity: 0 }
                          : { x: 0, y: 0, rotate: 0, opacity: 1 }
                      }
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    >
                      <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full wax-seal flex items-center justify-center border border-red-400/40">
                        <div className="w-12 h-12 rounded-full wax-seal-inner flex items-center justify-center">
                          <span className="font-serif-letter font-bold text-xl sm:text-2xl text-amber-100 tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                            {CONFIG.sealInitials}
                          </span>
                        </div>
                      </div>
                    </motion.div>

                    {/* Правая половинка для эффекта раскалывания */}
                    {stage === 'opening' && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                        animate={{ x: 35, y: 15, rotate: 25, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                      >
                        <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full wax-seal flex items-center justify-center border border-red-400/40">
                          <div className="w-12 h-12 rounded-full wax-seal-inner flex items-center justify-center">
                            <span className="font-serif-letter font-bold text-xl sm:text-2xl text-amber-100 tracking-wider drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                              {CONFIG.sealInitials}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Подсказка снизу */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
              className="mt-10 text-center text-slate-400 text-sm flex items-center gap-2 cursor-pointer select-none"
              onClick={handleOpenEnvelope}
            >
              <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              <span>Нажмите на сургучную печать, чтобы открыть</span>
            </motion.div>
          </motion.div>
        )}

        {/* ============================================================
         * ЭКРАН 2: ПИСЬМО (НА ВЕСЬ HEIGHT) + СЕКЦИЯ ПЛЫВУЩИХ ФРАЗ
         * ============================================================ */}
        {stage === 'letter' && (
          <motion.div
            key="letter-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
            className="w-full flex flex-col items-center relative z-10"
          >

            {/* ------------------------------------------------------------
             * СЕКЦИЯ 1: ЛИСТ БУМАГИ С ПОЗДРАВЛЕНИЯМИ СТРОГО НА ВЕСЬ HEIGHT
             * ------------------------------------------------------------ */}
            <section className="w-full min-h-[100dvh] flex flex-col justify-between items-center py-6 sm:py-10 px-4 relative">

              {/* Верхний декоративный бейдж */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="pt-2 text-center"
              >
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-rose-500/25 text-rose-300 text-xs tracking-widest uppercase backdrop-blur-md">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Послание для тебя</span>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                </div>
              </motion.div>

              {/* Настоящий фактурный лист бумаги */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 25 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-lg letter-sheet rounded-2xl p-6 sm:p-10 my-auto relative overflow-hidden text-slate-800 border border-amber-200/60 shadow-2xl"
              >
                {/* Внутренняя элегантная декоративная рамка */}
                <div className="absolute inset-3 sm:inset-4 rounded-xl letter-frame pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">

                  {/* Заголовок письма на бумаге */}
                  <div className="space-y-1 pt-1">
                    <div className="inline-flex items-center gap-1.5 text-rose-700/80 text-xs font-semibold tracking-widest uppercase">
                      <span>{CONFIG.letterTitle}</span>
                    </div>
                    <h2 className="font-serif-letter text-3xl sm:text-4xl text-slate-900 font-semibold tracking-tight">
                      Милая {CONFIG.recipientName}
                    </h2>
                    <div className="w-16 h-0.5 bg-rose-400/40 mx-auto mt-2" />
                  </div>

                  {/* Текст поздравления (абзацы на бумаге) */}
                  <div className="space-y-4 text-left w-full pt-1">
                    {CONFIG.letterParagraphs.map((paragraph, idx) => (
                      <motion.p
                        key={idx}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 + idx * 0.22, duration: 0.6 }}
                        className="font-serif-letter text-base sm:text-lg text-slate-800 leading-relaxed indent-4 font-normal"
                      >
                        {paragraph}
                      </motion.p>
                    ))}
                  </div>

                  {/* Подпись отправителя на бумаге */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + CONFIG.letterParagraphs.length * 0.22, duration: 0.6 }}
                    className="w-full pt-2 flex flex-col items-end pr-2"
                  >
                    <p className="font-script text-2xl sm:text-3xl text-rose-800 font-medium tracking-wide">
                      С любовью, {CONFIG.senderName} 🤍
                    </p>
                  </motion.div>

                </div>
              </motion.div>

              {/* Указатель скролла вниз (чтобы не было видно следующий экран сразу) */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.6 }}
                className="pb-2 flex flex-col items-center cursor-pointer select-none group"
                onClick={scrollToLanguages}
              >
                <span className="text-[11px] uppercase tracking-widest text-slate-400 group-hover:text-rose-300 transition-colors mb-1">
                  Листай дальше 🤍
                </span>
                <ChevronDown className="w-4 h-4 text-rose-400 animate-bounce" />
              </motion.div>
            </section>

            {/* ------------------------------------------------------------
             * СЕКЦИЯ 2: ПЛАВНО ЛЕТЯЩИЕ ФРАЗЫ СПРАВА НАЛЕВО БЕЗ БОКСОВ + TELEGRAM
             * ------------------------------------------------------------ */}
            <section
              id="love-languages-section"
              className="w-full min-h-[100dvh] flex flex-col justify-between items-center py-12 relative overflow-hidden"
            >
              {/* Заголовок секции признаний */}
              <div className="text-center space-y-3 px-4 pt-4">
                
                <h3 className="font-serif-letter text-3xl sm:text-4xl text-slate-100 font-medium">
                  «Я тебя люблю»
                </h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  нажиай на слова )
                </p>
              </div>

              {/* Бегущие дорожки фраз — плавно летят справа налево без боксов */}
              <div className="w-full my-auto py-8 space-y-7 overflow-hidden relative">

                {/* Мягкие затемнения по краям экрана для эффекта бесконечного появления/исчезновения */}
                <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-20" />
                <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-slate-950 via-slate-950/80 to-transparent pointer-events-none z-20" />

                {/* Дорожка 1 (летит справа налево) */}
                <div className="marquee-track-medium select-none flex items-center">
                  {track1Items.map((item, idx) => (
                    <div
                      key={`t1-${idx}`}
                      onClick={(e) => handlePhraseClick(e, item)}
                      className="mx-6 sm:mx-10 flex items-center gap-3 cursor-pointer group transition-all"
                    >
                      <span className="text-xl sm:text-2xl filter saturate-150 transition-transform group-hover:scale-125">
                        {item.flag}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-serif-letter text-2xl sm:text-3xl md:text-4xl font-semibold text-rose-100 group-hover:text-amber-200 transition-colors drop-shadow-[0_2px_12px_rgba(244,63,94,0.35)] whitespace-nowrap">
                          {item.phrase}
                        </span>
                        <span className="text-[10px] sm:text-xs text-rose-300/70 tracking-widest uppercase whitespace-nowrap">
                          {item.language} • {item.transcription}
                        </span>
                      </div>
                      <span className="text-rose-500/30 text-lg ml-6 sm:ml-10 select-none">✦</span>
                    </div>
                  ))}
                </div>

                {/* Дорожка 2 (летит справа налево со смещением скорости) */}
                <div className="marquee-track-slow select-none flex items-center">
                  {track2Items.map((item, idx) => (
                    <div
                      key={`t2-${idx}`}
                      onClick={(e) => handlePhraseClick(e, item)}
                      className="mx-6 sm:mx-10 flex items-center gap-3 cursor-pointer group transition-all"
                    >
                      <span className="text-xl sm:text-2xl filter saturate-150 transition-transform group-hover:scale-125">
                        {item.flag}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-serif-letter text-2xl sm:text-3xl md:text-4xl font-semibold text-amber-100 group-hover:text-rose-200 transition-colors drop-shadow-[0_2px_12px_rgba(245,158,11,0.25)] whitespace-nowrap">
                          {item.phrase}
                        </span>
                        <span className="text-[10px] sm:text-xs text-amber-300/70 tracking-widest uppercase whitespace-nowrap">
                          {item.language} • {item.transcription}
                        </span>
                      </div>
                      <span className="text-amber-500/30 text-lg ml-6 sm:ml-10 select-none">🤍</span>
                    </div>
                  ))}
                </div>

                {/* Дорожка 3 (летит справа налево) */}
                <div className="marquee-track-fast select-none flex items-center">
                  {track3Items.map((item, idx) => (
                    <div
                      key={`t3-${idx}`}
                      onClick={(e) => handlePhraseClick(e, item)}
                      className="mx-6 sm:mx-10 flex items-center gap-3 cursor-pointer group transition-all"
                    >
                      <span className="text-xl sm:text-2xl filter saturate-150 transition-transform group-hover:scale-125">
                        {item.flag}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-serif-letter text-2xl sm:text-3xl md:text-4xl font-semibold text-rose-200 group-hover:text-amber-100 transition-colors drop-shadow-[0_2px_12px_rgba(244,63,94,0.3)] whitespace-nowrap">
                          {item.phrase}
                        </span>
                        <span className="text-[10px] sm:text-xs text-rose-300/70 tracking-widest uppercase whitespace-nowrap">
                          {item.language} • {item.transcription}
                        </span>
                      </div>
                      <span className="text-rose-500/30 text-lg ml-6 sm:ml-10 select-none">✦</span>
                    </div>
                  ))}
                </div>

              </div>

              {/* Подвал и кнопка ответа в Telegram */}
              <div className="w-full max-w-md px-4 text-center space-y-6 pb-4">
                <div>
                  <motion.a
                    href={telegramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="inline-flex items-center justify-center gap-2.5 w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-rose-600 via-rose-500 to-amber-600 text-white font-medium text-base sm:text-lg shadow-xl shadow-rose-950/60 hover:shadow-rose-600/30 transition-all border border-rose-400/30 group"
                  >
                    <Send className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    <span>Ответить {CONFIG.senderName} 🤍</span>
                  </motion.a>

                  <p className="text-xs text-slate-500 mt-2.5">

                  </p>
                </div>

                <div className="pt-1">
                  <button
                    onClick={handleReset}
                    className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-300 transition-colors py-2 px-3 rounded-lg hover:bg-slate-900/60"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Посмотреть открытку снова</span>
                  </button>
                </div>
              </div>

            </section>

          </motion.div>
        )}

      </AnimatePresence>

    </div>
  );
}
