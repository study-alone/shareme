import { useCallback } from 'react'
import { uiState } from './../store/ui'
import { useRecoilState } from 'recoil'

export const useLoading = () => {
	const [ui, setUi] = useRecoilState(uiState)

	const set = useCallback((loading: boolean | string) => {
		setUi({ loading })
	}, [])

	return { loading: ui.loading, set }
}
