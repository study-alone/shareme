import { useLoading } from '@shared/hooks'
import { Circles } from 'react-loader-spinner'
import { styled } from '@mui/material'
import tw from 'twin.macro'

const SpinerContainer = styled('div')(() => ({
	...tw`flex flex-col justify-center items-center w-full h-full fixed top-0 left-0 before:bg-black before:opacity-20 before:w-full before:h-full before:absolute before:top-0 before:left-0`,
	p: tw`text-lg text-center px-2 relative font-bold`,
}))

export const Spinner = () => {
	const { loading } = useLoading()

	return (
		<SpinerContainer>
			<Circles color="#5beffd" height={50} width={200} wrapperClass="m-5 relative" />
			<p>{loading}</p>
		</SpinerContainer>
	)
}
