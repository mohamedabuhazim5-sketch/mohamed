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
        "في وسط كل الوجوه الكثيرة... فضل اسمك مختلف، وحضورك ثابت، وأثرك ما اتنسيش.",
      heroText:
        "المكان ده معمول مخصوص ليك، بتفاصيل بسيطة لكن ليها معنى كبير. الفكرة مش مجرد صور أو كلام، لكنها مساحة فيها تقدير، ذكرى، وإحساس صادق متجمعين في شكل يليق بشخص ليه مكانة حقيقية.",
      meetTitle: "من أول ما عرفتك",
      meetDate: "2 / 11 / 2023",
      timerTitle: "من أول ما بقيت جزء مهم",
      timerText:
        "في ناس بنعرفهم عادي، وفي ناس وجودهم بيفرق فعلًا. وإنت من الناس اللي حضورهم بيترك أثر واضح، ويفضل موجود حتى مع مرور الوقت.",
      longMessage:
        "أنا مش كاتب الكلام ده لمجرد المجاملة، ولا عشان أوصل حاجة مؤقتة. أنا كاتبه لأن بعض الناس ليهم قيمة حقيقية، ومكانتهم ما بتكونش عابرة. وإنت من الناس اللي استحقوا التقدير، والذكرى، والكلام اللي يتكتب بصدق.",
      cuteText:
        "صفحة معمولة بتقدير حقيقي... وتفاصيل مخصوصة... بشكل يليق باسمك.",
      finalText:
        "يمكن الأيام بتتغير، والظروف بتاخدنا في اتجاهات مختلفة، لكن في أشخاص بيفضل لهم أثر واضح مهما مر الوقت. والصفحة دي معمولـة عشان تفضل ذكرى مرتبة، مميزة، وتستحق الاحتفاظ بيها.",
      lastWords:
        "ولو كان لازم يتقال آخر كلام، فهو إن بعض الأشخاص ما بيكونوش مجرد مرحلة أو معرفة عادية... لكن بيبقوا قيمة، أثر، وذكرى محترمة تفضل موجودة حتى بعد ما تعدي الأيام.",
      prayerText:
        "أتمنى لك راحة في بالك، وتوفيق في خطوتك، ونجاح يليق بك، وأيام أهدى وأفضل. وربنا يكتب لك الخير في كل طريق تمشي فيه، ويجعل القادم أحسن وأقرب لكل شيء تتمناه.",
    }),
    []
  );

  const memoryCards = useMemo(
    () => [
      {
        id: 1,
        title: "البداية",
        image: "/1.jpg",
        date: "أول انطباع",
        text: "من البداية كان واضح إنك شخص مختلف، وليك حضور يبان من غير مجهود.",
      },
      {
        id: 2,
        title: "الأسلوب",
        image: "/2.jpg",
        date: "تفصيلة مميزة",
        text: "في ناس بتلفت النظر بالكلام، وناس بالفعل. وإنت كنت من النوع اللي حضوره يفرض احترامه.",
      },
      {
        id: 3,
        title: "الحضور",
        image: "/3.jpg",
        date: "أثر واضح",
        text: "وجودك في أي مكان بيضيف له طابع مختلف، وبيخلي التفاصيل أهدى وأرتب.",
      },
      {
        id: 4,
        title: "الكلام",
        image: "/4.jpg",
        date: "ثقل وهدوء",
        text: "أسلوبك له طابع خاص، فيه هدوء وثبات، وده من الحاجات اللي تفضل مميزة.",
      },
      {
        id: 5,
        title: "النظرة",
        image: "/5.jpg",
        date: "قوة بسيطة",
        text: "أحيانًا نظرة واحدة كفاية تقول كثير، وإنت من الناس اللي حضورهم بيتفهم من غير شرح.",
      },
      {
        id: 6,
        title: "الهيبة",
        image: "/6.jpg",
        date: "تفصيلة ثابتة",
        text: "في فرق بين حد موجود وخلاص، وحد وجوده له وزن. وإنت من النوع التاني.",
      },
      {
        id: 7,
        title: "المكانة",
        image: "/7.jpg",
        date: "قدر خاص",
        text: "مش كل الناس بيكون لهم نفس المكانة، وبعض الأسماء تفضل محفوظة باحترام مختلف.",
      },
      {
        id: 8,
        title: "الذكرى",
        image: "/8.jpg",
        date: "مع الوقت",
        text: "مرور الوقت ما بيشيلش قيمة الناس الحقيقية، بالعكس أحيانًا بيوضحها أكثر.",
      },
      {
        id: 9,
        title: "التقدير",
        image: "/9.jpg",
        date: "يبقى موجود",
        text: "في النهاية، التقدير الصادق يفضل له مكان، والصفحة دي جزء من التقدير ده.",
      },
    ],
    []
  );

  const timelineItems = useMemo(
    () => [
      {
        title: "أول معرفة",
        date: "البداية",
        text: "أول انطباع كان كفاية يوضح إنك شخص ليه طابع مختلف.",
      },
      {
        title: "وضوح المكانة",
        date: "بعدها بشوية",
        text: "مع الوقت، بعض الصفات بتبان أكثر، وبعض الناس قيمتهم بتثبت.",
      },
      {
        title: "مرور الوقت",
        date: "أصعب مرحلة",
        text: "الوقت بيختبر كل شيء، والناس الحقيقية بيبان قدرها أكثر مع الأيام.",
      },
      {
        title: "النهارده",
        date: "دلوقتي",
        text: "النهارده الفكرة كلها إن في ذكرى تستحق تتعمل بشكل محترم ومميز.",
      },
    ],
    []
  );

  const facts = useMemo(
    () => [
      { title: "الاسم", value: DISPLAY_NAME },
      { title: "المكانة", value: "ثابتة" },
      { title: "عدد الصور", value: "9" },
      { title: "الطابع", value: "مميز" },
    ],
    []
  );

  const reasons = useMemo(
    () => [
      "حضورك",
      "أسلوبك",
      "ثباتك",
      "هدوءك",
      "شخصيتك",
      "تفاصيلك",
      "مكانتك",
      "احترامك",
    ],
    []
  );

  const differentReasons = useMemo(
    () => [
      {
        title: "لك حضور",
        text: "مش أي شخص يلفت الانتباه بهدوء، لكن حضورك من النوع الواضح.",
      },
      {
        title: "لك أسلوب",
        text: "الأسلوب يفرق كثير، وطريقتك في الكلام والتصرف لها طابعها الخاص.",
      },
      {
        title: "لك ثبات",
        text: "الثبات من الصفات النادرة، وده من أكثر الأشياء اللي تدي قيمة حقيقية للشخص.",
      },
      {
        title: "لك مكانة",
        text: "بعض الأشخاص ليهم قدر واضح، ومش بيحتاجوا يثبتوا ده كثير.",
      },
      {
        title: "لك احترام",
        text: "الاحترام الحقيقي بيتبني من الشخصية، وإنت من الناس اللي وجودهم يفرضه.",
      },
      {
        title: "لك أثر",
        text: "في أشخاص بيعدوا، وفي أشخاص يفضل لهم أثر، وإنت من النوع التاني.",
      },
    ],
    []
  );

  const paragraphs = useMemo(
    () => [
      "بعض الأشخاص ما بيتنسوش بسهولة، مش لأنهم كانوا موجودين فقط، لكن لأن وجودهم كان له معنى.",
      "فيه فرق بين شخص عادي وشخص له طابع يفضل واضح حتى بعد مرور الوقت، وإنت من النوع اللي له قيمة فعلًا.",
      "التفاصيل الصغيرة أحيانًا هي اللي تفرق، وطريقة الحضور، والكلام، والثبات، كلها حاجات بتبني صورة محترمة ومميزة.",
      "الفكرة من الصفحة دي مش الكلام فقط، لكن إنها تبقى ذكرى مرتبة ومحترمة، وتوصل تقدير حقيقي بشكل مختلف.",
    ],
    []
  );

  const scatteredMessages = useMemo(
    () => [
      "بعض الأسماء تفضل ثابتة.",
      "الاحترام الحقيقي لا يُنسى.",
      "القيمة تُرى في التفاصيل.",
      "هناك حضور يفرض نفسه بهدوء.",
    ],
    []
  );

  const moments = useMemo(
    () => [
      "لحظة نجاح تستحق التوثيق",
      "ذكرى مميزة بشكل مختلف",
      "هدية غير تقليدية ومحترمة",
      "تفصيلة تبقى مع الوقت",
      "صفحة فيها معنى وقيمة",
      "ذكرى معمولة بذوق واهتمام",
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
            prev === null ? 0 : (prev - 1 + memoryCards.length) % memoryCards.length
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
        <h1>جارِ تجهيز الصفحة الخاصة بـ {DISPLAY_NAME}</h1>
        <p className="loader-subtitle">
          تفاصيل مرتبة، تصميم أنيق، وذكرى معمولة بشكل مختلف
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
          <div className="cute-badge">نسخة خاصة ومميزة</div>

          <h1>ادخل كلمة السر يا {DISPLAY_NAME}</h1>

          <p className="password-subtext">
            الصفحة دي معمولة بشكل خاص، فيها صور، تفاصيل، وكلام متجمعين في
            نسخة مرتبة ومحترمة تليق بقيمتك.
          </p>

          <form onSubmit={handleUnlock} className="password-form">
            <input
              type="password"
              placeholder="اكتب كلمة السر هنا"
              value={enteredPassword}
              onChange={(e) => setEnteredPassword(e.target.value)}
            />
            <button type="submit">فتح الصفحة</button>
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
          <span className="small-badge">نسخة خاصة</span>
          <h1>{DISPLAY_NAME}</h1>
          <TypingText
            text="بعض الأشخاص لا يحتاجون كثيرًا من الكلام... يكفي أن لهم مكانة واضحة."
            className="cinematic-typing"
            speed={28}
          />
          <p>
            قبل ما تبدأ، خد لحظة هدوء...
            لأن اللي جاي مش مجرد صفحة،
            لكنه ترتيب مختلف لذكرى تستحق.
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
          <span className="opening-note-badge">بداية الصفحة</span>
          <h2>أهلاً يا {DISPLAY_NAME}</h2>
          <p>
            الصفحة دي معمولـة مخصوص علشان تجمع شوية تفاصيل لها قيمة،
            وتطلع في شكل مرتب، هادي، ومختلف عن أي حاجة تقليدية.
          </p>
        </section>

        <section className="hero-banner glass fade-up">
          <div className="hero-banner-text">
            <span className="small-badge">نسخة مخصصة بالكامل</span>

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
                كلمة أخيرة
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
            <span>يوم من البداية</span>
          </div>

          <div className="stat-card glass cute-counter-card">
            <div className="pulse-ring"></div>
            <strong>{counter.hours}</strong>
            <span>ساعة من الذكرى</span>
          </div>

          <div className="stat-card glass">
            <strong>{memoryCards.length}</strong>
            <span>صورة</span>
          </div>

          <div className="stat-card glass">
            <strong>∞</strong>
            <span>تقدير</span>
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
          <span className="small-badge">العداد</span>
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
                  <strong>الموسيقى</strong>
                  <small>مشغل مدمج داخل الصفحة</small>
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
            <span className="small-badge">رسالة صوتية</span>
            <h2>استمع للتسجيل</h2>
            <p>
              ويمكنك إضافة ملف صوتي في المسار{" "}
              <strong>/voice-message.mp3</strong>
              ليظهر هنا بنفس الشكل.
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
              <h3>أشياء تميزك</h3>
              <p>صفات واضحة تدي للشخص قيمته الحقيقية</p>
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
          <span className="small-badge">رسالة</span>
          <h2>كلام يستحق يتقال</h2>
          <p>{content.longMessage}</p>
        </section>

        <section className="extra-love-section fade-up">
          {paragraphs.map((paragraph, index) => (
            <div className="extra-love-card glass" key={index}>
              <h3>فقرة {index + 1}</h3>
              <p>{paragraph}</p>
            </div>
          ))}
        </section>

        <div className="section-divider fade-up">
          <span>{scatteredMessages[2]}</span>
        </div>

        <section className="love-columns fade-up">
          <div className="love-column-card glass">
            <h3>أكثر ما يميزك</h3>
            <ul>
              {reasons.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          <div className="love-column-card glass">
            <h3>لما ييجي اسمك</h3>
            <ul>
              <li>أفتكر حضور واضح</li>
              <li>أفتكر شخصية مختلفة</li>
              <li>أفتكر أسلوب له قيمة</li>
              <li>أفتكر تفاصيل مميزة</li>
              <li>أفتكر مكانة ثابتة</li>
              <li>وأفتكر تقدير يستحق يفضل</li>
            </ul>
          </div>
        </section>

        <section className="timeline-section glass fade-up">
          <div className="section-head">
            <div>
              <h3>الخط الزمني</h3>
              <p>ترتيب بسيط لذكرى لها معنى</p>
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
              <h3>9 صور... وكل واحدة لها معنى</h3>
              <p>جاليري مرتب بشكل واضح ومميز</p>
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
              <p>الصور بشكل أكبر وأوضح</p>
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
              <h3>أفكار المعنى فيها أكبر من الشكل</h3>
              <p>تفاصيل بسيطة لكن تبقى مميزة</p>
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
            <p>بعض الأشخاص لا يحتاجون إلى كثير من الظهور... يكفي أن لهم أثرًا واضحًا.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>الاحترام الحقيقي لا يضيع، والمكانة الواضحة لا تحتاج شرحًا.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>هناك أسماء تبقى محفوظة، لأنها ببساطة كانت مختلفة.</p>
          </div>
          <div className="quote-box glass">
            <span className="quote-badge">❝</span>
            <p>القيمة لا تُقال كثيرًا... لكنها تظهر في التفاصيل.</p>
          </div>
        </section>

        <section className="prayer-section glass fade-up">
          <span className="small-badge">دعوة طيبة</span>
          <h2>أمنية صادقة</h2>
          <p>{content.prayerText}</p>
        </section>

        <section className="extra-love-section fade-up">
          <div className="extra-love-card glass">
            <h3>التقدير</h3>
            <p>
              الفكرة هنا قائمة على التقدير الحقيقي، والاهتمام بالتفاصيل، وتقديم
              شيء له معنى.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>الاختلاف</h3>
            <p>
              النسخة دي معمولة بشكل مختلف، بعيد عن التقليدي، وتطلع في النهاية
              بشكل يلفت ويستحق.
            </p>
          </div>
          <div className="extra-love-card glass">
            <h3>القيمة</h3>
            <p>
              بعض الهدايا تنتهي بسرعة، لكن بعض الأفكار تفضل ذكرى محترمة ومميزة
              مع الوقت.
            </p>
          </div>
        </section>

        <section className="final-cute-section glass fade-up">
          <span className="small-badge">الخاتمة</span>
          <h2>وفي النهاية</h2>
          <p>{content.finalText}</p>

          <div className="final-promise">
            <p>
              الفكرة كلها إن يبقى في شيء متعمل بذوق، ومرتب بشكل واضح،
              ويحفظ الذكرى بطريقة مختلفة عن أي حاجة معتادة.
            </p>
          </div>

          <div className="final-actions">
            <button
              className="btn btn-primary"
              onClick={() => setShowLastWords(true)}
            >
              عرض الكلمة الأخيرة
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              الرجوع للبداية
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
              <span className="modal-chip">تفصيلة مختارة</span>
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
            <span className="small-badge">كلمة أخيرة</span>
            <h2>الخلاصة</h2>
            <p>{content.lastWords}</p>
          </div>
        </div>
      )}
    </div>
  );
}