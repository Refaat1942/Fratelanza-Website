import { Helmet } from 'react-helmet-async'
import { company, t } from '@/data/content'

type SEOProps = {
  title: string
  description: string
  path?: string
  type?: string
}

const SITE_URL = 'https://www.fratelanza.com'

export function SEO({ title, description, path = '', type = 'website' }: SEOProps) {
  const url = `${SITE_URL}${path}`
  const fullTitle = `${title} | ${company.name}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={`${SITE_URL}/og-image.png`} />
      <meta property="og:site_name" content={company.name} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${SITE_URL}/og-image.png`} />
    </Helmet>
  )
}

export function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description: t(company.slogan, 'en'),
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: company.phone,
      contactType: 'customer service',
      email: company.email,
    },
    sameAs: Object.values(company.social),
  }

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
