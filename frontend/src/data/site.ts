// Copy for the redesigned site: positioning, packages, ownership, portfolio, registration.
type B = { en: string; ar: string }
type BL = { en: string[]; ar: string[] }

export const hero = {
  eyebrow: { en: 'Specialized business systems', ar: 'أنظمة أعمال متخصصة' },
  title1: { en: 'Systems built for your business.', ar: 'أنظمة مبنية على مقاس شغلك.' },
  title2: { en: '100% yours.', ar: 'وملكك ١٠٠٪.' },
  sub: {
    en: 'ERP, POS, inventory, accounting, HR, CRM and mobile apps — designed around how you work, delivered with the full source code, and owned by you. No subscriptions, no licenses.',
    ar: 'ERP ونقاط بيع ومخازن وحسابات وموارد بشرية وCRM وتطبيقات موبايل — بنصممها على طريقة شغلك، ونسلّمها بالكود المصدري كامل، وتبقى ملكك. من غير اشتراكات ولا رخص.',
  },
  ctaPrimary: { en: 'Register your project', ar: 'سجّل مشروعك' },
  ctaSecondary: { en: 'See our work', ar: 'شوف أعمالنا' },
  bullets: [
    { en: '100% ownership + source code', ar: 'ملكية ١٠٠٪ + الكود المصدري' },
    { en: 'No subscriptions or licenses', ar: 'بدون اشتراكات ولا رخص' },
    { en: 'Flexible packages', ar: 'باقات مرنة' },
    { en: '3 months free support', ar: '٣ شهور دعم مجاني' },
  ] as B[],
  chips: {
    code: { en: 'Source code delivered', ar: 'الكود المصدري ليك' },
    fees: { en: '0 monthly fees', ar: '٠ رسوم شهرية' },
    support: { en: '3 months free support', ar: '٣ شهور دعم مجاني' },
  },
}

export const proofStats: { value: string; label: B }[] = [
  { value: '12+', label: { en: 'Systems built & running', ar: 'نظام مبني وشغّال' } },
  { value: '12', label: { en: 'Industries served', ar: 'قطاع بنخدمه' } },
  { value: '400+', label: { en: 'Specialists in our network', ar: 'متخصص في شبكتنا' } },
  { value: '100%', label: { en: 'Ownership for every client', ar: 'ملكية لكل عميل' } },
]

export const clientNames: { name: B; sector: B }[] = [
  { name: { en: 'Egyptian Armed Forces', ar: 'القوات المسلحة المصرية' }, sector: { en: 'Government & Defense', ar: 'حكومة ودفاع' } },
  { name: { en: 'Misr Station Wood Factory', ar: 'مصنع أخشاب محطة مصر' }, sector: { en: 'Manufacturing', ar: 'تصنيع' } },
  { name: { en: 'Scientific Research Projects', ar: 'مشاريع بحث علمي' }, sector: { en: 'Research & Academia', ar: 'بحث علمي وأكاديميا' } },
  { name: { en: 'Pharmacy chains', ar: 'سلاسل صيدليات' }, sector: { en: 'Healthcare retail', ar: 'تجزئة دوائية' } },
  { name: { en: 'Medical laboratories', ar: 'معامل تحاليل' }, sector: { en: 'Healthcare', ar: 'رعاية صحية' } },
  { name: { en: 'Real-estate developers', ar: 'شركات تطوير عقاري' }, sector: { en: 'Real estate', ar: 'عقارات' } },
]

export const pillars: { icon: string; title: B; text: B; points: BL }[] = [
  {
    icon: 'Puzzle',
    title: { en: 'Specialized systems', ar: 'أنظمة متخصصة' },
    text: {
      en: 'We don’t sell you a generic program and ask you to adapt. We study your workflow and build the system around it — screens, reports and permissions that match your business.',
      ar: 'مش بنبيع لك برنامج جاهز وتتأقلم عليه. بنفهم طريقة شغلك ونبني السيستم حواليها — شاشات وتقارير وصلاحيات على مقاس نشاطك.',
    },
    points: {
      en: ['Built for your sector and workflow', 'Arabic & English interfaces', 'Multi-branch & role permissions'],
      ar: ['مبني لقطاعك وطريقة شغلك', 'واجهات عربي وإنجليزي', 'فروع متعددة وصلاحيات لكل مستخدم'],
    },
  },
  {
    icon: 'Layers',
    title: { en: 'Flexible packages', ar: 'باقات مرنة' },
    text: {
      en: 'Start with the modules you need today and add more when you grow. You pay for your scope — not for seats, not every month.',
      ar: 'ابدأ بالموديولات اللي محتاجها النهارده، وزوّد لما تكبر. بتدفع على نطاق شغلك — مش على عدد المستخدمين ولا كل شهر.',
    },
    points: {
      en: ['Choose only the modules you need', 'Upgrade anytime — the system grows with you', 'Clear quote before we start'],
      ar: ['اختار الموديولات اللي تحتاجها بس', 'طوّر في أي وقت — السيستم بيكبر معاك', 'عرض سعر واضح قبل ما نبدأ'],
    },
  },
  {
    icon: 'KeyRound',
    title: { en: '100% ownership', ar: 'ملكية ١٠٠٪' },
    text: {
      en: 'At delivery you receive the full source code. The system and your data are yours — run it on your own server or ours, and keep it forever.',
      ar: 'وقت التسليم بتستلم الكود المصدري كامل. السيستم وبياناتك ملكك — شغّله على سيرفرك أو عندنا، ويفضل معاك على طول.',
    },
    points: {
      en: ['Full source code handed over', 'No subscriptions or license renewals', 'Your data on the server you choose'],
      ar: ['تسليم الكود المصدري كامل', 'لا اشتراكات ولا تجديد رخص', 'بياناتك على السيرفر اللي تختاره'],
    },
  },
]

export const packagesCommon: B[] = [
  { en: '100% ownership + full source code', ar: 'ملكية ١٠٠٪ + الكود المصدري كامل' },
  { en: 'No subscriptions or licenses', ar: 'بدون اشتراكات ولا رخص' },
  { en: '3 months free technical support', ar: '٣ شهور دعم فني مجاني' },
  { en: 'Team training at handover', ar: 'تدريب فريقك وقت التسليم' },
  { en: 'Upgradable anytime', ar: 'قابل للتطوير في أي وقت' },
]

export type Pkg = { id: string; icon: string; name: B; for: B; featured?: boolean; items: BL; cta: B }
export const packages: Pkg[] = [
  {
    id: 'essentials',
    icon: 'Store',
    name: { en: 'Essentials', ar: 'الأساسية' },
    for: { en: 'For a single shop, clinic or office getting organized.', ar: 'لمحل أو عيادة أو مكتب واحد عايز ينظّم شغله.' },
    items: {
      en: ['Core modules you choose (sales / POS, inventory, customers…)', 'Single branch', 'Essential reports & Excel export', 'Arabic & English interface'],
      ar: ['الموديولات الأساسية اللي تختارها (مبيعات / كاشير، مخازن، عملاء…)', 'فرع واحد', 'تقارير أساسية وتصدير Excel', 'واجهة عربي وإنجليزي'],
    },
    cta: { en: 'Choose Essentials', ar: 'اختار الأساسية' },
  },
  {
    id: 'business',
    icon: 'Building2',
    featured: true,
    name: { en: 'Business', ar: 'الأعمال' },
    for: { en: 'For growing companies with several branches and teams.', ar: 'للشركات اللي بتكبر وعندها كذا فرع وفريق.' },
    items: {
      en: ['Multi-branch with separate stock per branch', 'Accounting, HR & payroll, CRM', 'Authorization matrix & approvals', 'Dashboards & financial reports', 'Integrations: WhatsApp, payments, e-invoice'],
      ar: ['فروع متعددة ومخزون مستقل لكل فرع', 'حسابات وموارد بشرية ومرتبات وCRM', 'مصفوفة صلاحيات واعتمادات', 'لوحة متابعة وتقارير مالية', 'تكامل: واتساب، دفع إلكتروني، فاتورة إلكترونية'],
    },
    cta: { en: 'Choose Business', ar: 'اختار الأعمال' },
  },
  {
    id: 'enterprise',
    icon: 'Server',
    name: { en: 'Enterprise', ar: 'المؤسسات' },
    for: { en: 'For complex operations, institutions and groups.', ar: 'للعمليات المعقدة والمؤسسات والمجموعات.' },
    items: {
      en: ['Custom workflows across departments', 'Integration with your existing systems', 'AI assistant & automation', 'Your server (on-premise) or cloud', 'Dedicated project manager'],
      ar: ['دورات عمل مخصصة بين الإدارات', 'ربط مع أنظمتك الحالية', 'مساعد ذكاء اصطناعي وأتمتة', 'على سيرفرك الخاص أو سحابي', 'مدير مشروع مخصص'],
    },
    cta: { en: 'Choose Enterprise', ar: 'اختار المؤسسات' },
  },
  {
    id: 'custom',
    icon: 'Rocket',
    name: { en: 'Custom build', ar: 'حسب الطلب' },
    for: { en: 'Have an idea? A platform, an app or an AI product.', ar: 'عندك فكرة؟ منصة أو تطبيق أو منتج ذكاء اصطناعي.' },
    items: {
      en: ['Mobile apps (Android & iOS)', 'Web platforms & portals', 'AI agents & automation', 'From idea to launch with one team'],
      ar: ['تطبيقات موبايل (أندرويد وآيفون)', 'منصات وبوابات ويب', 'وكلاء ذكاء اصطناعي وأتمتة', 'من الفكرة للإطلاق مع فريق واحد'],
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
  { label: { en: 'Built around your workflow', ar: 'مبني على طريقة شغلك' }, us: true, them: { en: 'Limited', ar: 'محدود' } },
  { label: { en: 'Monthly / yearly license fees', ar: 'رسوم اشتراك شهري / سنوي' }, us: { en: 'None', ar: 'مفيش' }, them: { en: 'Forever', ar: 'على طول' } },
  { label: { en: 'Your data on a server you choose', ar: 'بياناتك على سيرفر تختاره' }, us: true, them: false },
  { label: { en: 'Add any feature you need, anytime', ar: 'تضيف أي ميزة في أي وقت' }, us: true, them: false },
  { label: { en: 'Price increases & vendor lock-in', ar: 'زيادات أسعار واحتكار المورد' }, us: { en: 'No', ar: 'لا' }, them: { en: 'Yes', ar: 'نعم' } },
]

export const steps: { icon: string; title: B; text: B }[] = [
  { icon: 'MessageCircle', title: { en: 'Free consultation', ar: 'استشارة مجانية' }, text: { en: 'Tell us about your business and what slows you down.', ar: 'احكيلنا عن شغلك وإيه اللي معطّلك.' } },
  { icon: 'Ruler', title: { en: 'Scope & quote', ar: 'تحديد النطاق والسعر' }, text: { en: 'We map your workflow, pick the package and send a clear quote.', ar: 'بنرسم دورة شغلك ونختار الباقة ونبعتلك عرض سعر واضح.' } },
  { icon: 'CodeXml', title: { en: 'Build & review', ar: 'بناء ومراجعة' }, text: { en: 'We build in stages and you review real screens as we go.', ar: 'بنبني على مراحل وبتراجع شاشات حقيقية أول بأول.' } },
  { icon: 'KeyRound', title: { en: 'Handover & support', ar: 'تسليم ودعم' }, text: { en: 'Training, source code handover and 3 months free support.', ar: 'تدريب وتسليم الكود المصدري و٣ شهور دعم مجاني.' } },
]

export type Work = { id: string; sector: string; sectorLabel: B; icon: string; title: B; summary: B; modules: BL; image: string; link: string }
export const portfolio: Work[] = [
  {
    id: 'retail', sector: 'retail', sectorLabel: { en: 'Retail & multi-branch stores', ar: 'محلات وتجزئة متعددة الفروع' }, icon: 'ShoppingCart',
    title: { en: 'Retail POS & branch inventory', ar: 'نقاط بيع ومخازن للمحلات والفروع' },
    summary: { en: 'Fast barcode checkout with multiple payment methods, shifts and real-time stock per branch.', ar: 'بيع سريع بالباركود وطرق دفع متعددة وورديات ومخزون لحظي لكل فرع.' },
    modules: { en: ['Barcode checkout', 'Cash, card & wallets', 'Shifts & Z-reports', 'Branch stock', 'Offline mode'], ar: ['بيع بالباركود', 'كاش وفيزا ومحافظ', 'ورديات وتقفيل', 'مخزون الفروع', 'شغل بدون إنترنت'] },
    image: '/products/pos/terminal.png', link: '/products/pos',
  },
  {
    id: 'clinic', sector: 'healthcare', sectorLabel: { en: 'Clinics & medical centers', ar: 'عيادات ومراكز طبية' }, icon: 'Stethoscope',
    title: { en: 'Clinic management system', ar: 'نظام إدارة العيادات' },
    summary: { en: 'Appointments by doctor, medical records, insurance billing and prescriptions sent straight to the pharmacy.', ar: 'مواعيد لكل دكتور وملف طبي إلكتروني وفوترة تأمين وروشتة توصل للصيدلية على طول.' },
    modules: { en: ['Appointments', 'EMR', 'Insurance billing', 'Prescription portal', 'Lab orders'], ar: ['المواعيد', 'الملف الطبي', 'فوترة التأمين', 'بوابة الروشتات', 'طلبات المعمل'] },
    image: '/products/clinic/appointments.png', link: '/products/clinic',
  },
  {
    id: 'erp', sector: 'business', sectorLabel: { en: 'Companies & groups', ar: 'شركات ومجموعات' }, icon: 'LayoutDashboard',
    title: { en: 'Multi-branch ERP core', ar: 'نظام ERP مركزي متعدد الفروع' },
    summary: { en: 'Executive dashboard, 15+ business reports, branch stock control and role-based permissions in one place.', ar: 'لوحة تنفيذية وأكتر من ١٥ تقرير وتحكم في مخزون الفروع وصلاحيات حسب الدور في مكان واحد.' },
    modules: { en: ['Executive KPIs', '15+ reports', 'Branch stock', 'Permissions', 'Excel import/export'], ar: ['مؤشرات تنفيذية', '+١٥ تقرير', 'مخزون الفروع', 'الصلاحيات', 'استيراد وتصدير Excel'] },
    image: '/products/erp/branches.png', link: '/products/erp',
  },
  {
    id: 'realestate', sector: 'realestate', sectorLabel: { en: 'Real-estate developers', ar: 'التطوير العقاري' }, icon: 'Building2',
    title: { en: 'Real-estate development platform', ar: 'منصة إدارة التطوير العقاري' },
    summary: { en: 'Projects and units board, reservations and bilingual contracts, installments, finance and property maintenance.', ar: 'مشاريع ولوحة وحدات وحجوزات وعقود بلغتين وأقساط ومالية وصيانة عقارات.' },
    modules: { en: ['Units & pricing', 'Reservations & contracts', 'Installments', 'Finance & P&L', 'Brokers', 'Maintenance'], ar: ['الوحدات والتسعير', 'الحجوزات والعقود', 'الأقساط', 'المالية والأرباح', 'الوسطاء', 'الصيانة'] },
    image: '/products/realestate/property-management.png', link: '/products/realestate',
  },
  {
    id: 'pharmacy', sector: 'healthcare', sectorLabel: { en: 'Pharmacies & chains', ar: 'صيدليات وسلاسل' }, icon: 'Pill',
    title: { en: 'Pharmacy chain ERP & POS', ar: 'نظام ERP ونقاط بيع لسلاسل الصيدليات' },
    summary: { en: 'Barcode POS, multi-branch stock, insurance claims and ETA e-receipts for pharmacies of every size.', ar: 'كاشير بالباركود ومخزون متعدد الفروع ومطالبات تأمين وإيصال ETA إلكتروني للصيدليات بكل أحجامها.' },
    modules: { en: ['POS & promo offers', 'Inventory & expiry', 'Insurance & claims', 'ETA e-invoice', 'Branch transfers', 'HR & payroll'], ar: ['كاشير وعروض', 'مخزون وصلاحية', 'تأمين ومطالبات', 'فاتورة ETA', 'تحويلات الفروع', 'موارد بشرية ومرتبات'] },
    image: '/products/pharmacy/inventory.png', link: '/products/pharmacy',
  },
  {
    id: 'laboratory', sector: 'healthcare', sectorLabel: { en: 'Medical laboratories', ar: 'معامل تحاليل' }, icon: 'FlaskConical',
    title: { en: 'LabMaster — laboratory ERP', ar: 'LabMaster — نظام إدارة المعامل' },
    summary: { en: 'From patient registration and test catalog to results, billing, accounting and profitability.', ar: 'من تسجيل المريض وقائمة التحاليل لحد النتائج والفوترة والحسابات والربحية.' },
    modules: { en: ['Patients & referrals', 'Test catalog & TAT', 'Results & QC', 'Billing & collections', 'Accounting', 'Purchasing'], ar: ['المرضى والإحالات', 'التحاليل ومدة التسليم', 'النتائج والجودة', 'الفوترة والتحصيل', 'الحسابات', 'المشتريات'] },
    image: '/products/laboratory/tests.png', link: '/products/laboratory',
  },
  {
    id: 'crm', sector: 'business', sectorLabel: { en: 'Sales & service teams', ar: 'فرق المبيعات والخدمة' }, icon: 'Users',
    title: { en: 'CRM & customer support hub', ar: 'نظام CRM ومركز خدمة العملاء' },
    summary: { en: 'Leads pipeline, tasks, calendar, invoicing, support tickets and a knowledge base for the whole team.', ar: 'متابعة العملاء المحتملين والمهام والمواعيد والفواتير وتذاكر الدعم وقاعدة معرفة للفريق كله.' },
    modules: { en: ['Sales pipeline', 'Tasks & calendar', 'Invoicing', 'Helpdesk', 'Knowledge base'], ar: ['مسار المبيعات', 'المهام والمواعيد', 'الفواتير', 'خدمة العملاء', 'قاعدة المعرفة'] },
    image: '/products/crm/support-tickets.png', link: '/products/crm',
  },
  {
    id: 'marketing', sector: 'business', sectorLabel: { en: 'Marketing teams', ar: 'فرق التسويق' }, icon: 'Megaphone',
    title: { en: 'Marketing automation', ar: 'منصة أتمتة التسويق' },
    summary: { en: 'Campaigns over WhatsApp and email with segmentation and a live analytics dashboard.', ar: 'حملات على واتساب والإيميل مع تقسيم العملاء ولوحة تحليلات لحظية.' },
    modules: { en: ['Campaign builder', 'WhatsApp', 'Email', 'Segments', 'Analytics'], ar: ['منشئ الحملات', 'واتساب', 'إيميل', 'تقسيم العملاء', 'تحليلات'] },
    image: '/products/marketing/analytics.png', link: '/products/marketing',
  },
  {
    id: 'hr', sector: 'business', sectorLabel: { en: 'HR departments', ar: 'إدارات الموارد البشرية' }, icon: 'UserCheck',
    title: { en: 'HR, attendance & payroll', ar: 'موارد بشرية وحضور ومرتبات' },
    summary: { en: 'Employee files, attendance and lateness, penalties and bonuses, leave and pay slips.', ar: 'ملف لكل موظف وحضور وتأخيرات وجزاءات ومكافآت وإجازات ومفردات مرتب.' },
    modules: { en: ['Employee files', 'Attendance', 'Penalties & bonuses', 'Leave', 'Pay slips'], ar: ['ملفات الموظفين', 'الحضور والانصراف', 'جزاءات ومكافآت', 'الإجازات', 'مفردات المرتب'] },
    image: '/products/hr/attendance.png', link: '/products/hr',
  },
  {
    id: 'ai', sector: 'ai', sectorLabel: { en: 'Any business', ar: 'أي نشاط' }, icon: 'Bot',
    title: { en: 'AI assistant & insights', ar: 'مساعد ذكاء اصطناعي وتحليلات' },
    summary: { en: 'Ask your system questions in plain language, get predictions, recommendations and document analysis.', ar: 'اسأل السيستم بلغتك العادية، واحصل على توقعات وتوصيات وتحليل مستندات.' },
    modules: { en: ['Natural-language queries', 'Predictions', 'Recommendations', 'Document analysis'], ar: ['أسئلة بلغة طبيعية', 'توقعات', 'توصيات', 'تحليل مستندات'] },
    image: '/products/ai/insights.png', link: '/products/ai',
  },
  {
    id: 'console', sector: 'business', sectorLabel: { en: 'IT & management', ar: 'الإدارة وتقنية المعلومات' }, icon: 'Terminal',
    title: { en: 'Admin console & monitoring', ar: 'لوحة تحكم ومراقبة مركزية' },
    summary: { en: 'One console for users, permissions, configuration, audit logs and system health.', ar: 'لوحة واحدة للمستخدمين والصلاحيات والإعدادات وسجل العمليات وحالة السيستم.' },
    modules: { en: ['Users & roles', 'Configuration', 'Audit logs', 'Monitoring'], ar: ['المستخدمين والأدوار', 'الإعدادات', 'سجل العمليات', 'المراقبة'] },
    image: '/products/console/monitoring.png', link: '/products/console',
  },
]

export const sectors: { id: string; label: B }[] = [
  { id: 'all', label: { en: 'All work', ar: 'كل الأعمال' } },
  { id: 'healthcare', label: { en: 'Healthcare', ar: 'رعاية صحية' } },
  { id: 'retail', label: { en: 'Retail', ar: 'تجزئة' } },
  { id: 'realestate', label: { en: 'Real estate', ar: 'عقارات' } },
  { id: 'business', label: { en: 'Business systems', ar: 'أنظمة أعمال' } },
  { id: 'ai', label: { en: 'AI', ar: 'ذكاء اصطناعي' } },
]

export const deliveredFor: { icon: string; name: B; sector: B; text: B }[] = [
  { icon: 'Shield', name: { en: 'Egyptian Armed Forces', ar: 'القوات المسلحة المصرية' }, sector: { en: 'Government & Defense', ar: 'حكومة ودفاع' }, text: { en: 'Custom digital systems and platforms — delivered and managed by Fratelanza.', ar: 'أنظمة ومنصات رقمية مخصصة — تسليم وإدارة فراتيلانزا.' } },
  { icon: 'Factory', name: { en: 'Misr Station Wood Factory', ar: 'مصنع أخشاب محطة مصر' }, sector: { en: 'Manufacturing', ar: 'تصنيع' }, text: { en: 'Business systems for production, inventory and operational management.', ar: 'أنظمة أعمال للإنتاج والمخزون والإدارة التشغيلية.' } },
  { icon: 'GraduationCap', name: { en: 'Scientific Research Projects', ar: 'مشاريع البحث العلمي' }, sector: { en: 'Research & Academia', ar: 'بحث علمي وأكاديميا' }, text: { en: 'Custom software and data platforms for researchers and scientific initiatives.', ar: 'برمجيات ومنصات بيانات مخصصة للباحثين والمبادرات العلمية.' } },
]

export const faq: { q: B; a: B }[] = [
  { q: { en: 'Do I really own the system?', ar: 'هل السيستم فعلاً ملكي؟' }, a: { en: 'Yes. At handover you receive the full source code and the rights to use, host and modify it. There is no license to renew.', ar: 'أيوه. وقت التسليم بتستلم الكود المصدري كامل وحق الاستخدام والاستضافة والتعديل. مفيش رخصة تتجدد.' } },
  { q: { en: 'Are there monthly fees?', ar: 'هل فيه رسوم شهرية؟' }, a: { en: 'No mandatory subscriptions. You pay for the project. Hosting and support after the 3 free months are optional, and you can host anywhere you like.', ar: 'مفيش اشتراكات إجبارية. بتدفع تمن المشروع. الاستضافة والدعم بعد الـ٣ شهور المجانية اختياريين، وتقدر تستضيف في أي مكان.' } },
  { q: { en: 'Can I start small and add modules later?', ar: 'ينفع أبدأ صغير وأزوّد بعدين؟' }, a: { en: 'Yes — that is how our packages work. Start with what you need and add branches, modules or apps whenever you are ready.', ar: 'أيوه — ودي فكرة الباقات عندنا. ابدأ باللي محتاجه وزوّد فروع أو موديولات أو تطبيقات وقت ما تحب.' } },
  { q: { en: 'How long does a project take?', ar: 'المشروع بياخد وقت قد إيه؟' }, a: { en: 'It depends on the scope. After the free consultation we send a quote with a clear timeline and delivery stages.', ar: 'حسب حجم الشغل. بعد الاستشارة المجانية بنبعتلك عرض سعر فيه جدول زمني ومراحل تسليم واضحة.' } },
  { q: { en: 'Can you work with our current system or data?', ar: 'ينفع تشتغلوا على السيستم أو البيانات الحالية؟' }, a: { en: 'Yes. We can migrate your data (including Excel files), integrate with existing systems, or improve and extend them.', ar: 'أيوه. بننقل بياناتك (حتى ملفات Excel)، أو نربط مع أنظمتك الحالية، أو نطوّرها ونكمّلها.' } },
  { q: { en: 'Do you build mobile apps too?', ar: 'بتعملوا تطبيقات موبايل كمان؟' }, a: { en: 'Yes — Android and iOS apps, web platforms and AI tools, connected to your system.', ar: 'أيوه — تطبيقات أندرويد وآيفون ومنصات ويب وأدوات ذكاء اصطناعي، مربوطة بالسيستم بتاعك.' } },
]

export const registerCopy = {
  eyebrow: { en: 'Free consultation', ar: 'استشارة مجانية' },
  title: { en: 'Register your project', ar: 'سجّل مشروعك' },
  sub: { en: 'Leave your details and we will call you to understand your business and suggest the right package — no commitment.', ar: 'سيب بياناتك وهنكلمك نفهم شغلك ونقترح عليك الباقة المناسبة — من غير أي التزام.' },
  perks: [
    { en: 'Free consultation & clear quote', ar: 'استشارة مجانية وعرض سعر واضح' },
    { en: 'You own the system 100%', ar: 'السيستم ملكك ١٠٠٪' },
    { en: '3 months free support after delivery', ar: '٣ شهور دعم مجاني بعد التسليم' },
  ] as B[],
  fields: {
    name: { en: 'Your name', ar: 'اسمك' },
    company: { en: 'Business / company name', ar: 'اسم النشاط / الشركة' },
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
  title: { en: 'Ready to own a system built for your business?', ar: 'جاهز يبقى عندك سيستم على مقاس شغلك وملكك؟' },
  sub: { en: 'Book a free consultation today. We’ll listen, map your workflow and propose the right package.', ar: 'احجز استشارة مجانية النهارده. هنسمعك ونرسم دورة شغلك ونقترح الباقة المناسبة.' },
}
