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

	interface PostedBy {
		_id: string
		image: string
		userName: string
	}

	interface Save {
		_key: string
		postedBy: PostedBy
	}
}

export {}
