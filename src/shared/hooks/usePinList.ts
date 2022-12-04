import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { client } from '@shared/client'
import { feedQuery, searchQuery } from '@shared/client/queries'

import type { PinItem } from '@shared/store/pins'

const fetch = (categoryId?: string) => {
	const query = categoryId ? (searchQuery(categoryId) as string) : feedQuery
	return async () => await client.fetch<PinItem[]>(query)
}

export const usePinList = (categoryId?: string) => {
	const result = useQuery('getPinList', fetch(categoryId), {
		suspense: true,
	})

	return result
}
