import React from 'react'
import Masonry from 'react-masonry-css'
import { Pin } from '@components/common'

import type { PinItem } from '@shared/store/pins'

const breakPoint = {
	default: 4,
	3000: 6,
	2000: 5,
	1200: 3,
	1000: 2,
	500: 1,
}

type TitlesProps = {
	pins: PinItem[]
}

export const Tiles: React.FC<TitlesProps> = ({ pins }) => {
	return (
		<Masonry className="flex animate-slide-fwd" breakpointCols={breakPoint}>
			{pins.map((pin) => (
				<Pin key={pin._id} pin={pin} />
			))}
		</Masonry>
	)
}
