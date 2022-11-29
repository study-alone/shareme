import React from 'react'
import { useParams } from 'react-router-dom'
import { Tiles } from '@components/Tiles'
import { usePinList } from '@shared/hooks'

type FeedProps = {
	[key: string]: string
}

const Feed: React.FC<FeedProps> = (props) => {
	const { categoryId } = useParams()
	const { data: pins } = usePinList(categoryId)

	if (pins) {
		return <div>{pins.length > 0 && <Tiles pins={pins} />}</div>
	} else {
		return <span>Loading</span>
	}
}

export default Feed
