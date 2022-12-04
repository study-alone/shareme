import { Link } from 'react-router-dom'
import { styled } from '@mui/material'
import tw from 'twin.macro'

export const Group = styled('div')(() => {
	return {
		...tw`relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out`,
		'&:hover': {
			'.image-download, .save-button, .destination, .delete-button': tw`flex`,
		},
	}
})

export const ImageDownload = styled('a')<{ hover?: boolean; absolute?: boolean }>(
	({ hover = true, absolute = true }) => {
		return `
			${hover ? 'display: none' : 'display: flex'};
			${absolute ? 'position: absolute' : ''};`
	},
	() =>
		tw`top-2 left-2 bg-white w-9 h-9 p-2 rounded-full items-center justify-center text-black text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none`,
)

export const SaveButton = styled('button')(() => ({
	...tw`hidden absolute top-2 right-2 bg-red-500 opacity-70 hover:opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none`,
}))

export const Destination = styled('a')(() => ({
	...tw`hidden absolute bottom-2 left-2 bg-white items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md`,
}))

export const DeleteButton = styled('button')(() => ({
	...tw`hidden absolute bottom-2 right-2 bg-white p-2 rounded-full w-8 h-8 items-center justify-center text-black opacity-75 hover:opacity-100 outline-none`,
}))

export const PostedBy = styled(Link)<{ isPin?: boolean }>(
	() => ({
		...tw`flex gap-2 items-center mt-2`,
		img: tw`w-8 h-8 rounded-full object-cover`,
		p: tw`font-semibold capitalize`,
	}),
	({ isPin = true }) => {
		return {
			marginTop: isPin ? '0.5rem' : '1.25rem',
			background: isPin ? 'transparent' : 'white',
			borderRadius: isPin ? 'unset' : '0.5rem',
		}
	},
)
