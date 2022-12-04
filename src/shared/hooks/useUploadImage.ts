import { useCallback, useMemo, useState } from 'react'
import { useMutation } from 'react-query'
import { isNull, toArray } from 'lodash-es'
import { client } from '@shared/client'

import type { SanityImageAssetDocument } from '@sanity/client'

const fetch = async (file: File) => {
	const document = await client.assets.upload('image', file, { contentType: file.type })
	return document
}

export const useUploadImage = (acceptImageList: string[]) => {
	const [wrongImageType, setWrongImageType] = useState(false)
	const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(null)
	const { mutate, isLoading } = useMutation(fetch, {
		onSuccess(data) {
			setImageAsset(data)
		},
		onError(error) {
			console.log('Image upload error', error)
		},
	})

	const acceptList = useMemo(() => {
		return acceptImageList.map((item) => `image/${item}`)
	}, [acceptImageList])

	const uploadImage: React.ChangeEventHandler<HTMLInputElement> = useCallback(
		(event) => {
			const selectedFile = event.target.files
			const type = toArray(selectedFile).at(0)?.type

			if (!isNull(selectedFile) && acceptList.some((item) => type)) {
				setWrongImageType(false)
				mutate(selectedFile[0])
			} else {
				setWrongImageType(true)
			}
		},
		[acceptList, mutate],
	)

	const reset = useCallback(() => {
		setImageAsset(null)
	}, [])

	return {
		upload: uploadImage,
		error: wrongImageType,
		loading: isLoading,
		image: imageAsset,
		accept: acceptList.toString(),
		reset,
	}
}
