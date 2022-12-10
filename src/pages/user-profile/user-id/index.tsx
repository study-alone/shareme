import React, { useCallback, useState } from 'react'
import { useUserInfo, useUserPins } from '@shared/hooks'
import { AiOutlineLogout } from 'react-icons/ai'
import { Tiles } from '@components/Tiles'
import { capitalize } from 'lodash-es'
import { googleLogout } from '@react-oauth/google'

// fetch
import { useRecoilState } from 'recoil'
import { tokenState } from '@shared/store'

const activeBtnStyles = 'bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none'
const notActiveBtnStyles = 'bg-primary mr-4 text-black font-bold p-2 rounded-full w-20 outline-none'

type ModifyButtonProps = {
	type: 'created' | 'saved'
	onClick(event: React.MouseEvent<HTMLButtonElement>, type: 'created' | 'saved'): void
	className?: string
}
const ModifyButton: React.FC<ModifyButtonProps> = ({ className = '', onClick, type }) => {
	const handleClick: React.MouseEventHandler<HTMLButtonElement> = useCallback(
		(event) => {
			onClick(event, type)
		},
		[onClick, type],
	)

	return (
		<button type="button" onClick={handleClick} className={`${className} capitalize`}>
			{capitalize(type)}
		</button>
	)
}

type PinsProps = {
	user?: Nullable<UserInfo>
}

const UserProfile: React.FC<PinsProps> = () => {
	const user = useUserInfo()
	const [text, setText] = useState<'created' | 'saved'>('created')
	const [activeButton, setActiveButton] = useState<'created' | 'saved'>('created')
	const [, setToken] = useRecoilState(tokenState)
	const { data: pins } = useUserPins(text)

	const handleText = useCallback((event: React.MouseEvent<HTMLButtonElement>, type: 'created' | 'saved') => {
		setText(type)
		setActiveButton(type)
	}, [])

	const handleLogout = useCallback(() => {
		setToken({ access_token: null })
		googleLogout()
	}, [setToken])

	return (
		<div className="relative pb-2 h-full justify-center items-center">
			<div className="flex flex-col pb-5">
				{user && (
					<div className="relative flex flex-col mb-7">
						<div className="flex flex-col justify-center items-center">
							<img
								className=" w-full h-370 2xl:h-510 shadow-lg object-cover"
								src="https://source.unsplash.com/1600x900/?nature,photography,technology"
								alt="user-pic"
							/>
							<img
								className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
								src={user.image}
								alt="user-pic"
							/>
						</div>
						<h1 className="font-bold text-3xl text-center mt-3">{user.userName}</h1>
						<div className="absolute top-0 z-1 right-0 p-2">
							<button
								type="button"
								className=" bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
								onClick={handleLogout}>
								<AiOutlineLogout color="red" fontSize={21} />
							</button>
						</div>
					</div>
				)}
				<div className="text-center mb-7">
					<ModifyButton
						type="created"
						onClick={handleText}
						className={activeButton === 'created' ? activeBtnStyles : notActiveBtnStyles}
					/>
					<ModifyButton
						type="saved"
						onClick={handleText}
						className={activeButton === 'saved' ? activeBtnStyles : notActiveBtnStyles}
					/>
				</div>

				{!pins || pins?.length === 0 ? (
					<div className="flex justify-center font-bold items-center w-full text-1xl mt-2">
						No Pins Found!
					</div>
				) : (
					<div className="px-2">
						<Tiles pins={pins} />
					</div>
				)}
			</div>
		</div>
	)
}

export default UserProfile
