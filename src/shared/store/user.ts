import { selector } from 'recoil'
import { getUserQuery } from '@shared/client/queries'
import { client } from '@shared/client'
import { authReadOnlyState } from '@shared/store/auth'

const getUser = async (query: string): Promise<UserInfo[]> => {
	return await client.fetch(query)
}

export const userState = selector({
	key: 'userState',
	async get({ get }) {
		const auth = get(authReadOnlyState)
		const query = getUserQuery(auth?.sub || '')
		const user = query ? await getUser(query) : []

		return user.length > 0 ? user[0] : null
	},
})
