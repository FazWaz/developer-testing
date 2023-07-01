'use client'

import React from 'react'

type Props = {
  children: React.ReactNode
}

export function Modal({ children }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
      <div className="bg-white rounded-lg max-w-4xl w-full mx-8 my-8 overflow-hidden shadow-xl transform transition-all">
        <div className="flex justify-end">
          <button
            onClick={() => {
              window.history.back()
            }}
            className="p-2 text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="px-6 py-4">{children}</div>
      </div>
    </div>
  )
}
