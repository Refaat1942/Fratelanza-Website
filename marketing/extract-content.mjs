// Dumps the website's bilingual content to JSON so the PDFs always match the site.
import { writeFileSync } from 'node:fs'
import * as c from '../frontend/src/data/content.ts'
import * as h from '../frontend/src/data/homepage.ts'
import * as cs from '../frontend/src/data/caseStudies.ts'
const out = {
  company: c.company, overview: c.overview, teamStrength: c.teamStrength, coreValues: c.coreValues,
  leadership: c.leadership, products: c.products, productDetails: c.productDetails, industries: c.industries,
  services: c.services, whyFratelanza: c.whyFratelanza, deliveryProcess: c.deliveryProcess,
  integrations: c.integrations, freelancerModel: c.freelancerModel, timeline: c.timeline,
  home: { solutionCards: h.solutionCards, aiCapabilities: h.aiCapabilities, whyPillars: h.whyPillars,
    networkIndustries: h.networkIndustries, deliveryExperience: h.deliveryExperience, processSteps: h.processSteps },
  caseStudies: cs.caseStudies,
}
writeFileSync(new URL('./build/content.json', import.meta.url), JSON.stringify(out, null, 1))
