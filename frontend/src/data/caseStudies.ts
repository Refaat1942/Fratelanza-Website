export type CaseStudy = {
  id: string
  productId: string
  title: { en: string; ar: string }
  industry: { en: string; ar: string }
  problem: { en: string; ar: string }
  challenge: { en: string; ar: string }
  solution: { en: string; ar: string }
  technology: { en: string; ar: string }
  features: { en: string[]; ar: string[] }
  screenshots: string[]
  result: { en: string; ar: string }
  isFratelanzaProduct: true
}

export const caseStudies: CaseStudy[] = [
  {
    id: 'fratelanza-real-estate',
    productId: 'realestate',
    title: { en: 'Fratelanza Real Estate Platform', ar: 'منصة فراتيلانزا للعقارات' },
    industry: { en: 'Real Estate', ar: 'العقارات' },
    problem: {
      en: 'Real estate developers and agencies need unified project, unit, contract, and finance management.',
      ar: 'المطورون والوكالات العقارية يحتاجون إدارة موحدة للمشاريع والوحدات والعقود والمالية.',
    },
    challenge: {
      en: 'Disconnected spreadsheets for projects, contracts, and payments with no real-time portfolio visibility.',
      ar: 'جداول منفصلة للمشاريع والعقود والمدفوعات دون رؤية فورية للمحفظة.',
    },
    solution: {
      en: 'Fratelanza Real Estate — a platform for property management, projects, contracts, and financial tracking.',
      ar: 'فراتيلانزا للعقارات — منصة لإدارة العقارات والمشاريع والعقود والتتبع المالي.',
    },
    technology: {
      en: 'Web application, role-based dashboards, document workflows, financial modules.',
      ar: 'تطبيق ويب، لوحات أدوار، تدفقات مستندات، وحدات مالية.',
    },
    features: {
      en: ['Project management', 'Property & unit tracking', 'Contracts', 'Finance overview', 'Reporting'],
      ar: ['إدارة المشاريع', 'تتبع العقارات والوحدات', 'العقود', 'نظرة مالية', 'التقارير'],
    },
    screenshots: ['/products/realestate/projects.png', '/products/realestate/property-management.png', '/products/realestate/contracts.png'],
    result: {
      en: '[TBD — Replace with verified business impact metrics when available]',
      ar: '[TBD — استبدل بمقاييس تأثير موثقة عند توفرها]',
    },
    isFratelanzaProduct: true,
  },
  {
    id: 'labmaster',
    productId: 'laboratory',
    title: { en: 'LabMaster — Laboratory Management', ar: 'LabMaster — إدارة المختبرات' },
    industry: { en: 'Healthcare / Laboratory', ar: 'الرعاية الصحية / المختبرات' },
    problem: {
      en: 'Medical laboratories need end-to-end workflows from test orders to results, billing, and accounting.',
      ar: 'المختبرات الطبية تحتاج تدفقات من الطلبات إلى النتائج والفوترة والمحاسبة.',
    },
    challenge: {
      en: 'Manual result entry, disconnected billing, and limited visibility into lab operations and CRM.',
      ar: 'إدخال نتائج يدوي وفوترة منفصلة ورؤية محدودة للعمليات وCRM.',
    },
    solution: {
      en: 'LabMaster — laboratory ERP covering tests, results, billing, accounting, and CRM in one platform.',
      ar: 'LabMaster — ERP مختبرات يغطي الفحوصات والنتائج والفوترة والمحاسبة وCRM في منصة واحدة.',
    },
    technology: {
      en: 'Web platform, test catalog, result workflows, billing integration, reporting.',
      ar: 'منصة ويب، كتالوج فحوصات، تدفقات نتائج، تكامل فوترة، تقارير.',
    },
    features: {
      en: ['Test catalog', 'Results management', 'Billing', 'Accounting', 'CRM', 'Dashboards'],
      ar: ['كتالوج الفحوصات', 'إدارة النتائج', 'الفوترة', 'المحاسبة', 'CRM', 'لوحات تحكم'],
    },
    screenshots: ['/products/laboratory/dashboard.png', '/products/laboratory/tests.png', '/products/laboratory/billing.png'],
    result: {
      en: '[TBD — Replace with verified business impact metrics when available]',
      ar: '[TBD — استبدل بمقاييس تأثير موثقة عند توفرها]',
    },
    isFratelanzaProduct: true,
  },
  {
    id: 'pharmapos',
    productId: 'pharmacy',
    title: { en: 'PharmaPOS — Pharmacy Management Platform', ar: 'PharmaPOS — منصة إدارة الصيدليات' },
    industry: { en: 'Pharmacy & Healthcare', ar: 'الصيدلة والرعاية الصحية' },
    problem: {
      en: 'Pharmacy chains need centralized inventory, expiry control, insurance workflows, and multi-branch visibility.',
      ar: 'سلاسل الصيدليات تحتاج مخزوناً مركزياً ومراقبة صلاحية وتدفقات تأمين ورؤية متعددة الفروع.',
    },
    challenge: {
      en: 'Managing FEFO inventory, clinic prescriptions, tax compliance, and remote branch oversight across disconnected tools.',
      ar: 'إدارة مخزون FEFO ووصفات العيادات والامتثال الضريبي والإشراف على الفروع عبر أدوات منفصلة.',
    },
    solution: {
      en: 'Fratelanza built PharmaPOS — an integrated pharmacy ERP with POS, inventory, insurance, reporting, and remote management.',
      ar: 'بنت فراتيلانزا PharmaPOS — ERP صيدليات متكامل مع نقاط بيع ومخزون وتأمين وتقارير وإدارة عن بُعد.',
    },
    technology: {
      en: 'Modern web stack, real-time inventory, role-based access, multi-branch architecture, ETA e-receipt integration.',
      ar: 'بنية ويب حديثة، مخزون فوري، صلاحيات أدوار، بنية متعددة الفروع، تكامل إيصال ETA.',
    },
    features: {
      en: ['Multi-branch inventory', 'FEFO / expiry control', 'Insurance workflows', 'Clinic prescriptions', 'ETA e-receipt', 'Remote management', 'Business reports'],
      ar: ['مخزون متعدد الفروع', 'FEFO / صلاحية', 'تدفقات التأمين', 'وصفات العيادات', 'إيصال ETA', 'إدارة عن بُعد', 'تقارير الأعمال'],
    },
    screenshots: ['/products/pharmacy/inventory.png', '/products/pharmacy/reports.png', '/products/pharmacy/insurance.png'],
    result: {
      en: '[TBD — Replace with verified business impact metrics when available]',
      ar: '[TBD — استبدل بمقاييس تأثير موثقة عند توفرها]',
    },
    isFratelanzaProduct: true,
  },
]
