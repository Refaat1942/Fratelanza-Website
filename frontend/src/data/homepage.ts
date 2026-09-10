import type { Locale } from './content'

type Bilingual = { en: string; ar: string }

export const heroPipelineSteps: { label: Bilingual; icon: string }[] = [
  { label: { en: 'Idea', ar: 'فكرة' }, icon: 'Lightbulb' },
  { label: { en: 'Discovery', ar: 'اكتشاف' }, icon: 'Search' },
  { label: { en: 'Design', ar: 'تصميم' }, icon: 'PenTool' },
  { label: { en: 'Engineering', ar: 'هندسة' }, icon: 'Code2' },
  { label: { en: 'AI & Automation', ar: 'ذكاء وأتمتة' }, icon: 'Bot' },
  { label: { en: 'Deployment', ar: 'إطلاق' }, icon: 'Rocket' },
  { label: { en: 'Business Result', ar: 'نتيجة عمل' }, icon: 'TrendingUp' },
]

export const deliveryFlowSteps: {
  id: string
  label: Bilingual
  sublabel?: Bilingual
  icon: string
  highlight?: boolean
}[] = [
  {
    id: 'client',
    label: { en: 'You', ar: 'أنت' },
    sublabel: { en: 'Business problem or idea', ar: 'مشكلة أو فكرة عمل' },
    icon: 'Building2',
  },
  {
    id: 'fratelanza',
    label: { en: 'Fratelanza', ar: 'فراتيلانزا' },
    sublabel: { en: 'Your technology delivery partner', ar: 'شريكك التقني للتسليم' },
    icon: 'Shield',
    highlight: true,
  },
  {
    id: 'team',
    label: { en: 'Specialist Network', ar: 'شبكة المتخصصين' },
    sublabel: { en: 'Design · Dev · AI · QA · DevOps', ar: 'تصميم · تطوير · ذكاء · جودة · بنية' },
    icon: 'Users',
  },
  {
    id: 'product',
    label: { en: 'Your Solution', ar: 'حلّك' },
    sublabel: { en: 'Deployed & managed delivery', ar: 'تسليم مُدار وجاهز' },
    icon: 'Package',
  },
]

export const heroProofPoints: { text: Bilingual; icon: string }[] = [
  { text: { en: 'AI · Systems · Automation', ar: 'ذكاء · أنظمة · أتمتة' }, icon: 'Sparkles' },
  { text: { en: 'One accountable partner', ar: 'شريك واحد مسؤول' }, icon: 'Handshake' },
  { text: { en: 'Real product engineering', ar: 'هندسة منتجات حقيقية' }, icon: 'Monitor' },
]

export const HERO_SCREENSHOT = '/products/pharmacy/inventory.png'

export const verifiedStats = [
  { value: '400+', label: { en: 'Specialists in Network', ar: 'متخصصين في الشبكة' } },
  { value: '2026', label: { en: 'Founded', ar: 'تأسست' } },
]

export const solutionCards = [
  { icon: 'LayoutDashboard', title: { en: 'Business Systems', ar: 'أنظمة الأعمال' }, desc: { en: 'ERP, inventory, finance, and operations platforms that run your business.', ar: 'ERP ومخزون ومالية وعمليات لتشغيل أعمالك.' } },
  { icon: 'Bot', title: { en: 'AI Solutions', ar: 'حلول الذكاء الاصطناعي' }, desc: { en: 'Agents, assistants, OCR, and intelligent automation inside your workflows.', ar: 'وكلاء ومساعدين وOCR وأتمتة ذكية داخل عملياتك.' } },
  { icon: 'Globe', title: { en: 'Web Platforms', ar: 'منصات ويب' }, desc: { en: 'SaaS, portals, marketplaces, and business web applications.', ar: 'SaaS وبوابات وأسواق وتطبيقات ويب للأعمال.' } },
  { icon: 'Smartphone', title: { en: 'Mobile Apps', ar: 'تطبيقات موبايل' }, desc: { en: 'Android, iOS, and cross-platform apps built for real users.', ar: 'تطبيقات Android وiOS ومتعددة المنصات لمستخدمين حقيقيين.' } },
  { icon: 'Zap', title: { en: 'Automation', ar: 'أتمتة' }, desc: { en: 'Workflow, WhatsApp, CRM, and operational automation.', ar: 'أتمتة سير العمل وواتساب وCRM والعمليات.' } },
  { icon: 'Plug', title: { en: 'Integrations', ar: 'تكاملات' }, desc: { en: 'APIs, payments, Meta, WhatsApp, and third-party services.', ar: 'APIs ومدفوعات وMeta وواتساب وخدمات خارجية.' } },
  { icon: 'Wrench', title: { en: 'Custom Solutions', ar: 'حلول مخصصة' }, desc: { en: 'If your problem does not fit a category — we design around it.', ar: 'إذا لم تناسب مشكلتك فئة — نصمم الحل حولها.' } },
]

export const beforeItems = [
  { en: 'Manual processes', ar: 'عمليات يدوية' },
  { en: 'Excel everywhere', ar: 'Excel في كل مكان' },
  { en: 'Scattered data', ar: 'بيانات متفرقة' },
  { en: 'Repetitive tasks', ar: 'مهام متكررة' },
  { en: 'Disconnected systems', ar: 'أنظمة منفصلة' },
  { en: 'Poor visibility', ar: 'رؤية ضعيفة' },
]

export const afterItems = [
  { en: 'Centralized systems', ar: 'أنظمة مركزية' },
  { en: 'Automated workflows', ar: 'تدفقات مؤتمتة' },
  { en: 'Connected data', ar: 'بيانات متصلة' },
  { en: 'AI-assisted operations', ar: 'عمليات بمساعدة الذكاء' },
  { en: 'Real-time dashboards', ar: 'لوحات فورية' },
  { en: 'Better decisions', ar: 'قرارات أفضل' },
]

export const processSteps = [
  { step: '01', title: { en: 'Discover', ar: 'اكتشاف' }, desc: { en: 'Understand the business, problem, and goals.', ar: 'فهم العمل والمشكلة والأهداف.' } },
  { step: '02', title: { en: 'Design', ar: 'تصميم' }, desc: { en: 'Define product, UX, and technical architecture.', ar: 'تحديد المنتج وتجربة المستخدم والبنية.' } },
  { step: '03', title: { en: 'Build the Right Team', ar: 'بناء الفريق المناسب' }, desc: { en: 'Select specialists based on actual project requirements.', ar: 'اختيار المتخصصين حسب متطلبات المشروع.' } },
  { step: '04', title: { en: 'Develop', ar: 'تطوير' }, desc: { en: 'Build with modern engineering practices.', ar: 'البناء بممارسات هندسية حديثة.' } },
  { step: '05', title: { en: 'Test & Launch', ar: 'اختبار وإطلاق' }, desc: { en: 'QA, deployment, and production launch.', ar: 'جودة ونشر وإطلاق إنتاج.' } },
  { step: '06', title: { en: 'Improve', ar: 'تحسين' }, desc: { en: 'Continuous improvements per agreed scope.', ar: 'تحسينات مستمرة حسب النطاق المتفق.' } },
]

export const fratelanzaProducts = [
  { id: 'pharmacy', name: { en: 'PharmaPOS', ar: 'PharmaPOS' }, desc: { en: 'Pharmacy management — inventory, multi-branch, FEFO, reporting, tax integration.', ar: 'إدارة صيدليات — مخزون وفروع وFEFO وتقارير وضرائب.' }, image: '/products/pharmacy/inventory.png' },
  { id: 'realestate', name: { en: 'Fratelanza Real Estate', ar: 'فراتيلانزا للعقارات' }, desc: { en: 'Real estate management — projects, units, contracts, finance.', ar: 'إدارة عقارات — مشاريع ووحدات وعقود ومالية.' }, image: '/products/realestate/projects.png' },
  { id: 'laboratory', name: { en: 'LabMaster', ar: 'LabMaster' }, desc: { en: 'Laboratory ERP — tests, results, billing, accounting, CRM.', ar: 'ERP مختبرات — فحوصات ونتائج وفوترة ومحاسبة وCRM.' }, image: '/products/laboratory/dashboard.png' },
]

export const networkIndustries = [
  'Healthcare', 'Pharmacy', 'Real Estate', 'E-commerce', 'SaaS', 'Finance',
  'Education', 'Logistics', 'AI', 'CRM', 'Automation',
].map((en) => ({
  en,
  ar: en, // industry names often stay EN; can refine later
}))

export const aiCapabilities = [
  { icon: 'Bot', title: { en: 'AI Agents', ar: 'وكلاء ذكاء' } },
  { icon: 'MessageCircle', title: { en: 'AI Assistants', ar: 'مساعدين ذكيين' } },
  { icon: 'FileText', title: { en: 'Document / OCR', ar: 'مستندات / OCR' } },
  { icon: 'Zap', title: { en: 'Workflow Automation', ar: 'أتمتة سير العمل' } },
  { icon: 'MessageCircle', title: { en: 'WhatsApp AI', ar: 'واتساب ذكي' } },
  { icon: 'Headphones', title: { en: 'Customer Service AI', ar: 'خدمة عملاء ذكية' } },
  { icon: 'TrendingUp', title: { en: 'Data Analysis', ar: 'تحليل بيانات' } },
  { icon: 'Plug', title: { en: 'AI Integrations', ar: 'تكاملات ذكاء' } },
]

export const whyPillars = [
  { icon: 'Target', title: { en: 'Business First', ar: 'الأعمال أولاً' }, desc: { en: 'We understand the business before choosing technology.', ar: 'نفهم العمل قبل اختيار التقنية.' } },
  { icon: 'Users', title: { en: 'Right Specialists', ar: 'المتخصصون المناسبون' }, desc: { en: 'We assemble the right specialists around each project.', ar: 'نجمع المتخصصين المناسبين لكل مشروع.' } },
  { icon: 'Handshake', title: { en: 'One Responsible Partner', ar: 'شريك واحد مسؤول' }, desc: { en: 'You work with Fratelanza — not disconnected vendors.', ar: 'تتعامل مع فراتيلانزا — وليس موردين منفصلين.' } },
  { icon: 'Server', title: { en: 'Modern Engineering', ar: 'هندسة حديثة' }, desc: { en: 'Scalable architecture and production-ready development.', ar: 'بنية قابلة للتوسع وتطوير جاهز للإنتاج.' } },
  { icon: 'Sparkles', title: { en: 'AI + Software + Automation', ar: 'ذكاء + برمجيات + أتمتة' }, desc: { en: 'Connected systems that automate operations.', ar: 'أنظمة متصلة تؤتمت العمليات.' } },
  { icon: 'Layers', title: { en: 'Flexible Delivery', ar: 'تسليم مرن' }, desc: { en: 'Team structure adapts to project requirements.', ar: 'هيكل الفريق يتكيف مع متطلبات المشروع.' } },
]

export const audienceCards = [
  { icon: 'Building2', title: { en: 'For Businesses', ar: 'للشركات' }, desc: { en: 'Need a system to run your business better?', ar: 'تحتاج نظاماً لتشغيل أعمالك بشكل أفضل؟' }, cta: { en: 'Build My Business System', ar: 'ابنِ نظام أعمالي' }, href: '/start-project?type=business_system' },
  { icon: 'Lightbulb', title: { en: 'For Entrepreneurs', ar: 'لرواد الأعمال' }, desc: { en: 'Have an idea but do not know how to build it?', ar: 'لديك فكرة ولا تعرف كيف تبنيها؟' }, cta: { en: 'Build My Product', ar: 'ابنِ منتجي' }, href: '/start-project?type=web' },
  { icon: 'Cog', title: { en: 'For Existing Companies', ar: 'للشركات القائمة' }, desc: { en: 'Need AI, integration, automation, or extra development capacity?', ar: 'تحتاج ذكاءاً أو تكامل أو أتمتة أو قدرة تطوير إضافية؟' }, cta: { en: 'Improve My System', ar: 'حسّن نظامي' }, href: '/start-project?type=improvement' },
]

export const homeFaq = [
  { q: { en: 'Do you only build websites?', ar: 'هل تبنون مواقع فقط؟' }, a: { en: 'No. Fratelanza works on business systems, AI, automation, mobile apps, web platforms, integrations, and custom software.', ar: 'لا. فراتيلانزا تعمل على أنظمة الأعمال والذكاء والأتمتة وتطبيقات الموبايل ومنصات الويب والتكاملات والبرمجيات المخصصة.' } },
  { q: { en: 'Do I have to manage developers myself?', ar: 'هل يجب أن أدير المطورين بنفسي؟' }, a: { en: 'No. Fratelanza manages the project and coordinates the required specialists.', ar: 'لا. فراتيلانزا تدير المشروع وتنسّق المتخصصين المطلوبين.' } },
  { q: { en: 'How does pricing work?', ar: 'كيف يعمل التسعير؟' }, a: { en: 'Projects are evaluated based on scope, complexity, technology, and delivery requirements.', ar: 'تُقيَّم المشاريع حسب النطاق والتعقيد والتقنية ومتطلبات التسليم.' } },
  { q: { en: 'Can you work with an existing system?', ar: 'هل يمكن العمل مع نظام موجود؟' }, a: { en: 'Yes. We can improve, integrate, modernize, or extend existing systems.', ar: 'نعم. يمكننا التحسين والتكامل والتحديث أو التوسع للأنظمة الموجودة.' } },
]

export function homeT<T extends Bilingual>(obj: T, locale: Locale): string {
  return obj[locale]
}

export function homeList<T extends Bilingual>(obj: T, locale: Locale): string {
  return obj[locale]
}
