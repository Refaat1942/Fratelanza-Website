export type Locale = 'en' | 'ar'

export const company = {
  name: 'Fratelanza',
  tagline: {
    en: 'Technology partner • Custom systems • Source code',
    ar: 'شريك تقني • أنظمة مخصصة • الكود المصدري',
  },
  slogan: {
    en: 'Building Tomorrow Together',
    ar: 'نبني الغد معاً',
  },
  email: 'info@fratelanza.com',
  whatsapp: '201097138338',
  whatsappDisplay: '01097138338',
  address: {
    en: '6th of October, 4th District, Building 261, Flat 8, Egypt',
    ar: '٦ أكتوبر، الحي الرابع، عمارة ٢٦١، شقة ٨، مصر',
  },
  workingHours: {
    en: 'Sunday – Thursday: 9:00 AM – 6:00 PM',
    ar: 'الأحد – الخميس: ٩:٠٠ ص – ٦:٠٠ م',
  },
  social: {
    linkedin: 'https://www.linkedin.com/company/fratelanza/',
    facebook: 'https://www.facebook.com/share/1B2rJoh9uH/',
    instagram: 'https://www.instagram.com/fratelanza2?igsh=ZDZ6NWtyMDYzdGU4',
    tiktok: 'https://www.tiktok.com/@fratelanza1?_r=1&_t=ZS-97yDkqPQtzb',
  },
  founded: 2026,
}

export const leadership = [
  {
    name: 'Dr. Ahmed Refaat',
    role: { en: 'Founder & Chief Executive Officer (CEO)', ar: 'المؤسس والرئيس التنفيذي (CEO)' },
    isFounder: true,
    bio: {
      en: 'Founder of Fratelanza with 17 years of experience in business development and more than 5 years leading digital transformation and end-to-end business solutions — from business analysis and system implementation to managed project delivery. Dr. Refaat set the company\'s vision: one accountable technology partner for every client.',
      ar: 'مؤسس فراتيلانزا بخبرة ١٧ عاماً في تطوير الأعمال، وأكثر من ٥ سنوات في قيادة التحول الرقمي والحلول المتكاملة للأعمال — من تحليل الأعمال وتنفيذ الأنظمة إلى إدارة المشاريع. وضع د. رفعت رؤية الشركة: شريك تقني واحد مسؤول أمام كل عميل.',
    },
  },
  {
    name: 'Eng. Afnan Fathy',
    role: { en: 'Chief Operating Officer (COO)', ar: 'مدير العمليات (COO)' },
    bio: {
      en: 'AI Ambassador at the National Telecommunication Institute (NTI), affiliated with Egypt\'s Ministry of Communications and Information Technology. Extensive experience in data science, AI training, and operational excellence. Eng. Fathy leads day-to-day operations, technical delivery, and the Fratelanza talent network.',
      ar: 'سفيرة الذكاء الاصطناعي بالمعهد القومي للاتصالات (NTI) التابع لوزارة الاتصالات وتكنولوجيا المعلومات المصرية. خبرة واسعة في علوم البيانات وتدريب الذكاء الاصطناعي والتميز التشغيلي. تقود م. أفنان فتحي العمليات اليومية والتسليم التقني وشبكة مواهب فراتيلانزا.',
    },
  },
]

export const freelancerModel = {
  title: { en: 'We Are Not a Freelancer Broker', ar: 'لسنا وسيط فريلانس' },
  subtitle: {
    en: 'Fratelanza relieves you from everything when working with freelancers — selection, management, quality control, contracts, payments, and delivery.',
    ar: 'فراتيلانزا تريحك من كل شيء في التعامل مع الفريلانس — الاختيار والإدارة ومراقبة الجودة والعقود والمدفوعات والتسليم.',
  },
  points: [
    {
      icon: 'UserCheck',
      title: { en: 'We Handle Selection', ar: 'نختار لك الأنسب' },
      description: { en: 'We source, vet, and assign the right talent — you never deal with freelancer hunting.', ar: 'نبحث ونقيّم ونعيّن المواهب المناسبة — دون عناء البحث عن فريلانس.' },
    },
    {
      icon: 'Shield',
      title: { en: 'We Manage Everything', ar: 'ندير كل شيء' },
      description: { en: 'Contracts, timelines, quality reviews, and deliverables — all managed by Fratelanza on your behalf.', ar: 'العقود والجداول ومراجعة الجودة والمخرجات — كلها تُدار بواسطة فراتيلانزا نيابة عنك.' },
    },
    {
      icon: 'Handshake',
      title: { en: 'One Point of Contact', ar: 'جهة اتصال واحدة' },
      description: { en: 'You work only with Fratelanza. We handle the freelancers behind the scenes so you focus on your business.', ar: 'تتعامل فقط مع فراتيلانزا. نحن ندير الفريلانس في الخلفية لتركز على أعمالك.' },
    },
    {
      icon: 'Gem',
      title: { en: 'Guaranteed Delivery', ar: 'تسليم مضمون' },
      description: { en: 'We take full responsibility for project outcomes — not just connecting you to a freelancer.', ar: 'نتحمل المسؤولية الكاملة عن نتائج المشروع — وليس مجرد ربطك بفريلانس.' },
    },
  ],
}

export const navLinks = [
  { path: '/', label: { en: 'Home', ar: 'الرئيسية' } },
  { path: '/services', label: { en: 'Services', ar: 'خدماتنا' } },
  { path: '/how-we-work', label: { en: 'How we work', ar: 'منهجية العمل' } },
  { path: '/pricing', label: { en: 'Packages', ar: 'الباقات' } },
  { path: '/#clients', label: { en: 'Clients', ar: 'عملاؤنا' } },
  { path: '/about', label: { en: 'About', ar: 'من نحن' } },
  { path: '/contact', label: { en: 'Contact', ar: 'تواصل معنا' } },
]

export function t<T extends { en: string; ar: string }>(obj: T, locale: Locale): string {
  return obj[locale]
}

export function tList<T extends { en: string[]; ar: string[] }>(obj: T, locale: Locale): string[] {
  return obj[locale]
}
