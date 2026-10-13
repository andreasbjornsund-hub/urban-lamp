import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { FEATURE_KEYS } from './lib/feature-keys';

/*
 * One JSON file per phone in src/content/phones/. The file name is the URL slug.
 * Generated from the master data workbook by scripts/import_phones.py: change the workbook (or the import rules),
 * not the JSON. Only image and imageAlt are edited by hand. Every page, comparison and schema block is built from it.
 */

const ZONES_GAS = ['0', '1', '2'] as const;
const ZONES_DUST = ['20', '21', '22'] as const;

const certificate = z.object({
  /** Full Ex marking string as printed on the certificate, e.g. "II 2G Ex db IIC T6 Gb" */
  marking: z.string(),
  /** Certificate number, e.g. "FIDI 26 ATEX 0016X" */
  number: z.string().optional(),
  /** What the certificate covers when it isn't every version, e.g. "S02 cemented variant only" */
  scope: z.string().optional(),
});

const labelled = z.object({ label: z.string(), value: z.string() });

const phones = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/phones' }),
  schema: ({ image }) =>
    z.object({
      /** Product ID in the master data workbook */
      productId: z.string(),
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
      formFactor: z.enum(['smartphone', 'feature-phone', 'radio']).default('smartphone'),
      /** For Ex cases and conversions: the phone inside */
      hostDevice: z.string().optional(),
      status: z.enum(['current', 'discontinued']).default('current'),
      /** Shown with the status, e.g. why availability should be checked */
      statusNote: z.string().optional(),
      /** Slug of the phone that replaces a discontinued one */
      successor: z.string().optional(),
      launchYear: z.number().optional(),
      summary: z.string(),
      image: image().optional(),
      imageAlt: z.string().optional(),

      certification: z.object({
        atex: certificate.optional(),
        iecex: certificate.optional(),
        /** Additional national or regional schemes */
        ukex: z.string().optional(),
        otherSchemes: z.array(z.string()).default([]),
        /** Short summary when the full marking isn't published, e.g. "ATEX / IECEx Zone 1" */
        note: z.string().optional(),
        zonesGas: z.array(z.enum(ZONES_GAS)),
        zonesDust: z.array(z.enum(ZONES_DUST)).default([]),
        /** Full North American approval text (NEC/CEC) */
        northAmerica: z.string().optional(),
        /** "Class I Division 1" or "Class I Division 2" */
        division: z.string().optional(),
        protection: z.string().optional(),
        gasGroup: z.enum(['IIA', 'IIB', 'IIC']).optional(),
        dustGroup: z.enum(['IIIA', 'IIIB', 'IIIC']).optional(),
        tempClass: z.enum(['T1', 'T2', 'T3', 'T4', 'T5', 'T6']).optional(),
        /** Maximum surface temperature in dust, e.g. "135 °C" */
        maxSurfaceTemp: z.string().optional(),
        epl: z.string().optional(),
        ambient: z.string().optional(),
        standards: z.array(z.string()).default([]),
      }),

      /** Rules for use in the hazardous area, from the certificate's specific conditions */
      safety: z
        .object({
          charging: z.string(),
          chargingInZone: z.boolean(),
          batterySwap: z.string(),
          conditions: z.string(),
        })
        .partial()
        .default({}),

      os: z.object({
        name: z.enum(['iOS', 'Android', 'Other']),
        version: z.string(),
        atLaunch: z.string().optional(),
        upgradeLimit: z.string().optional(),
        /** ISO date of the last promised security update */
        securityUntil: z.string().optional(),
        updates: z.string().optional(),
        enterprise: z.string().optional(),
      }),

      specs: z
        .object({
          display: z.string(),
          resolution: z.string(),
          refreshRate: z.string(),
          brightness: z.string(),
          chip: z.string(),
          ram: z.string(),
          storage: z.string(),
          camera: z.string(),
          frontCamera: z.string(),
          video: z.string(),
          battery: z.string(),
          batteryLife: z.string(),
          port: z.string(),
          wirelessCharging: z.string(),
          /** Short tags used by filters and comparisons, e.g. ["5G", "Wi-Fi 6E", "NFC", "eSIM"] */
          connectivity: z.array(z.string()),
          network: z.string(),
          bands: z.string(),
          wifi: z.string(),
          bluetooth: z.string(),
          nfc: z.string(),
          gnss: z.string(),
          sim: z.string(),
          keys: z.string(),
          accessories: z.string(),
          biometrics: z.string(),
          depthSensing: z.string(),
          satellite: z.string(),
          uwb: z.string(),
          touch: z.string(),
          apps: z.string(),
          ipRating: z.string(),
          /** IP code in the Ex certificate */
          exIp: z.string(),
          ruggedness: z.string(),
          operatingTemp: z.string(),
          weightG: z.number(),
          weightNote: z.string(),
          dimensionsMm: z.string(),
          partNumbers: z.string(),
          cameraFree: z.boolean(),
          pttKey: z.boolean(),
          gloveTouch: z.boolean(),
          replaceableBattery: z.boolean(),
          mdm: z.array(z.string()),
        })
        .partial()
        .default({}),

      /** What works through the case or housing (Ex cases and conversions) */
      throughCase: z.array(labelled).default([]),
      /** Field capabilities and how they're delivered: built in, via app or via accessory */
      capabilities: z.array(labelled).default([]),
      /** Versions listed on this page: mining versions, channel listings, lid types */
      variants: z
        .array(
          z.object({
            name: z.string(),
            description: z.string(),
            marking: z.string().optional(),
            certificates: z.string().optional(),
            partNumber: z.string().optional(),
          }),
        )
        .default([]),
      /**
       * Values from a single or secondary source, or where sources disagree, keyed by field path
       * ("certification.atex.marking", "specs.ram", "capabilities.Push-to-talk"). The note is shown on the page.
       */
      unconfirmed: z.record(z.string(), z.string()).default({}),
      /** Verified features not already shown by the specs above (keys in src/lib/feature-keys.ts) */
      features: z.array(z.enum(FEATURE_KEYS)).default([]),
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
