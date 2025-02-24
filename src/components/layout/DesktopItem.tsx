'use client';

import clsx from 'clsx';
import Link from 'next/link';

interface DesktopItemProps {
    label: string;
    href: string,
    icon: any,
    active?: boolean,
    onClick?: () => void,
}


const DesktopItem: React.FC<DesktopItemProps> = ({
    label,
    href,
    icon: Icon,
    active,
    onClick,
}) => {

    const handleClick = () => {
        if(onClick) {
            return onClick();
        }
    };

    return (
        <li onClick={handleClick}>
            <Link href={href} className={clsx('relative z-0 overflow-hidden transition-all duration-500 before:absolute before:inset-0 before:-z-10 before:translate-x-[150%] before:translate-y-[150%] before:scale-[2.5] before:rounded-[100%] before:bg-gradient-to-r from-[#9b6dff]/40 before:transition-transform before:duration-1000  hover:before:translate-x-[0%] hover:before:translate-y-[0%] group flex gap-x-3 rounded-md p-3 items-center justify-center text-sm leading-6 font-semibold dark:hover:text-neutral-400', active && 'dark:bg-neutral-700 bg-neutral-200 text-neutral-400')}>
                <Icon className="h-6 w-6 shrink-0"/>
                <span className='sr-only'>
                    {label}
                </span>
            </Link>
        </li>
  )
}

export default DesktopItem