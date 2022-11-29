import { useEffect } from 'react'
import { useRecoilSnapshot, useRecoilCallback } from 'recoil'
import { ReactComponent as RecoilLogo } from '@assets/recoil_logo.svg'

export const DebugObserver: React.FC = () => {
	const snapshot = useRecoilSnapshot()

	useEffect(() => {
		console.debug('The following atoms were modified:')
		for (const node of snapshot.getNodes_UNSTABLE({ isModified: true })) {
			console.debug(node.key, snapshot.getLoadable(node))
		}
	}, [snapshot])

	const onClick = useRecoilCallback(
		({ snapshot }) =>
			async () => {
				console.debug('Atom values:')
				for (const node of snapshot.getNodes_UNSTABLE()) {
					const value = await snapshot.getPromise(node)
					console.debug(node.key, value)
				}
			},
		[],
	)

	return (
		<button
			style={{
				position: 'absolute',
				bottom: '20px',
				right: '20px',
				zIndex: 3000,
				backgroundColor: 'navy',
				padding: '10px',
				borderRadius: '6px',
				boxShadow: '3px 3px 6px 1px rgba(0, 0, 0, 0.3)',
				width: '80px',
			}}
			onClick={onClick}>
			<RecoilLogo />
		</button>
	)
}
