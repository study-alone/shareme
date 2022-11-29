import { useCallback } from 'react'
import { client } from '@shared/client'

export const useDeletePin = (id: string) => {
	const deletePin = useCallback(() => {
		client.delete(id)
	}, [id])

	return { deletePin }
}
