import { useCallback, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { urlFor } from '@shared/client'
import { MdDownloadForOffline, AiTwotoneDelete, BsFillArrowUpRightCircleFill } from '@components/common'
import { useRecoilValue } from 'recoil'
import { authReadOnlyState } from '@shared/store'
import { useFavoritePin, useDeletePin, useUserInfo } from '@shared/hooks'

// styled
import { Group, Destination, DeleteButton, SaveButton, ImageDownload, PostedBy } from '@components/common/Pin.styled'

import type { PinItem } from '@shared/store/pins'

type PinProps = {
	pin: PinItem
	className?: string
}

export const Pin: React.FC<PinProps> = ({ pin }) => {
	const auth = useRecoilValue(authReadOnlyState)
	const user = useUserInfo()
	const [savingPost /** setSavingPost */] = useState(false)

	const { savePin } = useFavoritePin(pin._id)
	const { deletePin } = useDeletePin(pin._id)

	const alreadySaved = useMemo(() => {
		return !!pin.save?.filter((item) => item.postedBy._id === auth?.sub)?.length
	}, [auth?.sub, pin.save])

	const onClickSave = useCallback(() => {
		!alreadySaved && savePin()
	}, [alreadySaved, savePin])

	const { image, _id, save, destination, postedBy } = pin

	return (
		<div className="m-2 relative">
			<Group className="group">
				{image && (
					<Link to={`/pin-detail/${_id}`}>
						<img className="rounded-lg w-full " src={urlFor(image).width(250).url()} alt="user-post" />
					</Link>
				)}
				<ImageDownload href={`${image?.asset?.url}?dl=`} download className="image-download">
					<MdDownloadForOffline />
				</ImageDownload>
				<SaveButton type="button" disabled={alreadySaved} onClick={onClickSave} className="save-button">
					{save?.length} {savingPost ? 'Saving' : 'Save'}
				</SaveButton>
				{destination?.slice(8).length > 0 ? (
					<Destination href={destination} target="_blank" className="destination" rel="noreferrer">
						{' '}
						<BsFillArrowUpRightCircleFill />
						{destination?.replace(/^(https?:\/\/)?/g, '')}...
					</Destination>
				) : undefined}
				{postedBy?._id === user?._id && (
					<DeleteButton type="button" onClick={deletePin} className="delete-button">
						<AiTwotoneDelete />
					</DeleteButton>
				)}
			</Group>
			<PostedBy to={`/user-profile/${postedBy?._id}`}>
				<img src={postedBy?.image} alt="user-profile" />
				<p>{postedBy?.userName}</p>
			</PostedBy>
		</div>
	)
}
