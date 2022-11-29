import { useCallback, useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useNavigate } from 'react-router-dom'
import { useGoogleLogin } from '@react-oauth/google'
import { client } from '@shared/client'
import { authReadOnlyState, tokenState } from '@shared/store'
import { FcGoogle, AiOutlineLoading } from '@components/common'

export const GoogleLoginButton = () => {
	const navigate = useNavigate()
	const [pending, setPending] = useState(false)
	const [token, setToken] = useRecoilState(tokenState)
	const auth = useRecoilValue(authReadOnlyState)
	const login = useGoogleLogin({
		async onSuccess(token) {
			setToken(token)
			setPending(false)
		},
		onError(error) {
			setPending(false)
			throw error
		},
	})

	const handleClick = useCallback(() => {
		setPending(true)
		login()
	}, [login])

	useEffect(() => {
		if (token && auth) {
			const doc: UserInfo = {
				_id: auth.sub,
				_type: 'user',
				userName: auth.name,
				image: auth.picture,
			}

			client.createIfNotExists(doc).then(() => {
				setPending(false)
				navigate('/', { replace: true })
			})
		}
	}, [token, auth, navigate])

	return (
		<button
			type="button"
			className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none w-190"
			onClick={handleClick}
			disabled={pending}>
			{pending ? (
				<AiOutlineLoading />
			) : (
				<>
					<FcGoogle className="mr-4" /> Sign in with google
				</>
			)}
		</button>
	)
}
