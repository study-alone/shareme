import { client } from '@shared/client'
import { pinDetailMorePinQuery, pinDetailQuery } from '@shared/client/queries'
import { useQuery } from 'react-query'

interface PinDetail {
	_id: string
	about: string
	category: {
		_id: string
		value: string
	}
	comments:
		| {
				postedBy: PostedBy
				comment: string
		  }[]
		| null
	destination: string
	image: {
		asset: {
			url: string
		}
	}
	postedBy: PostedBy
	save: null | PostedBy[]
	title: string
}

const fetch = async ({ queryKey }: { queryKey: (string | undefined)[] }) => {
	const [, pinId] = queryKey
	const detailQuery = pinId ? pinDetailQuery(pinId) : null
	const detail = detailQuery ? await client.fetch<PinDetail[]>(detailQuery) : null
	const pinQuery = detail ? pinDetailMorePinQuery({ category: detail[0].category._id, _id: detail[0]._id }) : null
	const pin = pinQuery ? await client.fetch(pinQuery) : null
	console.log({ queryKey, pin, detail })
	return {
		detail: detail?.at(0),
		pin,
	}
}

interface Callbacks {
	onSuccess?(data: PinDetail[] | null): void
}

export const usePinDetail = (pinId: string | undefined, callbacks?: Callbacks) => {
	const result = useQuery(['pin-detail', pinId], fetch, {
		suspense: true,
		onSuccess(data) {
			// typeof callbacks?.onSuccess === 'function' && callbacks?.onSuccess(data)
		},
	})

	return result
}
