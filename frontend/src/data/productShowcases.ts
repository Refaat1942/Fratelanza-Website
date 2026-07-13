export type ProductScreenshot = {
  src: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
}

export const productShowcases: Record<string, ProductScreenshot[]> = {
  crm: [
    {
      src: '/products/crm/tasks.png',
      title: { en: 'Tasks & Workflow', ar: 'المهام وسير العمل' },
      description: {
        en: 'Kanban-style task boards with priorities, due dates, and team assignment — track every action from lead to delivery.',
        ar: 'لوحات مهام Kanban مع الأولويات وتواريخ الاستحقاق وتعيين الفريق — تتبع كل إجراء من العميل المحتمل إلى التسليم.',
      },
    },
    {
      src: '/products/crm/finance.png',
      title: { en: 'Finance Dashboard', ar: 'لوحة المالية' },
      description: {
        en: 'Real-time view of sales, invoices, payments, and HR metrics — all in one executive dashboard.',
        ar: 'عرض فوري للمبيعات والفواتير والمدفوعات ومؤشرات الموارد البشرية — في لوحة تنفيذية واحدة.',
      },
    },
    {
      src: '/products/crm/customers.png',
      title: { en: 'Sales CRM', ar: 'إدارة المبيعات' },
      description: {
        en: 'Manage customers, leads, and sales pipeline with contact history, deal stages, and activity tracking.',
        ar: 'إدارة العملاء والعملاء المحتملين وخط المبيعات مع سجل التواصل ومراحل الصفقات وتتبع النشاط.',
      },
    },
    {
      src: '/products/crm/calendar.png',
      title: { en: 'Calendar & Appointments', ar: 'التقويم والمواعيد' },
      description: {
        en: 'Schedule meetings, follow-ups, and calls with day/week/month views and quick appointment creation.',
        ar: 'جدولة الاجتماعات والمتابعات والمكالمات بعروض يوم/أسبوع/شهر وإنشاء مواعيد سريع.',
      },
    },
    {
      src: '/products/crm/support-tickets.png',
      title: { en: 'Support Tickets', ar: 'تذاكر الدعم' },
      description: {
        en: 'Full helpdesk with ticket status, priority, assignment, and customer communication history.',
        ar: 'مكتب مساعدة كامل مع حالة التذكرة والأولوية والتعيين وسجل تواصل العملاء.',
      },
    },
    {
      src: '/products/crm/support-overview.png',
      title: { en: 'Support Overview', ar: 'نظرة عامة على الدعم' },
      description: {
        en: 'Monitor open tickets, response times, and team workload from a single support command center.',
        ar: 'راقب التذاكر المفتوحة وأوقات الاستجابة وحجم عمل الفريق من مركز دعم واحد.',
      },
    },
    {
      src: '/products/crm/knowledge-base.png',
      title: { en: 'Knowledge Base', ar: 'قاعدة المعرفة' },
      description: {
        en: 'Internal articles with version history — empower your team with searchable documentation and SOPs.',
        ar: 'مقالات داخلية مع سجل الإصدارات — مكّن فريقك بوثائق قابلة للبحث وإجراءات التشغيل.',
      },
    },
  ],
  realestate: [
    {
      src: '/products/realestate/projects.png',
      title: { en: 'Projects & Units Board', ar: 'المشاريع ولوحة الوحدات' },
      description: {
        en: 'Manage developments, master plans, unit inventory, availability, reservations, and dynamic pricing in one place.',
        ar: 'إدارة المشاريع والمخططات العامة ومخزون الوحدات والتوفر والحجوزات والتسعير الديناميكي في مكان واحد.',
      },
    },
    {
      src: '/products/realestate/contracts.png',
      title: { en: 'Contracts & PDF Generator', ar: 'العقود ومولّد PDF' },
      description: {
        en: 'Automated bilingual contract PDFs with buyer details, unit info, payment plans, and digital signing status.',
        ar: 'عقود PDF ثنائية اللغة آلية مع بيانات المشتري ومعلومات الوحدة وخطط السداد وحالة التوقيع.',
      },
    },
    {
      src: '/products/realestate/finance.png',
      title: { en: 'Real Estate Finance', ar: 'المالية العقارية' },
      description: {
        en: 'Track total sales, collections, overdue amounts, cash position, trial balance, and profit & loss reports.',
        ar: 'تتبع إجمالي المبيعات والتحصيلات والمتأخرات والمركز النقدي وميزان المراجعة وتقارير الأرباح والخسائر.',
      },
    },
    {
      src: '/products/realestate/property-management.png',
      title: { en: 'Property Management', ar: 'إدارة الممتلكات' },
      description: {
        en: 'After handover — track unit defects, maintenance requests, priorities, and completion for owners and tenants.',
        ar: 'بعد التسليم — تتبع عيوب الوحدات وطلبات الصيانة والأولويات والإنجاز للمالكين والمستأجرين.',
      },
    },
  ],
  pharmacy: [
    {
      src: '/products/pharmacy/inventory.png',
      title: { en: 'Inventory & Stock', ar: 'المخزون والمخزون' },
      description: {
        en: 'Barcode inventory, dose labels, branch stock, stocktake, fast/slow/dead analysis, and consumption alerts.',
        ar: 'مخزون بالباركود وملصقات الجرعات ومخزون الفروع والجرد وتحليل سريع/بطيء/راكد وتنبيهات الاستهلاك.',
      },
    },
    {
      src: '/products/pharmacy/expiry.png',
      title: { en: 'Expiry Management', ar: 'إدارة الصلاحية' },
      description: {
        en: 'Monitor expired and near-expiry items with stock value at risk and Excel export for compliance.',
        ar: 'راقب الأصناف المنتهية وقريبة الانتهاء مع قيمة المخزون المعرّض للخطر وتصدير Excel للامتثال.',
      },
    },
    {
      src: '/products/pharmacy/insurance.png',
      title: { en: 'Insurance Management', ar: 'إدارة التأمين' },
      description: {
        en: 'Insurance companies, plans, coverage rules, claims processing, and discount templates for local/imported drugs.',
        ar: 'شركات التأمين والخطط وقواعد التغطية ومعالجة المطالبات وقوالب الخصم للأدوية المحلية والمستوردة.',
      },
    },
    {
      src: '/products/pharmacy/promo-offers.png',
      title: { en: 'Promo Offers at POS', ar: 'عروض ترويجية عند نقطة البيع' },
      description: {
        en: 'Create offer groups with selected items — discounts apply automatically when scanned at the pharmacy POS.',
        ar: 'أنشئ مجموعات عروض بأصناف محددة — تُطبّق الخصومات تلقائياً عند المسح في نقطة بيع الصيدلية.',
      },
    },
    {
      src: '/products/pharmacy/clinics.png',
      title: { en: 'Clinic Portal Links', ar: 'روابط بوابة العيادات' },
      description: {
        en: 'Issue private portal links so clinics send prescriptions directly to your POS — no manual entry needed.',
        ar: 'أصدر روابط بوابة خاصة لترسل العيادات الوصفات مباشرة إلى نقطة البيع — دون إدخال يدوي.',
      },
    },
    {
      src: '/products/pharmacy/reports.png',
      title: { en: 'Reports & Analytics', ar: 'التقارير والتحليلات' },
      description: {
        en: 'Profit & loss, branch performance, sales by category, clinic sales, delivery zones, and promo offer analysis.',
        ar: 'أرباح وخسائر وأداء الفروع ومبيعات حسب الفئة ومبيعات العيادات ومناطق التوصيل وتحليل العروض.',
      },
    },
    {
      src: '/products/pharmacy/hr-payroll.png',
      title: { en: 'HR & Payroll', ar: 'الموارد البشرية والرواتب' },
      description: {
        en: 'Employee records, attendance, clock codes, salary slips, and performance — integrated with pharmacy operations.',
        ar: 'سجلات الموظفين والحضور وأكواد الدوام وكشوف الرواتب والأداء — متكاملة مع عمليات الصيدلية.',
      },
    },
    {
      src: '/products/pharmacy/settings.png',
      title: { en: 'Users & ETA E-Receipt', ar: 'المستخدمون والإيصال الإلكتروني ETA' },
      description: {
        en: 'Role-based users (admin, pharmacist, delivery), branch setup, pharmacy receipt settings, and ETA compliance.',
        ar: 'مستخدمون حسب الدور (مدير، صيدلي، توصيل)، إعداد الفروع، إعدادات إيصال الصيدلية، وامتثال ETA.',
      },
    },
  ],
  laboratory: [
    {
      src: '/products/laboratory/dashboard.png',
      title: { en: 'Lab Dashboard', ar: 'لوحة المختبر' },
      description: {
        en: 'KPIs for invoiced revenue, collections, outstanding, net profit, tests ordered, patients, and inventory at a glance.',
        ar: 'مؤشرات للإيرادات المحصّلة والتحصيلات والمتبقي وصافي الربح والفحوصات والمرضى والمخزون بنظرة واحدة.',
      },
    },
    {
      src: '/products/laboratory/tests.png',
      title: { en: 'Test Catalog', ar: 'فهرس الفحوصات' },
      description: {
        en: 'Manage test codes, prices, costs, turnaround times, and status — with Excel export and search filters.',
        ar: 'إدارة أكواد الفحوصات والأسعار والتكاليف ومدة التسليم والحالة — مع تصدير Excel وفلاتر البحث.',
      },
    },
    {
      src: '/products/laboratory/billing.png',
      title: { en: 'Billing & Invoices', ar: 'الفوترة والفواتير' },
      description: {
        en: 'Create invoices, track paid vs due amounts, filter by period, and export billing data to Excel.',
        ar: 'إنشاء فواتير وتتبع المدفوع مقابل المستحق والتصفية حسب الفترة وتصدير بيانات الفوترة إلى Excel.',
      },
    },
    {
      src: '/products/laboratory/accounting.png',
      title: { en: 'Accounting & Profitability', ar: 'المحاسبة والربحية' },
      description: {
        en: 'Revenue, cash collected, expenses, and net profit overview with exportable profitability reports.',
        ar: 'نظرة على الإيرادات والنقد المحصّل والمصروفات وصافي الربح مع تقارير ربحية قابلة للتصدير.',
      },
    },
  ],
}

export function getProductPreview(productId: string): string | undefined {
  return productShowcases[productId]?.[0]?.src
}
