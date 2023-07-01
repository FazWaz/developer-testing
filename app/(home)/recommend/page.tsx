import { getClient } from '@/lib/client'

import { List } from '@/components/List'
import { EmptyProperties } from '@/components/EmptyState'
import { Loader } from '@/components/Loader'
import { RECOMMEND_PROPERTY } from '@/api/property'

export default async function Recommend() {
  const query = RECOMMEND_PROPERTY
  const { data, loading } = await getClient().query({ query })

  /* Won't really be noticed since server components are really reallyfast */
  if (loading) {
    return <Loader />
  }

  return (
    data.recommendProperties.length > 0 && (
      <div>
        <div className="px-40">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight text-center italic text-orange-400">
            Recommendations
          </h2>
        </div>
        {data.recommendProperties.length ? <List data={data.recommendProperties} /> : <EmptyProperties />}
      </div>
    )
  )
}
