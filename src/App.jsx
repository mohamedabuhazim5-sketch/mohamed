import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";

const DISPLAY_NAME = "محمد";
const SITE_PASSWORD = "15/12/2002";
const ACQUAINTANCE_DATE = "2023-11-02T00:00:00";

function TypingText({ text, speed = 35, className = "" }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let index = 0;
    setDisplayed("");

    const interval = setInterval(() => {
      index += 1;
      setDisplayed(text.slice(0, index));
      if (index >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  return <p className={className}>{displayed}</p>;
}

function formatTime(value) {
  if (!Number.isFinite(value)) return "00:00";
  const total = Math.floor(value);
  const minutes = Math.floor(total / 60);
  const seconds = total % 60;
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
    2,
    "0"
  )}`;
}

export default function App() {
  const musicRef = useRef(null);
  const voiceRef = useRef(null);

  const [enteredPassword, setEnteredPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [error, setError] = useState("");
  const [showLoader, setShowLoader] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showLastWords, setShowLastWords] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(false);

  const [musicProgress, setMusicProgress] = useState({
    current: 0,
    duration: 0,
  });

  const [voiceProgress, setVoiceProgress] = useState({
    current: 0,
    duration: 0,
  });

  const [counter, setCounter] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  const content = useMemo(
    () => ({
      heroName: DISPLAY_NAME,
      heroSub:
        "حين يسألوني عنك سأقول: سعادة دخلت حياتي ولا أريد لها أن تنتهي ♥️",
      heroText:
        "المكان ده معمول ليك أنتَ وبس... معمول بكل الحب، وبكل المشاعر اللي ما عرفتش الأيام تقلل منها. يمكن الكلام ما يشرحش كل اللي جوايا، لكن يكفي إنك كنت وما زلت من أجمل النِعم اللي دخلت حياتي.",
      meetTitle: "من أول ما عرفتك ♥️",
      meetDate: "2 / 11 / 2023",
      timerTitle: "من أول ما دخلت حياتي",
      timerText:
        "من وقت ما عرفتك، وحاجات كتير جوايا اتغيرت... بقيت أشوف الدنيا بشكل أهدى، وأحس إن في شخص وجوده لوحده كفاية يخلّي كل حاجة أجمل.",
      longMessage:
        "أنت مش شخص عادي في حياتي، ولا وجودك كان يومًا شيء بسيط. أنت الحضور اللي طمّن قلبي، والاسم اللي كل ما ييجي في بالي ييجي معاه إحساس حلو، وراحة ما تتوصفش. ولو كنت هختصر كل اللي جوايا في كلمة، فهقول إنك من أجمل الحاجات اللي حصلتلي.",
      cuteText:
        "You entered my life... and I don't want it to end 🤍",
      finalText:
        "يمكن الكلام يخلص، لكن إحساسي ناحيتك عمره ما كان مجرد كلام. أنت شخص دخل حياتي بشكل مختلف، وترك في قلبي شيء جميل ما اتغيرش. وكل اللي أتمناه إنك تفضل قريب، وتفضل نفس السعادة اللي دخلت حياتي ومش عايزاها تنتهي أبدًا.",
      lastWords:
        "ولو في آخر كلام ممكن يتقال... فأنا أقول إنك أجمل صدفة، وأحنّ حضور، والسعادة اللي دخلت حياتي وما بقتش قادرة أتخيلها من غيرك ♥️",
      prayerText:
        "بدعي لك دايمًا من قلبي... إن ربنا يحفظك، ويوفقك، ويكتب لك الخير في كل خطوة، ويخلي لك في حياتك راحة تشبه جمال قلبك، وسعادة تليق بيك.",
    }),
    []
  );

  const memoryCards = useMemo(
    () => [
      {
        id: 1,
        title: "البداية",
        image: "/1.jpg",
        date: "أول إحساس",
        text: "من أول مرة، كان في إحساس مختلف... إحساس قال لي إنك مش شبه أي حد.",
      },
      {
        id: 2,
        title: "وجودك",
        image: "/2.jpg",
        date: "نعمة جميلة",
        text: "وجودك في حياتي كان من الحاجات اللي خلت كل شيء أهدى وأجمل.",
      },
      {
        id: 3,
        title: "قربك",
        image: "/3.jpg",
        date: "راحة",
        text: "في قربك شيء يشبه الطمأنينة... كأن القلب لقى مكانه أخيرًا.",
      },
      {
        id: 4,
        title: "اسمك",
        image: "/4.jpg",
        date: "في قلبي",
        text: "اسمك لما ييجي في بالي، ييجي معاه شعور جميل ما أعرفش أوصفه.",
      },
      {
        id: 5,
        title: "ضحكتك",
        image: "/5.jpg",
        date: "تفصيلة حلوة",
        text: "ضحكتك من الحاجات اللي تكفي تغيّر يوم كامل وتخلّي كل شيء ألطف.",
      },
      {
        id: 6,
        title: "مكانك",
        image: "/6.jpg",
        date: "ثابت",
        text: "فيه ناس بتيجي وتعدي... وأنت من الناس اللي مكانهم بيفضل ثابت.",
      },
      {
        id: 7,
        title: "الأمان",
        image: "/7.jpg",
        date: "إحساس مختلف",
        text: "أنت من الناس اللي وجودهم يطمن القلب من غير كلام كثير.",
      },
      {
        id: 8,
        title: "الذكرى",
        image: "/8.jpg",
        date: "لا تنسى",
        text: "كل حاجة مرتبطة بيك ليها طعم مختلف... وكل ذكرى ليها مكان خاص.",
      },
      {
        id: 9,
        title: "الحب",
        image: "/9.jpg",
        date: "من قلبي",
        text: "لو سألوني عنك... هقول سعادة دخلت حياتي، ومش عايزاها تنتهي ♥️",
      },
    ],
    []
  );

  const timelineItems = useMemo(
    () => [
      {
        title: "أول معرفة",
        date: "البداية",
        text: "من أول لحظة، حسّيت إن في حاجة مختلفة ومميزة فيك.",
      },
      {
        title: "أول راحة",
        date: "بعدها بشوية",
        text: "مع الوقت، ابتديت أحس إن وجودك بيدي قلبي راحة غريبة وحلوة.",
      },
      {
        title: "المكانة",
        date: "مع الأيام",
        text: "كل يوم كان بيأكد لي إنك مش شخص عادي... لكن حد له مكان خاص جدًا.",
      },
      {
        title: "دلوقتي",
        date: "النهارده",
        text: "النهارده بقى عندي يقين إنك من أجمل الحاجات اللي دخلت حياتي.",
      },
    ],
    []
  );

  const facts = useMemo(
    () => [
      { title: "الاسم", value: DISPLAY_NAME },
      { title: "مكانك", value: "في قلبي" },
      { title: "عدد الصور", value: "9" },
      { title: "الإحساس", value: "لا يوصف" },
    ],
    []
  );

  const reasons = useMemo(
    () => [
      "وجودك",
      "قربك",
      "كلامك",
      "ضحكتك",
      "أسلوبك",
      "اهتمامك",
      "مكانتك",
      "الأمان معاك",
    ],
    []
  );

  const differentReasons = useMemo(
    () => [
      {
        title: "فيك راحة",
        text: "في وجودك راحة ما تتشرحش... شيء يطمن القلب بدون سبب واضح.",
      },
      {
        title: "فيك طمأنينة",
        text: "أنت من الناس اللي قربهم يهدّي الروح ويخلّي كل شيء أخف.",
      },
      {
        title: "فيك حضور",
        text: "حضورك مختلف، ويكفي إنه يبان من غير ما تحاول تعمل أي شيء.",
      },
      {
        title: "فيك سعادة",
        text: "من الحاجات اللي حصلتلي وفعلًا غيرت فيا... إنك دخلت حياتي.",
      },
      {
        title: "فيك دفا",
        text: "في قربك إحساس جميل يخلي القلب حاسس بالأمان والونس.",
      },
      {
        title: "فيك شيء مميز",
        text: "مش بعرف أوصفه، لكن بعرف أحسه... ودايمًا بحسه معاك.",
      },
    ],
    []
  );

  const paragraphs = useMemo(
    () => [
      "أنت من الحاجات الجميلة اللي دخلت حياتي من غير ترتيب، لكن غيرت فيها حاجات كثيرة بحضورك.",
      "فيك شيء يخلّي القلب مطمّن، ويفتكر إن الدنيا لسه فيها حاجات تستحق الفرح.",
      "كل مرة أفكر فيك، أحس إن وجودك مش عادي... وكأنك نعمة جات في الوقت اللي كان قلبي محتاجها فعلًا.",
      "ولو سألتني الحياة عن أجمل ما أعطتني، يمكن أذكر اسمك قبل أي شيء.",
    ],
    []
  );

  const scatteredMessages = useMemo(
    () => [
      "حين يسألوني عنك سأقول: سعادة دخلت حياتي ♥️",
      "You entered my life and I don't want it to end.",
      "فيك شيء يشبه الراحة التي لا تُنسى.",
      "بعض الأشخاص لا يعوضهم أحد.",
    ],
    []
  );

  const moments = useMemo(
    () => [
      "وجودك في حياتي",
      "تفصيلة حلوة ما تتنسيش",
      "سعادة جات في وقتها",
      "راحة قلبي",
      "ذكرى لها معنى",
      "حضور غالي عليا",
    ],
    []
  );

  const selectedCard =
    selectedIndex !== null ? memoryCards[selectedIndex] : null;

  useEffect(() => {
    const timeout = setTimeout(() => setShowLoader(false), 2400);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const startDate = new Date(ACQUAINTANCE_DATE);

    const updateCounter = () => {
      const now = new Date().getTime();
      const start = startDate.getTime();
      const difference = now - start;

      if (difference <= 0) {
        setCounter({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (difference % (1000 * 60 * 60)) / (1000 * 60)
      );
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCounter({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCounter();
    const interval = setInterval(updateCounter, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const total =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", onScroll);
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!hasStarted) return;
    const music = musicRef.current;
    if (!music) return;

    const playMusic = async () => {
      try {
        await music.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    };

    playMusic();
  }, [hasStarted]);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "Escape") {
        setSelectedIndex(null);
        setShowLastWords(false);
      }

      if (selectedIndex !== null) {
        if (e.key === "ArrowRight") {
          setSelectedIndex((prev) =>
            prev === null
              ? 0
              : (prev - 1 + memoryCards.length) % memoryCards.length
          );
        }
        if (e.key === "ArrowLeft") {
          setSelectedIndex((prev) =>
            prev === null ? 0 : (prev + 1) % memoryCards.length
          );
        }
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedIndex, memoryCards.length]);

  const handleUnlock = (e) => {
    e.preventDefault();

    if (enteredPassword === SITE_PASSWORD) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError(`كلمة السر غير صحيحة يا ${DISPLAY_NAME}`);
    }
  };

  const startExperience = () => {
    setHasStarted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleMusic = async () => {
    const audio = musicRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const toggleVoice = async () => {
    const audio = voiceRef.current;
    if (!audio) return;

    if (audio.paused) {
      try {
        await audio.play();
        setIsVoicePlaying(true);
      } catch {
        setIsVoicePlaying(false);
      }
    } else {
      audio.pause();
      setIsVoicePlaying(false);
    }
  };

  const openCard = (index) => setSelectedIndex(index);
  const closeCard = () => setSelectedIndex(null);

  const nextCard = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev + 1) % memoryCards.length
    );
  };

  const prevCard = () => {
    setSelectedIndex((prev) =>
      prev === null ? 0 : (prev - 1 + memoryCards.length) % memoryCards.length
    );
  };

  const musicPercent = musicProgress.duration
    ? (musicProgress.current / musicProgress.duration) * 100
    : 0;

  const voicePercent = voiceProgress.duration
    ? (voiceProgress.current / voiceProgress.duration) * 100
    : 0;

  if (showLoader) {
    return (
      <div className="loader-page" dir="rtl">
        <div className="loader-stars" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>
        <div className="loader-circle"></div>
        <h1>جارِ تجهيز شيء جميل جدًا... مخصوص لـ {DISPLAY_NAME}</h1>
        <p className="loader-subtitle">
          A special place made with love, memories, and feelings 🤍
        </p>
      </div>
    );
  }

  if (!isUnlocked) {
    return (
      <div className="password-page" dir="rtl">
        <div className="bg-orb orb-1"></div>
        <div className="bg-orb orb-2"></div>
        <div className="bg-orb orb-3"></div>

        <div className="floating-hearts" aria-hidden="true">
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
          <span>✦</span>
        </div>

        <div className="password-card glass">
          <div className="password-top-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="password-image-overlay"></div>
          </div>

          <div className="lock-icon">🔐</div>
          <div className="cute-badge">A very special page ♥️</div>

          <h1>اكتب كلمة السر يا {DISPLAY_NAME}</h1>

          <p className="password-subtext">
            المكان ده معمول ليك وبس... فيه صور، كلام، ومشاعر متجمعة
            في حاجة صغيرة، لكن معناها كبير جدًا.
          </p>

          <form onSubmit={handleUnlock} className="password-form">
            <input
              type="password"
              placeholder="اكتب كلمة السر هنا"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <button type="submit">افتح الصفحة</button>
          </form>

          {error && <div className="error-text">{error}</div>}
        </div>
      </div>
    );
  }

  if (!hasStarted) {
    return (
      <div className="cinematic-screen" dir="rtl">
        <div className="cinematic-bg"></div>
        <div className="cinematic-overlay"></div>

        <div className="cinematic-card glass">
          <span className="small-badge">Made especially for you</span>
          <h1>{DISPLAY_NAME}</h1>
          <TypingText
            text="You entered my life... and I don't want it to end."
            className="cinematic-typing"
            speed={28}
          />
          <p>
            قبل ما تبدأ...
            خد نفس هادي،
            لأن اللي جاي مش مجرد صفحة،
            ده مكان صغير معمول بكل الإحساس اللي جوايا ليك.
          </p>
          <button className="cinematic-btn" onClick={startExperience}>
            ابدأ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="page" dir="rtl">
      <audio
        ref={musicRef}
        loop
        preload="auto"
        onTimeUpdate={() =>
          setMusicProgress({
            current: musicRef.current?.currentTime || 0,
            duration: musicRef.current?.duration || 0,
          })
        }
        onLoadedMetadata={() =>
          setMusicProgress({
            current: musicRef.current?.currentTime || 0,
            duration: musicRef.current?.duration || 0,
          })
        }
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      >
        <source src="/love.mp3" type="audio/mpeg" />
      </audio>

      <audio
        ref={voiceRef}
        preload="auto"
        onTimeUpdate={() =>
          setVoiceProgress({
            current: voiceRef.current?.currentTime || 0,
            duration: voiceRef.current?.duration || 0,
          })
        }
        onLoadedMetadata={() =>
          setVoiceProgress({
            current: voiceRef.current?.currentTime || 0,
            duration: voiceRef.current?.duration || 0,
          })
        }
        onPlay={() => setIsVoicePlaying(true)}
        onPause={() => setIsVoicePlaying(false)}
      >
        <source src="/voice-message.mp3" type="audio/mpeg" />
      </audio>

      <div className="progress-line">
        <span style={{ width: `${scrollProgress}%` }}></span>
      </div>

      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      <div className="floating-hearts" aria-hidden="true">
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
        <span>✦</span>
      </div>

      <div className="particles" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i}></span>
        ))}
      </div>

      <main className="container">
        <section className="opening-note glass fade-up">
          <span className="opening-note-badge">♥️ بداية الحكاية</span>
          <h2>أهلاً يا {DISPLAY_NAME}</h2>
          <p>
            الصفحة دي معمولة ليك أنتَ...
            فيها شوية كلام من قلبي،
            وشوية صور،
            وشوية تفاصيل صغيرة...
            لكن كلهم متعملين بحب كبير.
          </p>
        </section>

        <section className="hero-banner glass fade-up">
          <div className="hero-banner-text">
            <span className="small-badge">A page made only for you</span>

            <h1>
              {content.heroName}
              <span>{content.heroSub}</span>
            </h1>

            <TypingText text={content.cuteText} className="typing-line" />
            <p>{content.heroText}</p>

            <div className="top-actions">
              <button className="btn btn-primary" onClick={toggleMusic}>
                {isPlaying ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() =>
                  document
                    .getElementById("gallerySection")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                عرض الصور
              </button>

              <button
                className="btn btn-outline"
                onClick={() => setShowLastWords(true)}
              >
                آخر كلام
              </button>
            </div>
          </div>

          <div className="hero-banner-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="hero-banner-overlay"></div>
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[0]}</span>
        </div>

        <section className="stats-grid fade-up">
          <div className="stat-card glass">
            <strong>{counter.days}</strong>
            <span>يوم من الحكاية</span>
          </div>

          <div className="stat-card glass cute-counter-card">
            <div className="pulse-ring"></div>
            <strong>{counter.hours}</strong>
            <span>ساعة من القرب</span>
          </div>

          <div className="stat-card glass">
            <strong>{memoryCards.length}</strong>
            <span>ذكرى</span>
          </div>

          <div className="stat-card glass">
            <strong>∞</strong>
            <span>حب</span>
          </div>
        </section>

        <section className="cute-facts-grid fade-up">
          {facts.map((item, index) => (
            <div className="cute-fact-card glass" key={index}>
              <h4>{item.title}</h4>
              <strong>{item.value}</strong>
            </div>
          ))}
        </section>

        <section className="full-cover-section glass fade-up">
          <div className="full-cover-image">
            <img src="/profile.jpg" alt={DISPLAY_NAME} />
            <div className="full-cover-overlay"></div>
          </div>

          <div className="full-cover-content">
            <div className="scene-pill">{content.meetTitle}</div>
            <div className="scene-date">{content.meetDate}</div>
            <h2>{content.heroName}</h2>
            <h3>{content.heroSub}</h3>
            <p>{content.heroText}</p>
          </div>
        </section>

        <section className="huge-counter-section glass fade-up" id="counterSection">
          <span className="small-badge">⏳ من أول ما عرفتك</span>
          <h2>{content.timerTitle}</h2>
          <p>{content.timerText}</p>

          <div className="huge-counter-grid">
            <div className="huge-counter-box animated-counter">
              <strong>{counter.days}</strong>
              <span>يوم</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.hours}</strong>
              <span>ساعة</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.minutes}</strong>
              <span>دقيقة</span>
            </div>
            <div className="huge-counter-box animated-counter">
              <strong>{counter.seconds}</strong>
              <span>ثانية</span>
            </div>
          </div>

          <div className="music-player-card">
            <div className="music-head">
              <div className="music-title-wrap">
                <div className={`disc ${isPlaying ? "spin" : ""}`}>🎵</div>
                <div>
                  <strong>Our song</strong>
                  <small>هتشتغل لو المتصفح سمح</small>
                </div>
              </div>

              <button className="mini-play-btn" onClick={toggleMusic}>
                {isPlaying ? "Pause" : "Play"}
              </button>
            </div>

            <div className="player-bar">
              <span style={{ width: `${musicPercent}%` }}></span>
            </div>

            <div className="player-time">
              <small>{formatTime(musicProgress.current)}</small>
              <small>{formatTime(musicProgress.duration)}</small>
            </div>
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[1]}</span>
        </div>

        <section className="voice-section glass fade-up">
          <div className="voice-left">
            <span className="small-badge">🎙️ رسالة صوتية</span>
            <h2>اسمع رسالتي</h2>
            <p>
              ولو حبيت تضيف تسجيل صوتي،
              حطه في المسار <strong>/voice-message.mp3</strong>
              وهيظهر هنا بنفس الشكل.
            </p>
          </div>

          <div className="voice-player">
            <div className="voice-top">
              <div className="voice-wave">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>

              <button className="voice-btn" onClick={toggleVoice}>
                {isVoicePlaying ? "إيقاف" : "تشغيل"}
              </button>
            </div>

            <div className="player-bar voice-bar">
              <span style={{ width: `${voicePercent}%` }}></span>
            </div>

            <div className="player-time">
              <small>{formatTime(voiceProgress.current)}</small>
              <small>{formatTime(voiceProgress.duration)}</small>
            </div>
          </div>
        </section>

        <section className="different-section fade-up">
          <div className="section-head centered-head">
            <div>
              <h3>حاجات فيك بحبها</h3>
              <p>Things I love about you</p>
            </div>
          </div>

          <div className="different-grid">
            {differentReasons.map((item, index) => (
              <div className="different-card glass" key={index}>
                <span className="different-number">0{index + 1}</span>
                <h4>{item.title}</h4>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="wide-message glass fade-up">
          <span className="small-badge">💌 رسالة من قلبي</span>
          <h2>الكلام اللي لازم تعرفه</h2>
          <p>{content.longMessage}</p>
        </section>

        <section className="extra-love-section fade-up">
          {paragraphs.map((paragraph, index) => (
            <div className="extra-love-card glass" key={index}>
              <h3>رسالة {index + 1}</h3>
              <p>{paragraph}</p>
            </div>
          ))}
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[2]}</span>
        </div>

        <section className="love-columns fade-up">
          <div className="love-column-card glass">
            <h3>أكثر ما أحبه فيك</h3>
            <ul>
              {reasons.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="love-column-card glass">
            <h3>When I think of you</h3>
            <ul>
              <li>أفتكر راحتي</li>
              <li>أفتكر وجود جميل</li>
              <li>أفتكر طمأنينة</li>
              <li>أفتكر اسم غالي</li>
              <li>أفتكر شخص مختلف</li>
              <li>وأفتكر سعادة دخلت حياتي</li>
            </ul>
          </div>
        </section>

        <section className="timeline-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>Timeline</h3>
              <p>مشوار صغير... لكن له معنى كبير في قلبي</p>
            </div>
          </div>

          <div className="timeline-list">
            {timelineItems.map((item, index) => (
              <div className="timeline-item" key={index}>
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <small>{item.date}</small>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="reels-section glass fade-up" id="gallerySection">
          <div className="section-head slider-head">
            <div>
              <h3>9 صور... وورا كل واحدة إحساس</h3>
              <p>Every photo carries a special feeling</p>
            </div>

            <div className="slider-buttons">
              <button
                className="slider-btn"
                onClick={() => {
                  const slider = document.getElementById("cardsSlider");
                  slider?.scrollBy({ left: 360, behavior: "smooth" });
                }}
              >
                ←
              </button>
              <button
                className="slider-btn"
                onClick={() => {
                  const slider = document.getElementById("cardsSlider");
                  slider?.scrollBy({ left: -360, behavior: "smooth" });
                }}
              >
                →
              </button>
            </div>
          </div>

          <div className="cards-slider" id="cardsSlider">
            {memoryCards.map((card, index) => (
              <button
                key={card.id}
                className="animated-text-card"
                onClick={() => openCard(index)}
                style={{ animationDelay: `${index * 0.06}s` }}
              >
                <div className="animated-card-image">
                  <img src={card.image} alt={card.title} />
                </div>

                <div className="animated-card-body">
                  <small>{card.date}</small>
                  <h4>{card.title}</h4>
                  <p>{card.text}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="gallery-grid-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>المعرض</h3>
              <p>صورك بشكل أكبر وأوضح</p>
            </div>
          </div>

          <div className="big-gallery-grid">
            {memoryCards.map((item, index) => (
              <button
                key={item.id}
                className="big-gallery-card"
                onClick={() => openCard(index)}
              >
                <img src={item.image} alt={item.title} />
                <div className="big-gallery-overlay">
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[3]}</span>
        </div>

        <section className="wish-section fade-up">
          <div className="section-head centered-head">
            <div>
              <h3>أفكار صغيرة... معناها كبير</h3>
              <p>Little things, big meaning</p>
            </div>
          </div>

          <div className="wish-grid">
            {moments.map((item, index) => (
              <div className="wish-card glass" key={index}>
                <span>✦</span>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="big-quotes-section fade-up">
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>حين يسألوني عنك سأقول: سعادة دخلت حياتي ولا أريد لها أن تنتهي ♥️</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>You entered my life and I don't want it to end.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>في قربك شيء يجعل القلب مطمئنًا دون أن يعرف السبب.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>أنت من الأشخاص الذين لا يمرّون عادي... بل يتركون أثرًا جميلًا لا يزول.</p>
          </div>
        </section>

        <section className="prayer-section glass fade-up">
          <span className="small-badge">🤲 دعوة من قلبي</span>
          <h2>أمنيتي ليك</h2>
          <p>{content.prayerText}</p>
        </section>

        <section className="extra-love-section fade-up">
          <div className="extra-love-card glass">
            <h3>السعادة</h3>
            <p>
              وجودك في حياتي كان من الحاجات اللي خلت قلبي يعرف معنى الراحة من جديد.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>القرب</h3>
            <p>
              مش كل حد قربه يفرق... لكن قربك أنت كان له أثر حقيقي وجميل جدًا.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>المكانة</h3>
            <p>
              ليك مكان خاص جدًا... مكان ما حدش يقدر ياخده، ومش عايزة الأيام تغيره أبدًا.
            </p>
          </div>
        </section>

        <section className="final-cute-section glass fade-up">
          <span className="small-badge">🤍 في الآخر</span>
          <h2>آخر كلام</h2>
          <p>{content.finalText}</p>

          <div className="final-promise">
            <p>
              يمكن الصفحة تخلص...
              لكن الإحساس اللي وراها عمره ما كان مجرد تصميم أو كلام،
              ده مكان معمول من قلب حقيقي،
              لشخص غالي فعلًا.
            </p>
          </div>

          <div className="final-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowLastWords(true)}
            >
              افتح آخر كلام
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              ارجع للبداية
            </button>
          </div>
        </section>

        <button
          className="back-top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      </main>

      {selectedCard && (
        <div className="modal" onClick={closeCard}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeCard}>
              ×
            </button>

            <button className="modal-nav modal-prev" onClick={prevCard}>
              ‹
            </button>
            <button className="modal-nav modal-next" onClick={nextCard}>
              ›
            </button>

            <div className="modal-image">
              <img src={selectedCard.image} alt={selectedCard.title} />
            </div>

            <div className="modal-content">
              <span className="modal-chip">ذكرى مختارة</span>
              <small>
                {selectedIndex + 1} / {memoryCards.length}
              </small>
              <h3>{selectedCard.title}</h3>
              <p>{selectedCard.text}</p>
            </div>
          </div>
        </div>
      )}

      {showLastWords && (
        <div
          className="last-words-overlay"
          onClick={() => setShowLastWords(false)}
        >
          <div
            className="last-words-card glass"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="close-btn"
              onClick={() => setShowLastWords(false)}
            >
              ×
            </button>
            <span className="small-badge">Final words</span>
            <h2>الخلاصة</h2>
            <p>{content.lastWords}</p>
          </div>
        </div>
      )}
    </div>
  );
}