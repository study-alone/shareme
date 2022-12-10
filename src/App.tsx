import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { Spinner } from '@components/common'
import { useLoading } from '@shared/hooks'
import { DefaultLayout } from '@container/layout/DefaultyLayout'
import NavbarLayout from '@container/layout/NavbarLayout'

const Home = lazy(() => import('@pages/index'))
const Login = lazy(() => import('@pages/login'))
const UserProfileWithId = lazy(() => import('@pages/user-profile/user-id'))

const CreatePin = lazy(() => import('@components/CreatePin'))
const Feed = lazy(() => import('@components/Feed'))
const PinDetail = lazy(() => import('@components/PinDetail'))
const Search = lazy(() => import('@components/Search'))

function App() {
	return (
		<div className="app">
			<Suspense fallback={<Spinner />}>
				<Routes>
					<Route path="login" element={<Login />} />
					<Route element={<DefaultLayout />}>
						<Route
							path="user-profile/:userId"
							element={
								<Suspense fallback={<Spinner />}>
									<UserProfileWithId />
								</Suspense>
							}
						/>
						<Route
							path="/"
							element={
								<Suspense fallback={<Spinner />}>
									<NavbarLayout />
								</Suspense>
							}>
							<Route
								path="/"
								element={
									<Suspense fallback={<Spinner />}>
										<Feed />
									</Suspense>
								}
							/>
							<Route
								path="category/:categoryId"
								element={
									<Suspense fallback={<Spinner />}>
										<Feed />
									</Suspense>
								}
							/>
							<Route
								path="pin-detail/:pinId"
								element={
									<Suspense fallback={<Spinner />}>
										<PinDetail />
									</Suspense>
								}
							/>
							<Route
								path="create-pin"
								element={
									<Suspense fallback={<Spinner />}>
										<CreatePin />
									</Suspense>
								}
							/>
							<Route
								path="search"
								element={
									<Suspense fallback={<Spinner />}>
										<Search />
									</Suspense>
								}
							/>
						</Route>
					</Route>
				</Routes>
			</Suspense>
		</div>
	)
}

export default App
