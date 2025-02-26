'use client';

import React from 'react'

const EmptyState = () => {
  return (
    <div className='px-4 py-10 sm:px-6 lg:px-8 h-full flex items-center border-[#E4E4E7] border-l-[1px] dark:border-[#27272A] justify-center dark:bg-[#09090B] bg-white'>
        <div className='text-center flex flex-col'>
            <h3 className='mt-2 text-2xl font-semibold  text-neutral-600 dark:text-neutral-400 '>
                Select a chat or start a new conversation
            </h3>
        </div>
    </div>
  )
}

export default EmptyState