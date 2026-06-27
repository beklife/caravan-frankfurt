import { useState, useLayoutEffect } from "react";
import { Link, useLocation } from "wouter";
import { translations, Language } from "@/lib/i18n";
import { useMusic } from "@/lib/MusicContext";
import { useLanguage } from "@/lib/LanguageContext";
import { useSeoMeta } from "@/lib/seo";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowLeftIcon as ArrowLeft, ChevronDownIcon as ChevronDown, X } from "@/components/icons";
import HamburgerButton from "@/components/HamburgerButton";
import { Button } from "@/components/ui/button";

import plovImage from "@assets/stock_images/menu/Plov.webp";
import caravanPlovImage from "@assets/stock_images/menu/Caravan Plov.webp";
import mantyImage from "@assets/stock_images/menu/Manti.webp";
import samsaImage from "@assets/stock_images/menu/Samsa.webp";
import shashlikLammImage from "@assets/stock_images/menu/Schaschlik_vom_Lamm.webp";
import shashlikHaehnchenImage from "@assets/stock_images/menu/Schaschlik_vom_Hahnchen.webp";
import teaImage from "@assets/stock_images/menu/tea_1.webp";
import carpetImage from "@assets/stock_images/persian_carpet.webp";
import schorpaImage from "@assets/stock_images/menu/Schorpa.webp";
import tscheburekiImage from "@assets/stock_images/menu/Tschebureki.webp";
import karottensalatImage from "@assets/stock_images/menu/Karottensalat.webp";
import atschuchuksalatImage from "@assets/stock_images/menu/Atschuchuksalat.webp";
import kazanKebabImage from "@assets/stock_images/menu/Kazan Kebab Lamm.webp";
import kazanKebabHaehnchenImage from "@assets/stock_images/menu/Kazan Kebab Hähnchen.webp";
import honimImage from "@assets/stock_images/menu/Honim.webp";
import honigMedovikKuchenImage from "@assets/stock_images/menu/Medovik.webp";
import borschImage from "@assets/stock_images/menu/Borsch.webp";
import chuchvaraImage from "@assets/stock_images/menu/Chuchvara.webp";
import mastavAImage from "@assets/stock_images/menu/Mastava.webp";
import pelmeniImage from "@assets/stock_images/menu/Pelmeni.webp";
import warenikyImage from "@assets/stock_images/menu/Wareniki.webp";
import caravanDessertImage from "@assets/stock_images/menu/Caravan Dessert.webp";
import honigMedovikSchokoladeImage from "@assets/stock_images/menu/Schoko Medovik.webp";
import knackigerStartImage from "@assets/stock_images/menu/Knäckiger start.webp";
import taschkentTellerImage from "@assets/stock_images/menu/Taschkent Teller.webp";
import napoleonImage from "@assets/stock_images/menu/Napoleon.webp";
import usbekischesBrotGrossImage from "@assets/stock_images/menu/Usbekisches Brot (groß).webp";
import usbekischesBrotKleinImage from "@assets/stock_images/menu/Usbekisches Brot (klein).webp";

const langNames: Record<Language, string> = {
  de: "Deutsch",
  en: "English",
  ru: "Русский",
  uz: "O'zbek"
};

const langFlags: Record<Language, string> = {
  de: "🇩🇪",
  en: "🇬🇧",
  ru: "🇷🇺",
  uz: "🇺🇿"
};

const menuCategories = {
  de: {
    soups: "Suppen",
    mains: "Hausspezialitäten",
    appetizers: "Vorspeisen und Salate",
    desserts: "Desserts",
    sides: "Beilagen & Extras",
    drinks: "Heisse Getränke",
    colddrinks: "Kalte Getränke",
    beer: "Bier & Alkohol",
    wine: "Weine",
    spirits: "Wodka & Spirituosen",
  },
  en: {
    soups: "Soups",
    mains: "House Specialties",
    appetizers: "Appetizers and Salads",
    desserts: "Desserts",
    sides: "Sides & Extras",
    drinks: "Hot Drinks",
    colddrinks: "Cold Drinks",
    beer: "Beer & Alcohol",
    wine: "Wines",
    spirits: "Vodka & Spirits",
  },
  ru: {
    soups: "Супы",
    mains: "Фирменные блюда",
    appetizers: "Закуски и салаты",
    desserts: "Десерты",
    sides: "Гарниры и экстра",
    drinks: "Горячие напитки",
    colddrinks: "Холодные напитки",
    beer: "Пиво и алкоголь",
    wine: "Вина",
    spirits: "Водка и крепкие напитки",
  },
  uz: {
    soups: "Sho'rvalar",
    mains: "Firma taomlari",
    appetizers: "Salatlar va kirish taomlar",
    desserts: "Desertlar",
    sides: "Garnirlar va qo'shimchalar",
    drinks: "Issiq ichimliklar",
    colddrinks: "Sovuq ichimliklar",
    beer: "Pivo va alkogol",
    wine: "Vinolar",
    spirits: "Aroq va kuchli ichimliklar",
  }
};

const fullMenu = {
  soups: [
    { id: 'schorpa', image: schorpaImage, price: '12.90€', dietary: 'halal' },
    { id: 'borsch', image: borschImage, price: '12.90€', dietary: 'halal' },
    { id: 'chuchvara', image: chuchvaraImage, price: '13.90€', dietary: 'halal' },
    { id: 'mastava', image: mastavAImage, price: '12.90€', dietary: 'halal' },
  ],
  appetizers: [
    { id: 'somsa', image: samsaImage, price: '12.90€', dietary: 'halal' },
    { id: 'tschebureki', image: tscheburekiImage, price: '12.90€', dietary: 'halal' },
    {
      id: 'knackigerstart',
      image: knackigerStartImage,
      price: '10.90€',
      dietary: 'vegetarian',
      names: { de: 'Knäckiger Start', en: 'Crunchy Start', ru: 'Хрустящая закуска', uz: 'Qarsildoq boshlanish' },
      descs: {
        de: 'Verschiedene eingelegte Gemüsespezialitäten.',
        en: 'Assortment of various pickled vegetable specialties.',
        ru: 'Различные маринованные овощные специалитеты.',
        uz: 'Turli xil tuzlangan sabzavot mahsulotlari.'
      }
    },
    { id: 'karottensalat', image: karottensalatImage, price: '9.90€', dietary: 'vegan' },
    { id: 'atschuchuksalat', image: atschuchuksalatImage, price: '9.90€', dietary: 'vegan' },
  ],
  mains: [
    { id: 'plov', image: plovImage, price: '17.90€', dietary: 'halal' },
    { id: 'caravanplov', image: caravanPlovImage, price: '22.90€', dietary: 'halal' },
    { id: 'manty', image: mantyImage, price: '23.90€', dietary: 'halal' },
    { id: 'pelmeni', image: pelmeniImage, price: '22.90€', dietary: 'halal' },
    { id: 'kazankebab', image: kazanKebabImage, price: '26.90€', dietary: 'halal' },
    { id: 'kazankebabhaehnchen', image: kazanKebabHaehnchenImage, price: '25.90€', dietary: 'halal' },
    { id: 'schaschlikvomlamm', image: shashlikLammImage, price: '26.90€', dietary: 'halal' },
    { id: 'schaschlikvomhaehnchen', image: shashlikHaehnchenImage, price: '25.90€', dietary: 'halal' },
    { id: 'taschkentteller', image: taschkentTellerImage, price: '25.90€', dietary: 'halal' },
    { id: 'honimvegetariach', image: honimImage, price: '21.90€', dietary: 'vegetarian' },
    { id: 'warenikiwegetarisch', image: warenikyImage, price: '21.90€', dietary: 'vegetarian' },
  ],
  desserts: [
    { id: 'honigmedovikkuchen', image: honigMedovikKuchenImage, price: '8.90€' },
    { id: 'honigmedovikschokolade', image: honigMedovikSchokoladeImage, price: '8.90€' },
    { id: 'napoleon', image: napoleonImage, price: '8.90€' },
  ],
  sides: [
    {
      id: 'pommes',
      image: null,
      price: '4.90€',
      names: { de: 'Extra Portion Pommes', en: 'Extra Portion Fries', ru: 'Дополнительная порция картофеля фри', uz: "Qo'shimcha kartoshka fri" },
      descs: {
        de: 'Knusprige Pommes Frites.',
        en: 'Crispy french fries.',
        ru: 'Хрустящий картофель фри.',
        uz: "Qo'shimcha kartoshka fri."
      }
    },
    {
      id: 'reis',
      image: null,
      price: '4.90€',
      names: { de: 'Extra Portion Reis', en: 'Extra Portion Rice', ru: 'Дополнительная порция риса', uz: "Qo'shimcha guruch" },
      descs: {
        de: 'Gedämpfter Reis.',
        en: 'Steamed rice.',
        ru: 'Рис на пару.',
        uz: "Bug'da pishirilgan guruch."
      }
    },
    {
      id: 'sosse',
      image: null,
      price: '1.90€',
      names: { de: 'Extra Portion Sosse', en: 'Extra Portion Sauce', ru: 'Дополнительная порция соуса', uz: "Qo'shimcha sous" },
      descs: {
        de: 'Yoghurt-, Scharf-, Tomatensoße, Schmand.',
        en: 'Yogurt, Spicy, Tomato sauce, Sour cream.',
        ru: 'Йогурт, острый, томатный соус, сметана.',
        uz: 'Yogurt, achchiq, pomidor sousi, smetana.'
      }
    },
    {
      id: 'non',
      image: usbekischesBrotGrossImage,
      price: '4.90€',
      names: { de: 'USBEKISCHES BROT (groß)', en: 'Uzbek Bread (large)', ru: 'Узбекский хлеб (большой)', uz: "O'zbek noni (katta)" },
      descs: {
        de: 'Hausgemachtes Weißbrot mit Milch, Eiern und Butter.',
        en: 'Homemade white bread with milk, eggs, and butter.',
        ru: 'Домашний белый хлеб с молоком, яйцами и сливочным маслом.',
        uz: "Sut, tuxum va sariyog' bilan tayyorlangan uy noni."
      }
    },
    {
      id: 'nonhalf',
      image: usbekischesBrotKleinImage,
      price: '2.90€',
      names: { de: 'USBEKISCHES BROT (klein)', en: 'Uzbek Bread (small)', ru: 'Узбекский хлеб (маленький)', uz: "O'zbek noni (kichik)" },
      descs: {
        de: 'Hausgemachtes Weißbrot mit Milch, Eiern und Butter.',
        en: 'Homemade white bread with milk, eggs, and butter.',
        ru: 'Домашний белый хлеб с молоком, яйцами и сливочным маслом.',
        uz: "Sut, tuxum va sariyog' bilan tayyorlangan uy noni."
      }
    },
  ],
  drinks: [
    {
      id: 'group-kanne-tee',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'KANNE TEE', en: 'POT OF TEA', ru: 'ЧАЙНИК ЧАЯ', uz: 'CHOVNAK CHOY' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'kanneteeklassik',
      image: null,
      price: '7.90€',
      subItem: true,
      names: { de: 'Schwarzer, Grüner, Frische Minze mit Zitrone', en: 'Black, green, fresh mint with lemon', ru: 'Черный, зеленый, свежая мята с лимоном', uz: 'Qora, yashil, limonli yangi yalpiz' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'kanneteejasmin',
      image: null,
      price: '8.90€',
      subItem: true,
      names: { de: 'Jasmin Tee', en: 'Jasmine Tea', ru: 'Жасминовый чай', uz: 'Yasminli choy' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'kanneteespezial',
      image: null,
      price: '9.90€',
      subItem: true,
      names: { de: 'Rosen Tee, Tashkent Tee, Immun Tee', en: 'Rose tea, Tashkent tea, immune tea', ru: 'Розовый чай, ташкентский чай, иммунный чай', uz: 'Atirgul choyi, Toshkent choyi, immun choyi' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'group-tasse-tee',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'TASSE TEE', en: 'CUP OF TEA', ru: 'ЧАШКА ЧАЯ', uz: 'PIYOLA CHOY' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'tasseteeklassik',
      image: null,
      price: '3.50€',
      subItem: true,
      names: { de: 'Schwarzer, Grüner, Frische Minze mit Zitrone', en: 'Black, green, fresh mint with lemon', ru: 'Черный, зеленый, свежая мята с лимоном', uz: 'Qora, yashil, limonli yangi yalpiz' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'tasseteejasmin',
      image: null,
      price: '3.90€',
      subItem: true,
      names: { de: 'Jasmin Tee', en: 'Jasmine Tea', ru: 'Жасминовый чай', uz: 'Yasminli choy' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'tasseteeimmun',
      image: null,
      price: '4.50€',
      subItem: true,
      names: { de: 'Immun Tee', en: 'Immune Tea', ru: 'Иммунный чай', uz: 'Immun choyi' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'group-kafe',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'KAFFEE', en: 'COFFEE', ru: 'КОФЕ', uz: 'QAHVA' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'espresso',
      image: null,
      price: '2.90€',
      subItem: true,
      names: { de: 'ESPRESSO', en: 'ESPRESSO', ru: 'ЭСПРЕССО', uz: 'ESPRESSO' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'schwarzerkaffee',
      image: null,
      price: '3.50€',
      subItem: true,
      names: { de: 'SCHWARZER KAFFEE', en: 'BLACK COFFEE', ru: 'ЧЕРНЫЙ КОФЕ', uz: 'QORA QAHVA' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'cappuccino',
      image: null,
      price: '4.50€',
      subItem: true,
      names: { de: 'CAPPUCCINO', en: 'CAPPUCCINO', ru: 'КАПУЧИНО', uz: 'CAPPUCCINO' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'lattemacchiato',
      image: null,
      price: '4.90€',
      subItem: true,
      names: { de: 'LATTE MACCHIATO', en: 'LATTE MACCHIATO', ru: 'ЛАТТЕ МАККИАТО', uz: 'LATTE MACCHIATO' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
    {
      id: 'espressomacchiato',
      image: null,
      price: '3.50€',
      subItem: true,
      names: { de: 'ESPRESSO MACCHIATO', en: 'ESPRESSO MACCHIATO', ru: 'ЭСПРЕССО МАККИАТО', uz: 'ESPRESSO MACCHIATO' },
      descs: {
        de: '',
        en: '',
        ru: '',
        uz: ''
      }
    },
  ],
  colddrinks: [
    {
      id: 'group-cold-volume',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'ALKOHOLFREIE GETRÄNKE • 0.2 / 0.4 L', en: 'NON-ALCOHOLIC DRINKS • 0.2 / 0.4 L', ru: 'БЕЗАЛКОГОЛЬНЫЕ НАПИТКИ • 0.2 / 0.4 Л', uz: 'ALKOGOLSIZ ICHIMLIKLAR • 0.2 / 0.4 L' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'selterskohlensaeure',
      image: null,
      price: '2.50€ / 3.80€',
      subItem: true,
      names: { de: 'SELTERS KOHLENSÄURE', en: 'SELTERS SPARKLING', ru: 'SELTERS ГАЗИРОВАННАЯ', uz: 'SELTERS GAZLANGAN' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'seltersnaturell',
      image: null,
      price: '2.50€ / 3.80€',
      subItem: true,
      names: { de: 'SELTERS NATURELL', en: 'SELTERS STILL', ru: 'SELTERS НАТУРАЛЬНАЯ', uz: 'SELTERS TABIIY' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'seltersflaschen',
      image: null,
      price: '7.50€',
      subItem: true,
      names: { de: 'SELTERS FLASCHE (0.75L)', en: 'SELTERS BOTTLE (0.75L)', ru: 'SELTERS БУТЫЛКА (0.75Л)', uz: 'SELTERS SHISHA (0.75L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'cocacola',
      image: null,
      price: '2.90€ / 4.20€',
      subItem: true,
      names: { de: 'COCA COLA', en: 'COCA COLA', ru: 'COCA COLA', uz: 'COCA COLA' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'colazero',
      image: null,
      price: '2.90€ / 4.20€',
      subItem: true,
      names: { de: 'COCA COLA ZERO', en: 'COCA COLA ZERO', ru: 'COCA COLA ZERO', uz: 'COCA COLA ZERO' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'fanta',
      image: null,
      price: '2.90€ / 4.20€',
      subItem: true,
      names: { de: 'FANTA', en: 'FANTA', ru: 'FANTA', uz: 'FANTA' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'sprite',
      image: null,
      price: '2.90€ / 4.20€',
      subItem: true,
      names: { de: 'SPRITE', en: 'SPRITE', ru: 'SPRITE', uz: 'SPRITE' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'apfelsaftschorle',
      image: null,
      price: '3.20€',
      subItem: true,
      names: { de: 'APFELSAFTSCHORLE', en: 'APPLE SPRITZER', ru: 'ЯБЛОЧНЫЙ ШПРИТЦЕР', uz: 'OLMA SHARBAT SPRITZER' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'bitterlemon',
      image: null,
      price: '3.90€ / 4.90€',
      subItem: true,
      names: { de: 'BITTER LEMON', en: 'BITTER LEMON', ru: 'BITTER LEMON', uz: 'BITTER LEMON' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'gingerale',
      image: null,
      price: '3.90€ / 4.90€',
      subItem: true,
      names: { de: 'GINGER ALE', en: 'GINGER ALE', ru: 'GINGER ALE', uz: 'GINGER ALE' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'schweppestonic',
      image: null,
      price: '3.90€',
      subItem: true,
      names: { de: 'SCHWEPPES TONIC', en: 'SCHWEPPES TONIC', ru: 'SCHWEPPES TONIC', uz: 'SCHWEPPES TONIC' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'group-safte',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'SÄFTE', en: 'JUICES', ru: 'СОКИ', uz: 'SHARBATLAR' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'orangensaft',
      image: null,
      price: '3.90€',
      subItem: true,
      names: { de: 'ORANGENSAFT', en: 'ORANGE JUICE', ru: 'АПЕЛЬСИНОВЫЙ СОК', uz: 'APELSIN SHARBATI' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'apfelsaft',
      image: null,
      price: '3.90€',
      subItem: true,
      names: { de: 'APFELSAFT', en: 'APPLE JUICE', ru: 'ЯБЛОЧНЫЙ СОК', uz: 'OLMA SHARBATI' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'kirschsaft',
      image: null,
      price: '3.90€',
      subItem: true,
      names: { de: 'KIRSCHSAFT', en: 'CHERRY JUICE', ru: 'ВИШНЕВЫЙ СОК', uz: 'OLCHA SHARBATI' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'bananensaft',
      image: null,
      price: '3.90€',
      subItem: true,
      names: { de: 'BANANENSAFT', en: 'BANANA JUICE', ru: 'БАНАНОВЫЙ СОК', uz: 'BANAN SHARBATI' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'group-hausgetraenke',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'HAUSGEMACHTE GETRÄNKE', en: 'HOMEMADE DRINKS', ru: 'ДОМАШНИЕ НАПИТКИ', uz: 'UYDA TAYYORLANGAN ICHIMLIKLAR' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'morssmarodina',
      image: null,
      price: '4.90€',
      subItem: true,
      names: { de: 'Mors Smarodina (0.4L)', en: 'Mors Smarodina (0.4L)', ru: 'Морс Смородина (0.4Л)', uz: 'Mors Smarodina (0.4L)' },
      descs: {
        de: 'Erfrischendes hausgemachtes Johannisbeeren-Getränk mit viel Vitamin und natürlichem Fruchtaroma.',
        en: 'Refreshing homemade currant drink with vitamins and natural fruit aroma.',
        ru: 'Освежающий домашний напиток из смородины с витаминами и натуральным фруктовым ароматом.',
        uz: 'Vitaminlarga boy va tabiiy meva hidli, uyda tayyorlangan tetiklantiruvchi qoraqat ichimligi.'
      }
    },
    {
      id: 'morsoblepikha',
      image: null,
      price: '4.90€',
      subItem: true,
      names: { de: 'Mors Oblepikha (0.4L)', en: 'Mors Oblepikha (0.4L)', ru: 'Морс Облепиха (0.4Л)', uz: 'Mors Oblepikha (0.4L)' },
      descs: {
        de: 'Erfrischendes hausgemachtes Sanddornbeeren-Getränk mit voller Vitamine und natürlichem Fruchtgenuss.',
        en: 'Refreshing homemade sea buckthorn drink with full vitamins and natural fruit taste.',
        ru: 'Освежающий домашний напиток из облепихи с витаминами и натуральным фруктовым вкусом.',
        uz: 'Vitaminlarga boy va tabiiy mevali taʼmga ega, uyda tayyorlangan tetiklantiruvchi chakanda ichimligi.'
      }
    },
  ],
  beer: [
    {
      id: 'binding',
      image: null,
      price: '3.90€ / 5.90€',
      names: { de: 'Binding (4.9% Vol.) Pils, vom Fass (0.2L / 0.4L)', en: 'Binding (4.9% Vol.) Pilsner, draft (0.2L / 0.4L)', ru: 'Binding (4.9% Vol.) Пилснер, разливное (0.2л / 0.4л)', uz: 'Binding (4.9% Vol.) Pils, quyma (0.2L / 0.4L)' },
      descs: {
        de: 'Frisches Pils vom Fass',
        en: 'Fresh draft pilsner',
        ru: 'Свежее разливное пиво',
        uz: 'Yangi quyma pivo'
      }
    },
    {
      id: 'radler',
      image: null,
      price: '3.90€ / 5.90€',
      names: { de: 'Radler (4.9% Vol.) (0.2L / 0.4L)', en: 'Radler (4.9% Vol.) (0.2L / 0.4L)', ru: 'Радлер (4.9% Vol.) (0.2л / 0.4л)', uz: 'Radler (4.9% Vol.) (0.2L / 0.4L)' },
      descs: {
        de: 'Bier mit Limonade gemischt',
        en: 'Beer mixed with lemonade',
        ru: 'Пиво с лимонадом',
        uz: 'Limonad bilan pivo'
      }
    },
    {
      id: 'kostritzer',
      image: null,
      price: '4.90€',
      names: { de: 'Köstritzer Schwarzbier 0.33L (4.8% Vol.)', en: 'Köstritzer Black Beer 0.33L (4.8% Vol.)', ru: 'Köstritzer Черное пиво 0.33л (4.8% Vol.)', uz: 'Köstritzer Qora pivo 0.33L (4.8% Vol.)' },
      descs: {
        de: 'Dunkles Bier aus Thüringen',
        en: 'Dark beer from Thuringia',
        ru: 'Темное пиво из Тюрингии',
        uz: 'Tyuringiyadan qora pivo'
      }
    },
    {
      id: 'schofferhofer',
      image: null,
      price: '5.90€',
      names: { de: 'Schöfferhofer Hefeweizen (0.5L)', en: 'Schöfferhofer Wheat Beer (0.5L)', ru: 'Schöfferhofer пшеничное (0.5л)', uz: "Schöfferhofer bug'doy pivosi (0.5L)" },
      descs: {
        de: 'Klassisches Hefeweizen',
        en: 'Classic wheat beer',
        ru: 'Классическое пшеничное пиво',
        uz: "Klassik bug'doy pivosi"
      }
    },
    {
      id: 'clausthaler',
      image: null,
      price: '4.90€',
      names: { de: 'Clausthaler Original (0.0% Vol.) (0.33L)', en: 'Clausthaler Original (0.0% Vol.) (0.33L)', ru: 'Clausthaler Оригинал (0.0% Vol.) (0.33л)', uz: 'Clausthaler Original (0.0% Vol.) (0.33L)' },
      descs: {
        de: 'Alkoholfreies Bier',
        en: 'Non-alcoholic beer',
        ru: 'Безалкогольное пиво',
        uz: 'Alkogolsiz pivo'
      }
    },
    {
      id: 'schofferhoferna',
      image: null,
      price: '5.90€',
      names: { de: 'Schöfferhofer Hefeweizen (0.0% Vol.) (0.5L)', en: 'Schöfferhofer Wheat Beer (0.0% Vol.) (0.5L)', ru: 'Schöfferhofer пшеничное (0.0% Vol.) (0.5л)', uz: "Schöfferhofer bug'doy (0.0% Vol.) (0.5L)" },
      descs: {
        de: 'Alkoholfreies Hefeweizen',
        en: 'Non-alcoholic wheat beer',
        ru: 'Безалкогольное пшеничное пиво',
        uz: "Alkogolsiz bug'doy pivosi"
      }
    },
    {
      id: 'apfelwein',
      image: null,
      price: '3.90€ / 4.90€',
      names: { de: 'Apfelwein pur, süss, sauer (0.25L / 0.5L)', en: 'Apple Wine pure, sweet, sour (0.25L / 0.5L)', ru: 'Яблочное вино чистое, сладкое, кислое (0.25л / 0.5л)', uz: 'Olma vinosi toza, shirin, nordon (0.25L / 0.5L)' },
      descs: {
        de: 'Hessische Spezialität',
        en: 'Hessian specialty',
        ru: 'Гессенская специальность',
        uz: 'Gessen mahsuloti'
      }
    },
    {
      id: 'aperolspritz',
      image: null,
      price: '9.90€',
      names: { de: 'Aperol Spritz', en: 'Aperol Spritz', ru: 'Aperol Spritz', uz: 'Aperol Spritz' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'prosecco',
      image: null,
      price: '5.90€',
      names: { de: 'Prosecco (0.2L)', en: 'Prosecco (0.2L)', ru: 'Просекко (0.2л)', uz: 'Prosecco (0.2L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'gintonic',
      image: null,
      price: '12.90€',
      names: { de: 'Gin Tonic', en: 'Gin Tonic', ru: 'Джин Тоник', uz: 'Gin Tonic' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
  ],
  wine: [
    {
      id: 'group-weissweine',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'WEISSWEINE (0.2L)', en: 'WHITE WINES (0.2L)', ru: 'БЕЛЫЕ ВИНА (0.2л)', uz: 'OQ VINOLAR (0.2L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'thomasrathriesling',
      image: null,
      price: '8.00€',
      subItem: true,
      names: { de: 'Thomas Rath Riesling', en: 'Thomas Rath Riesling', ru: 'Thomas Rath Рислинг', uz: 'Thomas Rath Riesling' },
      descs: {
        de: 'Halbtrocken, Aromen nach Apfel und Pfirsichen, frische Säure',
        en: 'Semi-dry, apple and peach aromas, fresh acidity',
        ru: 'Полусухое, ароматы яблок и персиков, свежая кислотность',
        uz: 'Yarim quruq, olma va shaftoli aromati, yangi kislotalik'
      }
    },
    {
      id: 'thomasrathgrauburgunder',
      image: null,
      price: '8.00€',
      subItem: true,
      names: { de: 'Thomas Rath Grauburgunder', en: 'Thomas Rath Pinot Gris', ru: 'Thomas Rath Граубургундер', uz: 'Thomas Rath Grauburgunder' },
      descs: {
        de: 'Trocken, nach Pfirsich und Zitrusfrüchten, weich',
        en: 'Dry, peach and citrus, soft',
        ru: 'Сухое, персик и цитрусовые, мягкое',
        uz: 'Quruq, shaftoli va sitrus, yumshoq'
      }
    },
    {
      id: 'thomasrathoppenheimer',
      image: null,
      price: '8.00€',
      subItem: true,
      names: { de: 'Thomas Rath Oppenheimer Krötenbrunnen', en: 'Thomas Rath Oppenheimer Krötenbrunnen', ru: 'Thomas Rath Опенхаймер Кретенбруннен', uz: 'Thomas Rath Oppenheimer Krötenbrunnen' },
      descs: {
        de: 'Lieblich, fruchtig nach Mirabellen',
        en: 'Sweet, fruity with mirabelle plums',
        ru: 'Сладкое, фруктовое с мирабелью',
        uz: "Shirin, mevali mirabelle olxo'ri bilan"
      }
    },
    {
      id: 'group-rotweine',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'ROTWEINE (0.2L)', en: 'RED WINES (0.2L)', ru: 'КРАСНЫЕ ВИНА (0.2л)', uz: 'QIZIL VINOLAR (0.2L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'valmarone',
      image: null,
      price: '7.00€',
      subItem: true,
      names: { de: 'Valmarone Merlot', en: 'Valmarone Merlot', ru: 'Valmarone Мерло', uz: 'Valmarone Merlot' },
      descs: {
        de: 'Trocken, Kirscharomen, feine Kräuter',
        en: 'Dry, cherry aromas, fine herbs',
        ru: 'Сухое, вишневые ароматы, травы',
        uz: "Quruq, olcha aromati, o'tlar"
      }
    },
    {
      id: 'thomasrathspatburgunder',
      image: null,
      price: '8.00€',
      subItem: true,
      names: { de: 'Thomas Rath Spätburgunder', en: 'Thomas Rath Pinot Noir', ru: 'Thomas Rath Шпетбургундер', uz: 'Thomas Rath Spätburgunder' },
      descs: {
        de: 'Trocken Qualitätswein, gehaltvoll, aromatisch',
        en: 'Dry quality wine, full-bodied, aromatic',
        ru: 'Сухое качественное вино, насыщенное, ароматное',
        uz: "Quruq, sifatli vino: to'liq, xushbo'y"
      }
    },
    {
      id: 'lospagos',
      image: null,
      price: '7.00€',
      subItem: true,
      names: { de: 'Los Pagos Cabernet', en: 'Los Pagos Cabernet', ru: 'Los Pagos Каберне', uz: 'Los Pagos Cabernet' },
      descs: {
        de: 'Halbtrocken, nach schwarzen Johannisbeeren, fruchtig',
        en: 'Semi-dry, black currant, fruity',
        ru: 'Полусухое, черная смородина, фруктовое',
        uz: 'Yarim quruq, qora smorodina, mevali'
      }
    },
    {
      id: 'miriosimiglykos',
      image: null,
      price: '7.00€',
      subItem: true,
      names: { de: 'Mirios Imiglykos', en: 'Mirios Imiglykos', ru: 'Mirios Imiglykos', uz: 'Mirios Imiglykos' },
      descs: {
        de: 'Lieblich griechischer Rotwein von Mirios',
        en: 'Sweet Greek red wine by Mirios',
        ru: 'Сладкое греческое красное вино от Mirios',
        uz: 'Mirios brendi tomonidan yoqimli yunon qizil vinosi'
      }
    },
    {
      id: 'group-flaschenweine-weiss',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'FLASCHENWEINE WEISS & ROSÉ (0.75L)', en: 'BOTTLE WINES WHITE & ROSÉ (0.75L)', ru: 'БУТЫЛОЧНЫЕ ВИНА БЕЛОЕ & РОЗЕ (0.75л)', uz: 'SHISHA VINOLAR OQ & ROZE (0.75L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'lasastreriablanca',
      image: null,
      price: '27.90€',
      subItem: true,
      names: { de: 'La Sastrería Garnacha Blanca', en: 'La Sastrería Garnacha Blanca', ru: 'La Sastrería Garnacha Blanca', uz: 'La Sastrería Garnacha Blanca' },
      descs: {
        de: 'Fruchtiger spanischer Weißwein aus der Garnacha-Traube mit Aromen von Aprikose, Ananas und Limette. Frisch, ausgewogen und angenehm trocken.',
        en: 'Fruity Spanish white wine from the Garnacha grape with aromas of apricot, pineapple and lime. Fresh, balanced and pleasantly dry.',
        ru: 'Фруктовое испанское белое вино из сорта Гарнача с ароматами абрикоса, ананаса и лайма. Свежее, сбалансированное и приятно сухое.',
        uz: "Garnacha uzumidan tayyorlangan mevali ispan oq vinosi, o'rik, ananas va limon aromatlari bilan. Yangi, muvozanatli va yoqimli quruq."
      }
    },
    {
      id: 'lasastreriarosado',
      image: null,
      price: '27.90€',
      subItem: true,
      names: { de: 'La Sastrería Rosado', en: 'La Sastrería Rosado', ru: 'La Sastrería Rosado', uz: 'La Sastrería Rosado' },
      descs: {
        de: 'Fruchtiger spanischer Roséwein mit Noten von Erdbeeren und roten Beeren. Trocken und erfrischend.',
        en: 'Fruity Spanish rosé wine with notes of strawberries and red berries. Dry and refreshing.',
        ru: 'Фруктовое испанское розовое вино с нотами клубники и красных ягод. Сухое и освежающее.',
        uz: 'Qulupnay va qizil rezavorlar notalarida mevali ispan roze vinosi. Quruq va tetiklashtiruvchi.'
      }
    },
    {
      id: 'group-flaschenweine-rot',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'FLASCHENWEINE ROT (0.75L)', en: 'BOTTLE WINES RED (0.75L)', ru: 'БУТЫЛОЧНЫЕ ВИНА КРАСНОЕ (0.75л)', uz: 'SHISHA VINOLAR QIZIL (0.75L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'lasastreriatin',
      image: null,
      price: '27.90€',
      subItem: true,
      names: { de: 'La Sastrería Tinto', en: 'La Sastrería Tinto', ru: 'La Sastrería Tinto', uz: 'La Sastrería Tinto' },
      descs: {
        de: 'Fruchtiger spanischer Rotwein mit Noten von schwarzen Kirschen und roten Beeren. Trocken und ausgewogen.',
        en: 'Fruity Spanish red wine with notes of black cherries and red berries. Dry and balanced.',
        ru: 'Фруктовое испанское красное вино с нотами черной вишни и красных ягод. Сухое и сбалансированное.',
        uz: 'Qora gilos va qizil rezavorlar notalarida mevali ispan qizil vinosi. Quruq va muvozanatli.'
      }
    },
  ],
  spirits: [
    {
      id: 'group-vodka',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'VODKA (2cl / 0.2L / 0.5L)', en: 'VODKA (2cl / 0.2L / 0.5L)', ru: 'ВОДКА (2cl / 0.2л / 0.5л)', uz: 'AROQ (2cl / 0.2L / 0.5L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'vodkasmirnoff',
      image: null,
      price: '3.50€ / 20.00€ / 45.00€',
      subItem: true,
      names: { de: 'Smirnoff', en: 'Smirnoff', ru: 'Smirnoff', uz: 'Smirnoff' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'vodkastandart',
      image: null,
      price: '3.90€ / 24.00€ / 49.00€',
      subItem: true,
      names: { de: 'Standard', en: 'Standard', ru: 'Стандарт', uz: 'Standard' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'vodkaabsolut',
      image: null,
      price: '3.90€ / 24.00€ / 49.00€',
      subItem: true,
      names: { de: 'Absolut', en: 'Absolut', ru: 'Absolut', uz: 'Absolut' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'group-vodka-flaschen',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'VODKA FLASCHEN (0.7L)', en: 'VODKA BOTTLES (0.7L)', ru: 'БУТЫЛКИ ВОДКИ (0.7л)', uz: 'AROQ SHISHALARI (0.7L)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'vodkasmirnofflashe',
      image: null,
      price: '55.00€',
      subItem: true,
      names: { de: 'Smirnoff Flasche 0.7L', en: 'Smirnoff Bottle 0.7L', ru: 'Smirnoff Бутылка 0.7л', uz: 'Smirnoff Shisha 0.7L' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'vodkastandardflasche',
      image: null,
      price: '65.00€',
      subItem: true,
      names: { de: 'Standard Flasche 0.7L', en: 'Standard Bottle 0.7L', ru: 'Стандарт Бутылка 0.7л', uz: 'Standard Shisha 0.7L' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'vodkaabsolutflasche',
      image: null,
      price: '65.00€',
      subItem: true,
      names: { de: 'Absolut Flasche 0.7L', en: 'Absolut Bottle 0.7L', ru: 'Absolut Бутылка 0.7л', uz: 'Absolut Shisha 0.7L' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'vodkabelugaflasche',
      image: null,
      price: '139.00€',
      subItem: true,
      names: { de: 'Beluga Flasche 0.7L', en: 'Beluga Bottle 0.7L', ru: 'Beluga Бутылка 0.7л', uz: 'Beluga Shisha 0.7L' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'group-spirituosen',
      image: null,
      price: '',
      isGroupTitle: true,
      names: { de: 'SPIRITUOSEN (2cl)', en: 'SPIRITS (2cl)', ru: 'СПИРТНЫЕ НАПИТКИ (2cl)', uz: 'SPIRITUOSLAR (2cl)' },
      descs: { de: '', en: '', ru: '', uz: '' }
    },
    {
      id: 'hennessy',
      image: null,
      price: '8.90€',
      subItem: true,
      names: { de: 'Hennessy', en: 'Hennessy', ru: 'Hennessy', uz: 'Hennessy' },
      descs: {
        de: 'Cognac',
        en: 'Cognac',
        ru: 'Коньяк',
        uz: 'Konyak'
      }
    },
    {
      id: 'chivasregal',
      image: null,
      price: '8.90€',
      subItem: true,
      names: { de: 'Chivas Regal', en: 'Chivas Regal', ru: 'Chivas Regal', uz: 'Chivas Regal' },
      descs: {
        de: 'Scotch Whisky',
        en: 'Scotch whisky',
        ru: 'Скотч виски',
        uz: 'Shotland viskisi'
      }
    },
    {
      id: 'jackdaniels',
      image: null,
      price: '8.90€',
      subItem: true,
      names: { de: "Jack Daniel's", en: "Jack Daniel's", ru: "Jack Daniel's", uz: "Jack Daniel's" },
      descs: {
        de: 'Tennessee Whiskey',
        en: 'Tennessee whiskey',
        ru: 'Теннесси виски',
        uz: 'Tennessi viskisi'
      }
    },
    {
      id: 'jagermeister',
      image: null,
      price: '8.90€',
      subItem: true,
      names: { de: 'Jägermeister', en: 'Jägermeister', ru: 'Jägermeister', uz: 'Jägermeister' },
      descs: {
        de: 'Kräuterlikör',
        en: 'Herbal liqueur',
        ru: 'Травяной ликер',
        uz: "O'tli likyor"
      }
    },
  ]
};

export default function MenuPage() {
  const { lang, setLang, getLocalizedPath } = useLanguage();
  const [, setLocation] = useLocation();
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<{ src: string; name: string } | null>(null);
  const { musicPlaying, toggleMusic } = useMusic();
  const t = translations[lang];
  const cats = menuCategories[lang];
  const currentYear = new Date().getFullYear();

  // SEO meta tags for menu page
  const seoTitles: Record<Language, string> = {
    de: "Speisekarte - CARAVAN Restaurant Frankfurt | Usbekische Gerichte & Preise",
    en: "Menu - CARAVAN Restaurant Frankfurt | Uzbek Dishes & Prices",
    ru: "Меню - Ресторан CARAVAN Франкфурт | Узбекские блюда и цены",
    uz: "Menyu - CARAVAN Restoran Frankfurt | O'zbek taomlari va narxlar"
  };

  const seoDescriptions: Record<Language, string> = {
    de: "Entdecken Sie unsere Speisekarte mit authentischen usbekischen Spezialitäten: Plov ab 17.90€, Manty 23.90€, Samsa, Schaschlik und mehr. Halal-Küche in Frankfurt Bornheim.",
    en: "Discover our menu with authentic Uzbek specialties: Plov from €17.90, Manty €23.90, Samsa, Shashlik and more. Halal cuisine in Frankfurt Bornheim.",
    ru: "Откройте для себя наше меню с аутентичными узбекскими блюдами: Плов от 17.90€, Манты 23.90€, Самса, Шашлык и многое другое. Халяль кухня во Франкфурте Борнхайм.",
    uz: "Bizning menyumizni kashf eting: O'zbek osh 17.90€ dan, manti 23.90€, somsa, shashlik va boshqalar. Frankfurt Bornheimdagi halol oshxona."
  };

  // Dynamic canonical URL based on language path
  const getCanonicalUrl = () => {
    const localPath = getLocalizedPath('/menu/');
    return `https://caravan-restaurant.de${localPath}`;
  };

  useSeoMeta({
    title: seoTitles[lang],
    description: seoDescriptions[lang],
    canonical: getCanonicalUrl()
  });

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      {/* Persian Carpet Background - Lazy loaded */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `url(${carpetImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'scroll',
          opacity: 0.5,
          willChange: 'auto',
        }}
        role="presentation"
      />
      {/* Lighter overlay to maintain text readability while showing more carpet */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-background/30" />

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border py-4">
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href={getLocalizedPath('/')}>
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              {lang === 'de' ? 'Zurück' : lang === 'ru' ? 'Назад' : lang === 'en' ? 'Back' : lang === 'uz' ? 'Ortga' : 'Back'}
            </Button>
          </Link>

          <Link
            href={getLocalizedPath('/')}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-heading text-2xl font-bold tracking-wider text-primary"
          >
            CARAVAN
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {/* Music Button */}
            <motion.button
              onClick={toggleMusic}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle music"
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
                aria-label="Select language"
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
                    {(["de", "en", "uz", "ru"] as Language[]).map((l) => (
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

          {/* Mobile Menu Controls */}
          <div className="flex items-center gap-3 md:hidden">
            {/* Mobile Music Button */}
            <button
              onClick={toggleMusic}
              aria-label="Toggle music"
              className="p-1.5 text-foreground"
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
                aria-label="Select language"
                className="flex items-center gap-1 px-2 py-1.5 rounded-full bg-muted text-foreground"
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
                    {(["de", "en", "uz", "ru"] as Language[]).map((l) => (
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

            {/* Mobile Menu Toggle */}
            <HamburgerButton
              isOpen={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground"
            />
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
                <button onClick={() => { setMobileMenuOpen(false); setLocation(`${getLocalizedPath('/') }#about`); }} className="text-lg text-center font-medium py-2 border-b border-dashed border-border text-foreground hover:text-primary uppercase [font-family:'Quando',_serif]">
                  {lang === 'de' ? 'Über uns' : lang === 'ru' ? 'О нас' : lang === 'uz' ? 'Biz haqida' : 'About Us'}
                </button>
                <button onClick={() => { setMobileMenuOpen(false); setLocation(`${getLocalizedPath('/') }#contact`); }} className="text-lg text-center font-medium py-2 border-b border-dashed border-border text-foreground hover:text-primary uppercase [font-family:'Quando',_serif]">
                  {lang === 'de' ? 'Kontakt' : lang === 'ru' ? 'Контакт' : lang === 'uz' ? 'Aloqa' : 'Contact'}
                </button>
                <button onClick={() => { setMobileMenuOpen(false); setLocation(`${getLocalizedPath('/') }#reservation`); }} className="text-lg text-center font-medium py-2 border-b border-dashed border-border text-foreground hover:text-primary uppercase [font-family:'Quando',_serif]">
                  {lang === 'de' ? 'Reservierungsanfrage' : lang === 'ru' ? 'Запрос на бронирование' : lang === 'uz' ? "Bron so'rovi" : 'Reservation Request'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
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

        {/* Soups */}
        <MenuSection title={cats.soups} items={fullMenu.soups} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} />

        {/* Appetizers */}
        <MenuSection title={cats.appetizers} items={fullMenu.appetizers} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} />

        {/* Main Dishes */}
        <MenuSection title={cats.mains} items={fullMenu.mains} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} />

        {/* Desserts */}
        <MenuSection title={cats.desserts} items={fullMenu.desserts} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} />

        {/* Sides */}
        <MenuSection title={cats.sides} items={fullMenu.sides} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} hidePlaceholder={true} />

        {/* Hot Drinks */}
        <MenuSection title={cats.drinks} items={fullMenu.drinks} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} hidePlaceholder={true} />

        {/* Cold Drinks */}
        <MenuSection title={cats.colddrinks} items={fullMenu.colddrinks} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} hidePlaceholder={true} />

        {/* Beer */}
        <MenuSection title={cats.beer} items={fullMenu.beer} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} hidePlaceholder={true} />

        {/* Wine */}
        <MenuSection title={cats.wine} items={fullMenu.wine} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} hidePlaceholder={true} />

        {/* Spirits */}
        <MenuSection title={cats.spirits} items={fullMenu.spirits} lang={lang} getDishInfo={getDishInfo} setLightboxImage={setLightboxImage} hidePlaceholder={true} />

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
            {lang === 'uz' && "Barcha narxlar QQS bilan • Allergenlar bo'yicha ma'lumot so'rovga binoan • Barcha taomlar halol"}
          </p>
          <div className="mt-4 md:mt-6 text-center">
            <p className="text-xs text-muted-foreground/70">
              {lang === 'de' && (
                <>
                  Reservierung empfohlen •{" "}
                  <a href="tel:+496995909158" className="hover:text-primary transition-colors">
                    069 95909158
                  </a>
                </>
              )}
              {lang === 'en' && (
                <>
                  Reservation recommended •{" "}
                  <a href="tel:+496995909158" className="hover:text-primary transition-colors">
                    069 95909158
                  </a>
                </>
              )}
              {lang === 'ru' && (
                <>
                  Рекомендуется бронирование •{" "}
                  <a href="tel:+496995909158" className="hover:text-primary transition-colors">
                    069 95909158
                  </a>
                </>
              )}
              {lang === 'uz' && (
                <>
                  Bron qilish tavsiya etiladi •{" "}
                  <a href="tel:+496995909158" className="hover:text-primary transition-colors">
                    069 95909158
                  </a>
                </>
              )}
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
          <p className="font-heading text-2xl md:text-3xl tracking-[0.2em] md:tracking-[0.3em] mb-2 text-white">CARAVAN</p>
          <p className="text-white/80 text-sm md:text-base mb-1">Wöllstädter Str. 11, 60385 Frankfurt am Main</p>
          <p className="text-white/60 text-xs md:text-sm mb-3 md:mb-4">Bornheim • Frankfurt</p>
          <a href="tel:+496995909158" className="text-secondary font-bold tracking-wider text-sm md:text-base hover:text-primary transition-colors">
            069 95909158
          </a>
          <div className="mt-4 md:mt-6">
            <p className="text-xs text-white/80 mt-auto">© {currentYear} CARAVAN Restaurant • Frankfurt</p>
            <p className="text-xs text-white/60 mt-2">
              Made by ❤️{" "}
              <a href="https://codebek.com/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary transition-colors">
                ASLBEK
              </a>
            </p>
          </div>
        </div>
      </footer>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxImage(null)}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full max-h-[90vh] cursor-default"
            >
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 md:-right-12 md:top-0 text-white hover:text-primary transition-colors p-2 bg-white/10 rounded-full backdrop-blur-sm"
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Image */}
              <img
                src={lightboxImage.src}
                alt={lightboxImage.name}
                className="w-full h-full object-contain rounded-lg shadow-2xl"
              />

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function MenuSection({ title, items, lang, getDishInfo, setLightboxImage, hidePlaceholder, hideDetails }: { title: string, items: any[], lang: Language, getDishInfo: (d: any) => { name: string, desc: string }, setLightboxImage: (image: { src: string; name: string } | null) => void, hidePlaceholder?: boolean, hideDetails?: boolean }) {
  // Check if this section has signature dishes (mains)
  const isMainSection = items.length > 0 && items[0].id === 'plov';
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      initial={{ opacity: 1, y: reduceMotion ? 0 : 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px", amount: 0.2 }}
      transition={{ duration: reduceMotion ? 0 : 0.45, ease: "easeOut" }}
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
            const isGroupTitle = Boolean(item.isGroupTitle);
            const isSubItem = Boolean(item.subItem);

            if (isGroupTitle) {
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 1, x: reduceMotion ? 0 : -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "0px", amount: 0.4 }}
                  transition={{ delay: reduceMotion ? 0 : idx * 0.04, duration: reduceMotion ? 0 : 0.35 }}
                  className="pt-2 md:pt-3"
                >
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="h-[1px] w-6 md:w-10 bg-primary/40"></div>
                    <h4 className="text-base md:text-xl font-heading font-bold tracking-[0.12em] text-primary uppercase">
                      {name}
                    </h4>
                    <div className="h-[1px] flex-1 bg-primary/20"></div>
                  </div>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 1, x: reduceMotion ? 0 : -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "0px", amount: 0.4 }}
                transition={{ delay: reduceMotion ? 0 : idx * 0.04, duration: reduceMotion ? 0 : 0.35 }}
                className="group relative"
              >
                <div className="flex gap-3 md:gap-6 items-start">
                  {/* Image */}
                  {item.image ? (
                    <div
                      onClick={() => setLightboxImage({ src: item.image, name })}
                      className="w-20 h-20 md:w-32 md:h-32 rounded-sm overflow-hidden flex-shrink-0 bg-muted shadow-md relative cursor-zoom-in hover:ring-2 hover:ring-primary transition-all group/image"
                    >
                      <img
                        src={item.image}
                        alt={name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Zoom overlay hint */}
                      <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="text-white opacity-0 group-hover/image:opacity-100 transition-opacity text-2xl">🔍</span>
                      </div>
                      {isSignature && (
                        <div className="absolute top-1 right-1 md:top-2 md:right-2 bg-secondary text-secondary-foreground text-xs font-bold px-1.5 md:px-2 py-0.5 md:py-1 rounded-sm shadow-lg">
                          ★
                        </div>
                      )}
                    </div>
                  ) : !hidePlaceholder ? (
                    <div className="w-20 h-20 md:w-32 md:h-32 rounded-sm flex-shrink-0 bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border">
                      <span className="text-3xl md:text-5xl opacity-40">🍽</span>
                    </div>
                  ) : null}

                  {/* Content */}
                  <div className={`flex-1 min-w-0 ${isSubItem ? "pl-2 md:pl-4" : ""}`}>
                    {/* Dish Name & Price with Dotted Line - Stack on mobile */}
                    <div className="mb-2 md:mb-3">
                      {/* Mobile Layout - Stacked */}
                      <div className="md:hidden">
                        <div className="flex items-baseline justify-between gap-2 mb-1">
                          <h4 className={`${isSubItem ? "text-base font-medium" : "text-lg font-heading font-bold"} group-hover:text-primary transition-colors`}>
                            {isSubItem ? `• ${name}` : name}
                            {isSignature && <span className="text-secondary ml-1 text-sm">★</span>}
                          </h4>
                          <span className="text-lg font-bold text-primary whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                      </div>

                      {/* Desktop Layout - With dotted line */}
                      <div className="hidden md:flex items-baseline gap-2">
                        <h4 className={`${isSubItem ? "text-lg font-medium" : "text-xl lg:text-2xl font-heading font-bold"} group-hover:text-primary transition-colors flex-shrink-0`}>
                          {isSubItem ? `• ${name}` : name}
                          {isSignature && <span className="text-secondary ml-2 text-sm">★</span>}
                        </h4>
                        <div className="flex-1 border-b-2 border-dotted border-border/50 mb-1 min-w-[20px]"></div>
                        <span className={`${isSubItem ? "text-lg" : "text-xl lg:text-2xl"} font-bold text-primary whitespace-nowrap flex-shrink-0`}>
                          {item.price}
                        </span>
                      </div>
                    </div>

                    {!hideDetails && (
                      <>
                        {/* Description */}
                        {desc && (
                          <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
                            {desc}
                          </p>
                        )}

                        {/* Dietary Icons (if applicable) */}
                        <div className="flex gap-2 mt-2 md:mt-3">
                          {item.dietary === 'halal' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                              <span>✓</span> {lang === 'de' ? 'Halal' : lang === 'ru' ? 'Халяль' : lang === 'uz' ? 'Halol' : 'Halal'}
                            </span>
                          )}
                          {item.dietary === 'vegetarian' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-500/10 text-green-600 px-2 py-1 rounded-full">
                              <span>🌱</span> {lang === 'de' ? 'Vegetarisch' : lang === 'ru' ? 'Вегетарианское' : lang === 'uz' ? 'Vegetarian' : 'Vegetarian'}
                            </span>
                          )}
                          {item.dietary === 'vegan' && (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-600/10 text-green-700 px-2 py-1 rounded-full">
                              <span>🌿</span> {lang === 'de' ? 'Vegan' : lang === 'ru' ? 'Веганское' : lang === 'uz' ? 'Vegan' : 'Vegan'}
                            </span>
                          )}
                        </div>
                      </>
                    )}
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
          <p className="text-xs md:text-sm text-muted-foreground font-bold italic">
            <span className="text-secondary text-xl">★</span> {lang === 'de' ? 'Empfehlung des Hauses' : lang === 'ru' ? 'Фирменное блюдо' : lang === 'uz' ? 'Oshpaz tavsiyasi' : "Chef's Signature"}
          </p>
        </div>
      )}
    </motion.section>
  );
}
