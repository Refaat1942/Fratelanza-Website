// Site copy. Positioning: Fratelanza is the technology partner that builds customizable systems
// for corporates and SMEs — business analysis, system architecture, custom development, source code.
type B = { en: string; ar: string }
type BL = { en: string[]; ar: string[] }

export const hero = {
  eyebrow: { en: 'Your technology partner', ar: 'شريكك التقني' },
  title1: { en: 'Customizable systems for your company', ar: 'أنظمة مخصصة لشركتك' },
  title2: { en: 'from business analysis to source code.', ar: 'من تحليل الأعمال حتى الكود المصدري.' },
  sub: {
    en: 'Fratelanza is the technology partner for corporates and SMEs. We analyze your business, design the system architecture, build a system tailored to how you work, and hand over the full source code — then we stay with you.',
    ar: 'فراتيلانزا الشريك التقني للشركات الكبرى والصغيرة والمتوسطة. بنحلل شغلك، ونصمم معمارية النظام، ونبني سيستم مخصوص على طريقة شغلك، ونسلّمك الكود المصدري كامل — وبنفضل معاك.',
  },
  ctaPrimary: { en: 'Register your project', ar: 'سجّل مشروعك' },
  ctaSecondary: { en: 'How we work', ar: 'منهجية عملنا' },
  bullets: [
    { en: 'Business analysis', ar: 'تحليل أعمال متخصص' },
    { en: 'System architecture', ar: 'تصميم معمارية النظام' },
    { en: 'You own the source code', ar: 'الكود المصدري ملكك' },
    { en: 'Ongoing technology partnership', ar: 'شراكة تقنية مستمرة' },
  ] as B[],
  chips: {
    code: { en: 'Source code delivered', ar: 'الكود المصدري ليك' },
    fees: { en: 'No monthly fees', ar: 'بدون رسوم شهرية' },
    support: { en: '3 months free support', ar: '٣ شهور دعم مجاني' },
  },
}

export const proofStats: { value: string; label: B }[] = [
  { value: '100%', label: { en: 'Source-code ownership', ar: 'ملكية الكود المصدري' } },
  { value: '400+', label: { en: 'Specialists in our network', ar: 'متخصص في شبكتنا' } },
  { value: '3', label: { en: 'Months of free support', ar: 'شهور دعم فني مجاني' } },
  { value: '99.9%', label: { en: 'Uptime on our cloud', ar: 'ضمان تشغيل على سحابتنا' } },
]

export const capabilities: B[] = [
  { en: 'Business analysis', ar: 'تحليل الأعمال' },
  { en: 'System architecture', ar: 'معمارية النظم' },
  { en: 'Custom system development', ar: 'تطوير أنظمة مخصصة' },
  { en: 'Web & mobile apps', ar: 'تطبيقات ويب وموبايل' },
  { en: 'Integrations', ar: 'الربط والتكامل' },
  { en: 'AI & automation', ar: 'ذكاء اصطناعي وأتمتة' },
  { en: 'Source-code handover', ar: 'تسليم الكود المصدري' },
  { en: 'Support & evolution', ar: 'دعم وتطوير مستمر' },
]

/** The four things that define Fratelanza as a technology partner. */
export const pillars: { icon: string; title: B; text: B; points: BL }[] = [
  {
    icon: 'Search',
    title: { en: 'Business analysis', ar: 'تحليل الأعمال' },
    text: {
      en: 'We sit with your teams, map how work really flows, and turn it into clear, approved requirements — before a single line of code.',
      ar: 'بنقعد مع فرق شغلك، ونفهم دورة العمل الحقيقية، ونحوّلها لمتطلبات واضحة ومعتمدة — قبل ما نكتب سطر كود.',
    },
    points: {
      en: ['Workshops with each department', 'Current vs. target workflow', 'Signed-off requirements document'],
      ar: ['ورش عمل مع كل إدارة', 'دورة العمل الحالية والمطلوبة', 'وثيقة متطلبات معتمدة'],
    },
  },
  {
    icon: 'Network',
    title: { en: 'System architecture', ar: 'معمارية النظام' },
    text: {
      en: 'We design the structure of your system — modules, database, permissions, integrations and hosting — so it scales without breaking.',
      ar: 'بنصمم هيكل النظام — الموديولات وقاعدة البيانات والصلاحيات والتكاملات والاستضافة — عشان يكبر معاك من غير ما يتكسر.',
    },
    points: {
      en: ['Database & module design', 'Security & role permissions', 'Built to scale and integrate'],
      ar: ['تصميم قاعدة البيانات والموديولات', 'أمان وصلاحيات لكل دور', 'قابل للتوسع والربط'],
    },
  },
  {
    icon: 'CodeXml',
    title: { en: 'Custom development', ar: 'تطوير مخصص' },
    text: {
      en: 'We build the system around your workflow, in stages, and you review real screens as we go — web, mobile, Arabic and English.',
      ar: 'بنبني السيستم على طريقة شغلك على مراحل، وبتراجع شاشات حقيقية أول بأول — ويب وموبايل، عربي وإنجليزي.',
    },
    points: {
      en: ['Screens & reports made for you', 'Web and mobile', 'Staged delivery with reviews'],
      ar: ['شاشات وتقارير على مقاسك', 'ويب وموبايل', 'تسليم على مراحل مع مراجعة'],
    },
  },
  {
    icon: 'KeyRound',
    title: { en: 'Source code & partnership', ar: 'الكود المصدري والشراكة' },
    text: {
      en: 'You receive the full source code and documentation. The system is yours — and we remain your technology partner for support and evolution.',
      ar: 'بتستلم الكود المصدري والتوثيق كامل. السيستم ملكك — وبنفضل شريكك التقني في الدعم والتطوير.',
    },
    points: {
      en: ['Full source code handed over', 'Technical documentation', '3 months free support, then evolution'],
      ar: ['تسليم الكود المصدري كامل', 'توثيق فني ودليل تشغيل', '٣ شهور دعم مجاني ثم تطوير مستمر'],
    },
  },
]

export const audiences: { icon: string; title: B; text: B; points: BL; cta: B }[] = [
  {
    icon: 'Building2',
    title: { en: 'Corporates', ar: 'الشركات الكبرى' },
    text: { en: 'Systems for complex operations across departments and branches, connected to what you already run.', ar: 'أنظمة لعمليات معقدة بين إدارات وفروع متعددة، ومربوطة بالأنظمة اللي عندك.' },
    points: {
      en: ['Advanced approvals & permissions', 'Integration with existing systems', 'Your servers (on-premise) or cloud', 'Dedicated project manager'],
      ar: ['دورات اعتماد وصلاحيات متقدمة', 'ربط مع الأنظمة القائمة', 'على سيرفراتك أو سحابي', 'مدير مشروع مخصص'],
    },
    cta: { en: 'Talk to us about your company', ar: 'كلّمنا عن شركتك' },
  },
  {
    icon: 'Store',
    title: { en: 'Small & medium businesses', ar: 'الشركات الصغيرة والمتوسطة' },
    text: { en: 'Start with the modules you need at the right cost, and grow the system as your business grows.', ar: 'ابدأ بالموديولات اللي محتاجها بتكلفة مناسبة، وطوّر السيستم مع نمو شغلك.' },
    points: {
      en: ['Flexible packages', 'Fast start, clear quote', 'Team training included', 'A system that grows with you'],
      ar: ['باقات مرنة', 'بداية سريعة وعرض سعر واضح', 'تدريب فريقك', 'سيستم بيكبر معاك'],
    },
    cta: { en: 'Start with what you need', ar: 'ابدأ باللي تحتاجه' },
  },
]

/** Types of systems we customize (no ready-made products). */
export const solutions: { icon: string; type: string; title: B; text: B }[] = [
  { icon: 'LayoutDashboard', type: 'business_system', title: { en: 'ERP & operations', ar: 'ERP وإدارة العمليات' }, text: { en: 'Accounting, inventory, purchasing and branches in one system.', ar: 'حسابات ومخازن ومشتريات وفروع في نظام واحد.' } },
  { icon: 'Receipt', type: 'business_system', title: { en: 'Sales & invoicing', ar: 'المبيعات والفواتير' }, text: { en: 'Quotes, orders, invoices, collections and e-invoice.', ar: 'عروض أسعار وطلبات وفواتير وتحصيل وفاتورة إلكترونية.' } },
  { icon: 'UserCheck', type: 'business_system', title: { en: 'HR & payroll', ar: 'الموارد البشرية والمرتبات' }, text: { en: 'Attendance, lateness, penalties, bonuses and pay slips.', ar: 'حضور وانصراف وتأخيرات وجزاءات ومكافآت ومفردات مرتب.' } },
  { icon: 'Users', type: 'crm', title: { en: 'CRM & customer service', ar: 'إدارة العملاء وخدمتهم' }, text: { en: 'Customer history, follow-ups, tickets and campaigns.', ar: 'سجل العملاء والمتابعات وتذاكر الدعم والحملات.' } },
  { icon: 'Workflow', type: 'automation', title: { en: 'Workflows & approvals', ar: 'دورات العمل والاعتمادات' }, text: { en: 'Requests, approvals and an authorization matrix that match your policies.', ar: 'طلبات واعتمادات ومصفوفة صلاحيات حسب سياساتك.' } },
  { icon: 'ChartColumn', type: 'business_system', title: { en: 'Dashboards & reports', ar: 'لوحات متابعة وتقارير' }, text: { en: 'Management dashboards, financial statements and Excel export.', ar: 'لوحات للإدارة وقوائم مالية وتصدير Excel.' } },
  { icon: 'Smartphone', type: 'mobile', title: { en: 'Web & mobile apps', ar: 'تطبيقات ويب وموبايل' }, text: { en: 'Portals and Android / iOS apps for your team or customers.', ar: 'بوابات وتطبيقات أندرويد وآيفون لفريقك أو عملائك.' } },
  { icon: 'Bot', type: 'ai', title: { en: 'AI, automation & integrations', ar: 'ذكاء اصطناعي وأتمتة وربط' }, text: { en: 'AI assistants, WhatsApp, payments and links to your existing systems.', ar: 'مساعدين ذكيين وواتساب ودفع إلكتروني وربط بأنظمتك.' } },
]

export const steps: { icon: string; title: B; text: B }[] = [
  { icon: 'Search', title: { en: 'Discovery & business analysis', ar: 'الاكتشاف وتحليل الأعمال' }, text: { en: 'Workshops with your teams; we document the workflow and the requirements.', ar: 'ورش عمل مع فرقك؛ بنوثّق دورة العمل والمتطلبات.' } },
  { icon: 'Network', title: { en: 'Architecture & proposal', ar: 'المعمارية والعرض' }, text: { en: 'We design the architecture and send a clear scope, timeline and quote.', ar: 'بنصمم معمارية النظام ونبعتلك نطاق وجدول زمني وعرض سعر واضح.' } },
  { icon: 'CodeXml', title: { en: 'Build in stages', ar: 'البناء على مراحل' }, text: { en: 'We develop in stages and you review real screens at every stage.', ar: 'بنطوّر على مراحل وبتراجع شاشات حقيقية في كل مرحلة.' } },
  { icon: 'PackageCheck', title: { en: 'Testing & handover', ar: 'الاختبار والتسليم' }, text: { en: 'Testing, data migration, team training and full source-code handover.', ar: 'اختبار ونقل البيانات وتدريب فريقك وتسليم الكود المصدري كامل.' } },
  { icon: 'Handshake', title: { en: 'Ongoing partnership', ar: 'شراكة مستمرة' }, text: { en: '3 months free support, then we keep evolving the system with you.', ar: '٣ شهور دعم مجاني، وبعدها بنكمّل تطوير السيستم معاك.' } },
]

export const deliverables: { icon: string; title: B }[] = [
  { icon: 'FileText', title: { en: 'Business analysis & requirements document', ar: 'وثيقة تحليل الأعمال والمتطلبات' } },
  { icon: 'Network', title: { en: 'System architecture & database design', ar: 'وثيقة معمارية النظام وتصميم قاعدة البيانات' } },
  { icon: 'Server', title: { en: 'The system running on the server you choose', ar: 'النظام شغال على السيرفر اللي تختاره' } },
  { icon: 'KeyRound', title: { en: 'The full source code — yours', ar: 'الكود المصدري كامل — ملكك' } },
  { icon: 'BookOpen', title: { en: 'Technical documentation & user guide', ar: 'توثيق فني ودليل استخدام' } },
  { icon: 'GraduationCap', title: { en: 'Training for your team', ar: 'تدريب فريقك' } },
]

export const packagesCommon: B[] = [
  { en: 'Business analysis & architecture', ar: 'تحليل أعمال ومعمارية نظام' },
  { en: '100% ownership + full source code', ar: 'ملكية ١٠٠٪ + الكود المصدري كامل' },
  { en: 'No subscriptions or licenses', ar: 'بدون اشتراكات ولا رخص' },
  { en: '3 months free technical support', ar: '٣ شهور دعم فني مجاني' },
  { en: 'Team training at handover', ar: 'تدريب فريقك وقت التسليم' },
]

export type Pkg = { id: string; icon: string; name: B; for: B; featured?: boolean; items: BL; cta: B }
export const packages: Pkg[] = [
  {
    id: 'essentials',
    icon: 'Store',
    name: { en: 'Essentials', ar: 'الأساسية' },
    for: { en: 'For small businesses getting organized.', ar: 'للشركات الصغيرة اللي عايزة تنظّم شغلها.' },
    items: {
      en: ['Core modules you choose (sales, inventory, customers…)', 'Single branch', 'Essential reports & Excel export', 'Arabic & English interface'],
      ar: ['الموديولات الأساسية اللي تختارها (مبيعات، مخازن، عملاء…)', 'فرع واحد', 'تقارير أساسية وتصدير Excel', 'واجهة عربي وإنجليزي'],
    },
    cta: { en: 'Choose Essentials', ar: 'اختار الأساسية' },
  },
  {
    id: 'business',
    icon: 'Building2',
    featured: true,
    name: { en: 'Business', ar: 'الأعمال' },
    for: { en: 'For growing SMEs with several branches and teams.', ar: 'للشركات المتوسطة اللي عندها كذا فرع وفريق.' },
    items: {
      en: ['Multi-branch with separate stock per branch', 'Accounting, HR & payroll, CRM', 'Authorization matrix & approvals', 'Dashboards & financial reports', 'Integrations: WhatsApp, payments, e-invoice'],
      ar: ['فروع متعددة ومخزون مستقل لكل فرع', 'حسابات وموارد بشرية ومرتبات وإدارة عملاء', 'مصفوفة صلاحيات واعتمادات', 'لوحة متابعة وتقارير مالية', 'ربط: واتساب، دفع إلكتروني، فاتورة إلكترونية'],
    },
    cta: { en: 'Choose Business', ar: 'اختار الأعمال' },
  },
  {
    id: 'enterprise',
    icon: 'Server',
    name: { en: 'Corporate', ar: 'الشركات الكبرى' },
    for: { en: 'For corporates with complex operations.', ar: 'للشركات الكبرى والعمليات المعقدة.' },
    items: {
      en: ['Custom workflows across departments', 'Integration with your existing systems', 'AI assistant & automation', 'Your servers (on-premise) or cloud', 'Dedicated project manager'],
      ar: ['دورات عمل مخصصة بين الإدارات', 'ربط مع أنظمتك الحالية', 'مساعد ذكاء اصطناعي وأتمتة', 'على سيرفراتك الخاصة أو سحابي', 'مدير مشروع مخصص'],
    },
    cta: { en: 'Choose Corporate', ar: 'اختار الشركات الكبرى' },
  },
  {
    id: 'custom',
    icon: 'Rocket',
    name: { en: 'Custom build', ar: 'حسب الطلب' },
    for: { en: 'A platform, an app or an AI tool — your idea.', ar: 'منصة أو تطبيق أو أداة ذكاء اصطناعي — فكرتك.' },
    items: {
      en: ['Mobile apps (Android & iOS)', 'Web platforms & portals', 'AI agents & automation', 'From idea to launch with one partner'],
      ar: ['تطبيقات موبايل (أندرويد وآيفون)', 'منصات وبوابات ويب', 'وكلاء ذكاء اصطناعي وأتمتة', 'من الفكرة للإطلاق مع شريك واحد'],
    },
    cta: { en: 'Tell us your idea', ar: 'احكيلنا فكرتك' },
  },
]

export const pricingNote: B = {
  en: 'Every project gets a clear, one-time quote after a free consultation — based on your modules and branches. Hosting and extended support after the free period are optional.',
  ar: 'كل مشروع له عرض سعر واضح لمرة واحدة بعد استشارة مجانية — حسب الموديولات وعدد الفروع. الاستضافة والدعم بعد الفترة المجانية اختيارية.',
}

export const compareRows: { label: B; us: boolean | B; them: boolean | B }[] = [
  { label: { en: 'You own the system and its source code', ar: 'السيستم والكود المصدري ملكك' }, us: true, them: false },
  { label: { en: 'Business analysis before building', ar: 'تحليل أعمال قبل البناء' }, us: true, them: false },
  { label: { en: 'Built around your workflow', ar: 'مبني على طريقة شغلك' }, us: true, them: { en: 'Limited', ar: 'محدود' } },
  { label: { en: 'Monthly / yearly license fees', ar: 'رسوم اشتراك شهري / سنوي' }, us: { en: 'None', ar: 'مفيش' }, them: { en: 'Forever', ar: 'على طول' } },
  { label: { en: 'Your data on a server you choose', ar: 'بياناتك على سيرفر تختاره' }, us: true, them: false },
  { label: { en: 'Add any feature you need, anytime', ar: 'تضيف أي ميزة في أي وقت' }, us: true, them: false },
]

export const clientsCopy = {
  eyebrow: { en: 'Our clients', ar: 'عملاؤنا' },
  title: { en: 'Organizations that chose Fratelanza as their technology partner', ar: 'جهات وشركات اختارت فراتيلانزا شريكاً تقنياً' },
  note: { en: 'Details of additional client engagements are available on request.', ar: 'تفاصيل مشاريع وعملاء إضافيين متاحة عند الطلب.' },
}

export const clients: { name: B; text: B }[] = [
  { name: { en: 'Egyptian Armed Forces', ar: 'القوات المسلحة المصرية' }, text: { en: 'Custom digital systems and platforms — delivered and managed by Fratelanza.', ar: 'أنظمة ومنصات رقمية مخصصة — تسليم وإدارة فراتيلانزا.' } },
  { name: { en: 'Misr Station Wood Factory', ar: 'مصنع أخشاب محطة مصر' }, text: { en: 'Business systems for production, inventory and operational management.', ar: 'أنظمة أعمال للإنتاج والمخزون والإدارة التشغيلية.' } },
  { name: { en: 'Scientific Research Projects', ar: 'مشاريع البحث العلمي' }, text: { en: 'Custom software and data platforms for researchers.', ar: 'برمجيات ومنصات بيانات مخصصة للباحثين.' } },
]

export const faq: { q: B; a: B }[] = [
  { q: { en: 'What does “technology partner” mean?', ar: 'يعني إيه “شريك تقني”؟' }, a: { en: 'We do not sell you a ready-made product. We analyze your business, design and build the system you need, hand it over with its source code, and keep supporting and evolving it with you.', ar: 'مش بنبيعلك برنامج جاهز. بنحلل شغلك، ونصمم ونبني السيستم اللي محتاجه، ونسلّمهولك بالكود المصدري، ونفضل ندعمه ونطوّره معاك.' } },
  { q: { en: 'Do I really own the system and its source code?', ar: 'هل السيستم والكود المصدري ملكي فعلاً؟' }, a: { en: 'Yes. At handover you receive the full source code, the architecture and technical documentation, and the right to use, host and modify it. There is no license to renew.', ar: 'أيوه. وقت التسليم بتستلم الكود المصدري كامل ووثائق المعمارية والتوثيق الفني، وحق الاستخدام والاستضافة والتعديل. مفيش رخصة تتجدد.' } },
  { q: { en: 'Do you work with SMEs or only large companies?', ar: 'بتشتغلوا مع الشركات الصغيرة ولا الكبيرة بس؟' }, a: { en: 'Both. Corporates get advanced workflows and integrations; SMEs can start with the modules they need and grow later.', ar: 'الاتنين. الشركات الكبرى بتاخد دورات عمل وتكاملات متقدمة، والشركات الصغيرة والمتوسطة تقدر تبدأ بالموديولات اللي محتاجاها وتكبر بعدين.' } },
  { q: { en: 'Are there monthly fees?', ar: 'هل فيه رسوم شهرية؟' }, a: { en: 'No mandatory subscriptions. You pay for the project. Hosting and support after the 3 free months are optional, and you can host anywhere you like.', ar: 'مفيش اشتراكات إجبارية. بتدفع تمن المشروع. الاستضافة والدعم بعد الـ٣ شهور المجانية اختياريين، وتقدر تستضيف في أي مكان.' } },
  { q: { en: 'How long does a project take?', ar: 'المشروع بياخد وقت قد إيه؟' }, a: { en: 'It depends on the scope. After the business analysis we send a proposal with a clear timeline and delivery stages.', ar: 'حسب حجم الشغل. بعد تحليل الأعمال بنبعتلك عرض فيه جدول زمني ومراحل تسليم واضحة.' } },
  { q: { en: 'Can you work with our current system or data?', ar: 'ينفع تشتغلوا على السيستم أو البيانات الحالية؟' }, a: { en: 'Yes. We can migrate your data (including Excel files), integrate with existing systems, or improve and extend them.', ar: 'أيوه. بننقل بياناتك (حتى ملفات Excel)، أو نربط مع أنظمتك الحالية، أو نطوّرها ونكمّلها.' } },
]

export const registerCopy = {
  eyebrow: { en: 'Free consultation', ar: 'استشارة مجانية' },
  title: { en: 'Register your project', ar: 'سجّل مشروعك' },
  sub: { en: 'Leave your details and we will call you to understand your business and suggest the right approach — no commitment.', ar: 'سيب بياناتك وهنكلمك نفهم شغلك ونقترح عليك الحل المناسب — من غير أي التزام.' },
  perks: [
    { en: 'Free consultation & clear quote', ar: 'استشارة مجانية وعرض سعر واضح' },
    { en: 'You own the system & source code', ar: 'السيستم والكود المصدري ملكك' },
    { en: '3 months free support after delivery', ar: '٣ شهور دعم مجاني بعد التسليم' },
  ] as B[],
  fields: {
    name: { en: 'Your name', ar: 'اسمك' },
    company: { en: 'Company name', ar: 'اسم الشركة' },
    phone: { en: 'Phone / WhatsApp', ar: 'الموبايل / واتساب' },
    email: { en: 'Email (optional)', ar: 'الإيميل (اختياري)' },
    need: { en: 'What do you need?', ar: 'محتاج إيه؟' },
    pkg: { en: 'Package', ar: 'الباقة' },
    notSure: { en: 'Not sure yet — advise me', ar: 'مش متأكد — انصحوني' },
    message: { en: 'Tell us briefly about your business (optional)', ar: 'احكيلنا باختصار عن شغلك (اختياري)' },
  },
  submit: { en: 'Register now', ar: 'سجّل دلوقتي' },
  sending: { en: 'Sending…', ar: 'جاري الإرسال…' },
  privacy: { en: 'We only use your details to contact you about your project.', ar: 'بنستخدم بياناتك بس عشان نتواصل معاك بخصوص مشروعك.' },
  ok: { en: 'Thank you! Your project is registered. Our team will contact you soon.', ar: 'شكراً! مشروعك اتسجّل، وفريقنا هيتواصل معاك قريب.' },
  errName: { en: 'Please enter your name', ar: 'اكتب اسمك من فضلك' },
  errPhone: { en: 'Please enter a valid phone number', ar: 'اكتب رقم موبايل صحيح' },
  errEmail: { en: 'Please enter a valid email or leave it empty', ar: 'اكتب إيميل صحيح أو سيبه فاضي' },
  detailed: { en: 'Prefer a detailed brief? Use the full project form', ar: 'عايز تكتب تفاصيل أكتر؟ استخدم نموذج المشروع الكامل' },
}

export const finalCta = {
  title: { en: 'Looking for a technology partner, not just a program?', ar: 'محتاج شريك تقني مش مجرد برنامج؟' },
  sub: { en: 'Book a free consultation. We’ll listen, analyze your workflow and propose the right system and package.', ar: 'احجز استشارة مجانية. هنسمعك ونحلل دورة شغلك ونقترح السيستم والباقة المناسبين.' },
}

export const about = {
  title: { en: 'About Fratelanza', ar: 'عن فراتيلانزا' },
  intro: {
    en: 'Fratelanza is a technology partner for corporates and SMEs. We build customizable business systems through business analysis, system architecture and custom development — and we hand over the source code.',
    ar: 'فراتيلانزا شريك تقني للشركات الكبرى والصغيرة والمتوسطة. بنبني أنظمة أعمال مخصصة من خلال تحليل الأعمال ومعمارية النظم والتطوير المخصص — وبنسلّم الكود المصدري.',
  },
  story: {
    en: 'Fratelanza was founded in 2026 to close the gap between technology and real business execution. Too many companies buy ready-made software and then bend their work around it. We do the opposite: we start from how your company works, design the right architecture, build the system around it, and give you full ownership. Behind our core team stands a managed network of 400+ vetted specialists — so you always deal with one accountable partner.',
    ar: 'تأسست فراتيلانزا سنة ٢٠٢٦ عشان تسد الفجوة بين التكنولوجيا والتنفيذ الحقيقي للأعمال. شركات كتير بتشتري برامج جاهزة وتضطر تغيّر طريقة شغلها عشانها. إحنا بنعمل العكس: بنبدأ من طريقة شغل شركتك، ونصمم المعمارية المناسبة، ونبني السيستم حواليها، ونديك ملكية كاملة. ووراء فريقنا الأساسي شبكة مُدارة من أكتر من ٤٠٠ متخصص — عشان تتعامل دايماً مع شريك واحد مسؤول.',
  },
  vision: {
    en: 'To be the most trusted technology partner for companies in our region — the team they call to turn how they work into systems they own.',
    ar: 'أن نكون الشريك التقني الأكثر ثقة للشركات في منطقتنا — الفريق اللي بيتكلم عشان يحوّل طريقة شغل الشركة لأنظمة تملكها.',
  },
  mission: {
    en: 'To analyze, architect and build customizable systems that fit each client exactly, deliver them with their source code, and keep evolving them as a long-term partner.',
    ar: 'أن نحلل ونصمم ونبني أنظمة مخصصة تناسب كل عميل بالظبط، ونسلّمها بالكود المصدري، ونفضل نطوّرها معاه كشريك طويل المدى.',
  },
  values: [
    { icon: 'Search', title: { en: 'Business first', ar: 'الأعمال أولاً' }, text: { en: 'We understand the business before we choose any technology.', ar: 'بنفهم الشغل قبل ما نختار أي تقنية.' } },
    { icon: 'Network', title: { en: 'Sound architecture', ar: 'معمارية سليمة' }, text: { en: 'Systems designed to be secure, scalable and easy to extend.', ar: 'أنظمة متصممة تكون آمنة وقابلة للتوسع وسهل تطويرها.' } },
    { icon: 'KeyRound', title: { en: 'Full ownership', ar: 'ملكية كاملة' }, text: { en: 'Your system, your source code, your data — no lock-in.', ar: 'سيستمك وكودك وبياناتك — من غير احتكار.' } },
    { icon: 'Handshake', title: { en: 'Long-term partnership', ar: 'شراكة طويلة المدى' }, text: { en: 'We stay with you after delivery to support and evolve the system.', ar: 'بنفضل معاك بعد التسليم ندعم السيستم ونطوّره.' } },
    { icon: 'FileText', title: { en: 'Transparency', ar: 'شفافية' }, text: { en: 'Clear scope, clear timeline and a clear quote before we start.', ar: 'نطاق واضح وجدول زمني واضح وعرض سعر واضح قبل ما نبدأ.' } },
    { icon: 'Users', title: { en: 'One accountable team', ar: 'فريق واحد مسؤول' }, text: { en: 'Analysts, architects, developers and support under one partner.', ar: 'محللين ومعماريين ومطورين ودعم تحت شريك واحد.' } },
  ],
}
