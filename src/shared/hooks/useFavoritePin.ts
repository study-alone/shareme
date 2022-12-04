import { useCallback } from 'react'
import { useMutation } from 'react-query'
import { useRecoilValue } from 'recoil'
import { pick, omit, get } from 'lodash-es'
import { client } from '@shared/client'
import { authReadOnlyState } from '@shared/store'

interface SavePin {
	_key: string
	userId: string
	postedBy: {
		_type: 'postedBy'
		_ref: string
	}
}
type MutateSaveItem = SavePin & { id: string }

const savePin = async (item: MutateSaveItem) => {
	const id = get(pick(item, 'id'), 'id', undefined)
	const items = [omit(item, 'id')]

	console.log({ id, items })
	return id
		? await client.patch(id).setIfMissing({ save: [] }).insert('after', 'save[-1]', items).commit()
		: undefined
}

export const useFavoritePin = (id: string) => {
	const auth = useRecoilValue(authReadOnlyState)
	const mutations = useMutation(savePin)

	const save = useCallback(
		(callback?: () => void) => {
			if (auth) {
				console.log('@@@', id)
				mutations.mutate({
					id,
					_key: auth.sub,
					userId: auth.name,
					postedBy: {
						_type: 'postedBy',
						_ref: auth.sub,
					},
				})
			}
		},
		[auth, id, mutations],
	)

	return { ...omit(mutations, 'mutate'), savePin: save }
}
