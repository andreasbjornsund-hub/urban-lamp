import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

/*
 * One JSON file per phone in src/content/phones/. The file name is the URL slug.
 * Facts must match the compliance-verified set (llms-full.txt / reasoning.json); leave a field
 * out rather than guess. Every page, comparison and schema block is generated from this data.
 */

const ZONES_GAS = ['0', '1', '2'] as const;
const ZONES_DUST = ['20', '21', '22'] as const;

const certificate = z.object({
  /** Full Ex marking string as printed on the certificate, e.g. "II 2G Ex db IIC T6 Gb" */
  marking: z.string(),
  /** Certificate number, e.g. "FIDI 26 ATEX 0016X" */
  number: z.string().optional(),
});

const phones = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/phones' }),
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      brand: z.string(),
      brandSlug: z.string(),
      manufacturer: z.object({
        name: z.string(),
        country: z.string(),
        website: z.url(),
      }),
      /** How the phone achieves its rating */
      type: z.enum(['dedicated', 'ex-case', 'conversion']),
      /** For Ex cases and conversions: the phone inside */
      hostDevice: z.string().optional(),
      summary: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),

      certification: z.object({
        atex: certificate.optional(),
        iecex: certificate.optional(),
        /** Additional national or regional schemes */
        otherSchemes: z.array(z.string()).default([]),
        /** Short summary when the full marking isn't published, e.g. "ATEX / IECEx Zone 1" */
        note: z.string().optional(),
        zonesGas: z.array(z.enum(ZONES_GAS)),
        zonesDust: z.array(z.enum(ZONES_DUST)).default([]),
        division: z.string().optional(),
        protection: z.string().optional(),
        gasGroup: z.enum(['IIA', 'IIB', 'IIC']).optional(),
        tempClass: z.enum(['T1', 'T2', 'T3', 'T4', 'T5', 'T6']).optional(),
        epl: z.string().optional(),
        ambient: z.string().optional(),
        standards: z.array(z.string()).default([]),
      }),

      os: z.object({
        name: z.enum(['iOS', 'Android']),
        version: z.string(),
        updates: z.string().optional(),
      }),

      specs: z
        .object({
          display: z.string(),
          chip: z.string(),
          battery: z.string(),
          charging: z.string(),
          camera: z.string(),
          connectivity: z.array(z.string()),
          storage: z.string(),
          ipRating: z.string(),
          ruggedness: z.string(),
          weightG: z.number(),
          weightNote: z.string(),
          dimensionsMm: z.string(),
          pttKey: z.boolean(),
          gloveTouch: z.boolean(),
          replaceableBattery: z.boolean(),
          mdm: z.array(z.string()),
        })
        .partial()
        .default({}),

      strengths: z.array(z.string()).min(1),
      limitations: z.array(z.string()).min(1),
      /** Slugs under /best/ */
      bestFor: z.array(z.string()).default([]),
      /** Slugs of the closest alternatives, shown in the comparison */
      alternatives: z.array(z.string()).default([]),
      /** Commercial relationship: shown as a labelled disclosure on the page */
      sponsor: z.boolean().default(false),
      price: z.literal('on-request').default('on-request'),
      lastVerified: z.coerce.date(),
      sources: z.array(z.object({ label: z.string(), url: z.url() })).min(1),
    }),
});

export const collections = { phones };
