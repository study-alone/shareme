import React from 'react'
import { Tiles } from './Tiles'
import { useSearch } from '@shared/hooks'

type SearchProps = {
	/** nothing */
}

const Search: React.FC<SearchProps> = () => {
	const { data: pins, search } = useSearch()

	return (
		<div>
			{pins && pins.length > 0 && <Tiles pins={pins} />}
			{!pins ||
				(pins?.length === 0 && search !== '' && (
					<div className="mt-10 text-center text-xl ">No Pins Found!</div>
				))}
		</div>
	)
}

export default Search
