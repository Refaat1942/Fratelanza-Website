type Bilingual = { en: string; ar: string }

export const projectTypes: { value: string; label: Bilingual }[] = [
  { value: 'ai', label: { en: 'AI Solution', ar: 'حل ذكاء اصطناعي' } },
  { value: 'business_system', label: { en: 'Business System / ERP', ar: 'نظام أعمال / ERP' } },
  { value: 'crm', label: { en: 'CRM', ar: 'CRM' } },
  { value: 'mobile', label: { en: 'Mobile App', ar: 'تطبيق موبايل' } },
  { value: 'web', label: { en: 'Web Platform', ar: 'منصة ويب' } },
  { value: 'automation', label: { en: 'Automation', ar: 'أتمتة' } },
  { value: 'integration', label: { en: 'Integration', ar: 'تكامل' } },
  { value: 'ecommerce', label: { en: 'E-commerce', ar: 'تجارة إلكترونية' } },
  { value: 'improvement', label: { en: 'Existing System Improvement', ar: 'تحسين نظام موجود' } },
  { value: 'other', label: { en: 'Other', ar: 'أخرى' } },
]

export const projectStages: { value: string; label: Bilingual }[] = [
  { value: 'idea', label: { en: 'Just an idea', ar: 'فكرة فقط' } },
  { value: 'requirements', label: { en: 'Requirements ready', ar: 'المتطلبات جاهزة' } },
  { value: 'design', label: { en: 'Design ready', ar: 'التصميم جاهز' } },
  { value: 'developing', label: { en: 'Already developing', ar: 'قيد التطوير' } },
  { value: 'existing', label: { en: 'Existing system', ar: 'نظام موجود' } },
  { value: 'scaling', label: { en: 'Need improvement / scaling', ar: 'تحسين / توسع' } },
]

export const budgetRanges: { value: string; label: Bilingual }[] = [
  { value: 'under_5k', label: { en: 'Under $5,000', ar: 'أقل من ٥,٠٠٠$' } },
  { value: '5k_10k', label: { en: '$5,000 – $10,000', ar: '٥,٠٠٠$ – ١٠,٠٠٠$' } },
  { value: '10k_25k', label: { en: '$10,000 – $25,000', ar: '١٠,٠٠٠$ – ٢٥,٠٠٠$' } },
  { value: '25k_50k', label: { en: '$25,000 – $50,000', ar: '٢٥,٠٠٠$ – ٥٠,٠٠٠$' } },
  { value: '50k_plus', label: { en: '$50,000+', ar: '٥٠,٠٠٠$+' } },
  { value: 'not_sure', label: { en: 'Not sure yet', ar: 'غير متأكد بعد' } },
]

export const timelineRanges: { value: string; label: Bilingual }[] = [
  { value: 'asap', label: { en: 'As soon as possible', ar: 'في أقرب وقت' } },
  { value: '1_3_months', label: { en: '1 – 3 months', ar: '١ – ٣ أشهر' } },
  { value: '3_6_months', label: { en: '3 – 6 months', ar: '٣ – ٦ أشهر' } },
  { value: '6_plus', label: { en: '6+ months', ar: '٦+ أشهر' } },
  { value: 'flexible', label: { en: 'Flexible', ar: 'مرن' } },
]
