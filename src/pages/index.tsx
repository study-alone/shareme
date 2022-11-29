import React from 'react'
import Navbar from '@components/Navbar'
import { Outlet, Route, Routes } from 'react-router-dom'

const Home = () => {
	return (
		<div className="px-2 md:px-5">
			<div className="bg-gray-50">
				<Navbar />
			</div>
			<div className="h-full">
				<Outlet />
			</div>
		</div>
	)
}

export default Home
