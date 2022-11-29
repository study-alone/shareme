import { Sidebar } from '@components/index'
import { authReadOnlyState } from '@shared/store'
import { useCallback, useEffect, useRef, useState } from 'react'
import { AiFillCloseCircle, HiMenu } from '@components/common'
import { Link, Navigate, Outlet } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import { useUserInfo } from '@shared/hooks'
import logo from '@assets/logo.png'

export const DefaultLayout: React.FC = () => {
	const [toggleSidebar, setToggleSidebar] = useState(false)
	const scrollRef = useRef<HTMLDivElement>(null)
	const auth = useRecoilValue(authReadOnlyState)
	const user = useUserInfo()

	const handleSidebarToggle = useCallback(() => {
		setToggleSidebar(!toggleSidebar)
	}, [toggleSidebar])

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo(0, 0)
		}
	}, [scrollRef])

	if (!auth) return <Navigate to="/login" />

	return (
		<div className="flex bg-gray-50 md:flex-row flex-col h-screen transaction-height duration-75 ease-out">
			<div className="hidden md:flex h-screen flex-initial">
				<Sidebar />
			</div>
			<div className="flex md:hidden flex-row">
				<div className="p-2 w-full flex flex-row justify-between items-center shadow-md">
					<HiMenu fontSize={40} className="cursor-pointer" onClick={handleSidebarToggle} />
					<Link to="/">
						<img src={logo} alt="logo" className="w-28" />
					</Link>
					<Link to={`user-profile/${user?._id}`}>
						<img src={user?.image} alt="logo" className="w-28" />
					</Link>
				</div>
				{toggleSidebar && (
					<div className="fixed w-4/5 bg-white h-screen overflow-y-auto shadow-md z-10 animate-slide-in">
						<div className="absolute w-full flex justify-end items-center p-2">
							<AiFillCloseCircle fontSize={30} className="cursor-pointer" onClick={handleSidebarToggle} />
						</div>
						<Sidebar closeToggle={handleSidebarToggle} />
					</div>
				)}
			</div>
			<div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef}>
				<Outlet />
			</div>
		</div>
	)
}
