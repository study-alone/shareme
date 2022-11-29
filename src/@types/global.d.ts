declare global {
	interface GoogleOAuthUserinfo {
		email: string
		email_verified: boolean
		family_name: string
		given_name: string
		locale: string
		name: string
		picture: string
		sub: string
	}

	interface UserInfo {
		access_token?: string
		image: string
		userName: string
		_id: string
		_type: 'user'
	}
}

export {}
