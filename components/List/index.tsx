'use client'

import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Property, { PropertyType } from '@/models/property'
import Link from 'next/link'

type Props = {
  data: PropertyType[]
}
export function List({ data }: Props) {
  const properties = Property.fromArray(data)
  return (
    <div className="px-40">
      <ul role="list" className="divide-y divide-gray-100">
        {properties.map((property: Property, i) => (
          <Link href={`properties/${property.id}`} key={i}>
            <li className="relative flex justify-between gap-x-6 py-5">
              <div className="flex gap-x-4">
                <img className="h-24 w-42 flex-none bg-gray-50 rounded-md" src={property.thumbnail} alt="" />
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {property.name}
                  </p>
                  <p className="mt-1 flex text-xs leading-5 text-gray-500">
                    {`${property.description || ''} - ${property.areaSqm}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-4">
                <div className="hidden sm:flex sm:flex-col sm:items-end">
                  <p className="text-sm leading-6 text-gray-900">{property.listingType}</p>
                  <div className="mt-1 flex items-center gap-x-1.5">
                    <p className="text-xs leading-5 text-gray-500">{property.priceFormatted}</p>
                  </div>
                </div>
                <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}
