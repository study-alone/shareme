import { useMutation } from 'react-query'
import { v4 as uuidv4 } from 'uuid'
import { client } from '@shared/client'
import { useUserInfo } from '@shared/hooks/useUserInfo'
import { useCallback } from 'react'
import { useParams } from 'react-router-dom'

const fetch = async ({ pinId, comment, userId }: { pinId: string; comment: string; userId: string }) => {
	return await client
		.patch(pinId)
		.setIfMissing({ comments: [] })
		.insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: userId } }])
		.commit()
}

type UseAddCommentParameters = {
	// pinId: string
	// userId: string
	// comment: string
	onSuccess?(data?: unknown): void
}

export const useAddComment = ({ onSuccess }: UseAddCommentParameters) => {
	const user = useUserInfo()
	const { pinId } = useParams()
	const { mutate, isLoading } = useMutation(fetch, {
		onSuccess() {
			onSuccess && onSuccess()
		},
	})

	const add = useCallback(
		(comment: string) => {
			if (user?._id && pinId && comment) {
				mutate({ pinId, comment, userId: user?._id })
			}
		},
		[mutate, pinId, user?._id],
	)

	return {
		isLoading,
		add,
	}
}
