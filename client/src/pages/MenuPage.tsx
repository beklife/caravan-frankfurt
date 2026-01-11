import { useState } from "react";
import { Link } from "wouter";
import { translations, Language } from "@/lib/i18n";
import { useMusic } from "@/lib/MusicContext";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import plovImage from "@assets/stock_images/uzbek_plov_rice_dish_c2c15446.jpg";
import mantyImage from "@assets/stock_images/manty_dumplings_cent_45246789.jpg";
import lagmanImage from "@assets/stock_images/lagman_noodle_soup_c_320e3471.jpg";
import samsaImage from "@assets/stock_images/samsa_meat_pastry_ba_6d113edf.jpg";
import shashlikImage from "@assets/stock_images/lamb_shashlik_kebab__90656a8c.jpg";
import teaImage from "@assets/stock_images/central_asian_tea_ce_6b705fac.jpg";
import carpetImage from "@assets/stock_images/persian_carpet.jpg";

const langNames: Record<Language, string> = {
  de: "Deutsch",
  en: "English",
  ru: "Русский"
};

const langFlags: Record<Language, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  ru: "🇷🇺"
};

const menuCategories = {
  de: {
    mains: "Hauptgerichte",
    appetizers: "Vorspeisen",
    sides: "Beilagen",
    drinks: "Getränke",
    desserts: "Desserts"
  },
  en: {
    mains: "Main Dishes",
    appetizers: "Appetizers",
    sides: "Sides",
    drinks: "Drinks",
    desserts: "Desserts"
  },
  ru: {
    mains: "Основные блюда",
    appetizers: "Закуски",
    sides: "Гарниры",
    drinks: "Напитки",
    desserts: "Десерты"
  }
};

const fullMenu = {
  mains: [
    { id: 'plov', image: plovImage, price: '14.50€' },
    { id: 'manty', image: mantyImage, price: '13.90€' },
    { id: 'lagman', image: lagmanImage, price: '13.50€' },
    { id: 'shashlik', image: shashlikImage, price: '16.90€' },
  ],
  appetizers: [
    { id: 'samsa', image: samsaImage, price: '4.50€' },
    { 
      id: 'salad',
      image: null,
      price: '6.90€',
      names: { de: 'Achichuk Salat', en: 'Achichuk Salad', ru: 'Салат Ачичук' },
      descs: { 
        de: 'Frischer Tomaten-Zwiebel-Salat mit Kräutern und Sumach.',
        en: 'Fresh tomato-onion salad with herbs and sumac.',
        ru: 'Свежий салат из помидоров и лука с зеленью и сумахом.'
      }
    },
  ],
  sides: [
    {
      id: 'non',
      image: null,
      price: '3.50€',
      names: { de: 'Tandoor Non', en: 'Tandoor Bread', ru: 'Тандырная лепёшка' },
      descs: {
        de: 'Traditionelles Fladenbrot aus dem Lehmofen.',
        en: 'Traditional flatbread from the clay oven.',
        ru: 'Традиционная лепёшка из глиняной печи.'
      }
    },
    {
      id: 'rice',
      image: null,
      price: '4.00€',
      names: { de: 'Basmatireis', en: 'Basmati Rice', ru: 'Рис Басмати' },
      descs: {
        de: 'Gedämpfter Basmatireis mit Butter.',
        en: 'Steamed basmati rice with butter.',
        ru: 'Рис басмати на пару с маслом.'
      }
    },
  ],
  drinks: [
    { id: 'tea', image: teaImage, price: '5.50€' },
    {
      id: 'ayran',
      image: null,
      price: '3.50€',
      names: { de: 'Ayran', en: 'Ayran', ru: 'Айран' },
      descs: {
        de: 'Erfrischendes Joghurtgetränk mit Salz.',
        en: 'Refreshing yogurt drink with salt.',
        ru: 'Освежающий солёный кисломолочный напиток.'
      }
    },
    {
      id: 'kompot',
      image: null,
      price: '4.00€',
      names: { de: 'Kompott', en: 'Kompot', ru: 'Компот' },
      descs: {
        de: 'Hausgemachtes Früchtekompott.',
        en: 'Homemade fruit compote drink.',
        ru: 'Домашний компот из сухофруктов.'
      }
    },
  ],
  desserts: [
    {
      id: 'halva',
      image: null,
      price: '5.00€',
      names: { de: 'Usbekische Halwa', en: 'Uzbek Halva', ru: 'Узбекская Халва' },
      descs: {
        de: 'Traditionelle Sesam-Süßigkeit mit Nüssen.',
        en: 'Traditional sesame confection with nuts.',
        ru: 'Традиционная кунжутная сладость с орехами.'
      }
    },
    {
      id: 'chak',
      image: null,
      price: '4.50€',
      names: { de: 'Chak-Chak', en: 'Chak-Chak', ru: 'Чак-чак' },
      descs: {
        de: 'Knusprige Teigstücke in Honig.',
        en: 'Crispy dough pieces in honey.',
        ru: 'Хрустящие кусочки теста в мёде.'
      }
    },
  ]
};

export default function MenuPage() {
  const [lang, setLang] = useState<Language>("de");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { musicPlaying, toggleMusic } = useMusic();
  const t = translations[lang];
  const cats = menuCategories[lang];

  const getDishInfo = (dish: any) => {
    if (dish.names) {
      return { name: dish.names[lang], desc: dish.descs[lang] };
    }
    const dishes = t.menu.dishes as any;
    if (dishes[dish.id]) {
      return { name: dishes[dish.id].name, desc: dishes[dish.id].desc };
    }
    return { name: dish.id, desc: '' };
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground relative">
      {/* Persian Carpet Background */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${carpetImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          opacity: 0.5
        }}
      />
      {/* Lighter overlay to maintain text readability while showing more carpet */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-background/30" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {lang === 'de' ? 'Zurück' : lang === 'ru' ? 'Назад' : 'Back'}
            </Button>
          </Link>

          <h1 className="font-heading text-2xl font-bold tracking-wider text-primary">SILK ROAD</h1>

          <div className="flex items-center gap-4">
            {/* Music Button */}
            <motion.button
              onClick={toggleMusic}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative p-2 text-foreground hover:text-primary transition-all"
            >
              <svg
                viewBox="0 0 24 30"
                className="w-6 h-6"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                {musicPlaying ? (
                  <>
                    <path d="M23.7902 7.93094L21.7823 5.92305C21.5205 5.65065 21.0496 5.65065 20.7878 5.92305L10.6976 16.0132C9.42274 15.3349 7.95422 15.0466 6.5066 15.1989C0.466712 15.8127 -2.19035 23.3063 2.12404 27.5894C3.54353 29.0089 5.40823 29.7186 7.27284 29.7186C12.7061 29.7483 16.2897 23.8594 13.7003 19.0154L23.7902 8.92555C24.0627 8.66365 24.0627 8.19284 23.7902 7.93094ZM2.64278 26.0571L3.41473 25.2852L4.42806 26.2985L3.65614 27.0704C3.46973 26.9246 3.29002 26.7663 3.11852 26.5948C2.94701 26.4232 2.78863 26.2435 2.64278 26.0571ZM11.4272 26.5948C9.6657 28.3563 7.05468 28.7629 4.90056 27.8152L5.91993 26.7958C6.19238 26.5339 6.19233 26.0631 5.91993 25.8012L3.91204 23.7933C3.65019 23.5209 3.17933 23.5209 2.91747 23.7933L1.8981 24.8127C0.950374 22.6586 1.35696 20.0476 3.11852 18.286C4.83797 16.5666 7.46572 16.1101 9.64488 17.0659L7.14367 19.5671C6.86902 19.8417 6.86902 20.287 7.14367 20.5617L9.15156 22.5695C9.42616 22.8442 9.87152 22.8442 10.1461 22.5695L12.6496 20.0661C13.6258 22.2623 13.1695 24.8524 11.4272 26.5948ZM9.64887 21.0777L8.63554 20.0644L19.0763 9.62362L20.0896 10.6369L9.64887 21.0777ZM21.0842 9.64233L20.0709 8.62901L21.285 7.41488L22.2983 8.42825L21.0842 9.64233Z"/>
                    <path d="M13.4182 1.37446L11.5018 0.907213C11.3069 0.859826 11.1012 0.904382 10.9435 1.02816C10.7858 1.15203 10.6937 1.3414 10.6937 1.54193V3.37469C9.44947 2.91319 8.0614 3.8915 8.08052 5.22221C8.1881 7.82222 11.893 7.82178 12.0004 5.22217C12.0004 5.15248 12.0003 2.37364 12.0003 2.37364L13.1087 2.64385C13.9589 2.81563 14.2516 1.61292 13.4182 1.37446ZM10.0404 5.87561C9.68017 5.87561 9.3871 5.58253 9.3871 5.22225C9.42299 4.35561 10.658 4.35587 10.6937 5.22225C10.6937 5.58253 10.4006 5.87561 10.0404 5.87561Z"/>
                    <path d="M3.42555 5.71875C3.04721 5.71875 2.74048 6.02548 2.74048 6.40382V7.91668C1.43561 7.43275 -0.0197554 8.45857 0.000203006 9.85406C0.0940119 12.4815 3.80604 12.6191 4.10345 10.0185C4.10766 9.98774 4.11062 6.40382 4.11062 6.40382C4.11062 6.02548 3.80389 5.71875 3.42555 5.71875ZM2.05541 10.5391C1.67767 10.5391 1.37034 10.2318 1.37034 9.85406C1.40798 8.9452 2.70299 8.94548 2.74048 9.85406C2.74048 10.2318 2.43316 10.5391 2.05541 10.5391Z"/>
                  </>
                ) : (
                  <path d="M23.7902 7.93094L21.7823 5.92305C21.5205 5.65065 21.0496 5.65065 20.7878 5.92305L10.6976 16.0132C9.42274 15.3349 7.95422 15.0466 6.5066 15.1989C0.466712 15.8127 -2.19035 23.3063 2.12404 27.5894C3.54353 29.0089 5.40823 29.7186 7.27284 29.7186C12.7061 29.7483 16.2897 23.8594 13.7003 19.0154L23.7902 8.92555C24.0627 8.66365 24.0627 8.19284 23.7902 7.93094ZM2.64278 26.0571L3.41473 25.2852L4.42806 26.2985L3.65614 27.0704C3.46973 26.9246 3.29002 26.7663 3.11852 26.5948C2.94701 26.4232 2.78863 26.2435 2.64278 26.0571ZM11.4272 26.5948C9.6657 28.3563 7.05468 28.7629 4.90056 27.8152L5.91993 26.7958C6.19238 26.5339 6.19233 26.0631 5.91993 25.8012L3.91204 23.7933C3.65019 23.5209 3.17933 23.5209 2.91747 23.7933L1.8981 24.8127C0.950374 22.6586 1.35696 20.0476 3.11852 18.286C4.83797 16.5666 7.46572 16.1101 9.64488 17.0659L7.14367 19.5671C6.86902 19.8417 6.86902 20.287 7.14367 20.5617L9.15156 22.5695C9.42616 22.8442 9.87152 22.8442 10.1461 22.5695L12.6496 20.0661C13.6258 22.2623 13.1695 24.8524 11.4272 26.5948ZM9.64887 21.0777L8.63554 20.0644L19.0763 9.62362L20.0896 10.6369L9.64887 21.0777ZM21.0842 9.64233L20.0709 8.62901L21.285 7.41488L22.2983 8.42825L21.0842 9.64233Z"/>
                )}
              </svg>

              {/* Floating music notes when playing */}
              <AnimatePresence>
                {musicPlaying && (
                  <>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], y: [0, -20] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                      className="absolute -top-1 -right-1 text-xs pointer-events-none"
                    >
                      ♪
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], y: [0, -25] }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: 0.6 }}
                      className="absolute -top-2 right-0 text-xs pointer-events-none"
                    >
                      ♫
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-full bg-muted hover:bg-muted/80 transition-all"
              >
                <span className="text-lg">{langFlags[lang]}</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${langDropdownOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden min-w-[140px]"
                  >
                    {(["de", "en", "ru"] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangDropdownOpen(false); }}
                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 ${
                          lang === l ? "bg-primary/10 text-primary" : "hover:bg-muted text-foreground"
                        }`}
                      >
                        <span className="text-xl">{langFlags[l]}</span>
                        {langNames[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </header>

      {/* Menu Content */}
      <main className="container mx-auto px-4 md:px-6 py-8 md:py-16 relative z-10 max-w-5xl">
        {/* Elegant Header */}
        <div className="text-center mb-12 md:mb-20 bg-background/90 backdrop-blur-md p-6 md:p-12 rounded-sm border-2 border-primary/20 relative overflow-hidden shadow-xl">
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-12 h-12 md:w-24 md:h-24 border-t-2 border-l-2 border-primary/30"></div>
          <div className="absolute top-0 right-0 w-12 h-12 md:w-24 md:h-24 border-t-2 border-r-2 border-primary/30"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 md:w-24 md:h-24 border-b-2 border-l-2 border-primary/30"></div>
          <div className="absolute bottom-0 right-0 w-12 h-12 md:w-24 md:h-24 border-b-2 border-r-2 border-primary/30"></div>

          {/* Ornamental Top */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-4 md:mb-6">
            <div className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-2xl md:text-4xl">✦</span>
            <div className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </div>

          <h2 className="text-secondary text-xs md:text-sm font-bold tracking-[0.2em] md:tracking-[0.3em] mb-2 md:mb-3 uppercase">Speisekarte • Menu • Меню</h2>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 md:mb-4 text-foreground tracking-wide">{t.menu.title}</h1>
          <p className="text-muted-foreground text-sm md:text-lg max-w-2xl mx-auto leading-relaxed italic px-4">{t.menu.subtitle}</p>

          {/* Ornamental Bottom */}
          <div className="flex items-center justify-center gap-2 md:gap-4 mt-4 md:mt-6">
            <div className="h-[2px] w-8 md:w-16 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-2xl md:text-4xl">✦</span>
            <div className="h-[2px] w-8 md:w-16 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
        </div>

        {/* Main Dishes */}
        <MenuSection title={cats.mains} items={fullMenu.mains} lang={lang} getDishInfo={getDishInfo} />
        
        {/* Appetizers */}
        <MenuSection title={cats.appetizers} items={fullMenu.appetizers} lang={lang} getDishInfo={getDishInfo} />
        
        {/* Sides */}
        <MenuSection title={cats.sides} items={fullMenu.sides} lang={lang} getDishInfo={getDishInfo} />
        
        {/* Drinks */}
        <MenuSection title={cats.drinks} items={fullMenu.drinks} lang={lang} getDishInfo={getDishInfo} />
        
        {/* Desserts */}
        <MenuSection title={cats.desserts} items={fullMenu.desserts} lang={lang} getDishInfo={getDishInfo} />

        {/* Footer Note */}
        <div className="mt-12 md:mt-20 text-center bg-card/90 backdrop-blur-sm p-4 md:p-8 rounded-sm border border-border/50">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-r from-transparent to-primary"></div>
            <span className="text-xl md:text-2xl text-primary">✦</span>
            <div className="h-[1px] w-8 md:w-12 bg-gradient-to-l from-transparent to-primary"></div>
          </div>
          <p className="text-muted-foreground text-xs md:text-sm leading-relaxed max-w-2xl mx-auto px-2">
            {lang === 'de' && 'Alle Preise inkl. MwSt. • Allergene und Zusatzstoffe auf Anfrage • Alle Gerichte sind Halal'}
            {lang === 'en' && 'All prices include VAT • Allergen information available on request • All dishes are Halal'}
            {lang === 'ru' && 'Все цены включают НДС • Информация об аллергенах по запросу • Все блюда халяльные'}
          </p>
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-xs text-muted-foreground/70">
              {lang === 'de' && 'Reservierung empfohlen • +49 221 42362352'}
              {lang === 'en' && 'Reservation recommended • +49 221 42362352'}
              {lang === 'ru' && 'Рекомендуется бронирование • +49 221 42362352'}
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-8 md:py-12 mt-8 md:mt-16 border-t-2 border-primary/30 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 md:gap-4 mb-3 md:mb-4">
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-white/30"></div>
            <span className="text-2xl md:text-3xl text-secondary">✦</span>
            <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-white/30"></div>
          </div>
          <p className="font-heading text-2xl md:text-3xl tracking-[0.2em] md:tracking-[0.3em] mb-2 text-white">SILK ROAD</p>
          <p className="text-white/80 text-sm md:text-base mb-1">Karl-Berbuer-Platz 7, 50678 Köln</p>
          <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">Severinsviertel • Köln</p>
          <p className="text-secondary font-bold tracking-wider text-sm md:text-base">+49 221 42362352</p>
          <div className="mt-4 md:mt-6 text-white/40 text-xs">
            <p>© 2026 SILK ROAD Restaurant • Köln</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuSection({ title, items, lang, getDishInfo }: { title: string, items: any[], lang: Language, getDishInfo: (d: any) => { name: string, desc: string } }) {
  // Check if this section has signature dishes (mains)
  const isMainSection = items.length > 0 && items[0].id === 'plov';

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px", amount: 0.2 }}
      transition={{ duration: 0.5 }}
      className="mb-20"
    >
      {/* Category Header */}
      <div className="text-center mb-8 md:mb-12 relative">
        {/* Decorative Line */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent"></div>

        {/* Category Title */}
        <div className="relative inline-block bg-background/95 backdrop-blur-sm px-4 md:px-8 py-2 md:py-3 border-2 border-primary/30 rounded-sm">
          <h3 className="text-xl md:text-3xl font-heading font-bold tracking-wider text-primary uppercase">
            {title}
          </h3>
        </div>
      </div>

      {/* Menu Items Container */}
      <div className="bg-card/95 backdrop-blur-md p-4 md:p-8 lg:p-12 rounded-sm border border-border shadow-lg">
        <div className="space-y-6 md:space-y-8">
          {items.map((item, idx) => {
            const { name, desc } = getDishInfo(item);
            const isSignature = isMainSection && (item.id === 'plov' || item.id === 'shashlik');

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px", amount: 0.5 }}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="group relative"
              >
                <div className="flex gap-3 md:gap-6 items-start">
                  {/* Image */}
                  {item.image ? (
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-sm overflow-hidden flex-shrink-0 bg-muted shadow-md relative">
                      <img
                        src={item.image}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {isSignature && (
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-secondary text-secondary-foreground text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm shadow-lg">
                          ★
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-sm flex-shrink-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border">
                      <span className="text-3xl md:text-5xl opacity-40">🍽</span>
                    </div>
                  )}

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Dish Name & Price with Dotted Line - Stack on mobile */}
                    <div className="mb-2 md:mb-3">
                      {/* Mobile Layout - Stacked */}
                      <div className="md:hidden">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <h4 className="text-lg font-heading font-bold group-hover:text-primary transition-colors">
                            {name}
                            {isSignature && <span className="text-secondary ml-1 text-sm">★</span>}
                          </h4>
                          <span className="text-lg font-bold text-primary whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      {/* Desktop Layout - With dotted line */}
                      <div className="hidden md:flex items-baseline gap-2">
                        <h4 className="text-xl lg:text-2xl font-heading font-bold group-hover:text-primary transition-colors flex-shrink-0">
                          {name}
                          {isSignature && <span className="text-secondary ml-2 text-sm">★</span>}
                        </h4>
                        <div className="flex-1 border-b-2 border-dotted border-border/50 mb-1 min-w-[20px]"></div>
                        <span className="text-xl lg:text-2xl font-bold text-primary whitespace-nowrap flex-shrink-0">
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                      {desc}
                    </p>

                    {/* Dietary Icons (if applicable) */}
                    <div className="flex gap-2 mt-2 md:mt-3">
                      <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        <span>✓</span> Halal
                      </span>
                    </div>
                  </div>
                </div>

                {/* Separator (except for last item) */}
                {idx < items.length - 1 && (
                  <div className="mt-6 md:mt-8 h-[1px] bg-gradient-to-r from-transparent via-border/50 to-transparent"></div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Signature Note */}
      {isMainSection && (
        <div className="mt-3 md:mt-4 text-center">
          <p className="text-xs md:text-sm text-muted-foreground italic">
            <span className="text-secondary">★</span> {lang === 'de' ? 'Empfehlung des Hauses' : lang === 'ru' ? 'Фирменное блюдо' : "Chef's Signature"}
          </p>
        </div>
      )}
    </motion.section>
  );
}
