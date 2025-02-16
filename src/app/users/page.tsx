"use client";

import { Button } from '@/components/ui/button'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Users = () => {

  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true); // State to prevent flashing

  useEffect(() => {
      if (session?.status === 'loading') return; // Wait until session is resolved
      if (session?.status !== 'authenticated') {
          router.push('/');
      } else {
        setIsLoading(false);
      }
  }, [session?.status, router]);

  if (isLoading) return null;

  return (
    <div>
        <Button variant={'ghost'} onClick={() => signOut()}>Logout</Button>
    </div>
  )
}

export default Users