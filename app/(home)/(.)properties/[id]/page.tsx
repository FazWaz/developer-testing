import { Modal } from '@/components/Modal'

import { getClient } from '@/lib/client'
import { FIND_PROPERTY, INTERACTED_PROPERTY } from '@/api/property'
import { PropertyProfile } from '@/components/PropertyProfile'

type Props = {
  params: Record<'id', string>
}

export default async function asyncPage({ params }: Props) {
  const { id } = params
  const query = FIND_PROPERTY
  const mutation = INTERACTED_PROPERTY
  const variables = { id }
  const { data, loading } = await getClient().query({ query, variables })

  if (loading) return null

  await getClient().mutate({ mutation, variables })

  return (
    <Modal>
      <PropertyProfile property={data.findProperty} />
    </Modal>
  )
}
