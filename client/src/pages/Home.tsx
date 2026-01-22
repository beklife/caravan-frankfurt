import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "wouter";
import { translations, Language } from "@/lib/i18n";
import { useMusic } from "@/lib/MusicContext";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Clock, Menu as MenuIcon, X, ChevronDown, Mail, Instagram, Facebook } from "lucide-react";
import { Button } from "@/components/ui/button";
import  BookingForm from "@/components/BookingForm";

import heroImage from "@assets/stock_images/2024_11_04_Zira_Uzbek_Kitchen_046.jpg";
import plovImage from "@assets/stock_images/menu/osh.jpg";
import mantyImage from "@assets/stock_images/manty_dumplings_cent_45246789.jpg";
import interiorImage from "@assets/stock_images/cozy_warm_restaurant_5c6c7aae.jpg";
import lagmanImage from "@assets/stock_images/menu/uygurishe lagman.jpg";
import samsaImage from "@assets/stock_images/menu/somsa.jpg";
import shashlikImage from "@assets/stock_images/menu/shashlyk-meat-centralasia-food.jpg";
import teaImage from "@assets/stock_images/menu/tea_1.jpg";
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

export default function Home() {
  const [lang, setLang] = useState<Language>("de");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const { musicPlaying, toggleMusic } = useMusic();

  const t = translations[lang];

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground selection:bg-primary selection:text-white relative overflow-hidden">

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

      {/* Navigation */}
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-background/95 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <div className="flex items-center gap-2">
             <span className={`font-heading text-2xl font-bold tracking-wider ${isScrolled ? "text-primary" : "text-white"}`}>
               SILK ROAD
             </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection("about")} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>{t.nav.about}</button>
            <Link href="/menu" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>{t.nav.menu}</Link>
            <button onClick={() => scrollToSection("contact")} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>{t.nav.contact}</button>
            <button onClick={() => scrollToSection("contact")} className={`text-sm font-medium hover:text-primary transition-colors ${isScrolled ? "text-foreground" : "text-white/90"}`}>{t.nav.reserve}</button>

            <div className="h-4 w-px bg-white/30 mx-2"></div>

            {/* Music Button */}
            <div className="relative">
              <motion.button
                onClick={toggleMusic}
                data-testid="button-music-toggle"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative p-2 transition-all ${
                  isScrolled
                    ? "text-foreground hover:text-primary"
                    : "text-white/90 hover:text-white"
                }`}
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
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                data-testid="button-language-toggle"
                className={`flex items-center gap-2 px-3 py-2 rounded-full transition-all ${
                  isScrolled
                    ? "bg-muted hover:bg-muted/80 text-foreground"
                    : "bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm"
                }`}
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
                        data-testid={`button-lang-${l}`}
                        onClick={() => { setLang(l); setLangDropdownOpen(false); }}
                        className={`w-full px-4 py-3 text-left text-sm font-medium transition-colors flex items-center gap-3 ${
                          lang === l
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-muted text-foreground"
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

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Music Button */}
            <button
              onClick={toggleMusic}
              className={`p-1.5 ${isScrolled ? "text-foreground" : "text-white"}`}
            >
              <svg
                viewBox="0 0 24 30"
                className="w-5 h-5"
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
            </button>

            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className={`flex items-center gap-1 px-2 py-1.5 rounded-full ${
                  isScrolled ? "bg-muted text-foreground" : "bg-white/10 text-white"
                }`}
              >
                <span className="text-base">{langFlags[lang]}</span>
              </button>

              <AnimatePresence>
                {langDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full right-0 mt-2 bg-card border border-border rounded-lg shadow-xl overflow-hidden z-50"
                  >
                    {(["de", "en", "ru"] as Language[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => { setLang(l); setLangDropdownOpen(false); }}
                        className={`flex items-center gap-2 w-full px-4 py-2 text-sm ${lang === l ? "bg-primary/10 text-primary" : "hover:bg-muted"}`}
                      >
                        <span className="text-lg">{langFlags[l]}</span>
                        {langNames[l]}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`${isScrolled ? "text-foreground" : "text-white"}`}>
              {mobileMenuOpen ? <X /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-background border-b border-border absolute top-full left-0 right-0 shadow-lg"
            >
              <div className="flex flex-col p-6 gap-4">
                <button onClick={() => scrollToSection("about")} className="text-lg font-medium py-2 border-b border-dashed border-border">{t.nav.about}</button>
                <Link href="/menu" className="text-lg text-center font-medium py-2 border-b border-dashed border-border" onClick={() => { setMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'instant' }); }}>{t.nav.menu}</Link>
                <button onClick={() => scrollToSection("contact")} className="text-lg font-medium py-2 border-b border-dashed border-border">{t.nav.contact}</button>
                <button onClick={() => scrollToSection("contact")} className="text-lg font-medium py-2 border-b border-dashed border-border">{t.nav.reserve}</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen min-h-[600px] flex items-center justify-center text-center px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroImage} alt="Central Asian Feast" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        </div>

        <motion.div 
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6"
        >
          <div className="inline-block border-y-2 border-primary/60 py-2 mb-4">
            <span className="text-secondary font-bold tracking-[0.2em] uppercase text-sm md:text-base">Est. 2024 • Köln</span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight drop-shadow-lg">
            {t.hero.title}
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl font-light leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Button size="lg" onClick={() => scrollToSection("contact")} className="bg-primary hover:bg-primary/90 text-white font-heading uppercase tracking-wide text-lg px-8 py-6 h-auto">
              {t.hero.cta_reserve}
            </Button>
            <Button size="lg" onClick={() => scrollToSection("menu")} variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-heading uppercase tracking-wide text-lg px-8 py-6 h-auto">
              {t.hero.cta_menu}
            </Button>
          </div>
        </motion.div>
        
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 cursor-pointer"
          onClick={() => scrollToSection("about")}
        >
          <span className="text-white/80 text-xs uppercase tracking-widest font-medium">Scroll</span>
          <div className="w-8 h-12 border-2 border-white/60 rounded-full flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-sm">
                <img src={interiorImage} alt="Restaurant Interior" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-secondary/20 -z-10 rounded-full blur-2xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 border-2 border-primary/30 z-20"></div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-background/90 backdrop-blur-sm p-8 rounded-sm"
            >
              <h2 className="text-primary text-lg font-bold tracking-widest mb-2 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-primary"></span>
                STORY
              </h2>
              <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6 text-foreground">{t.about.title}</h3>
              <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                {t.about.content}
              </p>
              
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                <div className="text-center">
                  <span className="block font-heading text-3xl font-bold text-accent">3+</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Cuisines</span>
                </div>
                <div className="text-center border-l border-border">
                  <span className="block font-heading text-3xl font-bold text-accent">100%</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Halal</span>
                </div>
                 <div className="text-center border-l border-border">
                  <span className="block font-heading text-3xl font-bold text-accent">∞</span>
                  <span className="text-xs uppercase tracking-wider text-muted-foreground">Tea</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Highlights */}
      <section id="menu" className="py-24 bg-card/80 backdrop-blur-sm relative z-10 border-y border-border/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 bg-background/80 backdrop-blur-sm p-6 rounded-sm">
            <h2 className="text-primary text-lg font-bold tracking-widest mb-2">TASTE THE SILK ROAD</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold mb-4">{t.menu.title}</h3>
            <p className="text-muted-foreground">{t.menu.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <MenuCard image={plovImage} title={t.menu.dishes.plov.name} desc={t.menu.dishes.plov.desc} price="14.50€" />
            <MenuCard image={mantyImage} title={t.menu.dishes.manty.name} desc={t.menu.dishes.manty.desc} price="13.90€" />
            <MenuCard image={lagmanImage} title={t.menu.dishes.lagman.name} desc={t.menu.dishes.lagman.desc} price="13.50€" />
            <MenuCard image={samsaImage} title={t.menu.dishes.samsa.name} desc={t.menu.dishes.samsa.desc} price="4.50€" />
            <MenuCard image={shashlikImage} title={t.menu.dishes.shashlik.name} desc={t.menu.dishes.shashlik.desc} price="16.90€" />
            <MenuCard image={teaImage} title={t.menu.dishes.tea.name} desc={t.menu.dishes.tea.desc} price="5.50€" />
          </div>
          
          <div className="mt-12 text-center">
            <Link href="/menu" onClick={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
              <Button variant="outline" size="lg" className="border-primary text-primary hover:bg-primary hover:text-white font-heading uppercase tracking-wide">
                {lang === 'de' ? 'Vollständige Speisekarte' : lang === 'ru' ? 'Полное меню' : 'View Full Menu'}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-24 bg-foreground text-background relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-4xl font-heading font-bold mb-12 text-white">{t.gallery.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4 h-[500px]">
             <div className="col-span-2 row-span-2 relative overflow-hidden group rounded-sm">
                <img src={heroImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
             </div>
             <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-sm">
                <img src={mantyImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
             </div>
             <div className="col-span-1 row-span-1 relative overflow-hidden group rounded-sm">
                <img src={plovImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
             </div>
             <div className="col-span-2 row-span-1 relative overflow-hidden group rounded-sm">
                <img src={interiorImage} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" />
             </div>
          </div>
        </div>
      </section>

      {/* Contact Section: Hours, Location & Booking */}
      <section id="contact" className="py-24 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="bg-card/90 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-border shadow-sm relative overflow-hidden"
            >
               <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-accent/20 rounded-tr-3xl"></div>
               <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-accent/20 rounded-bl-3xl"></div>

               <h3 className="text-3xl font-heading font-bold mb-8">{t.hours.title}</h3>

               <div className="space-y-6">
                 <div className="flex justify-between items-center border-b border-dashed border-border pb-4">
                   <span className="font-medium text-lg text-muted-foreground">{t.hours.weekdays}</span>
                   <span className="font-bold text-xl">17:00 – 23:00</span>
                 </div>
                 <div className="flex justify-between items-center border-b border-dashed border-border pb-4">
                   <span className="font-medium text-lg text-muted-foreground">{t.hours.weekend}</span>
                   <span className="font-bold text-xl">12:00 – 23:00</span>
                 </div>
               </div>

               <p className="mt-6 text-sm text-muted-foreground bg-secondary/10 p-4 rounded-md flex items-start gap-2">
                 <Clock className="w-4 h-4 mt-1 text-secondary" />
                 {t.hours.note}
               </p>

               <div className="mt-12">
                 <h3 className="text-2xl font-bold uppercase text-secondary mb-6 flex items-center gap-2">
                   <MapPin className="w-6 h-6" /> Karl-Berbuer-Platz 7
                 </h3>
                 <address className="not-italic text-lg mb-6 block">
                   Karl-Berbuer-Platz 7<br />
                   50678 Köln
                 </address>

                 <div className="space-y-2 text-sm text-neutral-400 font-mono">
                   <p>U-Bahn: Severinstraße</p>
                   <p>Bus: 142, 133</p>
                 </div>

                 <div className="flex items-start gap-4 mt-6">
                   <div className="bg-primary/10 p-3 rounded-full text-primary">
                     <Phone className="w-6 h-6" />
                   </div>
                   <div>
                     <p className="font-bold text-lg">+49 221 42362352</p>
                     <p className="text-muted-foreground">{t.contact.fallback}</p>
                   </div>
                 </div>

                 <div className="flex gap-4 mt-8">
                   <Button className="flex-1 bg-foreground text-background hover:bg-foreground/90">{t.location.get_directions}</Button>
                   <Button variant="outline" className="flex-1">{t.location.call_us}</Button>
                 </div>
               </div>
            </motion.div>

            <div className="h-full min-h-[400px] bg-muted relative rounded-sm overflow-hidden border border-border group">
               <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2513.6448929863436!2d6.937599915779326!3d50.9472198792944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47bf25a32e5c1b0d%3A0x2b4f6c7e9c8e5f0a!2sKarl-Berbuer-Platz%207%2C%2050678%20K%C3%B6ln!5e0!3m2!1sde!2sde!4v1709825412451!5m2!1sde!2sde"
                width="100%"
                height="100%"
                style={{border:0}}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

          {/* Booking Form */}
          <div className="mt-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-card/90 backdrop-blur-sm p-8 md:p-12 rounded-sm border border-border shadow-sm relative overflow-hidden max-w-3xl mx-auto"
            >
              <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-accent/20 rounded-tr-3xl"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-accent/20 rounded-bl-3xl"></div>

              <h3 className="text-3xl font-heading font-bold mb-8">{t.contact.title}</h3>
              <p className="text-muted-foreground mb-8">{t.contact.catering}</p>

              <BookingForm lang={lang} />

              {/* Fallback Contact Info */}
              <div className="mt-8 pt-8 border-t border-dashed border-border text-center">
                <p className="text-sm text-muted-foreground mb-2">
                  {t.contact.fallback}
                </p>
                <a
                  href="mailto:info@silkroad-cologne.de"
                  className="text-primary hover:underline font-medium"
                >
                  info@silkroad-cologne.de
                </a>
                <span className="mx-2 text-muted-foreground">|</span>
                <a
                  href="tel:+4922142362352"
                  className="text-primary hover:underline font-medium"
                >
                  +49 221 42362352
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16 border-t border-white/10 relative z-10">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
            <div>
              <h4 className="text-2xl font-heading font-bold mb-6 text-white tracking-widest">SILK ROAD</h4>
              <p className="text-white/60 mb-4">{t.location.address}</p>
              <p className="text-white/60">+49 221 42362352</p>
            </div>
            
            <div className="flex flex-col gap-2 items-center md:items-start">
               <Link href="/menu" className="hover:text-primary transition-colors text-white/80">{t.nav.menu}</Link>
               <a href="#about" className="hover:text-primary transition-colors text-white/80">{t.nav.about}</a>
               <a href="#contact" className="hover:text-primary transition-colors text-white/80">{t.nav.contact}</a>
               <Link href="/impressum" className="hover:text-primary transition-colors text-white/80">{t.footer.impressum}</Link>
               <Link href="/datenschutz" className="hover:text-primary transition-colors text-white/80">{t.footer.privacy}</Link>
            </div>

            <div className="flex flex-col items-center md:items-end gap-4">
              <div className="flex gap-4">
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"><Instagram className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"><Facebook className="w-5 h-5" /></a>
                <a href="#" className="p-2 bg-white/10 rounded-full hover:bg-primary transition-colors"><Mail className="w-5 h-5" /></a>
              </div>
              <p className="text-xs text-white/40 mt-auto">© 2026 SILK ROAD Köln. {t.footer.rights}</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function MenuCard({ image, title, desc, price }: { image: string, title: string, desc: string, price: string }) {
  return (
    <div className="group bg-background/95 backdrop-blur-sm rounded-sm overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all duration-300">
      <div className="aspect-[4/3] bg-muted relative overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        <div className="absolute top-2 right-2 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-sm text-sm font-bold shadow-sm">
          {price}
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">{title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{desc}</p>
      </div>
    </div>
  )
}
