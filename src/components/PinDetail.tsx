import React, { useCallback, useState } from 'react'
import { MdDownloadForOffline } from '@components/common'
import { urlFor } from '@shared/client'
import { Tiles } from '@components/Tiles'
import { useAddComment, usePinDetail } from '@shared/hooks'
import { useParams } from 'react-router-dom'
import { ImageDownload, PostedBy } from '@components/common/Pin.styled'
import { Link } from '@mui/material'

type PinDetailProps = {
	/** nothing */
}

const PinDetail: React.FC<PinDetailProps> = () => {
	const [comment, setComment] = useState('')
	const { pinId } = useParams()
	const { data, refetch } = usePinDetail(pinId)
	const { add: addCommentFetch, isLoading: isLoadingComment } = useAddComment({
		onSuccess() {
			refetch()
			setComment('')
		},
	})

	const handleChangeComment: React.ChangeEventHandler<HTMLInputElement> = useCallback((event) => {
		setComment(event.target.value)
	}, [])

	const addComment = useCallback(() => {
		if (comment) {
			addCommentFetch(comment)
		}
	}, [addCommentFetch, comment])

	return (
		<>
			<div
				className="flex xl-flex-row flex-col m-auto bg-white"
				style={{ maxWidth: '1500px', borderRadius: '32px' }}>
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
					<div className="flex flex-wrap mt-6 gap-3">
						<Link href={`/user-profile/${data.detail.postedBy._id}`}>
							<img
								src={data.detail.postedBy.image}
								alt="user-profile"
								className="w-10 h-10 rounded-full cursor-pointer"
							/>
						</Link>
						<input
							type="text"
							className="flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
							placeholder="Add a comment"
							value={comment}
							onChange={handleChangeComment}
						/>
						<button
							type="button"
							className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
							onClick={addComment}>
							{isLoadingComment ? 'Posting the comment...' : 'Post'}
						</button>
					</div>
				)}
			</div>
			{data?.pin && data?.pin.length && (
				<>
					<h2 className="text-center font-bold text-2xl mt-8 mb-4">More like this</h2>
					<Tiles pins={data.pin} />
				</>
			)}
		</>
	)
}

export default PinDetail
