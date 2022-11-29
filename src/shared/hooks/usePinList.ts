import { useMemo } from 'react'
import { useQuery } from 'react-query'
import { client } from '@shared/client'
import { feedQuery, searchQuery } from '@shared/client/queries'

import type { PinItem } from '@shared/store/pins'

export const usePinList = (categoryId?: string) => {
	const fetchPinList = useMemo(() => {
		const query = categoryId ? (searchQuery(categoryId) as string) : feedQuery
		return async () => {
			return await client.fetch<PinItem[]>(query)
		}
	}, [categoryId])

	const result = useQuery('getPinList', fetchPinList, {
		suspense: true,
	})

	return result
}
