'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface MobileItemProps {
    label: string;
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void,
}


const MobileItem: React.FC<MobileItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick,
}) => {
    const handleClick = () => {
        if(onClick) {
            onClick();
        }
        
    };

    return (
        <div onClick={handleClick} className='flex-1'>
            <Link href={href} className={clsx('relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-[#9b6dff]/40 before:transition-transform before:duration-1000 hover:before:translate-x-[0%] hover:before:translate-y-[0%] group flex gap-x-3 rounded-md p-4 items-center justify-center text-sm leading-6 font-semibold dark:hover:text-neutral-400', active && 'bg-neutral-300 text-black dark:bg-neutral-800 dark:text-neutral-400')}>
                <Icon className="h-6 w-6 shrink-0"/>
                <span className='sr-only'>
                    {label}
                </span>
            </Link>
        </div>
  )
}

export default MobileItem