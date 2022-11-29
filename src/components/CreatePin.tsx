import React, { useCallback, useMemo, useState } from 'react'
import { AiOutlineCloudUpload, MdDelete, Spinner } from '@components/common'
import { client } from '@shared/client'
import { categories } from '@shared/categories'
import { useUserInfo } from '@shared/hooks'
import { useNavigate } from 'react-router-dom'
import { isNull, toArray } from 'lodash-es'

import type { SanityImageAssetDocument } from '@sanity/client'

type CreatePinProps = {
	[key: string]: string
}

type InputProp = {
	value: string | number
	onChange?: React.ChangeEventHandler<HTMLInputElement>
	placeholder?: string
}
const Input: React.FC<InputProp> = ({ value, placeholder, onChange }) => {
	return (
		<input
			type="text"
			value={value}
			onChange={onChange}
			placeholder={placeholder}
			className={`outline-none ${'text-2xl'} sm:text-3xl font-bold border-b-2 border-gray-200 p-2`}
		/>
	)
}

const CreatePin: React.FC<CreatePinProps> = ({}) => {
	const user = useUserInfo()
	const [title, setTitle] = useState('')
	const [about, setAbout] = useState('')
	const [destination, setDestination] = useState('')
	const [loading, setLoading] = useState(false)
	const [fields, setFields] = useState(null)
	const [category, setCategory] = useState(null)
	const [imageAsset, setImageAsset] = useState<SanityImageAssetDocument | null>(null)
	const [wrongImageType, setWrongImageType] = useState(false)

	const navigate = useNavigate()

	const acceptImageList = useMemo(() => {
		return ['png', 'jpg', 'jpeg', 'svg', 'gif', 'ttif'].map((item) => `image/${item}`)
	}, [])

	const uploadImage: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		const selectedFile = event.target.files
		const type = toArray(selectedFile).at(0)?.type
		if (!isNull(selectedFile) && acceptImageList.some((item) => type)) {
			setWrongImageType(false)
			setLoading(true)

			client.assets
				.upload('image', selectedFile[0], { contentType: type })
				.then((document) => {
					setImageAsset(document)
					setLoading(false)
				})
				.catch((error) => {
					console.log('Image upload error', error)
				})
		} else {
			setWrongImageType(true)
		}
	}, [])

	return (
		<div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
			{fields && (
				<p className="text-red-red-500 mb-5 text-xl transition-all duration-150 ease-in">
					Please fill in all the fields.
				</p>
			)}
			<div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
				<div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
					<div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
						{loading && <Spinner />}
						{wrongImageType && <p>Wrong image type</p>}
						{!imageAsset ? (
							<label>
								<div className="flex flex-col items-center justify-content h-full">
									<div className="flex flex-col justify-center items-center">
										<p className="font-bold text-2xl">
											<AiOutlineCloudUpload />
										</p>
										<p className="text-lg"> Click to upload</p>
									</div>
									<p className="mt-32 text-gray-400">
										Use high-quality JPG, SVG, PNG, GIF or TTIF less than 20MB
									</p>
								</div>
								<input
									type="file"
									name="upload-image"
									className="w-0 h-0"
									onChange={uploadImage}
									accept={acceptImageList.toString()}
								/>
							</label>
						) : (
							<div className="flex relative h-full">
								<img src={imageAsset.url} alt="user`s uploaded" className="object-cover self-center" />
								<button
									type="button"
									className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shado-md transition-all duration-500 ease-in-out"
									onClick={() => setImageAsset(null)}>
									<MdDelete />
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
					<Input
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Add your title here"
					/>

					{user && (
						<div className="flex gap-2 my-2 items-center bg-white rounded-lg">
							<img src={user.image} alt="user profile" className="h-10 w-10 rounded-full" />
							<p className="font-bold">{user.userName}</p>
						</div>
					)}
					<Input
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="What is your pin about"
					/>
				</div>
			</div>
		</div>
	)
}

export default CreatePin
