import React, { useCallback, useState } from 'react'
import { AiOutlineCloudUpload, MdDelete, Spinner } from '@components/common'
import { categories } from '@shared/categories'
import { useSavePin, useUploadImage, useUserInfo } from '@shared/hooks'
import { styled } from '@mui/material'

type CreatePinProps = {
	/** nothing */
}

const CreatePin: React.FC<CreatePinProps> = () => {
	const user = useUserInfo()
	const [title, setTitle] = useState('')
	const [about, setAbout] = useState('')
	const [destination, setDestination] = useState('')
	const [category, setCategory] = useState<string | null>(null)

	const { upload, image, loading, error, accept, reset } = useUploadImage([
		'png',
		'jpg',
		'jpeg',
		'svg',
		'gif',
		'ttif',
	])

	const { error: saveError, savePin } = useSavePin()

	const save = useCallback(() => {
		savePin({ title, category, about, destination, imageId: image?._id })
	}, [about, category, destination, image?._id, savePin, title])

	return (
		<div className="flex flex-col justify-center items-center mt-5 lg:h-4/5">
			{saveError && (
				<p className="text-red-red-500 mb-5 text-xl transition-all duration-150 ease-in">
					Please fill in all the fields.
				</p>
			)}
			<div className="flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full">
				<div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
					<div className="flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420">
						{loading && <Spinner />}
						{error && <p>Wrong image type</p>}
						{!image ? (
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
									onChange={upload}
									accept={accept}
								/>
							</label>
						) : (
							<div className="flex relative h-full">
								<img src={image.url} alt="user`s uploaded" className="object-cover self-center" />
								<button
									type="button"
									className="absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer outline-none hover:shado-md transition-all duration-500 ease-in-out"
									onClick={reset}>
									<MdDelete />
								</button>
							</div>
						)}
					</div>
				</div>
				<div className="flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full">
					<input
						type="text"
						value={title}
						onChange={(event) => setTitle(event.target.value)}
						placeholder="Add your title here"
						className="outline-none text-2xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 "
					/>

					{user && (
						<div className="flex gap-2 my-2 items-center bg-white rounded-lg">
							<img src={user.image} alt="user profile" className="h-10 w-10 rounded-full" />
							<p className="font-bold">{user.userName}</p>
						</div>
					)}
					<input
						type="text"
						value={about}
						onChange={(event) => setAbout(event.target.value)}
						placeholder="What is your pin about"
						className="outline-none text-base sm:text-lg font-bold border-b-2 border-gray-200 p-2 "
					/>
					<input
						type="text"
						value={destination}
						onChange={(event) => setDestination(event.target.value)}
						placeholder="Add your destination link"
						className="outline-none text-base sm:text-lg font-bold border-b-2 border-gray-200 p-2 "
					/>
					<div className="flex flex-col">
						<div>
							<p className=" mb-2 semibold text-lg sm:text-xl">Choose Pin Category</p>
							<select
								onChange={(event) => setCategory(event.target.value)}
								className="outline-none w-4/5 text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer">
								<option value="other" className="bg-white">
									Select Category
								</option>
								{categories.map((category) => (
									<option
										className="text-base border-0 outline-none capitalize bg-white text-black"
										value={category.name}
										key={`category-option-${category.name}`}>
										{category.name}
									</option>
								))}
							</select>
						</div>
						<div className="flex justify-end items-end mt-5">
							<button
								type="button"
								onClick={save}
								className="bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none">
								Save Pin
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePin
