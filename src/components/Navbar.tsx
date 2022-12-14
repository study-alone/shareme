import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { IoMdAdd, IoMdSearch } from '@components/common'
import { useRecoilState } from 'recoil'
import { searchState } from '@shared/store/search'
import { useUserInfo } from '@shared/hooks'

type NavbarProps = {
	[key: string]: string
}

const Navbar: React.FC<NavbarProps> = () => {
	const [search, setSearch] = useRecoilState(searchState)
	const user = useUserInfo()
	const navigate = useNavigate()

	return (
		<div className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
			<div className="flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm">
				<IoMdSearch fontSize={21} className="ml-1" />
				<input
					type="text"
					onChange={(event) => setSearch(event.target.value)}
					placeholder="Search"
					value={search}
					onFocus={() => navigate('/search')}
					className="p-2 wfull bg-white outline-none"
				/>
			</div>
			<div className="flex gap-3">
				<Link to={`/user-profile/${user?._id}`} className="hidden md:block">
					<img src={user?.image} alt="user" className="w-14 h-12 rounded-lg" />
				</Link>
				<Link
					to="/create-pin"
					className="bg-black text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
					<IoMdAdd />
				</Link>
			</div>
		</div>
	)
}

export default Navbar
