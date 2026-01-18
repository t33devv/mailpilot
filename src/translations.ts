// Translation strings for MailPilot UI
export type UILanguage = 'en' | 'es' | 'fr' | 'de' | 'zh' | 'ja' | 'pt' | 'it' | 'ru' | 'ar' | 'hi';

export interface Translations {
  selectTone: string;
  tone: {
    formal: string;
    casual: string;
    professional: string;
    friendly: string;
  };
  translate: string;
  translateFrom: string;
  translateTo: string;
  autoDetect: string;
  rewriteButton: string;
  rewriting: string;
  cooldown: string;
  applyToEmail: string;
  typing: string;
  rewrittenEmail: string;
  subject: string;
  body: string;
  interfaceLanguage: string;
  darkMode: string;
  lightMode: string;
  errors: {
    noActiveTab: string;
    couldNotRetrieve: string;
    addSubject: string;
    emptyBody: string;
    tooShort: string;
    tooShortDetail: (count: number) => string;
  };
  warnings: {
    suspiciousPrefix: string;
    suspiciousSuffix: string;
  };
}

export const translations: Record<UILanguage, Translations> = {
  en: {
    selectTone: 'Select your tone',
    tone: {
      formal: 'Formal',
      casual: 'Casual',
      professional: 'Professional',
      friendly: 'Friendly',
    },
    translate: 'Translate',
    translateFrom: 'Translate from',
    translateTo: 'Translate to',
    autoDetect: 'Auto-detect',
    rewriteButton: 'Rewrite',
    rewriting: 'Rewriting...',
    cooldown: 'Cooldown...',
    applyToEmail: 'Apply to Email',
    typing: 'Typing...',
    rewrittenEmail: 'Rewritten Email',
    subject: 'Subject',
    body: 'Body',
    interfaceLanguage: 'Interface Language',
    darkMode: 'Dark Mode',
    lightMode: 'Light Mode',
    errors: {
      noActiveTab: 'No active Gmail tab found for this panel.',
      couldNotRetrieve: 'Could not retrieve email data',
      addSubject: 'Add a subject to your email before using MailPilot.',
      emptyBody: 'Your email body is empty. Write your email first, then click Rewrite.',
      tooShort: 'Email is too short. Please write at least 30 characters.',
      tooShortDetail: (count) => `Your email is currently too short. Please go back to your email and write at least 30 characters. You have ${count} characters right now.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ Warning: Your email ',
      suspiciousSuffix: '. The AI will still attempt to rewrite it as a professional email, but results may vary.',
    },
  },
  es: {
    selectTone: 'Selecciona tu tono',
    tone: {
      formal: 'Formal',
      casual: 'Casual',
      professional: 'Profesional',
      friendly: 'Amigable',
    },
    translate: 'Traducir',
    translateFrom: 'Traducir desde',
    translateTo: 'Traducir a',
    autoDetect: 'Detectar automáticamente',
    rewriteButton: 'Reescribir',
    rewriting: 'Reescribiendo...',
    cooldown: 'Esperando...',
    applyToEmail: 'Aplicar al correo',
    typing: 'Escribiendo...',
    rewrittenEmail: 'Correo reescrito',
    subject: 'Asunto',
    body: 'Cuerpo',
    interfaceLanguage: 'Idioma de interfaz',
    darkMode: 'Modo oscuro',
    lightMode: 'Modo claro',
    errors: {
      noActiveTab: 'No se encontró ninguna pestaña activa de Gmail para este panel.',
      couldNotRetrieve: 'No se pudieron recuperar los datos del correo',
      addSubject: 'Añade un asunto a tu correo antes de usar MailPilot.',
      emptyBody: 'El cuerpo de tu correo está vacío. Escribe tu correo primero, luego haz clic en Reescribir.',
      tooShort: 'El correo es demasiado corto. Por favor escribe al menos 30 caracteres.',
      tooShortDetail: (count) => `Tu correo es actualmente demasiado corto. Por favor vuelve a tu correo y escribe al menos 30 caracteres. Tienes ${count} caracteres ahora.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ Advertencia: Tu correo ',
      suspiciousSuffix: '. La IA intentará reescribirlo como un correo profesional, pero los resultados pueden variar.',
    },
  },
  fr: {
    selectTone: 'Sélectionnez votre ton',
    tone: {
      formal: 'Formel',
      casual: 'Décontracté',
      professional: 'Professionnel',
      friendly: 'Amical',
    },
    translate: 'Traduire',
    translateFrom: 'Traduire depuis',
    translateTo: 'Traduire vers',
    autoDetect: 'Détection automatique',
    rewriteButton: 'Réécrire',
    rewriting: 'Réécriture...',
    cooldown: 'Temps de repos...',
    applyToEmail: 'Appliquer à l\'email',
    typing: 'Saisie...',
    rewrittenEmail: 'Email réécrit',
    subject: 'Objet',
    body: 'Corps',
    interfaceLanguage: 'Langue de l\'interface',
    darkMode: 'Mode sombre',
    lightMode: 'Mode clair',
    errors: {
      noActiveTab: 'Aucun onglet Gmail actif trouvé pour ce panneau.',
      couldNotRetrieve: 'Impossible de récupérer les données de l\'email',
      addSubject: 'Ajoutez un objet à votre email avant d\'utiliser MailPilot.',
      emptyBody: 'Le corps de votre email est vide. Écrivez votre email d\'abord, puis cliquez sur Réécrire.',
      tooShort: 'L\'email est trop court. Veuillez écrire au moins 30 caractères.',
      tooShortDetail: (count) => `Votre email est actuellement trop court. Veuillez retourner à votre email et écrire au moins 30 caractères. Vous avez ${count} caractères maintenant.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ Avertissement: Votre email ',
      suspiciousSuffix: '. L\'IA tentera toujours de le réécrire comme un email professionnel, mais les résultats peuvent varier.',
    },
  },
  de: {
    selectTone: 'Wählen Sie Ihren Ton',
    tone: {
      formal: 'Förmlich',
      casual: 'Lässig',
      professional: 'Professionell',
      friendly: 'Freundlich',
    },
    translate: 'Übersetzen',
    translateFrom: 'Übersetzen von',
    translateTo: 'Übersetzen zu',
    autoDetect: 'Automatisch erkennen',
    rewriteButton: 'Umschreiben',
    rewriting: 'Umschreiben...',
    cooldown: 'Abkühlung...',
    applyToEmail: 'Auf E-Mail anwenden',
    typing: 'Tippen...',
    rewrittenEmail: 'Umgeschriebene E-Mail',
    subject: 'Betreff',
    body: 'Text',
    interfaceLanguage: 'Oberflächensprache',
    darkMode: 'Dunkelmodus',
    lightMode: 'Hellmodus',
    errors: {
      noActiveTab: 'Kein aktiver Gmail-Tab für dieses Panel gefunden.',
      couldNotRetrieve: 'E-Mail-Daten konnten nicht abgerufen werden',
      addSubject: 'Fügen Sie einen Betreff zu Ihrer E-Mail hinzu, bevor Sie MailPilot verwenden.',
      emptyBody: 'Ihr E-Mail-Text ist leer. Schreiben Sie zuerst Ihre E-Mail und klicken Sie dann auf Umschreiben.',
      tooShort: 'E-Mail ist zu kurz. Bitte schreiben Sie mindestens 30 Zeichen.',
      tooShortDetail: (count) => `Ihre E-Mail ist derzeit zu kurz. Bitte gehen Sie zurück zu Ihrer E-Mail und schreiben Sie mindestens 30 Zeichen. Sie haben jetzt ${count} Zeichen.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ Warnung: Ihre E-Mail ',
      suspiciousSuffix: '. Die KI wird immer noch versuchen, sie als professionelle E-Mail umzuschreiben, aber die Ergebnisse können variieren.',
    },
  },
  zh: {
    selectTone: '选择你的语气',
    tone: {
      formal: '正式',
      casual: '休闲',
      professional: '专业',
      friendly: '友好',
    },
    translate: '翻译',
    translateFrom: '从',
    translateTo: '翻译到',
    autoDetect: '自动检测',
    rewriteButton: '重写',
    rewriting: '重写中...',
    cooldown: '冷却中...',
    applyToEmail: '应用到邮件',
    typing: '输入中...',
    rewrittenEmail: '重写的邮件',
    subject: '主题',
    body: '正文',
    interfaceLanguage: '界面语言',
    darkMode: '暗色模式',
    lightMode: '亮色模式',
    errors: {
      noActiveTab: '未找到此面板的活动Gmail标签页。',
      couldNotRetrieve: '无法检索邮件数据',
      addSubject: '使用MailPilot之前，请为您的邮件添加主题。',
      emptyBody: '您的邮件正文为空。请先写邮件，然后点击重写。',
      tooShort: '邮件太短。请至少写30个字符。',
      tooShortDetail: (count) => `您的邮件当前太短。请返回您的邮件并至少写30个字符。您现在有${count}个字符。`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ 警告：您的邮件',
      suspiciousSuffix: '。AI仍会尝试将其重写为专业邮件，但结果可能有所不同。',
    },
  },
  ja: {
    selectTone: 'トーンを選択',
    tone: {
      formal: 'フォーマル',
      casual: 'カジュアル',
      professional: 'プロフェッショナル',
      friendly: 'フレンドリー',
    },
    translate: '翻訳',
    translateFrom: '翻訳元',
    translateTo: '翻訳先',
    autoDetect: '自動検出',
    rewriteButton: '書き換え',
    rewriting: '書き換え中...',
    cooldown: 'クールダウン中...',
    applyToEmail: 'メールに適用',
    typing: '入力中...',
    rewrittenEmail: '書き換えられたメール',
    subject: '件名',
    body: '本文',
    interfaceLanguage: 'インターフェース言語',
    darkMode: 'ダークモード',
    lightMode: 'ライトモード',
    errors: {
      noActiveTab: 'このパネルのアクティブなGmailタブが見つかりません。',
      couldNotRetrieve: 'メールデータを取得できませんでした',
      addSubject: 'MailPilotを使用する前に、メールに件名を追加してください。',
      emptyBody: 'メール本文が空です。最初にメールを書いてから、書き換えをクリックしてください。',
      tooShort: 'メールが短すぎます。少なくとも30文字を書いてください。',
      tooShortDetail: (count) => `メールは現在短すぎます。メールに戻って少なくとも30文字を書いてください。現在${count}文字です。`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ 警告：あなたのメールは',
      suspiciousSuffix: '。AIは引き続きプロフェッショナルなメールとして書き換えを試みますが、結果は異なる場合があります。',
    },
  },
  pt: {
    selectTone: 'Selecione seu tom',
    tone: {
      formal: 'Formal',
      casual: 'Casual',
      professional: 'Profissional',
      friendly: 'Amigável',
    },
    translate: 'Traduzir',
    translateFrom: 'Traduzir de',
    translateTo: 'Traduzir para',
    autoDetect: 'Detectar automaticamente',
    rewriteButton: 'Reescrever',
    rewriting: 'Reescrevendo...',
    cooldown: 'Resfriamento...',
    applyToEmail: 'Aplicar ao e-mail',
    typing: 'Digitando...',
    rewrittenEmail: 'E-mail reescrito',
    subject: 'Assunto',
    body: 'Corpo',
    interfaceLanguage: 'Idioma da interface',
    darkMode: 'Modo escuro',
    lightMode: 'Modo claro',
    errors: {
      noActiveTab: 'Nenhuma aba do Gmail ativa encontrada para este painel.',
      couldNotRetrieve: 'Não foi possível recuperar os dados do e-mail',
      addSubject: 'Adicione um assunto ao seu e-mail antes de usar o MailPilot.',
      emptyBody: 'O corpo do seu e-mail está vazio. Escreva seu e-mail primeiro e depois clique em Reescrever.',
      tooShort: 'E-mail muito curto. Por favor, escreva pelo menos 30 caracteres.',
      tooShortDetail: (count) => `Seu e-mail está muito curto no momento. Volte ao seu e-mail e escreva pelo menos 30 caracteres. Você tem ${count} caracteres agora.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ Aviso: Seu e-mail ',
      suspiciousSuffix: '. A IA ainda tentará reescrevê-lo como um e-mail profissional, mas os resultados podem variar.',
    },
  },
  it: {
    selectTone: 'Seleziona il tuo tono',
    tone: {
      formal: 'Formale',
      casual: 'Casual',
      professional: 'Professionale',
      friendly: 'Amichevole',
    },
    translate: 'Traduci',
    translateFrom: 'Traduci da',
    translateTo: 'Traduci a',
    autoDetect: 'Rilevamento automatico',
    rewriteButton: 'Riscrivi',
    rewriting: 'Riscrittura...',
    cooldown: 'Raffreddamento...',
    applyToEmail: 'Applica all\'email',
    typing: 'Digitazione...',
    rewrittenEmail: 'Email riscritta',
    subject: 'Oggetto',
    body: 'Corpo',
    interfaceLanguage: 'Lingua dell\'interfaccia',
    darkMode: 'Modalità scura',
    lightMode: 'Modalità chiara',
    errors: {
      noActiveTab: 'Nessuna scheda Gmail attiva trovata per questo pannello.',
      couldNotRetrieve: 'Impossibile recuperare i dati dell\'email',
      addSubject: 'Aggiungi un oggetto alla tua email prima di usare MailPilot.',
      emptyBody: 'Il corpo della tua email è vuoto. Scrivi prima la tua email, poi clicca su Riscrivi.',
      tooShort: 'Email troppo corta. Scrivi almeno 30 caratteri.',
      tooShortDetail: (count) => `La tua email è attualmente troppo corta. Torna alla tua email e scrivi almeno 30 caratteri. Hai ${count} caratteri ora.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ Avviso: La tua email ',
      suspiciousSuffix: '. L\'IA tenterà comunque di riscriverla come email professionale, ma i risultati potrebbero variare.',
    },
  },
  ru: {
    selectTone: 'Выберите свой тон',
    tone: {
      formal: 'Формальный',
      casual: 'Непринужденный',
      professional: 'Профессиональный',
      friendly: 'Дружелюбный',
    },
    translate: 'Перевести',
    translateFrom: 'Перевести с',
    translateTo: 'Перевести на',
    autoDetect: 'Автоопределение',
    rewriteButton: 'Переписать',
    rewriting: 'Переписывание...',
    cooldown: 'Ожидание...',
    applyToEmail: 'Применить к письму',
    typing: 'Набор текста...',
    rewrittenEmail: 'Переписанное письмо',
    subject: 'Тема',
    body: 'Текст',
    interfaceLanguage: 'Язык интерфейса',
    darkMode: 'Темный режим',
    lightMode: 'Светлый режим',
    errors: {
      noActiveTab: 'Не найдено активной вкладки Gmail для этой панели.',
      couldNotRetrieve: 'Не удалось получить данные письма',
      addSubject: 'Добавьте тему к вашему письму перед использованием MailPilot.',
      emptyBody: 'Текст вашего письма пуст. Сначала напишите письмо, затем нажмите Переписать.',
      tooShort: 'Письмо слишком короткое. Пожалуйста, напишите хотя бы 30 символов.',
      tooShortDetail: (count) => `Ваше письмо в настоящее время слишком короткое. Вернитесь к письму и напишите хотя бы 30 символов. У вас сейчас ${count} символов.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ Предупреждение: Ваше письмо ',
      suspiciousSuffix: '. ИИ все равно попытается переписать его как профессиональное письмо, но результаты могут отличаться.',
    },
  },
  ar: {
    selectTone: 'اختر النبرة',
    tone: {
      formal: 'رسمي',
      casual: 'غير رسمي',
      professional: 'احترافي',
      friendly: 'ودي',
    },
    translate: 'ترجم',
    translateFrom: 'ترجم من',
    translateTo: 'ترجم إلى',
    autoDetect: 'كشف تلقائي',
    rewriteButton: 'أعد الكتابة',
    rewriting: 'جاري إعادة الكتابة...',
    cooldown: 'فترة تهدئة...',
    applyToEmail: 'تطبيق على البريد',
    typing: 'جاري الكتابة...',
    rewrittenEmail: 'البريد المعاد كتابته',
    subject: 'الموضوع',
    body: 'النص',
    interfaceLanguage: 'لغة الواجهة',
    darkMode: 'الوضع الداكن',
    lightMode: 'الوضع الفاتح',
    errors: {
      noActiveTab: 'لم يتم العثور على علامة تبويب Gmail نشطة لهذه اللوحة.',
      couldNotRetrieve: 'تعذر استرداد بيانات البريد الإلكتروني',
      addSubject: 'أضف موضوعًا إلى بريدك الإلكتروني قبل استخدام MailPilot.',
      emptyBody: 'نص بريدك الإلكتروني فارغ. اكتب بريدك الإلكتروني أولاً ، ثم انقر فوق إعادة الكتابة.',
      tooShort: 'البريد الإلكتروني قصير جدًا. يرجى كتابة 30 حرفًا على الأقل.',
      tooShortDetail: (count) => `بريدك الإلكتروني قصير جدًا حاليًا. يرجى العودة إلى بريدك الإلكتروني وكتابة 30 حرفًا على الأقل. لديك ${count} حرفًا الآن.`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ تحذير: بريدك الإلكتروني ',
      suspiciousSuffix: '. سيحاول الذكاء الاصطناعي إعادة كتابته كبريد إلكتروني احترافي ، ولكن قد تختلف النتائج.',
    },
  },
  hi: {
    selectTone: 'अपना स्वर चुनें',
    tone: {
      formal: 'औपचारिक',
      casual: 'अनौपचारिक',
      professional: 'पेशेवर',
      friendly: 'मित्रवत',
    },
    translate: 'अनुवाद करें',
    translateFrom: 'से अनुवाद करें',
    translateTo: 'में अनुवाद करें',
    autoDetect: 'स्वतः पता लगाएं',
    rewriteButton: 'फिर से लिखें',
    rewriting: 'फिर से लिख रहे हैं...',
    cooldown: 'कूलडाउन...',
    applyToEmail: 'ईमेल पर लागू करें',
    typing: 'टाइप कर रहे हैं...',
    rewrittenEmail: 'फिर से लिखा गया ईमेल',
    subject: 'विषय',
    body: 'मुख्य भाग',
    interfaceLanguage: 'इंटरफ़ेस भाषा',
    darkMode: 'डार्क मोड',
    lightMode: 'लाइट मोड',
    errors: {
      noActiveTab: 'इस पैनल के लिए कोई सक्रिय Gmail टैब नहीं मिला।',
      couldNotRetrieve: 'ईमेल डेटा पुनर्प्राप्त नहीं किया जा सका',
      addSubject: 'MailPilot का उपयोग करने से पहले अपने ईमेल में एक विषय जोड़ें।',
      emptyBody: 'आपके ईमेल का मुख्य भाग खाली है। पहले अपना ईमेल लिखें, फिर फिर से लिखें पर क्लिक करें।',
      tooShort: 'ईमेल बहुत छोटा है। कृपया कम से कम 30 वर्ण लिखें।',
      tooShortDetail: (count) => `आपका ईमेल वर्तमान में बहुत छोटा है। कृपया अपने ईमेल पर वापस जाएं और कम से कम 30 वर्ण लिखें। आपके पास अभी ${count} वर्ण हैं।`,
    },
    warnings: {
      suspiciousPrefix: '⚠️ चेतावनी: आपका ईमेल ',
      suspiciousSuffix: '। AI अभी भी इसे एक पेशेवर ईमेल के रूप में फिर से लिखने का प्रयास करेगा, लेकिन परिणाम भिन्न हो सकते हैं।',
    },
  },
};

export function getTranslations(lang: UILanguage): Translations {
  return translations[lang] || translations.en;
}
