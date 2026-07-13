export type ProductScreenshot = {
  src: string
  title: { en: string; ar: string }
  description: { en: string; ar: string }
}

export const productShowcases: Record<string, ProductScreenshot[]> = {
  erp: [
    {
      src: '/products/erp/dashboard.png',
      title: { en: 'Executive Dashboard', ar: 'لوحة التحكم التنفيذية' },
      description: {
        en: 'See sales, invoices, payments, and HR KPIs in one view — spot trends early and make faster decisions across every branch.',
        ar: 'شاهد المبيعات والفواتير والمدفوعات ومؤشرات الموارد البشرية في عرض واحد — اكتشف الاتجاهات مبكراً واتخذ قرارات أسرع عبر كل الفروع.',
      },
    },
    {
      src: '/products/erp/reports.png',
      title: { en: 'Business Reports', ar: 'تقارير الأعمال' },
      description: {
        en: '15+ ready-made reports — profit & loss, branch performance, sales by category, delivery zones, and top products — all exportable to Excel.',
        ar: 'أكثر من ١٥ تقريراً جاهزاً — أرباح وخسائر وأداء الفروع ومبيعات حسب الفئة ومناطق التوصيل وأفضل المنتجات — كلها قابلة للتصدير إلى Excel.',
      },
    },
    {
      src: '/products/erp/branches.png',
      title: { en: 'Multi-Branch Control', ar: 'إدارة متعددة الفروع' },
      description: {
        en: 'Manage stock transfers, low-stock alerts, and warehouse KPIs across all locations from a single centralized ERP hub.',
        ar: 'أدر نقل المخزون وتنبيهات نقص الأصناف ومؤشرات المستودعات عبر جميع المواقع من مركز ERP واحد.',
      },
    },
  ],
  pharmacy: [
    {
      src: '/products/pharmacy/inventory.png',
      title: { en: 'Inventory & Stock', ar: 'المخزون والأصناف' },
      description: {
        en: 'Track every item by barcode with dose labels, branch stock levels, stocktake tools, and fast/slow/dead analysis to reduce waste and stockouts.',
        ar: 'تتبع كل صنف بالباركود مع ملصقات الجرعات ومستويات مخزون الفروع وأدوات الجرد وتحليل سريع/بطيء/راكد لتقليل الهدر ونقص المخزون.',
      },
    },
    {
      src: '/products/pharmacy/expiry.png',
      title: { en: 'Expiry Management', ar: 'إدارة الصلاحية' },
      description: {
        en: 'Get instant alerts on expired and near-expiry stock with value-at-risk calculations — protect margins and stay audit-ready with Excel exports.',
        ar: 'تنبيهات فورية على المخزون المنتهي وقريب الانتهاء مع حساب القيمة المعرّضة للخطر — حافظ على الهوامش وكن جاهزاً للتدقيق مع تصدير Excel.',
      },
    },
    {
      src: '/products/pharmacy/insurance.png',
      title: { en: 'Insurance Management', ar: 'إدارة التأمين' },
      description: {
        en: 'Configure insurance companies, discount rules for local vs imported drugs, process claims, and apply coverage automatically at checkout.',
        ar: 'اضبط شركات التأمين وقواعد الخصم للأدوية المحلية والمستوردة وعالج المطالبات وطبّق التغطية تلقائياً عند الدفع.',
      },
    },
    {
      src: '/products/pharmacy/promo-offers.png',
      title: { en: 'Promo Offers at POS', ar: 'عروض ترويجية عند نقطة البيع' },
      description: {
        en: 'Build offer groups tied to specific items — when the cashier scans a product, the correct discount applies instantly with zero manual calculation.',
        ar: 'أنشئ مجموعات عروض مرتبطة بأصناف محددة — عند مسح الصنف يُطبّق الخصم الصحيح فوراً دون حساب يدوي.',
      },
    },
    {
      src: '/products/pharmacy/clinics.png',
      title: { en: 'Clinic Portal Links', ar: 'روابط بوابة العيادات' },
      description: {
        en: 'Give each partner clinic a secure portal link — prescriptions arrive directly at your POS, cutting re-entry errors and speeding up dispensing.',
        ar: 'امنح كل عيادة شريكة رابط بوابة آمن — تصل الوصفات مباشرة إلى نقطة البيع، مما يقلل أخطاء الإدخال ويسرّع الصرف.',
      },
    },
    {
      src: '/products/pharmacy/reports.png',
      title: { en: 'Reports & Analytics', ar: 'التقارير والتحليلات' },
      description: {
        en: 'Drill into profit margins, branch comparisons, clinic-driven sales, delivery performance, and promo ROI — export any report to Excel in one click.',
        ar: 'تعمّق في هوامش الربح ومقارنة الفروع ومبيعات العيادات وأداء التوصيل وعائد العروض — صدّر أي تقرير إلى Excel بنقرة واحدة.',
      },
    },
    {
      src: '/products/pharmacy/hr-payroll.png',
      title: { en: 'HR & Payroll', ar: 'الموارد البشرية والرواتب' },
      description: {
        en: 'Manage pharmacists, delivery staff, and admins with roles, clock codes, base salaries, hire dates, and attendance — all linked to pharmacy operations.',
        ar: 'أدر الصيادلة وموظفي التوصيل والمديرين بالأدوار وأكواد الدوام والرواتب وتواريخ التعيين والحضور — كلها مرتبطة بعمليات الصيدلية.',
      },
    },
    {
      src: '/products/pharmacy/settings.png',
      title: { en: 'Users & ETA E-Receipt', ar: 'المستخدمون والإيصال الإلكتروني ETA' },
      description: {
        en: 'Set up role-based access, multi-branch configuration, receipt templates, and full Egyptian Tax Authority e-receipt compliance from one settings panel.',
        ar: 'اضبط الصلاحيات حسب الدور وإعدادات الفروع المتعددة وقوالب الإيصالات وامتثال إيصال مصلحة الضرائب المصرية الإلكتروني من لوحة إعدادات واحدة.',
      },
    },
  ],
  clinic: [
    {
      src: '/products/clinic/prescription-portal.png',
      title: { en: 'Clinic Prescription Portal', ar: 'بوابة وصفات العيادة' },
      description: {
        en: 'Your real clinic module — issue a private link to each partner clinic so they send prescriptions straight to the pharmacy POS. Links stay active until you deactivate or regenerate them.',
        ar: 'وحدة العيادات الفعلية — أصدر رابطاً خاصاً لكل عيادة شريكة لإرسال الوصفات مباشرة إلى نقطة بيع الصيدلية. تبقى الروابط فعّالة حتى تعطيلها أو إعادة توليدها.',
      },
    },
    {
      src: '/products/clinic/appointments.png',
      title: { en: 'Appointment Scheduling', ar: 'جدولة المواعيد' },
      description: {
        en: 'Book patients by doctor and time slot with day/week views, status tracking, and reminders — reduce no-shows and keep waiting rooms organized.',
        ar: 'احجز المرضى حسب الطبيب والموعد بعروض يوم/أسبوع مع تتبع الحالة والتذكيرات — قلّل الغياب وحافظ على تنظيم غرف الانتظار.',
      },
    },
    {
      src: '/products/clinic/emr.png',
      title: { en: 'Electronic Medical Records', ar: 'السجلات الطبية الإلكترونية' },
      description: {
        en: 'Store visit history, diagnoses, prescriptions, and vitals in one patient file — accessible instantly by authorized staff at any branch.',
        ar: 'خزّن تاريخ الزيارات والتشخيصات والوصفات والعلامات الحيوية في ملف مريض واحد — متاح فوراً للموظفين المصرّح لهم في أي فرع.',
      },
    },
    {
      src: '/products/clinic/billing.png',
      title: { en: 'Clinic Billing & Insurance', ar: 'فوترة العيادة والتأمين' },
      description: {
        en: 'Generate invoices, track insurance copays and claim status, and monitor collections — integrated with pharmacy and lab for a seamless patient journey.',
        ar: 'أصدر فواتير وتتبع حصص التأمين وحالة المطالبات وراقب التحصيل — متكامل مع الصيدلية والمختبر لرحلة مريض سلسة.',
      },
    },
  ],
  laboratory: [
    {
      src: '/products/laboratory/dashboard.png',
      title: { en: 'Lab Dashboard', ar: 'لوحة المختبر' },
      description: {
        en: 'Monitor invoiced revenue, collections, outstanding balances, net profit, tests ordered, and patient volume — filter by date and export daily operations to Excel.',
        ar: 'راقب الإيرادات المحصّلة والتحصيلات والأرصدة المستحقة وصافي الربح والفحوصات وحجم المرضى — صفِّ حسب التاريخ وصدّر العمليات اليومية إلى Excel.',
      },
    },
    {
      src: '/products/laboratory/tests.png',
      title: { en: 'Test Catalog', ar: 'فهرس الفحوصات' },
      description: {
        en: 'Define test codes, selling prices, internal costs, and turnaround times (TAT) — search, filter, and export your full catalog for pricing reviews.',
        ar: 'عرّف أكواد الفحوصات وأسعار البيع والتكاليف الداخلية ومدة التسليم — ابحث وصفِّ وصدّر الفهرس كاملاً لمراجعات التسعير.',
      },
    },
    {
      src: '/products/laboratory/billing.png',
      title: { en: 'Billing & Invoices', ar: 'الفوترة والفواتير' },
      description: {
        en: 'Create patient invoices, track paid vs due amounts by period, and export billing data — know exactly what is collected and what is still outstanding.',
        ar: 'أنشئ فواتير المرضى وتتبع المدفوع مقابل المستحق حسب الفترة وصدّر بيانات الفوترة — اعرف بالضبط ما تم تحصيله وما لا يزال مستحقاً.',
      },
    },
    {
      src: '/products/laboratory/accounting.png',
      title: { en: 'Accounting & Profitability', ar: 'المحاسبة والربحية' },
      description: {
        en: 'See revenue, cash collected, expenses, and net profit (collected minus expenses) — export profitability reports for management and auditors.',
        ar: 'شاهد الإيرادات والنقد المحصّل والمصروفات وصافي الربح (المحصّل ناقص المصروفات) — صدّر تقارير الربحية للإدارة والمدققين.',
      },
    },
  ],
  crm: [
    {
      src: '/products/crm/tasks.png',
      title: { en: 'Tasks & Workflow', ar: 'المهام وسير العمل' },
      description: {
        en: 'Assign tasks with priorities and due dates on Kanban boards — every lead, follow-up, and delivery step is visible so nothing falls through the cracks.',
        ar: 'عيّن مهاماً بأولويات وتواريخ استحقاق على لوحات Kanban — كل عميل محتمل ومتابعة وخطوة تسليم واضحة فلا يضيع شيء.',
      },
    },
    {
      src: '/products/crm/finance.png',
      title: { en: 'Finance Dashboard', ar: 'لوحة المالية' },
      description: {
        en: 'Track sales, invoices, payments, and HR headcount in real time — one dashboard for owners and managers to understand cash flow at a glance.',
        ar: 'تتبع المبيعات والفواتير والمدفوعات وعدد الموظفين في الوقت الفعلي — لوحة واحدة للمالكين والمديرين لفهم التدفق النقدي بنظرة واحدة.',
      },
    },
    {
      src: '/products/crm/customers.png',
      title: { en: 'Sales CRM', ar: 'إدارة المبيعات' },
      description: {
        en: 'Manage customers and leads with full contact history, deal stages, and activity logs — your sales team always knows the next best action.',
        ar: 'أدر العملاء والعملاء المحتملين مع سجل تواصل كامل ومراحل الصفقات وسجل النشاط — يعرف فريق المبيعات دائماً أفضل خطوة تالية.',
      },
    },
    {
      src: '/products/crm/calendar.png',
      title: { en: 'Calendar & Appointments', ar: 'التقويم والمواعيد' },
      description: {
        en: 'Schedule meetings, calls, and site visits with day/week/month views — sync your team calendar so follow-ups never get missed.',
        ar: 'جدول الاجتماعات والمكالمات والزيارات الميدانية بعروض يوم/أسبوع/شهر — زامن تقويم الفريق حتى لا تُفوت المتابعات.',
      },
    },
    {
      src: '/products/crm/support-tickets.png',
      title: { en: 'Support Tickets', ar: 'تذاكر الدعم' },
      description: {
        en: 'Log customer issues with priority, status, and assignment — full ticket history helps your support team resolve problems faster.',
        ar: 'سجّل مشاكل العملاء بالأولوية والحالة والتعيين — سجل التذاكر الكامل يساعد فريق الدعم على حل المشاكل أسرع.',
      },
    },
    {
      src: '/products/crm/support-overview.png',
      title: { en: 'Support Overview', ar: 'نظرة عامة على الدعم' },
      description: {
        en: 'Monitor open ticket count, average response time, and agent workload — identify bottlenecks before they hurt customer satisfaction.',
        ar: 'راقب عدد التذاكر المفتوحة ومتوسط وقت الاستجابة وحجم عمل الوكلاء — اكتشف الاختناقات قبل أن تؤثر على رضا العملاء.',
      },
    },
    {
      src: '/products/crm/knowledge-base.png',
      title: { en: 'Knowledge Base', ar: 'قاعدة المعرفة' },
      description: {
        en: 'Publish internal SOPs and help articles with version history — new staff ramp up faster and support answers stay consistent.',
        ar: 'انشر إجراءات التشغيل والمقالات المساعدة مع سجل الإصدارات — الموظفون الجدد يتعلمون أسرع وإجابات الدعم تبقى متسقة.',
      },
    },
  ],
  hr: [
    {
      src: '/products/hr/employees.png',
      title: { en: 'Employee Management', ar: 'إدارة الموظفين' },
      description: {
        en: 'Maintain employee records with roles (admin, pharmacist, delivery), branch assignment, base salary, hire date, and clock codes for time tracking.',
        ar: 'حافظ على سجلات الموظفين بالأدوار (مدير، صيدلي، توصيل) وتعيين الفرع والراتب الأساسي وتاريخ التعيين وأكواد الدوام لتتبع الوقت.',
      },
    },
    {
      src: '/products/hr/attendance.png',
      title: { en: 'Attendance & Time Clock', ar: 'الحضور وساعة الدوام' },
      description: {
        en: 'QR-based clock-in, shift schedules, late arrival alerts, and attendance heatmaps — accurate payroll starts with accurate time data.',
        ar: 'تسجيل حضور بـ QR وجداول الورديات وتنبيهات التأخير وخرائط حرارية للحضور — الرواتب الدقيقة تبدأ ببيانات وقت دقيقة.',
      },
    },
  ],
  marketing: [
    {
      src: '/products/marketing/campaigns.png',
      title: { en: 'Campaign Builder', ar: 'منشئ الحملات' },
      description: {
        en: 'Launch WhatsApp and email campaigns with audience segments, scheduling, and channel selection — reach customers where they actually respond.',
        ar: 'أطلق حملات واتساب وبريد إلكتروني مع شرائح الجمهور والجدولة واختيار القناة — تواصل مع العملاء حيث يستجيبون فعلاً.',
      },
    },
    {
      src: '/products/marketing/analytics.png',
      title: { en: 'Marketing Analytics', ar: 'تحليلات التسويق' },
      description: {
        en: 'Measure campaign ROI, delivery rates, open rates, and conversion funnels — know which messages drive revenue and which to stop.',
        ar: 'قِس عائد الحملات ومعدلات التسليم والفتح ومسارات التحويل — اعرف أي الرسائل تحقق إيرادات وأيها يجب إيقافها.',
      },
    },
  ],
  ai: [
    {
      src: '/products/ai/assistant.png',
      title: { en: 'Ask AI Assistant', ar: 'مساعد Ask AI' },
      description: {
        en: 'Ask business questions in natural language — get instant answers about sales, stock, reports, and operations without digging through menus.',
        ar: 'اطرح أسئلة الأعمال بلغة طبيعية — احصل على إجابات فورية عن المبيعات والمخزون والتقارير والعمليات دون البحث في القوائم.',
      },
    },
    {
      src: '/products/ai/insights.png',
      title: { en: 'Predictive Insights', ar: 'رؤى تنبؤية' },
      description: {
        en: 'AI-powered sales forecasts, reorder suggestions, and anomaly detection — act on problems and opportunities before they impact your bottom line.',
        ar: 'توقعات مبيعات مدعومة بالذكاء الاصطناعي واقتراحات إعادة الطلب وكشف الشذوذ — تصرّف قبل أن تؤثر المشاكل والفرص على أرباحك.',
      },
    },
  ],
  pos: [
    {
      src: '/products/pos/terminal.png',
      title: { en: 'POS Terminal', ar: 'محطة نقطة البيع' },
      description: {
        en: 'Fast barcode checkout with multi-payment support (cash, card, wallet), live cart totals, and receipt preview — built for high-volume pharmacy and retail.',
        ar: 'دفع سريع بالباركود مع دعم مدفوعات متعددة (نقد، بطاقة، محفظة) وإجماليات سلة مباشرة ومعاينة إيصال — مصمم للصيدليات والتجزئة عالية الحجم.',
      },
    },
    {
      src: '/products/pos/checkout.png',
      title: { en: 'Smart Checkout & Offers', ar: 'دفع ذكي وعروض' },
      description: {
        en: 'Promo offers and insurance discounts apply automatically when items are scanned — cashiers focus on service, not manual calculations.',
        ar: 'تُطبّق العروض الترويجية وخصومات التأمين تلقائياً عند مسح الأصناف — يركز الكاشير على الخدمة لا على الحسابات اليدوية.',
      },
    },
    {
      src: '/products/pos/shifts.png',
      title: { en: 'Shift & Z-Reports', ar: 'الورديات وتقارير Z' },
      description: {
        en: 'Open and close shifts with cash drawer reconciliation, daily sales breakdown by payment method, and printable Z-reports for audit compliance.',
        ar: 'افتح وأغلق الورديات مع تسوية درج النقد وتفصيل المبيعات اليومية حسب طريقة الدفع وتقارير Z قابلة للطباعة للامتثال التدقيقي.',
      },
    },
  ],
  realestate: [
    {
      src: '/products/realestate/projects.png',
      title: { en: 'Projects & Units Board', ar: 'المشاريع ولوحة الوحدات' },
      description: {
        en: 'Manage master plans, unit inventory, availability, reservations, and dynamic pricing — see available, reserved, and contracted units at a glance.',
        ar: 'أدر المخططات العامة ومخزون الوحدات والتوفر والحجوزات والتسعير الديناميكي — شاهد الوحدات المتاحة والمحجوزة والمتعاقد عليها بنظرة واحدة.',
      },
    },
    {
      src: '/products/realestate/contracts.png',
      title: { en: 'Contracts & PDF Generator', ar: 'العقود ومولّد PDF' },
      description: {
        en: 'Generate bilingual contract PDFs with buyer details, unit info, and payment plans — track signing status and export to Excel for legal records.',
        ar: 'ولّد عقود PDF ثنائية اللغة مع بيانات المشتري ومعلومات الوحدة وخطط السداد — تتبع حالة التوقيع وصدّر إلى Excel للسجلات القانونية.',
      },
    },
    {
      src: '/products/realestate/finance.png',
      title: { en: 'Real Estate Finance', ar: 'المالية العقارية' },
      description: {
        en: 'Track total sales, collections, overdue installments, cash position, trial balance, and P&L — full financial control for developers and brokers.',
        ar: 'تتبع إجمالي المبيعات والتحصيلات والأقساط المتأخرة والمركز النقدي وميزان المراجعة والأرباح — تحكم مالي كامل للمطورين والوسطاء.',
      },
    },
    {
      src: '/products/realestate/property-management.png',
      title: { en: 'Property Management', ar: 'إدارة الممتلكات' },
      description: {
        en: 'After handover, track maintenance requests linked to units and owners — assign priority, monitor status, and close jobs when repairs are complete.',
        ar: 'بعد التسليم، تتبع طلبات الصيانة المرتبطة بالوحدات والمالكين — عيّن الأولوية وراقب الحالة وأغلق المهام عند اكتمال الإصلاح.',
      },
    },
  ],
  console: [
    {
      src: '/products/console/dashboard.png',
      title: { en: 'Unified Admin Console', ar: 'لوحة إدارة موحّدة' },
      description: {
        en: 'One control panel for all Fratelanza products — see module status, active users, system health, and recent activity across your entire ecosystem.',
        ar: 'لوحة تحكم واحدة لجميع منتجات فراتيلانزا — شاهد حالة الوحدات والمستخدمين النشطين وصحة النظام والنشاط الأخير عبر منظومتك بالكامل.',
      },
    },
    {
      src: '/products/console/users.png',
      title: { en: 'User & Permission Management', ar: 'إدارة المستخدمين والصلاحيات' },
      description: {
        en: 'Create users with role-based access (admin, pharmacist, delivery), assign branches, set salaries, and print login cards — full security governance.',
        ar: 'أنشئ مستخدمين بصلاحيات حسب الدور (مدير، صيدلي، توصيل) وعيّن الفروع وحدد الرواتب واطبع بطاقات الدخول — حوكمة أمنية كاملة.',
      },
    },
    {
      src: '/products/console/monitoring.png',
      title: { en: 'System Monitoring', ar: 'مراقبة النظام' },
      description: {
        en: 'Monitor server performance, API response times, backup status, and security audit logs — proactive alerts before downtime affects your business.',
        ar: 'راقب أداء الخادم وأوقات استجابة API وحالة النسخ الاحتياطي وسجلات التدقيق الأمني — تنبيهات استباقية قبل أن يؤثر التوقف على أعمالك.',
      },
    },
  ],
}

export function getProductPreview(productId: string): string | undefined {
  return productShowcases[productId]?.[0]?.src
}
