import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil'
import { DebugObserver } from '@shared/store/devtools'
import { ErrorBoundary } from '@container/ErrorBoundary'

import { ReactQueryDevtools } from 'react-query/devtools'

import App from './App'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ErrorBoundary
			fallbackRender={({ error, resetErrorBoundary }) => (
				<div>
					<h1>Occured Error!!!</h1>
					<button onClick={resetErrorBoundary}>refresh</button>
				</div>
			)}>
			<QueryClientProvider client={queryClient}>
				<RecoilRoot>
					<DebugObserver />
					<GoogleOAuthProvider clientId={import.meta.env.VITE_APP_GOOGLE_API_TOKEN}>
						<Router>
							<App />
						</Router>
					</GoogleOAuthProvider>
				</RecoilRoot>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ErrorBoundary>
	</React.StrictMode>,
)
