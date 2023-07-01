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
  const { data, loading } = await getClient().query({ query, variables })

  if (loading) return null

  return <PropertyProfile property={data.findProperty} />
}
