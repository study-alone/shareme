import { client } from '@shared/client'
import { feedQuery, searchQuery } from '@shared/client/queries'
import { PinItem, searchState } from '@shared/store'
import { useQuery } from 'react-query'
import { useRecoilValue } from 'recoil'

const fetch = async ({ queryKey }: { queryKey: string[] }) => {
	const [search] = queryKey
	if (search !== '') {
		const query = searchQuery(search.toLowerCase())
		return query ? client.fetch<PinItem[]>(query) : []
	} else {
		return client.fetch<PinItem[]>(feedQuery)
	}
}

export const useSearch = () => {
	const search = useRecoilValue(searchState)
	const result = useQuery(search, fetch, { suspense: true })

	return {
		...result,
		search,
	}
}
