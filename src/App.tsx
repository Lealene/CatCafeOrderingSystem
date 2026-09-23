import { useState } from 'react';

type Screen = 'splash' | 'welcome' | 'login' | 'register' | 'menu' | 'detail' | 'cart' | 'favorites' | 'feed' | 'search';

// ─── FLOATING BG ─────────────────────────────────────────────────────────────
const BG_EMOJIS = [
  { emoji: '😸', size: 52, top: 5, left: 5, cls: 'float-1' },
  { emoji: '🧋', size: 38, top: 12, left: 72, cls: 'float-2' },
  { emoji: '😺', size: 44, top: 25, left: 18, cls: 'float-3' },
  { emoji: '☕', size: 34, top: 8, left: 48, cls: 'float-4' },
  { emoji: '🍰', size: 40, top: 38, left: 82, cls: 'float-5' },
  { emoji: '🐾', size: 30, top: 55, left: 6, cls: 'float-6' },
  { emoji: '🧁', size: 36, top: 65, left: 58, cls: 'float-7' },
  { emoji: '😻', size: 48, top: 72, left: 25, cls: 'float-8' },
  { emoji: '🥐', size: 32, top: 82, left: 75, cls: 'float-9' },
  { emoji: '💕', size: 28, top: 48, left: 42, cls: 'float-1' },
  { emoji: '🌸', size: 26, top: 30, left: 60, cls: 'float-3' },
  { emoji: '⭐', size: 24, top: 90, left: 40, cls: 'float-2' },
];

function FloatingBg({ opacity = 0.25 }: { opacity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      {BG_EMOJIS.map((item, i) => (
        <div key={i} className={item.cls}
          style={{ position: 'absolute', top: `${item.top}%`, left: `${item.left}%`, fontSize: item.size, userSelect: 'none' }}>
          {item.emoji}
        </div>
      ))}
    </div>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────
const CATEGORIES = ['ALL', 'COFFEE', 'MILK TEA', 'JUICE', 'NACHOS', 'CAKE', 'BREAD'];

const MENU_ITEMS = [
  { id: 1,  name: 'Blue Berry Boba',   price: 150, emoji: '🧋', category: 'MILK TEA', desc: '120oz',             rating: 4.8, tag: 'NEW' },
  { id: 2,  name: 'Hot Latte',         price: 120, emoji: '☕', category: 'COFFEE',   desc: 'Signature blend',    rating: 4.9, tag: 'HOT' },
  { id: 3,  name: 'Matcha Boba',       price: 135, emoji: '🍵', category: 'MILK TEA', desc: 'Creamy matcha',      rating: 4.7, tag: '' },
  { id: 4,  name: 'Iced Americano',    price: 95,  emoji: '🧊', category: 'COFFEE',   desc: 'Strong & cool',      rating: 4.6, tag: '' },
  { id: 5,  name: 'Strawberry Juice',  price: 85,  emoji: '🍓', category: 'JUICE',    desc: 'Fresh squeeze',      rating: 4.5, tag: '' },
  { id: 6,  name: 'Cat Ear Cake',      price: 180, emoji: '🍰', category: 'CAKE',     desc: 'Limited edition',    rating: 5.0, tag: '⭐' },
  { id: 7,  name: 'Croissant',         price: 65,  emoji: '🥐', category: 'BREAD',    desc: 'Freshly baked',      rating: 4.4, tag: '' },
  { id: 8,  name: 'Caramel Boba',      price: 145, emoji: '🧋', category: 'MILK TEA', desc: 'Caramel pearls',     rating: 4.8, tag: 'FAV' },
  { id: 9,  name: 'Mango Juice',       price: 90,  emoji: '🥭', category: 'JUICE',    desc: 'Tropical blend',     rating: 4.5, tag: '' },
  { id: 10, name: 'Plain Nachos',      price: 95,  emoji: '🌮', category: 'NACHOS',   desc: 'Classic crunch',     rating: 4.3, tag: '' },
  { id: 11, name: 'Chees Nachos',      price: 105, emoji: '🧀', category: 'NACHOS',   desc: 'Extra cheesy',       rating: 4.6, tag: 'FAV' },
  { id: 12, name: 'Spys Nachos',       price: 110, emoji: '🌶️', category: 'NACHOS',   desc: 'Spicy kick',         rating: 4.5, tag: 'HOT' },
  { id: 13, name: 'BBQ Nachos',        price: 115, emoji: '🔥', category: 'NACHOS',   desc: 'Smoky BBQ sauce',    rating: 4.7, tag: '' },
  { id: 14, name: 'White Bread',       price: 45,  emoji: '🍞', category: 'BREAD',    desc: 'Soft & fluffy',      rating: 4.2, tag: '' },
  { id: 15, name: 'Baguette',          price: 75,  emoji: '🥖', category: 'BREAD',    desc: 'French style',       rating: 4.6, tag: '' },
];

type MenuItem = typeof MENU_ITEMS[0];

// Feed data per category
type FeedItem = { name: string; emoji: string; price: number; };

const FEED_DATA: Record<string, { title: string; emoji: string; items: FeedItem[] }> = {
  BREAD: {
    title: "BREAD FEED",
    emoji: '🥐',
    items: [
      { name: 'White Bread',   emoji: '🍞', price: 45 },
      { name: 'Wheat Bread',   emoji: '🥖', price: 55 },
      { name: 'Croissant',     emoji: '🥐', price: 65 },
      { name: 'Bagel',         emoji: '🥯', price: 70 },
      { name: 'Toast',         emoji: '🍞', price: 40 },
      { name: 'Baguette',      emoji: '🥖', price: 75 },
      { name: 'Sourdough',     emoji: '🍞', price: 85 },
      { name: 'Muffin',        emoji: '🧁', price: 60 },
      { name: 'Pretzel',       emoji: '🥨', price: 50 },
    ],
  },
  NACHOS: {
    title: "NACHO'S FEED",
    emoji: '🌮',
    items: [
      { name: "PLAIN NACHOS",      emoji: '🌮', price: 95 },
      { name: "CHEES NACHOS",      emoji: '🧀', price: 105 },
      { name: "SPYS NACHOS",       emoji: '🌶️', price: 110 },
      { name: "KETCHAP & NACHOS",  emoji: '🍅', price: 100 },
      { name: "SPECIAL NACHOS",    emoji: '✨', price: 120 },
      { name: "SALAD NACHOS",      emoji: '🥗', price: 115 },
      { name: "BBQ NACHOS",        emoji: '🔥', price: 115 },
      { name: "BEENS NACHOS",      emoji: '🫘', price: 95 },
      { name: "CHIPS NACHOS",      emoji: '🍟', price: 85 },
    ],
  },
  COFFEE: {
    title: "COFFEE DRINK",
    emoji: '☕',
    items: [
      { name: 'Hot Latte',       emoji: '☕', price: 120 },
      { name: 'Iced Americano',  emoji: '🧊', price: 95 },
      { name: 'Cappuccino',      emoji: '☕', price: 130 },
      { name: 'Espresso',        emoji: '☕', price: 80 },
      { name: 'Cold Brew',       emoji: '🧋', price: 110 },
      { name: 'Macchiato',       emoji: '☕', price: 125 },
      { name: 'Flat White',      emoji: '☕', price: 115 },
      { name: 'Mocha',           emoji: '🍫', price: 135 },
      { name: 'Affogato',        emoji: '🍨', price: 145 },
    ],
  },
  'MILK TEA': {
    title: "BOBBA TEA",
    emoji: '🧋',
    items: [
      { name: 'Blue Berry Boba', emoji: '🧋', price: 150 },
      { name: 'Matcha Boba',     emoji: '🍵', price: 135 },
      { name: 'Caramel Boba',    emoji: '🧋', price: 145 },
      { name: 'Taro Boba',       emoji: '💜', price: 140 },
      { name: 'Mango Boba',      emoji: '🥭', price: 135 },
      { name: 'Lychee Boba',     emoji: '🍈', price: 130 },
      { name: 'Brown Sugar Boba',emoji: '🧋', price: 155 },
      { name: 'Strawberry Boba', emoji: '🍓', price: 140 },
      { name: 'Coconut Boba',    emoji: '🥥', price: 145 },
    ],
  },
  JUICE: {
    title: "JUICE",
    emoji: '🍓',
    items: [
      { name: 'Strawberry Juice', emoji: '🍓', price: 85 },
      { name: 'Mango Juice',      emoji: '🥭', price: 90 },
      { name: 'Orange Juice',     emoji: '🍊', price: 80 },
      { name: 'Watermelon Juice', emoji: '🍉', price: 85 },
      { name: 'Lemon Juice',      emoji: '🍋', price: 75 },
      { name: 'Apple Juice',      emoji: '🍎', price: 80 },
      { name: 'Grape Juice',      emoji: '🍇', price: 85 },
      { name: 'Pineapple Juice',  emoji: '🍍', price: 90 },
      { name: 'Coconut Juice',    emoji: '🥥', price: 95 },
    ],
  },
  CAKE: {
    title: "CAKE",
    emoji: '🍰',
    items: [
      { name: 'Cat Ear Cake',    emoji: '🍰', price: 180 },
      { name: 'Choco Cake',      emoji: '🎂', price: 160 },
      { name: 'Strawberry Cake', emoji: '🍓', price: 170 },
      { name: 'Matcha Cake',     emoji: '🍵', price: 165 },
      { name: 'Cheese Cake',     emoji: '🧁', price: 155 },
      { name: 'Lemon Cake',      emoji: '🍋', price: 150 },
      { name: 'Carrot Cake',     emoji: '🥕', price: 145 },
      { name: 'Red Velvet',      emoji: '❤️', price: 175 },
      { name: 'Tiramisu',        emoji: '☕', price: 185 },
    ],
  },
};

// Feed suggestions shown in detail screen (category → feed page)
const FEED_SUGGESTIONS = [
  { emoji: '☕', label: 'Coffee',   cat: 'COFFEE' },
  { emoji: '🧋', label: 'Boba Tea', cat: 'MILK TEA' },
  { emoji: '🍰', label: 'Cake',     cat: 'CAKE' },
  { emoji: '🥐', label: 'Bread',    cat: 'BREAD' },
  { emoji: '🍓', label: 'Juice',    cat: 'JUICE' },
  { emoji: '🌮', label: 'Nachos',   cat: 'NACHOS' },
  { emoji: '🍟', label: 'Snacks',   cat: 'NACHOS' },
  { emoji: '🥖', label: 'Bakery',   cat: 'BREAD' },
];

// Sidebar nav items
const SIDEBAR_ITEMS = [
  { label: 'MENU',         emoji: '🏠', cat: 'ALL' },
  { label: 'COFFEE DRINK', emoji: '☕', cat: 'COFFEE' },
  { label: 'BOBBA TEA',    emoji: '🧋', cat: 'MILK TEA' },
  { label: 'JUICE',        emoji: '🍓', cat: 'JUICE' },
  { label: 'NACHOS',       emoji: '🌮', cat: 'NACHOS' },
  { label: 'CAKE',         emoji: '🍰', cat: 'CAKE' },
  { label: "BREAD'S",      emoji: '🥐', cat: 'BREAD' },
];

// ─── SHARED HEADER ────────────────────────────────────────────────────────────
function AppHeader({
  onMenu, onSearch, onFav, onProfile, onCart,
  favCount = 0, cartCount = 0, showBack, onBack,
}: {
  onMenu?: () => void; onSearch?: () => void; onFav?: () => void;
  onProfile?: () => void; onCart?: () => void;
  favCount?: number; cartCount?: number;
  showBack?: boolean; onBack?: () => void;
}) {
  return (
    <div className="flex items-center justify-between px-5 pt-12 pb-3 z-10 flex-shrink-0"
      style={{ background: 'linear-gradient(180deg, rgba(80,0,40,0.8) 0%, transparent 100%)' }}>
      <div className="flex items-center gap-2">
        {showBack ? (
          <button onClick={onBack}
            className="btn-cute text-white font-black text-lg w-9 h-9 rounded-xl flex items-center justify-center mr-1"
            style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
        ) : (
          <button onClick={onMenu} className="btn-cute flex items-center gap-1">
            <div className="flex flex-col gap-1">
              <div className="w-5 h-0.5 bg-white rounded-full" />
              <div className="w-4 h-0.5 bg-white rounded-full" />
              <div className="w-5 h-0.5 bg-white rounded-full" />
            </div>
          </button>
        )}
        <span className="text-xl ml-1">😺</span>
        <span className="font-display text-white text-lg">cat coffee</span>
      </div>
      <div className="flex gap-2 items-center">
        {onSearch && <button onClick={onSearch} className="btn-cute text-xl">🔍</button>}
        <button onClick={onFav} className="btn-cute relative text-xl heartbeat">
          😻
          {favCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-pink-300 text-purple-900 text-xs font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {favCount}
            </span>
          )}
        </button>
        <button onClick={onCart || onProfile} className="btn-cute relative text-xl">
          👤
          {(cartCount ?? 0) > 0 && (
            <span className="absolute -top-1 -right-1 bg-yellow-400 text-purple-900 text-xs font-black rounded-full w-4 h-4 flex items-center justify-center leading-none">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────────────────
function BottomNav({ active, onHome, onFav, onCart, onProfile }: {
  active: string; onHome: () => void; onFav: () => void; onCart: () => void; onProfile?: () => void;
}) {
  const items = [
    { id: 'home',    icon: '🏠', label: 'Home',    action: onHome },
    { id: 'fav',     icon: '💕', label: 'Fav',     action: onFav },
    { id: 'cart',    icon: '🛒', label: 'Cart',    action: onCart },
    { id: 'profile', icon: '👤', label: 'Profile', action: onProfile || onHome },
  ];
  return (
    <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around px-4 pb-6 pt-4 z-20"
      style={{ background: 'linear-gradient(180deg, transparent 0%, #7a0948 40%)' }}>
      {items.map(nav => (
        <button key={nav.id} onClick={nav.action} className="btn-cute flex flex-col items-center gap-0.5">
          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl transition-all ${active === nav.id ? 'bg-pink-300/30 scale-110' : ''}`}>
            {nav.icon}
          </div>
          <span className={`text-xs font-bold ${active === nav.id ? 'text-pink-200' : 'text-pink-400/50'}`}>{nav.label}</span>
        </button>
      ))}
    </div>
  );
}

// ─── SIDEBAR DRAWER ───────────────────────────────────────────────────────────
function Sidebar({ open, onClose, onSelectCategory }: {
  open: boolean; onClose: () => void; onSelectCategory: (cat: string) => void;
}) {
  if (!open) return null;
  return (
    <div className="absolute inset-0 z-50 flex">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40 fade-in" onClick={onClose} />
      {/* Drawer */}
      <div className="relative w-64 h-full slide-in-left flex flex-col py-12 px-6"
        style={{ background: 'linear-gradient(160deg, #8a0f54 0%, #6a0840 100%)', borderRight: '2px solid rgba(255,182,230,0.2)' }}>
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <span className="text-3xl wiggle">😺</span>
            <span className="font-display text-white text-xl">MENU</span>
          </div>
          <button onClick={onClose} className="btn-cute text-pink-300 text-2xl w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.1)' }}>×</button>
        </div>

        {/* Nav items */}
        <div className="flex flex-col gap-2 scroll-cute overflow-y-auto flex-1">
          {SIDEBAR_ITEMS.map((item) => (
            <button
              key={item.cat}
              onClick={() => { onSelectCategory(item.cat); onClose(); }}
              className="btn-cute flex items-center gap-3 px-4 py-3 rounded-2xl text-left"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.12)' }}
            >
              <span className="text-2xl">{item.emoji}</span>
              <span className="text-white font-bold text-sm tracking-wide">{item.label}</span>
            </button>
          ))}
        </div>

        {/* Bottom cats */}
        <div className="flex justify-around mt-6">
          <span className="text-4xl float-5">😸</span>
          <span className="text-4xl float-7">😻</span>
        </div>
      </div>
    </div>
  );
}

// ─── SEARCH SCREEN ────────────────────────────────────────────────────────────
function SearchScreen({ onBack, onSelectItem }: { onBack: () => void; onSelectItem: (item: MenuItem) => void }) {
  const [query, setQuery] = useState('');

  const results = query.trim()
    ? MENU_ITEMS.filter(i =>
        i.name.toLowerCase().includes(query.toLowerCase()) ||
        i.category.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #7a0948 100%)' }}>
      <FloatingBg opacity={0.06} />

      <div className="flex items-center gap-3 px-5 pt-12 pb-4 z-10 flex-shrink-0">
        <button onClick={onBack} className="btn-cute text-white text-xl w-10 h-10 rounded-2xl flex items-center justify-center flex-shrink-0"
          style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl"
          style={{ background: 'rgba(255,255,255,0.15)', border: '1.5px solid rgba(255,255,255,0.3)' }}>
          <span className="text-lg">🔍</span>
          <input
            autoFocus
            className="flex-1 bg-transparent outline-none text-white placeholder-pink-300 font-semibold text-sm"
            placeholder="Search drinks, food..."
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          {query && (
            <button onClick={() => setQuery('')} className="btn-cute text-pink-300 text-lg">×</button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-cute px-5 pb-8 z-10">
        {query === '' ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <span className="text-7xl float-3">🔍</span>
            <p className="text-pink-200 font-bold">Search Bar</p>
            <p className="text-pink-300 text-sm">Type to find your purr-fect drink!</p>
            {/* Quick tags */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              {CATEGORIES.filter(c => c !== 'ALL').map(cat => (
                <button key={cat} onClick={() => setQuery(cat)}
                  className="btn-cute px-3 py-1.5 rounded-full text-xs font-black text-pink-200"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <span className="text-7xl float-1">😿</span>
            <p className="text-pink-200 font-bold">No results for "{query}"</p>
            <p className="text-pink-300 text-sm">Try a different search 🐾</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <p className="text-pink-300 text-xs font-black uppercase tracking-wider mb-1">{results.length} results for "{query}"</p>
            {results.map(item => (
              <button key={item.id} onClick={() => onSelectItem(item)}
                className="card-hover rounded-2xl p-4 flex items-center gap-4"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.12)' }}>{item.emoji}</div>
                <div className="flex-1 text-left">
                  <p className="text-white font-bold text-sm">{item.name}</p>
                  <p className="text-pink-300 text-xs">{item.category} · {item.desc}</p>
                  <span className="text-yellow-400 text-xs">★ {item.rating}</span>
                </div>
                <span className="text-white font-display text-lg">฿{item.price}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── SPLASH SCREEN ────────────────────────────────────────────────────────────
function SplashScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #960f5e 50%, #7a0948 100%)' }}>
      <FloatingBg opacity={0.35} />
      <div className="relative z-10 flex flex-col items-center gap-6">
        <div className="bounce-in flex flex-col items-center gap-2">
          <div className="text-8xl wiggle">😻</div>
          <h1 className="font-display text-white text-4xl tracking-wide" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.3)' }}>
            Cat Coffee
          </h1>
          <p className="text-pink-200 font-bold text-sm tracking-widest uppercase">✦ Purr-fect Sips ✦</p>
        </div>
        <div className="flex gap-2 float-2">
          {['⭐','💕','⭐'].map((s,i) => <span key={i} className="text-xl">{s}</span>)}
        </div>
        <button onClick={onNext}
          className="btn-cute pulse-glow mt-4 px-12 py-4 rounded-full font-display text-2xl text-white"
          style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #d4258a 100%)', border: '3px solid rgba(255,255,255,0.4)' }}>
          Click to Start 🐾
        </button>
      </div>
    </div>
  );
}

// ─── WELCOME SCREEN ───────────────────────────────────────────────────────────
function WelcomeScreen({ onNext }: { onNext: () => void }) {
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #960f5e 50%, #7a0948 100%)' }}>
      <FloatingBg opacity={0.2} />
      <div className="relative z-10 w-[320px] bounce-in">
        <div className="rounded-3xl p-8 flex flex-col items-center gap-5"
          style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)', border: '2px solid rgba(255,255,255,0.25)' }}>
          <div className="text-6xl heartbeat">😺</div>
          <div className="text-center">
            <h2 className="font-display text-white text-4xl mb-1">WELCOME</h2>
            <p className="text-pink-200 text-sm font-semibold">to your favourite cat café ✨</p>
          </div>
          <div className="flex gap-3 text-3xl float-3">
            <span>🧋</span><span>☕</span><span>🍵</span>
          </div>
          <p className="text-pink-100 text-center text-sm font-medium leading-relaxed">
            Order your purr-fect drink and treat yourself to something delightful! 🐾
          </p>
          <button onClick={onNext}
            className="btn-cute w-full py-3 rounded-2xl font-display text-xl text-white"
            style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #c01a7a 100%)' }}>
            Let's Go! 🐱
          </button>
        </div>
      </div>
      <div className="absolute bottom-8 left-0 right-0 flex justify-between px-6 pointer-events-none">
        <span className="text-5xl float-5">😸</span>
        <span className="text-5xl float-6">😻</span>
      </div>
    </div>
  );
}

// ─── LOGIN SCREEN ─────────────────────────────────────────────────────────────
function LoginScreen({ onLogin, onRegister }: { onLogin: () => void; onRegister: () => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #960f5e 100%)' }}>
      <FloatingBg opacity={0.1} />
      <div className="flex items-center justify-between px-6 pt-12 pb-4 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">😺</span>
          <span className="font-display text-white text-xl">cat coffee</span>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl heartbeat">😻</span>
          <span className="text-2xl">👤</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 z-10 overflow-y-auto scroll-cute pb-6">
        <div className="slide-up rounded-3xl p-7"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '2px solid rgba(255,255,255,0.2)' }}>
          <div className="text-center mb-6">
            <span className="text-5xl bounce-in block mb-2">☕</span>
            <h2 className="font-display text-white text-2xl">LOGIN YOUR ACCOUNT</h2>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <label className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-1 block">Username:</label>
              <input className="cute-input" placeholder="your username..." value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-1 block">Email:</label>
              <input className="cute-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-1 block">Password:</label>
              <input className="cute-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
          </div>
          <button onClick={onLogin}
            className="btn-cute w-full py-4 rounded-2xl font-display text-xl text-white mt-6"
            style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #a0145f 100%)' }}>
            LOGIN 🐾
          </button>
          <div className="mt-5 text-center">
            <p className="text-pink-200 text-sm font-semibold mb-3">REGISTER WITH</p>
            <div className="flex justify-center gap-4">
              {['🌐','📧','🍎'].map((icon, i) => (
                <button key={i} className="btn-cute w-14 h-14 rounded-2xl text-2xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.25)' }}>
                  {icon}
                </button>
              ))}
            </div>
            <button onClick={onRegister} className="btn-cute mt-4 text-pink-200 font-bold text-sm underline">
              Don't have an account? Register →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── REGISTER SCREEN ─────────────────────────────────────────────────────────
function RegisterScreen({ onRegister, onLogin }: { onRegister: () => void; onLogin: () => void }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #960f5e 100%)' }}>
      <FloatingBg opacity={0.1} />
      <div className="flex items-center justify-between px-6 pt-12 pb-4 z-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl">😺</span>
          <span className="font-display text-white text-xl">cat coffee</span>
        </div>
        <div className="flex gap-3">
          <span className="text-2xl heartbeat">😻</span>
          <span className="text-2xl">👤</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center px-6 z-10 overflow-y-auto scroll-cute pb-6">
        <div className="slide-up rounded-3xl p-7"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(16px)', border: '2px solid rgba(255,255,255,0.2)' }}>
          <div className="text-center mb-5">
            <span className="text-5xl bounce-in block mb-2">🐾</span>
            <h2 className="font-display text-white text-2xl">SETUP YOUR ACCOUNT</h2>
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-1 block">Username:</label>
              <input className="cute-input" placeholder="choose a username..." value={username} onChange={e => setUsername(e.target.value)} />
            </div>
            <div>
              <label className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-1 block">Email:</label>
              <input className="cute-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-1 block">Password:</label>
              <input className="cute-input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <div>
              <label className="text-pink-200 text-xs font-bold uppercase tracking-wider mb-1 block">Password:</label>
              <input className="cute-input" type="password" placeholder="confirm password..." value={confirmPass} onChange={e => setConfirmPass(e.target.value)} />
            </div>
          </div>
          <button onClick={onRegister}
            className="btn-cute w-full py-4 rounded-2xl font-display text-xl text-white mt-5"
            style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #a0145f 100%)' }}>
            REGISTER 🌸
          </button>
          <div className="mt-4 text-center">
            <div className="flex justify-center gap-4">
              {['🌐','📧','🍎'].map((icon, i) => (
                <button key={i} className="btn-cute w-12 h-12 rounded-2xl text-xl flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.15)', border: '2px solid rgba(255,255,255,0.25)' }}>
                  {icon}
                </button>
              ))}
            </div>
            <button onClick={onLogin} className="btn-cute mt-3 text-pink-200 font-bold text-sm underline">
              Already have an account? Login →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MENU SCREEN ─────────────────────────────────────────────────────────────
function MenuScreen({ onSelectItem, onCart, onFavorites, onSearch, cartCount, favCount, initialCategory }: {
  onSelectItem: (item: MenuItem) => void;
  onCart: () => void; onFavorites: () => void; onSearch: () => void;
  cartCount: number; favCount: number;
  initialCategory?: string;
}) {
  const [activeCategory, setActiveCategory] = useState(initialCategory || 'ALL');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = activeCategory === 'ALL' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === activeCategory);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden" style={{ background: '#960f5e' }}>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}
        onSelectCategory={cat => { setActiveCategory(cat); }} />

      <AppHeader
        onMenu={() => setSidebarOpen(true)}
        onSearch={onSearch}
        onFav={onFavorites}
        onCart={onCart}
        favCount={favCount}
        cartCount={cartCount}
      />

      {/* Search bar */}
      <div className="px-5 pb-3 z-10 flex-shrink-0">
        <button onClick={onSearch}
          className="w-full rounded-2xl px-4 py-3 flex items-center gap-2 text-left"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
          <span>🔍</span>
          <span className="text-pink-200 text-sm font-semibold">Search bar · find your drink...</span>
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-5 pb-4 overflow-x-auto scroll-x-cute z-10 flex-shrink-0">
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)}
            className={`btn-cute px-4 py-2 rounded-full text-xs font-black tracking-wide whitespace-nowrap flex-shrink-0 ${activeCategory === cat ? 'cat-pill-active' : 'text-pink-200'}`}
            style={activeCategory !== cat ? { background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' } : {}}>
            {cat}
          </button>
        ))}
      </div>

      {/* Items grid */}
      <div className="flex-1 overflow-y-auto scroll-cute px-5 pb-24 z-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-3 text-center">
            <span className="text-6xl float-1">😿</span>
            <p className="text-pink-200 font-bold">No items in this category yet!</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filtered.map(item => (
              <button key={item.id} onClick={() => onSelectItem(item)}
                className="card-hover rounded-2xl p-3 flex flex-col items-center gap-1 relative"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.18)' }}>
                {item.tag && (
                  <span className="absolute top-2 right-2 text-xs font-black bg-yellow-400 text-purple-900 px-1.5 py-0.5 rounded-full leading-none">
                    {item.tag}
                  </span>
                )}
                <span className="text-4xl">{item.emoji}</span>
                <span className="text-white text-xs font-bold text-center leading-tight">{item.name}</span>
                <span className="text-pink-300 text-xs">฿{item.price}</span>
                <span className="text-yellow-400 text-xs">{'★'.repeat(Math.floor(item.rating))}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="home" onHome={() => {}} onFav={onFavorites} onCart={onCart} />
    </div>
  );
}

// ─── DETAIL SCREEN ────────────────────────────────────────────────────────────
function DetailScreen({ item, onBack, onAddToCart, onFavorites, onFeed, onFav, isFav, onToggleFav, cartCount, favCount }: {
  item: MenuItem; onBack: () => void; onAddToCart: (qty: number) => void;
  onFavorites: () => void; onFeed: (cat: string) => void;
  onFav?: () => void;
  isFav: boolean; onToggleFav: () => void;
  cartCount: number; favCount: number;
}) {
  const [qty, setQty] = useState(1);
  const PROMOS = [
    { label: '40% off', color: '#ff6ec7' },
    { label: '5% off', color: '#ffd93d' },
    { label: '140 freeship', color: '#a78bfa' },
  ];

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #7a0948 100%)' }}>

      <AppHeader showBack onBack={onBack} onFav={onFavorites} onCart={onFav}
        favCount={favCount} cartCount={cartCount} />

      {/* Hero */}
      <div className="flex justify-center items-center py-3 z-10 flex-shrink-0">
        <div className="relative">
          <div className="w-44 h-44 rounded-full flex items-center justify-center bounce-in"
            style={{ background: 'rgba(255,255,255,0.12)', border: '3px solid rgba(255,255,255,0.25)' }}>
            <span className="text-8xl float-1">{item.emoji}</span>
          </div>
          <div className="absolute -top-2 -right-2 text-2xl float-2">⭐</div>
          <div className="absolute bottom-2 -left-4 text-xl float-4">✨</div>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto scroll-cute z-10 px-5 pb-28">
        <div className="slide-up rounded-3xl p-5"
          style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(12px)', border: '2px solid rgba(255,255,255,0.2)' }}>

          {/* Title + fav/thumbs */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h2 className="font-display text-white text-xl leading-tight">{item.name}</h2>
              <p className="text-pink-300 text-sm">{item.desc}</p>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-yellow-400 text-sm">★ {item.rating}</span>
                <span className="text-pink-300 text-xs">(128 reviews)</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={onToggleFav}
                className="btn-cute w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(255,255,255,0.15)' }}>
                {isFav ? '💗' : '🤍'}
              </button>
              <button className="btn-cute w-10 h-10 rounded-2xl flex items-center justify-center text-xl"
                style={{ background: 'rgba(255,255,255,0.15)' }}>👍</button>
            </div>
          </div>

          {/* Price + qty */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-white text-3xl">฿{item.price * qty}</span>
            <div className="flex items-center gap-3">
              <button onClick={() => setQty(q => Math.max(1, q - 1))}
                className="btn-cute w-9 h-9 rounded-xl font-black text-white text-xl flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.2)' }}>−</button>
              <span className="text-white font-black text-lg w-6 text-center">{qty}</span>
              <button onClick={() => setQty(q => q + 1)}
                className="btn-cute w-9 h-9 rounded-xl font-black text-white text-xl flex items-center justify-center"
                style={{ background: 'rgba(255,182,230,0.4)' }}>+</button>
            </div>
          </div>

          {/* Description */}
          <p className="text-pink-200 text-sm font-medium mb-4 leading-relaxed">
            Treat yourself to our signature {item.name} — crafted with love by our cat baristas. Every sip is a purr-fect experience! 🐾
          </p>

          {/* Promo codes */}
          <div className="mb-4">
            <p className="text-pink-200 text-xs font-black uppercase tracking-wider mb-2">🎫 Promo Codes</p>
            <div className="flex gap-2 flex-wrap">
              {PROMOS.map((p, i) => (
                <span key={i} className="btn-cute px-3 py-1.5 rounded-full text-xs font-black"
                  style={{ background: p.color, color: '#5a0030' }}>
                  {p.label}
                </span>
              ))}
            </div>
          </div>

          {/* MEWOW STORE rating */}
          <div className="mb-4 rounded-2xl p-3 flex items-center justify-between"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1.5px solid rgba(255,255,255,0.15)' }}>
            <div className="flex items-center gap-2">
              <span className="text-3xl">😸</span>
              <div>
                <p className="text-white font-black text-sm">MEWOW STORE</p>
                <span className="text-yellow-400 text-xs">★★★★★</span>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <span className="text-2xl">👍</span>
                <span className="text-pink-300 text-xs font-bold">CART</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="text-2xl heartbeat">😻</span>
                <span className="text-pink-300 text-xs font-bold">FAVORITE</span>
              </div>
            </div>
          </div>

          {/* Feed Suggestion */}
          <div>
            <p className="text-pink-200 text-xs font-black uppercase tracking-wider mb-3">🌸 Feed Suggestion</p>
            <div className="grid grid-cols-4 gap-2">
              {FEED_SUGGESTIONS.map((fs, i) => (
                <button key={i} onClick={() => onFeed(fs.cat)}
                  className="card-hover flex flex-col items-center gap-1">
                  <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl"
                    style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                    {fs.emoji}
                  </div>
                  <span className="text-pink-300 text-xs font-bold leading-tight text-center">{fs.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom action */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-20"
        style={{ background: 'linear-gradient(0deg, #7a0948 60%, transparent)' }}>
        <button onClick={() => { onAddToCart(qty); onBack(); }}
          className="btn-cute w-full py-4 rounded-2xl font-display text-xl text-white pulse-glow"
          style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #a0145f 100%)' }}>
          Add to Cart 🛒 · ฿{item.price * qty}
        </button>
      </div>
    </div>
  );
}

// ─── FEED SCREEN ──────────────────────────────────────────────────────────────
function FeedScreen({ category, onBack, onSelectFeedItem, onFavorites, onCart, onSearch, favCount, cartCount }: {
  category: string;
  onBack: () => void;
  onSelectFeedItem: (item: FeedItem & { id: number; category: string; tag: string; rating: number }) => void;
  onFavorites: () => void; onCart: () => void; onSearch: () => void;
  favCount: number; cartCount: number;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const feed = FEED_DATA[category] || FEED_DATA['BREAD'];

  const toMenuItem = (fi: FeedItem, idx: number) => ({
    id: 1000 + idx,
    name: fi.name,
    price: fi.price,
    emoji: fi.emoji,
    category: category,
    desc: feed.title,
    rating: 4.5,
    tag: idx === 0 ? 'NEW' : '',
  });

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #7a0948 100%)' }}>

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}
        onSelectCategory={() => { setSidebarOpen(false); onBack(); }} />

      <AppHeader
        showBack onBack={onBack}
        onMenu={() => setSidebarOpen(true)}
        onSearch={onSearch}
        onFav={onFavorites}
        onCart={onCart}
        favCount={favCount}
        cartCount={cartCount}
      />

      {/* Search bar */}
      <div className="px-5 pb-3 z-10 flex-shrink-0">
        <button onClick={onSearch}
          className="w-full rounded-2xl px-4 py-3 flex items-center gap-2 text-left"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
          <span>🔍</span>
          <span className="text-pink-200 text-sm font-semibold">Search bar...</span>
        </button>
      </div>

      {/* Category pills */}
      <div className="flex gap-2 px-5 pb-3 overflow-x-auto scroll-x-cute z-10 flex-shrink-0">
        {CATEGORIES.map(cat => (
          <button key={cat}
            className={`btn-cute px-4 py-2 rounded-full text-xs font-black tracking-wide whitespace-nowrap flex-shrink-0 ${cat === category || (cat === 'ALL' && !CATEGORIES.includes(category)) ? 'cat-pill-active' : 'text-pink-200'}`}
            style={cat !== category ? { background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' } : {}}
            onClick={onBack}>
            {cat}
          </button>
        ))}
      </div>

      {/* Feed title */}
      <div className="px-5 pb-3 z-10 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-2xl float-3">{feed.emoji}</span>
          <h2 className="font-display text-white text-2xl tracking-wide">{feed.title}</h2>
        </div>
      </div>

      {/* Scrollable grid */}
      <div className="flex-1 overflow-y-auto scroll-cute px-5 pb-24 z-10">
        <div className="grid grid-cols-3 gap-4">
          {feed.items.map((fi, i) => {
            const asMenuItem = toMenuItem(fi, i);
            return (
              <button key={i} onClick={() => onSelectFeedItem(asMenuItem)}
                className="card-hover flex flex-col items-center gap-2">
                <div className="w-24 h-24 rounded-full flex items-center justify-center text-4xl"
                  style={{ background: 'rgba(255,255,255,0.12)', border: '2px solid rgba(255,255,255,0.22)' }}>
                  {fi.emoji}
                </div>
                <span className="text-white text-xs font-bold text-center leading-tight">{fi.name}</span>
                <span className="text-pink-300 text-xs font-semibold">฿{fi.price}</span>
              </button>
            );
          })}
        </div>
      </div>

      <BottomNav active="home" onHome={onBack} onFav={onFavorites} onCart={onCart} />
    </div>
  );
}

// ─── FAVORITES SCREEN ─────────────────────────────────────────────────────────
function FavoritesScreen({ favItems, onBack, onSelectItem, onToggleFav, onCart, cartCount }: {
  favItems: MenuItem[]; onBack: () => void; onSelectItem: (item: MenuItem) => void;
  onToggleFav: (id: number) => void; onCart: () => void; cartCount: number;
}) {
  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #7a0948 100%)' }}>
      <FloatingBg opacity={0.08} />

      <div className="flex items-center gap-3 px-5 pt-12 pb-4 z-10 flex-shrink-0">
        <button onClick={onBack} className="btn-cute text-white font-black text-xl w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
        <h2 className="font-display text-white text-2xl flex-1">Favourites 😻</h2>
        <span className="text-pink-300 text-sm font-bold">{favItems.length} saved</span>
      </div>

      <div className="flex-1 overflow-y-auto scroll-cute px-5 pb-24 z-10">
        {favItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <span className="text-8xl float-1">😻</span>
            <p className="text-pink-200 font-bold text-lg">No favourites yet!</p>
            <p className="text-pink-300 text-sm">Tap 💗 on any item to save it here 🐾</p>
            <button onClick={onBack} className="btn-cute mt-2 px-8 py-3 rounded-full font-display text-white"
              style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #a0145f 100%)' }}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {favItems.map(item => (
              <div key={item.id} className="rounded-2xl p-4 flex items-center gap-4"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                <button onClick={() => onSelectItem(item)}
                  className="card-hover w-14 h-14 rounded-2xl flex items-center justify-center text-4xl flex-shrink-0"
                  style={{ background: 'rgba(255,255,255,0.12)' }}>
                  {item.emoji}
                </button>
                <button onClick={() => onSelectItem(item)} className="flex-1 text-left">
                  <p className="text-white font-bold text-sm">{item.name}</p>
                  <p className="text-pink-300 text-xs">{item.category} · {item.desc}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-yellow-400 text-xs">★ {item.rating}</span>
                    {item.tag && (
                      <span className="text-xs font-black bg-yellow-400 text-purple-900 px-1.5 py-0.5 rounded-full leading-none ml-1">
                        {item.tag}
                      </span>
                    )}
                  </div>
                </button>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-white font-display text-lg">฿{item.price}</span>
                  <button onClick={() => onToggleFav(item.id)}
                    className="btn-cute w-8 h-8 rounded-xl flex items-center justify-center text-base"
                    style={{ background: 'rgba(255,100,150,0.25)', border: '1.5px solid rgba(255,150,180,0.4)' }}>
                    💗
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav active="fav" onHome={onBack} onFav={() => {}} onCart={onCart} />
    </div>
  );
}

// ─── CART SCREEN ─────────────────────────────────────────────────────────────
function CartScreen({ cartItems, onBack, onClear, favCount, onFav }: {
  cartItems: { item: MenuItem; qty: number }[];
  onBack: () => void; onClear: () => void;
  favCount: number; onFav: () => void;
}) {
  const total = cartItems.reduce((s, c) => s + c.item.price * c.qty, 0);

  return (
    <div className="relative w-full h-full flex flex-col overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #c92080 0%, #7a0948 100%)' }}>
      <FloatingBg opacity={0.06} />

      <div className="flex items-center gap-3 px-5 pt-12 pb-4 z-10 flex-shrink-0">
        <button onClick={onBack} className="btn-cute text-white font-black text-xl w-10 h-10 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.15)' }}>←</button>
        <h2 className="font-display text-white text-2xl flex-1">Your Cart 🛒</h2>
        {cartItems.length > 0 && (
          <button onClick={onClear} className="btn-cute text-pink-300 text-xs font-bold">Clear all</button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto scroll-cute px-5 pb-36 z-10">
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
            <span className="text-8xl float-1">🛒</span>
            <p className="text-pink-200 font-bold text-lg">Your cart is empty!</p>
            <p className="text-pink-300 text-sm">Go add some purr-fect drinks 🐱</p>
            <button onClick={onBack} className="btn-cute mt-2 px-8 py-3 rounded-full font-display text-white"
              style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #a0145f 100%)' }}>
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {cartItems.map((ci, i) => (
              <div key={i} className="rounded-2xl p-4 flex items-center gap-3"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1.5px solid rgba(255,255,255,0.2)' }}>
                <span className="text-4xl">{ci.item.emoji}</span>
                <div className="flex-1">
                  <p className="text-white font-bold text-sm">{ci.item.name}</p>
                  <p className="text-pink-300 text-xs">{ci.item.category} · ฿{ci.item.price} × {ci.qty}</p>
                </div>
                <span className="text-white font-black font-display">฿{ci.item.price * ci.qty}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20"
          style={{ background: 'linear-gradient(0deg, #7a0948 60%, transparent)' }}>
          <div className="flex justify-between mb-3">
            <span className="text-pink-200 font-bold">Total ({cartItems.reduce((s,c)=>s+c.qty,0)} items)</span>
            <span className="text-white font-display text-2xl">฿{total}</span>
          </div>
          <button className="btn-cute w-full py-4 rounded-2xl font-display text-xl text-white pulse-glow"
            style={{ background: 'linear-gradient(135deg, #ff6ec7 0%, #a0145f 100%)' }}>
            Checkout 🐾
          </button>
        </div>
      )}

      <BottomNav active="cart" onHome={onBack} onFav={onFav} onCart={() => {}} />
    </div>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState<Screen>('splash');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [feedCategory, setFeedCategory] = useState('BREAD');
  const [menuCategory, setMenuCategory] = useState('ALL');
  const [cart, setCart] = useState<{ item: MenuItem; qty: number }[]>([]);
  const [favs, setFavs] = useState<number[]>([]);

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);
  const favItems = MENU_ITEMS.filter(m => favs.includes(m.id));

  const handleAddToCart = (item: MenuItem, qty: number) => {
    setCart(prev => {
      const existing = prev.find(c => c.item.id === item.id);
      if (existing) return prev.map(c => c.item.id === item.id ? { ...c, qty: c.qty + qty } : c);
      return [...prev, { item, qty }];
    });
  };

  const toggleFav = (id: number) => {
    setFavs(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);
  };

  const goToDetail = (item: MenuItem) => { setSelectedItem(item); setScreen('detail'); };
  const goToFeed = (cat: string) => { setFeedCategory(cat); setScreen('feed'); };
  const goToMenu = (cat?: string) => { if (cat) setMenuCategory(cat); setScreen('menu'); };

  return (
    <div className="app-shell">
      <div className="phone-frame">
        {screen === 'splash' && <SplashScreen onNext={() => setScreen('welcome')} />}
        {screen === 'welcome' && <WelcomeScreen onNext={() => setScreen('login')} />}
        {screen === 'login' && <LoginScreen onLogin={() => setScreen('menu')} onRegister={() => setScreen('register')} />}
        {screen === 'register' && <RegisterScreen onRegister={() => setScreen('menu')} onLogin={() => setScreen('login')} />}
        {screen === 'search' && (
          <SearchScreen
            onBack={() => setScreen('menu')}
            onSelectItem={item => goToDetail(item)}
          />
        )}
        {screen === 'menu' && (
          <MenuScreen
            onSelectItem={goToDetail}
            onCart={() => setScreen('cart')}
            onFavorites={() => setScreen('favorites')}
            onSearch={() => setScreen('search')}
            cartCount={cartCount}
            favCount={favs.length}
            initialCategory={menuCategory}
          />
        )}
        {screen === 'detail' && selectedItem && (
          <DetailScreen
            item={selectedItem}
            onBack={() => setScreen('menu')}
            onAddToCart={qty => handleAddToCart(selectedItem, qty)}
            onFavorites={() => setScreen('favorites')}
            onFeed={goToFeed}
            onFav={() => setScreen('cart')}
            isFav={favs.includes(selectedItem.id)}
            onToggleFav={() => toggleFav(selectedItem.id)}
            cartCount={cartCount}
            favCount={favs.length}
          />
        )}
        {screen === 'feed' && (
          <FeedScreen
            category={feedCategory}
            onBack={() => setScreen('menu')}
            onSelectFeedItem={item => goToDetail(item as MenuItem)}
            onFavorites={() => setScreen('favorites')}
            onCart={() => setScreen('cart')}
            onSearch={() => setScreen('search')}
            favCount={favs.length}
            cartCount={cartCount}
          />
        )}
        {screen === 'favorites' && (
          <FavoritesScreen
            favItems={favItems}
            onBack={() => setScreen('menu')}
            onSelectItem={goToDetail}
            onToggleFav={toggleFav}
            onCart={() => setScreen('cart')}
            cartCount={cartCount}
          />
        )}
        {screen === 'cart' && (
          <CartScreen
            cartItems={cart}
            onBack={() => setScreen('menu')}
            onClear={() => setCart([])}
            favCount={favs.length}
            onFav={() => setScreen('favorites')}
          />
        )}
      </div>
    </div>
  );
}
