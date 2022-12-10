import { useQuery } from 'react-query'
import { userCreatedPinsQuery, userSavedPinsQuery } from '@shared/client/queries'
import { client } from '@shared/client'
import { useUserInfo } from '@shared/hooks'

import type { PinItem } from '@shared/store/pins'

const fetch = async ({ queryKey }: { queryKey: (string | undefined)[] }) => {
	console.log(queryKey)
	const [type, userId] = queryKey
	const queries = {
		created: userCreatedPinsQuery,
		saved: userSavedPinsQuery,
	}

	if (['created', 'saved'].some((item) => item === type) && userId) {
		const queryOfType = queries[type as 'created' | 'saved']
		const query = userId ? queryOfType(userId) : null
		return query ? await client.fetch<PinItem[]>(query) : null
	}
	return null
}

export const useUserPins = (type: 'created' | 'saved') => {
	const user = useUserInfo()
	const result = useQuery([type, user?._id], fetch, { suspense: true })

	return result
}
