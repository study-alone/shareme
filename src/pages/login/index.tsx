import { GoogleLoginButton } from '@components/common'
import { GoogleOAuthProvider } from '@react-oauth/google'
import tw from 'twin.macro'

import shareVideo from '@assets/share.mp4'
import logo from '@assets/logo_white.png'
import { styled } from '@mui/material'

const LoginPageContainer = styled('div')`
	${tw`flex justify-start items-center flex-col h-screen`};
	.wrapper {
		${tw`relative w-full h-full`};
	}
	.background-video {
		${tw`w-full h-full object-cover`};
	}
	.contents {
		${tw`absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay`};

		.logo {
			${tw`p-5`};

			img {
				width: 130px;
			}
		}

		.login-button {
			${tw`shadow-2xl`}
		}
	}
`

type LoginProps = {
	/** nothing */
}

const LoginPage: React.FC<LoginProps> = () => {
	return (
		<GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_API_TOKEN}>
			<LoginPageContainer>
				<div className="wrapper">
					<video loop controls={false} muted autoPlay className="background-video">
						<source src={shareVideo} type="video/mp4" />
					</video>
					<div className="contents">
						<div className="logo">
							<img src={logo} alt="logo" />
						</div>
						<div className="login-button">
							<GoogleLoginButton />
						</div>
					</div>
				</div>
			</LoginPageContainer>
		</GoogleOAuthProvider>
	)
}

export default LoginPage
