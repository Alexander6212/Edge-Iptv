import { useState, useEffect } from 'react'
import { supabase } from './supabaseClient'
const NAV_LINKS = ['Features', 'Channels', 'Pricing', 'Devices', 'FAQ']

const FEATURES = [
  {
    icon: '⚡',
    title: '20,000+ Live Channels',
    desc: 'Sports, news, movies, series — every major network worldwide, live and on demand.',
  },
  {
    icon: '🎬',
    title: '60,000+ VOD Library',
    desc: 'Movies and series on demand. New titles added daily, 4K where available.',
  },
  {
    icon: '📡',
    title: '99.9% Uptime',
    desc: 'Enterprise-grade infrastructure. Anti-freeze technology keeps streams buttery smooth.',
  },
  {
    icon: '🔒',
    title: 'Encrypted & Private',
    desc: 'SSL-secured streams, no logs, no throttling. Your privacy is never negotiable.',
  },
  {
    icon: '🌍',
    title: 'Global Coverage',
    desc: 'UK, USA, France, Germany, Italy, Spain, Arab, Turkish and 60+ more country packs.',
  },
  {
    icon: '🎮',
    title: 'Multi-Device',
    desc: 'Watch on Smart TV, Android, iPhone, Firestick, MAG, PC or any browser simultaneously.',
  },
]

const CHANNELS = [
  { name: 'Sky Sports', flag: '🇬🇧', category: 'Sports' },
  { name: 'ESPN HD', flag: '🇺🇸', category: 'Sports' },
  { name: 'beIN Sports', flag: '🌍', category: 'Sports' },
  { name: 'HBO Max', flag: '🇺🇸', category: 'Movies' },
  { name: 'Netflix CH', flag: '🌐', category: 'Movies' },
  { name: 'BBC One', flag: '🇬🇧', category: 'News' },
  { name: 'CNN Int.', flag: '🇺🇸', category: 'News' },
  { name: 'Al Jazeera', flag: '🌍', category: 'News' },
  { name: 'Cartoon Net.', flag: '🌐', category: 'Kids' },
  { name: 'Disney Ch.', flag: '🌐', category: 'Kids' },
  { name: 'BFM TV', flag: '🇫🇷', category: 'News' },
  { name: 'RAI Uno', flag: '🇮🇹', category: 'Entertainment' },
]

const PLANS = [
  {
    name: 'STARTER',
    price: '9.99',
    period: '/ month',
    connections: 1,
    highlight: false,
    features: [
      '20,000+ Live Channels',
      '60,000+ VOD',
      'Full HD Streams',
      '1 Connection',
      '24h Trial Available',
      'Email Support',
    ],
  },
  {
    name: 'PRO',
    price: '14.99',
    period: '/ month',
    connections: 2,
    highlight: true,
    features: [
      '20,000+ Live Channels',
      '60,000+ VOD',
      '4K Ultra HD Streams',
      '2 Connections',
      'Anti-Freeze Tech',
      'Priority Support',
    ],
  },
  {
    name: 'ELITE',
    price: '24.99',
    period: '/ month',
    connections: 5,
    highlight: false,
    features: [
      '20,000+ Live Channels',
      '60,000+ VOD',
      '4K Ultra HD Streams',
      '5 Connections',
      'Anti-Freeze Tech',
      'Dedicated Support',
    ],
  },
]

const DEVICES = [
  { name: 'Smart TV', icon: '📺' },
  { name: 'Android', icon: '📱' },
  { name: 'iPhone / iPad', icon: '🍎' },
  { name: 'Firestick', icon: '🔥' },
  { name: 'MAG Box', icon: '📦' },
  { name: 'Windows PC', icon: '💻' },
  { name: 'Mac', icon: '🖥️' },
  { name: 'Browser', icon: '🌐' },
]

const FAQS = [
  {
    q: 'How quickly will I receive my subscription?',
    a: 'Activation is instant — within minutes of payment confirmation, your credentials are delivered by email.',
  },
  {
    q: 'Can I try before I buy?',
    a: 'Yes. We offer a 24-hour free trial on all plans. No credit card required for the trial.',
  },
  {
    q: 'What if streams freeze or buffer?',
    a: 'Our anti-freeze technology and redundant server network eliminate 99% of buffering. If you experience issues, our support team resolves them in under an hour.',
  },
  {
    q: 'Do you support MAG and Enigma2?',
    a: 'Yes. Edge IPTV provides M3U, M3U+, Xtream Codes, and MAG portal URLs — compatible with virtually every player and device.',
  },
  {
    q: 'Is my payment secure?',
    a: 'All payments are processed via SSL-encrypted gateways. We accept card, crypto, and PayPal.',
  },
]

const STATS = [
  { value: '20K+', label: 'Live Channels' },
  { value: '60K+', label: 'VOD Titles' },
  { value: '99.9%', label: 'Uptime' },
  { value: '150+', label: 'Countries' },
]

export default function App() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  const [activeSection, setActiveSection] = useState('')
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activePlanPeriod, setActivePlanPeriod] = useState<'monthly' | 'yearly'>('monthly')
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const handleSignUp = async () => {
  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    alert(error.message)
  } else {
    alert('Account created! Check your email to confirm your account.')
  }
}

const handleLogin = async () => {
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    alert(error.message)
  } else {
    alert('Login successful!')
  }
}

const handleLogout = async () => {
  await supabase.auth.signOut()
}

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const s=document.createElement('script');
    s.src='https://embed.tawk.to/6a60a4c7ff3acf1d4aacca98/1ju4o7bo9';
    s.async=true;
    s.charset='UTF-8';
    s.setAttribute('crossorigin','*');
    document.body.appendChild(s);
    return ()=>{document.body.removeChild(s)};
  }, [])

  const yearlyDiscount = 0.7

  return (
    <div
      className="min-h-screen"
      style={{ fontFamily: 'var(--font-sans)', background: '#080808', color: '#f0f0f0' }}
    >
      {/* NAV */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(8,8,8,0.96)' : 'transparent',
          borderBottom: scrolled ? '1px solid #2a2a2a' : 'none',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded flex items-center justify-center text-black text-sm font-bold"
              style={{ background: '#FACC15', fontFamily: 'var(--font-display)' }}
            >
              E
            </div>
            <span
              className="text-xl tracking-wider"
              style={{ fontFamily: 'var(--font-display)', color: '#FACC15', letterSpacing: '0.12em' }}
            >
              EDGE IPTV
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-sm font-medium transition-colors duration-200"
                style={{ color: '#aaa' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FACC15')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#aaa')}
              >
                {l}
              </a>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button
              className="text-sm font-semibold px-4 py-2 rounded transition-colors"
              style={{ color: '#FACC15', border: '1px solid #FACC15' }}
              onClick={() => setShowAuth(true)}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#FACC15'
                e.currentTarget.style.color = '#000'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent'
                e.currentTarget.style.color = '#FACC15'
              }}
            >
              Free Trial
            </button>
            <a
              href="#pricing"
              className="text-sm font-bold px-5 py-2 rounded transition-all"
              style={{ background: '#FACC15', color: '#000' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#EAB308')}
              onMouseLeave={(e) => (e.currentTarget.style.background = '#FACC15')}
            >
              Subscribe Now
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white text-xl"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ background: '#111', borderTop: '1px solid #2a2a2a' }}>
            <div className="px-6 py-4 flex flex-col gap-4">
              {NAV_LINKS.map((l) => (
                <a
                  key={l}
                  href={`#${l.toLowerCase()}`}
                  className="text-sm font-medium"
                  style={{ color: '#ccc' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {l}
                </a>
              ))}
              <a
                href="#pricing"
                className="text-sm font-bold px-5 py-2 rounded text-center mt-2"
                style={{ background: '#FACC15', color: '#000' }}
                onClick={() => setMobileOpen(false)}
              >
                Subscribe Now
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        {/* Background grid */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(250,204,21,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(250,204,21,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(250,204,21,0.12) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-24 w-full">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <div>
              <div
                className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full mb-6"
                style={{ background: 'rgba(250,204,21,0.12)', color: '#FACC15', border: '1px solid rgba(250,204,21,0.3)' }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                LIVE NOW — 20,000+ CHANNELS
              </div>

              <h1
                className="leading-none mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(52px, 8vw, 96px)',
                  letterSpacing: '-0.01em',
                  lineHeight: 0.95,
                }}
              >
                <span style={{ color: '#FACC15' }}>EDGE</span>
                <br />
                <span style={{ color: '#f0f0f0' }}>YOUR</span>
                <br />
                <span style={{ color: '#f0f0f0' }}>STREAM.</span>
              </h1>

              <p className="text-base mb-8 max-w-md leading-relaxed" style={{ color: '#999' }}>
                Premium IPTV service with 20,000+ live channels, 60,000+ movies and series in Full HD and 4K. Anti-freeze technology. 99.9% uptime. Activate in minutes.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-sm transition-all"
                  style={{ background: '#FACC15', color: '#000' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = '#EAB308'; e.currentTarget.style.transform = 'translateY(-1px)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = '#FACC15'; e.currentTarget.style.transform = 'translateY(0)' }}
                >
                  GET STARTED ▶
                </a>
                <a
                  href="#trial"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded font-bold text-sm transition-all"
                  style={{ color: '#FACC15', border: '1px solid rgba(250,204,21,0.4)', background: 'transparent' }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(250,204,21,0.08)' }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent' }}
                >
                  FREE 24H TRIAL
                </a>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap gap-6">
                {['No Contract', 'Instant Setup', 'Cancel Anytime'].map((t) => (
                  <div key={t} className="flex items-center gap-1.5 text-xs" style={{ color: '#666' }}>
                    <span style={{ color: '#FACC15' }}>✓</span> {t}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — TV mockup */}
            <div className="relative flex justify-center">
              <div
                className="relative rounded-2xl overflow-hidden"
                style={{
                  width: '100%',
                  maxWidth: '520px',
                  aspectRatio: '16/10',
                  background: '#111',
                  border: '2px solid #2a2a2a',
                  boxShadow: '0 0 80px rgba(250,204,21,0.15), 0 40px 80px rgba(0,0,0,0.6)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1593784991095-a205069470b6?w=900&h=562&fit=crop&auto=format"
                  alt="Streaming entertainment on screen"
                  className="w-full h-full object-cover"
                />
                {/* Overlay UI */}
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)' }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded flex items-center justify-center text-xs font-bold"
                      style={{ background: '#FACC15', color: '#000' }}
                    >
                      LIVE
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-white">Sky Sports Premier League</div>
                      <div className="text-xs" style={{ color: '#aaa' }}>Man City vs Arsenal · 74'</div>
                    </div>
                  </div>
                </div>
                {/* Corner badge */}
                <div
                  className="absolute top-4 right-4 text-xs font-bold px-2 py-1 rounded"
                  style={{ background: 'rgba(250,204,21,0.9)', color: '#000' }}
                >
                  4K UHD
                </div>
              </div>

              {/* Floating channel cards */}
              <div
                className="absolute -left-4 top-1/4 rounded-xl px-4 py-3"
                style={{ background: '#161616', border: '1px solid #2a2a2a', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                <div className="text-xs font-bold mb-1" style={{ color: '#FACC15' }}>NOW LIVE</div>
                <div className="text-sm font-semibold text-white">20,000+ Channels</div>
              </div>

              <div
                className="absolute -right-4 bottom-1/4 rounded-xl px-4 py-3"
                style={{ background: '#161616', border: '1px solid #2a2a2a', boxShadow: '0 8px 32px rgba(0,0,0,0.5)' }}
              >
                <div className="text-xs font-bold mb-1" style={{ color: '#FACC15' }}>VOD LIBRARY</div>
                <div className="text-sm font-semibold text-white">60,000+ Titles</div>
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-px"
            style={{ border: '1px solid #2a2a2a', borderRadius: '12px', overflow: 'hidden' }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                className="px-8 py-6 text-center"
                style={{ background: '#111', borderRight: i < 3 ? '1px solid #2a2a2a' : 'none' }}
              >
                <div
                  className="text-3xl font-bold mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: '#FACC15', letterSpacing: '0.02em' }}
                >
                  {s.value}
                </div>
                <div className="text-xs font-medium" style={{ color: '#666' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="py-28" style={{ background: '#0c0c0c' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#FACC15' }}>
              WHY EDGE IPTV
            </div>
            <h2
              className="leading-none mb-4"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#f0f0f0',
              }}
            >
              BUILT FOR
              <span style={{ color: '#FACC15' }}> PERFORMANCE.</span>
            </h2>
            <p className="text-sm max-w-lg leading-relaxed" style={{ color: '#666' }}>
              No buffering, no freezing, no compromises. Edge IPTV is engineered for viewers who demand the best.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#2a2a2a', border: '1px solid #2a2a2a', borderRadius: '16px', overflow: 'hidden' }}>
            {FEATURES.map((f, i) => (
              <div
                key={f.title}
                className="p-8 transition-all duration-300 group cursor-default"
                style={{ background: '#111' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#161616')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#111')}
              >
                <div
                  className="text-3xl mb-4 w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(250,204,21,0.1)', border: '1px solid rgba(250,204,21,0.2)' }}
                >
                  {f.icon}
                </div>
                <h3
                  className="text-base font-bold mb-2"
                  style={{ color: '#f0f0f0' }}
                >
                  {f.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: '#666' }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHANNELS */}
      <section id="channels" className="py-28" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#FACC15' }}>
                CHANNEL LINEUP
              </div>
              <h2
                className="leading-none"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  color: '#f0f0f0',
                }}
              >
                EVERY CHANNEL.
                <br />
                <span style={{ color: '#FACC15' }}>EVERYWHERE.</span>
              </h2>
            </div>
            <p className="text-sm max-w-xs leading-relaxed md:text-right" style={{ color: '#666' }}>
              UK, USA, FR, DE, IT, ES, Arabic, Turkish and 60+ more country packs — all in one subscription.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-8">
            {CHANNELS.map((ch) => (
              <div
                key={ch.name}
                className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 cursor-default"
                style={{ background: '#111', border: '1px solid #2a2a2a' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(250,204,21,0.4)'
                  e.currentTarget.style.background = '#161616'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2a2a'
                  e.currentTarget.style.background = '#111'
                }}
              >
                <span className="text-xl">{ch.flag}</span>
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#f0f0f0' }}>
                    {ch.name}
                  </div>
                  <div className="text-xs" style={{ color: '#555' }}>
                    {ch.category}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div
            className="text-center py-6 rounded-xl text-sm"
            style={{ background: 'rgba(250,204,21,0.06)', border: '1px solid rgba(250,204,21,0.15)', color: '#FACC15' }}
          >
            + 19,988 more channels across Sports, Entertainment, Documentary, Kids, Music, News and more
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-28" style={{ background: '#0c0c0c' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#FACC15' }}>
              PRICING PLANS
            </div>
            <h2
              className="leading-none mb-6"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 64px)',
                color: '#f0f0f0',
              }}
            >
              SIMPLE.
              <span style={{ color: '#FACC15' }}> TRANSPARENT.</span>
            </h2>

            {/* Toggle */}
            <div
              className="inline-flex rounded-lg p-1 mb-4"
              style={{ background: '#161616', border: '1px solid #2a2a2a' }}
            >
              {(['monthly', 'yearly'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePlanPeriod(p)}
                  className="px-5 py-2 rounded-md text-sm font-semibold capitalize transition-all"
                  style={{
                    background: activePlanPeriod === p ? '#FACC15' : 'transparent',
                    color: activePlanPeriod === p ? '#000' : '#666',
                  }}
                >
                  {p} {p === 'yearly' && <span className="text-xs ml-1">SAVE 30%</span>}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANS.map((plan) => {
              const price = activePlanPeriod === 'yearly'
                ? (parseFloat(plan.price) * yearlyDiscount).toFixed(2)
                : plan.price

              return (
                <div
                  key={plan.name}
                  className="relative rounded-2xl p-8 flex flex-col transition-all duration-300"
                  style={{
                    background: plan.highlight ? '#FACC15' : '#111',
                    border: plan.highlight ? 'none' : '1px solid #2a2a2a',
                    transform: plan.highlight ? 'scale(1.03)' : 'scale(1)',
                    boxShadow: plan.highlight ? '0 0 60px rgba(250,204,21,0.3)' : 'none',
                  }}
                >
                  {plan.highlight && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
                      style={{ background: '#000', color: '#FACC15' }}
                    >
                      MOST POPULAR
                    </div>
                  )}

                  <div
                    className="text-xs font-bold tracking-widest mb-6"
                    style={{ color: plan.highlight ? '#000' : '#FACC15' }}
                  >
                    {plan.name}
                  </div>

                  <div className="mb-1 flex items-end gap-1">
                    <span
                      className="font-bold leading-none"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '52px',
                        color: plan.highlight ? '#000' : '#f0f0f0',
                      }}
                    >
                      ${price}
                    </span>
                  </div>
                  <div
                    className="text-sm mb-8"
                    style={{ color: plan.highlight ? '#333' : '#555' }}
                  >
                    {activePlanPeriod === 'yearly' ? '/ month, billed yearly' : '/ month'}
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm">
                        <span
                          className="w-4 h-4 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                          style={{
                            background: plan.highlight ? 'rgba(0,0,0,0.15)' : 'rgba(250,204,21,0.15)',
                            color: plan.highlight ? '#000' : '#FACC15',
                          }}
                        >
                          ✓
                        </span>
                        <span style={{ color: plan.highlight ? '#111' : '#aaa' }}>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <a
                    href="#trial"
                    className="w-full py-3 rounded-lg text-sm font-bold text-center transition-all block"
                    style={{
                      background: plan.highlight ? '#000' : '#FACC15',
                      color: plan.highlight ? '#FACC15' : '#000',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    GET {plan.name}
                  </a>
                </div>
              )
            })}
          </div>

          <p className="text-center text-xs mt-8" style={{ color: '#444' }}>
            All plans include a 24-hour free trial. Cancel anytime. No hidden fees.
          </p>
        </div>
      </section>

      {/* DEVICES */}
      <section id="devices" className="py-28" style={{ background: '#080808' }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#FACC15' }}>
                DEVICE COMPATIBILITY
              </div>
              <h2
                className="leading-none mb-6"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  color: '#f0f0f0',
                  lineHeight: 0.95,
                }}
              >
                WATCH ON
                <br />
                <span style={{ color: '#FACC15' }}>ANY DEVICE.</span>
              </h2>
              <p className="text-sm leading-relaxed mb-8" style={{ color: '#666' }}>
                Smart TV, Android, iOS, MAG, Firestick, PC, Mac — Edge IPTV works on every screen you own, simultaneously.
              </p>
              <a
                href="#pricing"
                className="inline-flex items-center gap-2 px-6 py-3 rounded font-bold text-sm"
                style={{ background: '#FACC15', color: '#000' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#EAB308')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#FACC15')}
              >
                START WATCHING ▶
              </a>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {DEVICES.map((d) => (
                <div
                  key={d.name}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl transition-all duration-200 cursor-default"
                  style={{ background: '#111', border: '1px solid #2a2a2a' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(250,204,21,0.4)'
                    e.currentTarget.style.background = '#161616'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a'
                    e.currentTarget.style.background = '#111'
                  }}
                >
                  <span className="text-2xl">{d.icon}</span>
                  <span className="text-xs text-center font-medium leading-tight" style={{ color: '#888' }}>
                    {d.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FREE TRIAL CTA */}
      <section
        id="trial"
        className="py-24 relative overflow-hidden"
        style={{ background: '#FACC15' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <h2
            className="leading-none mb-4"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(40px, 7vw, 80px)',
              color: '#000',
            }}
          >
            24 HOURS FREE.
          </h2>
          <p className="text-base font-medium mb-8 max-w-xl mx-auto" style={{ color: '#333' }}>
            No credit card. No commitment. Just pure, uninterrupted streaming — 20,000+ channels at your fingertips.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <a
              href="mailto:support@edgeiptv.com"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded font-bold text-sm transition-all"
              style={{ background: '#000', color: '#FACC15' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              CLAIM FREE TRIAL ▶
            </a>
            <a
              href="https://t.me/edgeiptv"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded font-bold text-sm transition-all"
              style={{ background: 'transparent', color: '#000', border: '2px solid #000' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(0,0,0,0.08)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              CONTACT US ON TELEGRAM
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-28" style={{ background: '#0c0c0c' }}>
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs font-bold tracking-widest mb-3" style={{ color: '#FACC15' }}>
              FAQ
            </div>
            <h2
              className="leading-none"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw, 56px)',
                color: '#f0f0f0',
              }}
            >
              QUESTIONS?
            </h2>
          </div>

          <div className="space-y-2">
            {FAQS.map((faq, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden transition-all duration-200"
                style={{ border: openFaq === i ? '1px solid rgba(250,204,21,0.3)' : '1px solid #222', background: '#111' }}
              >
                <button
                  className="w-full px-6 py-5 flex items-center justify-between text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="text-sm font-semibold pr-4" style={{ color: '#f0f0f0' }}>
                    {faq.q}
                  </span>
                  <span
                    className="text-lg flex-shrink-0 transition-transform duration-200"
                    style={{
                      color: '#FACC15',
                      transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0)',
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div className="px-6 pb-5 text-sm leading-relaxed" style={{ color: '#777' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid md:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-black text-sm font-bold"
                  style={{ background: '#FACC15', fontFamily: 'var(--font-display)' }}
                >
                  E
                </div>
                <span
                  className="text-lg tracking-wider"
                  style={{ fontFamily: 'var(--font-display)', color: '#FACC15' }}
                >
                  EDGE IPTV
                </span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: '#555' }}>
                Premium IPTV service. 20,000+ channels. 60,000+ VOD. Worldwide.
              </p>
            </div>

            {/* Links */}
            <div>
              <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#FACC15' }}>
                SERVICE
              </div>
              <ul className="space-y-2">
                {['Live TV', 'VOD Library', 'EPG Guide', 'Anti-Freeze'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors" style={{ color: '#555' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#FACC15' }}>
                SUPPORT
              </div>
              <ul className="space-y-2">
                {['Setup Guide', 'FAQ', 'Contact Us', 'Telegram'].map((l) => (
                  <li key={l}>
                    <a href="#" className="text-sm transition-colors" style={{ color: '#555' }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#aaa')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#555')}
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="text-xs font-bold tracking-widest mb-4" style={{ color: '#FACC15' }}>
                CONTACT
              </div>
              <ul className="space-y-2 text-sm" style={{ color: '#555' }}>
                <li>📧 support@edgeiptv.com</li>
                <li>💬 Telegram: @edgeiptv</li>
                <li>🕐 24/7 Support</li>
              </ul>
            </div>
          </div>

          <div
            className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 text-xs"
            style={{ borderTop: '1px solid #1a1a1a', color: '#444' }}
          >
            <span>© 2026 Edge IPTV. All rights reserved.</span>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Refund Policy'].map((l) => (
                <a key={l} href="#" style={{ color: '#444' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#FACC15')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#444')}
                >
                  {l}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    
      <a href="https://wa.me/923394500119?text=Hi!%20I%20want%20to%20buy%20an%20IPTV%20subscription." target="_blank" rel="noreferrer" style={{position:'fixed',right:'20px',bottom:'100px',width:'60px',height:'60px',borderRadius:'50%',background:'#25D366',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'30px',color:'#fff',textDecoration:'none',zIndex:9999}}>💬</a>
</div>
  )
}
