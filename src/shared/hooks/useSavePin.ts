import { useMutation } from 'react-query'
import { useCallback, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { identity } from 'lodash-es'
import { useUserInfo } from '@shared/hooks'
import { client } from '@shared/client'

type SavePinParmas = {
	title: string
	about: string
	destination: string
	category: string | null
	imageId?: string
}

const fetch = async ({ title, about, destination, category, imageId, userId }: SavePinParmas & { userId: string }) => {
	const doc = {
		_type: 'pin',
		title,
		about,
		destination,
		category,
		image: {
			_type: 'image',
			asset: {
				_type: 'reference',
				_ref: imageId,
			},
		},
		userId: userId,
		postedBy: {
			_type: 'postedBy',
			_ref: userId,
		},
	}
	return await client.create(doc)
}

export const useSavePin = () => {
	const user = useUserInfo()
	const navigate = useNavigate()
	const [error, setError] = useState(false)
	const { mutate } = useMutation(fetch, {
		onSuccess(data) {
			navigate('/')
		},
		onError(error) {
			/** nothing */
		},
	})

	const savePin = useCallback<(params: SavePinParmas) => void>(
		({ title, about, destination, imageId, category }) => {
			const conditions = [title, about, destination, imageId, category, user?._id]
			if (conditions.every(identity)) {
				mutate({ title, about, destination, category, imageId, userId: user?._id as string })
			} else {
				setError(true)
				setTimeout(() => setError(false), 2000)
			}
		},
		[mutate, user?._id],
	)

	return {
		savePin,
		error,
	}
}
