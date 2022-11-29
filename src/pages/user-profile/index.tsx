import React from 'react'
import { useUserInfo } from '@shared/hooks'

type PinsProps = {
	user?: Nullable<UserInfo>
}

const UserProfile: React.FC<PinsProps> = () => {
	const user = useUserInfo()

	if (user) {
		return <div>Pins</div>
	}
	return user as null
}

export default UserProfile
