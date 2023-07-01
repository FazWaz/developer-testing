'use client'

import React from 'react'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Props = {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const searchParams = useSearchParams()

  return (
    <div className="py-16 sm:py-24">
      <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="">
          <h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Search for a Property
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-lg leading-8">
            Or if you feel lucky, try our Recommendations
          </p>
          <form className="mx-auto mt-10 flex gap-x-4 max-w-xl" action="search">
            <input
              defaultValue={searchParams.get('query') || undefined}
              name="query"
              required
              className="min-w-0 flex-auto rounded-md border-0 bg-white px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-slate-100 sm:text-sm sm:leading-6"
              placeholder="Search Property"
            />
            <button
              type="submit"
              className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white bg-slate-200 hover:bg-slate-300"
            >
              Search
            </button>
            <Link
              href="recommend"
              className="flex-none rounded-md px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white bg-orange-400 hover:bg-orange-500"
            >
              Recommend
            </Link>
          </form>
          <div className="p-9">{children}</div>
        </div>
      </div>
    </div>
  )
}
