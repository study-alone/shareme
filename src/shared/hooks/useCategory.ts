import { client } from '@shared/client'
import { categoryQuery } from '@shared/client/queries'
import { useQuery } from 'react-query'

interface CategoryItem {
	imageUrl: string
	title: string
	value: string
	_createdAt: string
	_id: string
	_rev: string
	_type: 'category'
	_updatedAt: string
}

const fetch = async ({ queryKey }: { queryKey: string[] }) => {
	return await client.fetch<CategoryItem[]>(categoryQuery())
}

export const useCategory = () => {
	const { data } = useQuery('category', fetch, { suspense: true })

	return { data }
}
