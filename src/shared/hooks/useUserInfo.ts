import { userState } from '@shared/store'
import { useRecoilValue } from 'recoil'

export const useUserInfo = () => {
	const user = useRecoilValue(userState)

	return user
}
