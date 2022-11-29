import sanityClient from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

export const client = sanityClient({
	projectId: import.meta.env.VITE_APP_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2021-11-16',
	useCdn: false,
	token: import.meta.env.VITE_APP_SANITY_TOKEN,
})

const builder = imageUrlBuilder(client)

export const urlFor = (source: SanityImageSource) => builder.image(source)
