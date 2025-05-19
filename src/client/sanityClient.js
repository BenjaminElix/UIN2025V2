// src/client/sanityClient.js
import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: import.meta.env.VITE_SANITY_PROJECT_ID,  // fra .env
  dataset:    import.meta.env.VITE_SANITY_DATASET,     // fra .env
  apiVersion: '2025-01-01',  // du kan sette dagens dato eller tidligere
  useCdn:     false          // false for å alltid få siste data
})
