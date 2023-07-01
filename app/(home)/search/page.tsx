import { getClient } from '@/lib/client'

import { List } from '@/components/List'
import { EmptyProperties } from '@/components/EmptyState'
import { Loader } from '@/components/Loader'
import { SEARCH_PROPERTY } from '@/api/property'

type Props = {
  searchParams: Record<string, string | undefined | null>
}
export default async function Search({ searchParams }: Props) {
  const query = SEARCH_PROPERTY
  const variables = { query: searchParams?.query }
  const context = { fetchOptions: { next: { revalidate: 5 } } }
  const { data, loading } = await getClient().query({ query, variables, context })

  /* Won't really be noticed since server components are really reallyfast */
  if (loading) {
    return <Loader />
  }

  return data.searchProperties.length > 0 ? <List data={data.searchProperties} /> : <EmptyProperties />
}
