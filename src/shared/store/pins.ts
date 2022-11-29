import { atom, selectorFamily } from 'recoil'
import { searchQuery, feedQuery } from '@shared/client/queries'
import { client } from '@shared/client'

export const pinsRefreshState = atom({
	key: 'pinsRefreshState',
	default: 0,
})

export interface PinItem {
	destination: string
	image: {
		asset: {
			url: string
		}
	}
	postedBy: {
		image: string
		userName: string
		_id: string
	} | null
	save:
		| null
		| {
				postedBy: {
					_id: string
					userName: string
					image: string
				}
				userId: string
		  }[]
	_id: string
}

export const pinsReadOnlyState = selectorFamily<PinItem[], string | undefined>({
	key: 'pinsReadOnlyState',
	get:
		(categoryId) =>
		async ({ get }) => {
			get(pinsRefreshState)
			const query = categoryId ? (searchQuery(categoryId) as string) : feedQuery
			const data = await client.fetch(query)
			console.table(data)
			return data
		},
})
