import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import axios from 'axios'

const { persistAtom } = recoilPersist({
	key: '__shareme__',
})

const getUserAuth = async (access_token: string) => {
	if (access_token) {
		return await axios
			.get('https://www.googleapis.com/oauth2/v3/userinfo', {
				headers: {
					Authorization: `Bearer ${access_token}`,
				},
			})
			.then((res) => res.data)
			.catch((error) => null)
	} else {
		return null
	}
}

export const tokenState = atom<UserInfo | { access_token: null | string }>({
	key: 'tokenState',
	default: {
		access_token: null,
	},
	effects: [persistAtom],
})

export const authReadOnlyState = selector<GoogleOAuthUserinfo | null>({
	key: 'authReadOnlyState',
	get: async ({ get }) => {
		const { access_token } = get(tokenState)

		return access_token ? await getUserAuth(access_token) : null
	},
})
