export type Language = 'de' | 'en' | 'ru' | 'uz';

export const translations = {
  de: {
    nav: {
      about: "Über uns",
      menu: "Speisekarte",
      location: "Kontakt",
      contact: "Kontakt",
      reserve: "Reservieren"
    },
    hero: {
      title: "CARAVAN – Zentralasien in Frankfurt.",
      subtitle: "Authentische Küche, warme Gastfreundschaft und lebendige Teekultur in Frankfurt am Main.",
      cta_reserve: "Tisch anfragen",
      cta_menu: "Highlights ansehen"
    },
    about: {
      title: "Unsere Geschichte",
      content: "Willkommen im CARAVAN. Wir bringen die reichen Aromen und die herzliche Gastfreundschaft der Seidenstraße nach Frankfurt. Unsere Küche zelebriert die kulinarischen Traditionen Zentralasiens – von handgezogenen Nudeln bis zu langsam gegartem Plov. Bei uns ist Essen mehr als nur Nahrung; es ist ein gemeinschaftliches Erlebnis, geteilt mit Freunden und Familie in einer Atmosphäre, die sich wie zu Hause anfühlt."
    },
    menu: {
      title: "Kulinarische Highlights",
      subtitle: "Eine Auswahl unserer beliebtesten Gerichte. Das Angebot kann saisonal variieren.",
      dishes: {
        plov: { name: "Traditioneller Plov", desc: "Das Herzstück usbekischer Küche. Reis, zartes Lammfleisch, gelbe Karotten, Kichererbsen und Rosinen, traditionell im Kazan gegart." },
        manty: { name: "Handgemachte Manty", desc: "Große, saftige Teigtaschen, gefüllt mit fein gehacktem Fleisch und Zwiebeln, serviert mit Joghurt-Dip." },
        lagman: { name: "Uigurischer Lagman", desc: "Handgezogene Nudeln in einer würzigen Brühe mit Rindfleisch, Paprika, Tomaten und frischen Kräutern." },
        samsa: { name: "Knusprige Samsa", desc: "Im Ofen gebackene Teigtaschen mit würziger Fleisch- oder Kürbisfüllung." },
        shashlik: { name: "Lamm Schaschlik", desc: "Zart marinierte Lammspieße über Holzkohle gegrillt, serviert mit marinierten Zwiebeln." },
        tea: { name: "Zentralasiatische Teezeremonie", desc: "Ausgewählte Grün- und Schwarztees, serviert in traditionellen Pialas mit Trockenfrüchten und Nüssen." }
      }
    },
    hours: {
      title: "Öffnungszeiten",
      weekdays: "Dienstag – Freitag",
      weekend: "Samstag – Sonntag",
      monday: "Montag",
      closed: "Geschlossen",
      note: "An Feiertagen können die Zeiten abweichen. Bitte rufen Sie an."
    },
    location: {
      title: "Standort",
      address: "Wöllstädter Str. 11, 60385 Frankfurt am Main",
      district: "Heddernheim / Frankfurt am Main",
      get_directions: "Route planen",
      call_us: "Anrufen"
    },
    gallery: {
      title: "Einblicke"
    },
    contact: {
      title: "Reservierung & Kontakt",
      form: {
        name: "Ihr Name",
        email: "E-Mail",
        phone: "Telefonnummer",
        guests: "Anzahl der Personen",
        date: "Datum",
        time: "Uhrzeit",
        message: "Nachricht (Optional)",
        submit: "Anfrage senden",
        success: "Ihre Reservierungsanfrage wurde erfolgreich gesendet! Wir melden uns in Kürze.",
        error: "Es gab ein Problem beim Senden. Bitte versuchen Sie es erneut."
      },
      fallback: "Funktioniert das Formular nicht? Schreiben Sie uns:",
      catering: "Catering auf Anfrage verfügbar."
    },
    footer: {
      impressum: "Impressum",
      privacy: "Datenschutz",
      rights: "Alle Rechte vorbehalten."
    }
  },
  en: {
    nav: {
      about: "About",
      menu: "Menu",
      location: "Location",
      contact: "Contact",
      reserve: "Reserve"
    },
    hero: {
      title: "CARAVAN – Central Asian comfort food in Frankfurt.",
      subtitle: "Authentic flavors, warm hospitality, and vibrant tea culture in Frankfurt am Main.",
      cta_reserve: "Book a Table",
      cta_menu: "View Highlights"
    },
    about: {
      title: "Our Story",
      content: "Welcome to CARAVAN. We bring the rich flavors and warm hospitality of the ancient Silk Road to Frankfurt. Our kitchen celebrates the culinary traditions of Central Asia—from hand-pulled noodles to slow-cooked Plov. Here, dining is more than just food; it is a communal experience shared with friends and family in an atmosphere that feels like home."
    },
    menu: {
      title: "Menu Highlights",
      subtitle: "A selection of our favorites. Offerings may vary seasonally.",
      dishes: {
        plov: { name: "Traditional Plov", desc: "The heart of Uzbek cuisine. Rice, tender lamb, yellow carrots, chickpeas, and raisins, cooked traditionally in a Kazan." },
        manty: { name: "Handmade Manty", desc: "Large, juicy dumplings filled with finely chopped meat and onions, served with a yogurt dip." },
        lagman: { name: "Uyghur Lagman", desc: "Hand-pulled noodles in a savory broth with beef, peppers, tomatoes, and fresh herbs." },
        samsa: { name: "Crispy Samsa", desc: "Oven-baked pastries filled with spiced meat or pumpkin." },
        shashlik: { name: "Lamb Shashlik", desc: "Tender marinated lamb skewers grilled over charcoal, served with marinated onions." },
        tea: { name: "Central Asian Tea", desc: "Selected green and black teas served in traditional pialas with dried fruits and nuts." }
      }
    },
    hours: {
      title: "Opening Hours",
      weekdays: "Tuesday – Friday",
      weekend: "Saturday – Sunday",
      monday: "Monday",
      closed: "Closed",
      note: "Hours may vary on holidays. Call to confirm."
    },
    location: {
      title: "Location",
      address: "Wöllstädter Str. 11, 60385 Frankfurt am Main",
      district: "Heddernheim / Frankfurt am Main",
      get_directions: "Get Directions",
      call_us: "Call Us"
    },
    gallery: {
      title: "Gallery"
    },
    contact: {
      title: "Reservations & Contact",
      form: {
        name: "Your Name",
        email: "Email",
        phone: "Phone Number",
        guests: "Number of Guests",
        date: "Date",
        time: "Time",
        message: "Message (Optional)",
        submit: "Send Request",
        success: "Your reservation request has been sent successfully! We'll be in touch soon.",
        error: "There was a problem sending your request. Please try again."
      },
      fallback: "Form not working? Email us at:",
      catering: "Catering available upon request."
    },
    footer: {
      impressum: "Imprint",
      privacy: "Privacy Policy",
      rights: "All rights reserved."
    }
  },
  ru: {
    nav: {
      about: "О нас",
      menu: "Меню",
      location: "Локация",
      contact: "Контакты",
      reserve: "Бронь"
    },
    hero: {
      title: "CARAVAN — кухня Центральной Азии во Франкфурте.",
      subtitle: "Аутентичные вкусы, теплое гостеприимство и культура чаепития во Франкфурте-на-Майне.",
      cta_reserve: "Забронировать стол",
      cta_menu: "Смотреть меню"
    },
    about: {
      title: "Наша история",
      content: "Добро пожаловать в CARAVAN. Мы привезли во Франкфурт богатые вкусы и теплое гостеприимство Шелкового пути. Наша кухня прославляет кулинарные традиции Центральной Азии — от тянутой лапши до томленого плова. Еда для нас — это не просто пища, а повод собраться с друзьями и семьей в атмосфере домашнего уюта."
    },
    menu: {
      title: "Хиты меню",
      subtitle: "Избранные блюда. Меню может меняться в зависимости от сезона.",
      dishes: {
        plov: { name: "Традиционный Плов", desc: "Сердце узбекской кухни. Рис, нежная баранина, желтая морковь, нут и изюм, приготовленные в казане." },
        manty: { name: "Манты ручной лепки", desc: "Большие сочные манты с рубленым мясом и луком, подаются с йогуртовым соусом." },
        lagman: { name: "Уйгурский Лагман", desc: "Тянутая вручную лапша в наваристом бульоне с говядиной, перцем, томатами и свежей зеленью." },
        samsa: { name: "Хрустящая Самса", desc: "Запеченные в тандыре пирожки с пряным мясом или тыквой." },
        shashlik: { name: "Шашлык из баранины", desc: "Нежный маринованный шашлык, приготовленный на углях, с маринованным луком." },
        tea: { name: "Чайная церемония", desc: "Отборный зеленый и черный чай, подается в пиалах с сухофруктами и орехами." }
      }
    },
    hours: {
      title: "Часы работы",
      weekdays: "Вторник – Пятница",
      weekend: "Суббота – Воскресенье",
      monday: "Понедельник",
      closed: "Закрыто",
      note: "В праздничные дни часы могут меняться. Позвоните для уточнения."
    },
    location: {
      title: "Как нас найти",
      address: "Wöllstädter Str. 11, 60385 Франкфурт-на-Майне",
      district: "Хеддернхайм / Франкфурт-на-Майне",
      get_directions: "Проложить маршрут",
      call_us: "Позвонить"
    },
    gallery: {
      title: "Галерея"
    },
    contact: {
      title: "Бронь и Контакты",
      form: {
        name: "Ваше Имя",
        email: "Email",
        phone: "Телефон",
        guests: "Количество гостей",
        date: "Дата",
        time: "Время",
        message: "Сообщение (необязательно)",
        submit: "Отправить запрос",
        success: "Ваш запрос на бронирование успешно отправлен! Скоро свяжемся с вами.",
        error: "Возникла проблема при отправке. Пожалуйста, попробуйте снова."
      },
      fallback: "Не получается отправить? Напишите нам:",
      catering: "Кейтеринг доступен по запросу."
    },
    footer: {
      impressum: "Импрессум",
      privacy: "Конфиденциальность",
      rights: "Все права защищены."
    }
  },
  uz: {
    nav: {
      about: "Biz haqimizda",
      menu: "Menyu",
      location: "Manzil",
      contact: "Aloqa",
      reserve: "Bron qilish"
    },
    hero: {
      title: "CARAVAN – Frankfurt shahrida Markaziy Osiyo oshxonasi.",
      subtitle: "Frankfurt am Main shahrida asl ta'mlar, samimiy mehmondo'stlik va choy madaniyati.",
      cta_reserve: "Stol bron qilish",
      cta_menu: "Menyu ko'rish"
    },
    about: {
      title: "Bizning tariximiz",
      content: "CARAVAN restoraniga xush kelibsiz. Biz Frankfurt shahriga Ipak yo'lining boy ta'mlari va samimiy mehmondo'stligini olib keldik. Oshxonamiz Markaziy Osiyoning oshpazlik an'analarini nishonlaydi – qo'lda tortilgan lag'mon lagmanidan tortib sekin pishirilgan oshgacha. Bizda ovqatlanish shunchaki ovqat emas; bu do'stlar va oila bilan uyga o'xshagan muhitda baham ko'riladigan jamoaviy tajribadir."
    },
    menu: {
      title: "Oshxona diqqatga sazovor taomlar",
      subtitle: "Bizning eng mashhur taomlarimizdan tanlov. Taomlar mavsumga qarab o'zgarishi mumkin.",
      dishes: {
        plov: { name: "An'anaviy Osh", desc: "O'zbek oshxonasining yuragi. Guruch, yumshoq qo'y go'shti, sariq sabzi, no'xat va mayiz, an'anaviy ravishda qozonda pishiriladi." },
        manty: { name: "Qo'lda yasalgan Manti", desc: "Mayda to'g'ralgan go'sht va piyoz bilan to'ldirilgan katta, sharbatli manti, yogurt sousi bilan beriladi." },
        lagman: { name: "Uyg'ur Lag'moni", desc: "Mol go'shti, qalampir, pomidor va yangi ko'katlar bilan mazali sho'rvada qo'lda tortilgan lag'mon." },
        samsa: { name: "Xamirli Somsa", desc: "Ziravorli go'sht yoki qovoq bilan to'ldirilgan tandirda pishirilgan somsa." },
        shashlik: { name: "Qo'y go'shtidan Shashlik", desc: "Ko'mirda qovurilgan marinadlangan yumshoq qo'y go'shti shishlari, marinadlangan piyoz bilan beriladi." },
        tea: { name: "Markaziy Osiyo Choyi", desc: "An'anaviy piyolalarda quritilgan mevalar va yong'oqlar bilan yashil va qora choylar taklif etiladi." }
      }
    },
    hours: {
      title: "Ish vaqti",
      weekdays: "Seshanba – Juma",
      weekend: "Shanba – Yakshanba",
      monday: "Dushanba",
      closed: "Yopiq",
      note: "Bayram kunlari vaqt o'zgarishi mumkin. Tasdiqlash uchun qo'ng'iroq qiling."
    },
    location: {
      title: "Manzil",
      address: "Wöllstädter Str. 11, 60385 Frankfurt am Main",
      district: "Heddernheim / Frankfurt am Main",
      get_directions: "Yo'nalish olish",
      call_us: "Qo'ng'iroq qilish"
    },
    gallery: {
      title: "Galereya"
    },
    contact: {
      title: "Bron qilish va Aloqa",
      form: {
        name: "Ismingiz",
        email: "Elektron pochta",
        phone: "Telefon raqam",
        guests: "Mehmonlar soni",
        date: "Sana",
        time: "Vaqt",
        message: "Xabar (Ixtiyoriy)",
        submit: "So'rov yuborish",
        success: "Sizning bron qilish so'rovingiz muvaffaqiyatli yuborildi! Tez orada bog'lanamiz.",
        error: "So'rovingizni yuborishda muammo yuz berdi. Iltimos, qayta urinib ko'ring."
      },
      fallback: "Shakl ishlamayaptimi? Bizga yozing:",
      catering: "So'rov bo'yicha ketering xizmati mavjud."
    },
    footer: {
      impressum: "Impressum",
      privacy: "Maxfiylik siyosati",
      rights: "Barcha huquqlar himoyalangan."
    }
  }
};
