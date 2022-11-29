import { useCallback } from 'react'

export const useEventUtil = <E = HTMLButtonElement>() => {
	const stopPropagation: React.MouseEventHandler<E> = useCallback((event) => {
		event.stopPropagation()
	}, [])

	const preventDefault: React.MouseEventHandler<E> = useCallback((event) => {
		event.stopPropagation()
	}, [])

	return { stopPropagation, preventDefault }
}
