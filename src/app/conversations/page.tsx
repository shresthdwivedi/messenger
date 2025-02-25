'use client';

import EmptyState from '@/components/layout/EmptyState';
import useConversation from '@/hooks/useConversation';
import clsx from 'clsx';

const Page = () => {

    const isOpen = useConversation();

    return (
        <div className={clsx("pl-80 h-screen lg:block hidden", isOpen ? 'block' : 'hidden')}>
            <EmptyState />
        </div>
    )
}

export default Page