import React, { useCallback, useState } from 'react'
import { MdDownloadForOffline } from '@components/common'
import { v4 as uuidv4 } from 'uuid'
import { client, urlFor } from '@shared/client'
import { Tiles } from '@components/Tiles'
import { Spinner } from '@components/common'
import { usePinDetail, useUserInfo } from '@shared/hooks'
import { pinDetailMorePinQuery, pinDetailQuery } from '@shared/client/queries'
import { useParams } from 'react-router-dom'
import { ImageDownload, PostedBy } from '@components/common/Pin.styled'
import { Link } from '@mui/material'

type PinDetailProps = {
	/** nothing */
}

const PinDetail: React.FC<PinDetailProps> = () => {
	const user = useUserInfo()
	const [pins, setPins] = useState(null)
	const [comment, setComment] = useState('')
	const [addingComment, setAddingComment] = useState(false)
	const { pinId } = useParams()
	const { data } = usePinDetail(pinId)

	const handleChangeComment: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		setComment(event.target.value)
	}, [])

	return (
		<div className="flex xl-flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
			{data?.detail && (
				<>
					<div className="flex justify-center items-center md:items-star flex-initial">
						<img
							src={data.detail.image && urlFor(data.detail.image).url()}
							alt="pin detail"
							className="rounded-t-3xl rounded-b-lg"
						/>
					</div>
					<div className="w-full p-5 flex-1 xl:min-w-620">
						<div className="flex items-center justify-between">
							<div className="flex gap-2 items-center">
								<ImageDownload
									hover={false}
									absolute={false}
									href={`${data.detail.image.asset.url}?dl=`}
									download
									className="image-download">
									<MdDownloadForOffline />
								</ImageDownload>
							</div>
							<a href={data.detail.destination} target="_blank" rel="noreferrer">
								{data.detail.destination}
							</a>
						</div>
						<div>
							<h1 className="text-4xl font-bold break-words mt-3">{data.detail.title}</h1>
							<p className="mt-3">{data.detail.about}</p>
						</div>
						<PostedBy to={`/user-profile/${data.detail.postedBy._id}`} isPin={false}>
							<img src={data.detail.postedBy?.image} alt="user-profile" />
							<p>{data.detail.postedBy?.userName}</p>
						</PostedBy>
						<h2 className="mt-5 text-2xl">Comments</h2>
						<div className="max-h-370 overflow-y-auto">
							{data.detail.comments?.map((comment, index) => (
								<div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={index}>
									<img
										src={comment.postedBy.image}
										alt="uset profile"
										className="w-10 h-10 rounded-full cursor-pointer"
									/>
									<div className="flex flex-col">
										<p className="font-bold">{comment.postedBy.userName}</p>
										<p>{comment.comment}</p>
									</div>
								</div>
							))}
						</div>
					</div>
				</>
			)}
			{data?.detail && (
				<div className="flex flex-wrap mt-6 gap-3 items-center">
					<PostedBy to={`/user-profile/${data.detail.postedBy._id}`} isPin={false}>
						<img src={data.detail.postedBy.image} alt="user-profile" />
						<p>{data.detail.postedBy?.userName}</p>
					</PostedBy>
					<input
						type="text"
						className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
						placeholder="Add a comment"
						value={comment}
						onChange={handleChangeComment}
					/>
				</div>
			)}
		</div>
	)
}

export default PinDetail
