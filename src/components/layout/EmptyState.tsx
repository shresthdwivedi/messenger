'use client';

import React from 'react'

const EmptyState = () => {
  return (
    <div className='overflow-y-auto px-4 py-10 sm:px-6 lg:px-8 h-screen flex items-center justify-center dark:bg-neutral-800 bg-gray-100'>
        <div className='text-center flex flex-col'>
            <h3 className='mt-2 text-2xl font-semibold  text-neutral-500 dark:text-neutral-400 '>
                Select a chat or start a new conversation
            </h3>
        </div>
    </div>
  )
}

export default EmptyState