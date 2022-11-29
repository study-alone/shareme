import { atom } from 'recoil'

interface UiState {
	loading: boolean | string
}

export const uiState = atom<UiState>({
	key: 'uiState',
	default: {
		loading: false,
	},
})
