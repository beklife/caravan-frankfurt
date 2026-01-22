export type Language = 'de' | 'en' | 'ru';

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
      title: "SILK ROAD – Zentralasien in Köln.",
      subtitle: "Authentische Küche, warme Gastfreundschaft und lebendige Teekultur im Severinsviertel.",
      cta_reserve: "Tisch anfragen",
      cta_menu: "Highlights ansehen"
    },
    about: {
      title: "Unsere Geschichte",
      content: "Willkommen im SILK ROAD. Wir bringen die reichen Aromen und die herzliche Gastfreundschaft der Seidenstraße nach Köln. Unsere Küche zelebriert die kulinarischen Traditionen Zentralasiens – von handgezogenen Nudeln bis zu langsam gegartem Plov. Bei uns ist Essen mehr als nur Nahrung; es ist ein gemeinschaftliches Erlebnis, geteilt mit Freunden und Familie in einer Atmosphäre, die sich wie zu Hause anfühlt."
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
      weekdays: "Montag – Freitag",
      weekend: "Samstag – Sonntag",
      note: "An Feiertagen können die Zeiten abweichen. Bitte rufen Sie an."
    },
    location: {
      title: "Standort",
      address: "Karl-Berbuer-Platz 7, 50678 Köln",
      district: "Severinsviertel / Altstadt-Süd",
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
      title: "SILK ROAD – Central Asian comfort food in Cologne.",
      subtitle: "Authentic flavors, warm hospitality, and vibrant tea culture in the Severin Quarter.",
      cta_reserve: "Book a Table",
      cta_menu: "View Highlights"
    },
    about: {
      title: "Our Story",
      content: "Welcome to SILK ROAD. We bring the rich flavors and warm hospitality of the ancient Silk Road to Cologne. Our kitchen celebrates the culinary traditions of Central Asia—from hand-pulled noodles to slow-cooked Plov. Here, dining is more than just food; it is a communal experience shared with friends and family in an atmosphere that feels like home."
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
      weekdays: "Monday – Friday",
      weekend: "Saturday – Sunday",
      note: "Hours may vary on holidays. Call to confirm."
    },
    location: {
      title: "Location",
      address: "Karl-Berbuer-Platz 7, 50678 Cologne",
      district: "Severinsviertel / Old Town South",
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
      title: "SILK ROAD — кухня Центральной Азии в Кёльне.",
      subtitle: "Аутентичные вкусы, теплое гостеприимство и культура чаепития в квартале Северин.",
      cta_reserve: "Забронировать стол",
      cta_menu: "Смотреть меню"
    },
    about: {
      title: "Наша история",
      content: "Добро пожаловать в SILK ROAD. Мы привезли в Кёльн богатые вкусы и теплое гостеприимство Шелкового пути. Наша кухня прославляет кулинарные традиции Центральной Азии — от тянутой лапши до томленого плова. Еда для нас — это не просто пища, а повод собраться с друзьями и семьей в атмосфере домашнего уюта."
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
      weekdays: "Понедельник – Пятница",
      weekend: "Суббота – Воскресенье",
      note: "В праздничные дни часы могут меняться. Позвоните для уточнения."
    },
    location: {
      title: "Как нас найти",
      address: "Karl-Berbuer-Platz 7, 50678 Кёльн",
      district: "Северинсфиртель",
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
  }
};
