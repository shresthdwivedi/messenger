'use client';

import EmptyState from '@/components/layout/EmptyState';
import { signOut } from 'next-auth/react'

const Users = () => {

  return (
    <div className='hidden lg:block pl-80 h-screen'>
      <EmptyState />
    </div>
  )
}

export default Users