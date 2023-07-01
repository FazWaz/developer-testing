import { getClient } from '@/lib/client'
import { FIND_PROPERTY } from '@/api/property'
import { PropertyProfile } from '@/components/PropertyProfile'

type Props = {
  params: Record<'id', string>
}

export default async function asyncPage({ params }: Props) {
  const { id } = params
  const query = FIND_PROPERTY
  const variables = { id }
  const context = { fetchOptions: { next: { revalidate: 5 } } }
  const { data, loading } = await getClient().query({ query, variables, context })

  if (loading) return null

  return <PropertyProfile property={data.findProperty} />
}
