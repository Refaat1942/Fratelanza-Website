export type TechCategory = {
  id: string
  name: { en: string; ar: string }
  icon: string
  color: 'brand' | 'mint' | 'gold'
  items: { en: string; ar: string }[]
}

export const technologyCategories: TechCategory[] = [
  {
    id: 'languages',
    name: { en: 'Languages & Runtimes', ar: 'اللغات وبيئات التشغيل' },
    icon: 'Code2',
    color: 'brand',
    items: [
      { en: 'TypeScript / JavaScript', ar: 'TypeScript / JavaScript' },
      { en: 'Python', ar: 'Python' },
      { en: 'C# / .NET', ar: 'C# / .NET' },
      { en: 'SQL', ar: 'SQL' },
      { en: 'HTML5 / CSS3', ar: 'HTML5 / CSS3' },
    ],
  },
  {
    id: 'frontend',
    name: { en: 'Frontend & Mobile', ar: 'الواجهات والجوال' },
    icon: 'Layout',
    color: 'mint',
    items: [
      { en: 'React & Vite', ar: 'React و Vite' },
      { en: 'Tailwind CSS', ar: 'Tailwind CSS' },
      { en: 'React Native', ar: 'React Native' },
      { en: 'Progressive Web Apps', ar: 'تطبيقات الويب التقدمية' },
      { en: 'Responsive UI/UX', ar: 'واجهات متجاوبة' },
    ],
  },
  {
    id: 'backend',
    name: { en: 'Backend & APIs', ar: 'الخلفية وواجهات API' },
    icon: 'Server',
    color: 'brand',
    items: [
      { en: 'Node.js / Express', ar: 'Node.js / Express' },
      { en: 'REST & GraphQL APIs', ar: 'REST و GraphQL' },
      { en: 'Microservices', ar: 'خدمات مصغرة' },
      { en: 'WebSockets & Real-time', ar: 'WebSockets والوقت الفعلي' },
      { en: 'Authentication & RBAC', ar: 'المصادقة والصلاحيات' },
    ],
  },
  {
    id: 'data',
    name: { en: 'Data & AI', ar: 'البيانات والذكاء الاصطناعي' },
    icon: 'Brain',
    color: 'gold',
    items: [
      { en: 'PostgreSQL / SQLite', ar: 'PostgreSQL / SQLite' },
      { en: 'Data Analytics & BI', ar: 'تحليلات البيانات' },
      { en: 'Machine Learning', ar: 'تعلم الآلة' },
      { en: 'LLM & AI Assistants', ar: 'نماذج LLM والمساعدين الذكيين' },
      { en: 'ETL & Reporting', ar: 'ETL والتقارير' },
    ],
  },
  {
    id: 'cloud',
    name: { en: 'Cloud & DevOps', ar: 'السحابة وDevOps' },
    icon: 'Cloud',
    color: 'mint',
    items: [
      { en: 'Docker & Containers', ar: 'Docker والحاويات' },
      { en: 'VPS & Linux Servers', ar: 'VPS وخوادم Linux' },
      { en: 'CI/CD Pipelines', ar: 'خطوط CI/CD' },
      { en: 'Nginx & Reverse Proxy', ar: 'Nginx والبروكسي' },
      { en: 'Backup & Monitoring', ar: 'النسخ الاحتياطي والمراقبة' },
    ],
  },
  {
    id: 'integrations',
    name: { en: 'Integrations', ar: 'التكاملات' },
    icon: 'Plug',
    color: 'gold',
    items: [
      { en: 'ETA E-Invoice (Egypt)', ar: 'فاتورة ETA الإلكترونية' },
      { en: 'WhatsApp Business API', ar: 'WhatsApp Business API' },
      { en: 'Payment Gateways', ar: 'بوابات الدفع' },
      { en: 'SMS & Email Services', ar: 'SMS والبريد' },
      { en: 'Third-party ERP/CRM', ar: 'ERP/CRM خارجية' },
    ],
  },
]
