import clsx from 'clsx';
import Link from 'next/link';
import React from 'react'

interface Breadcrumb{
    label: string;
    href: string;
    active?: boolean;
}

export default function Breadcrumb ({breadcrumbs}:{breadcrumbs: Breadcrumb[]}) {
  return (
    <nav aria-label="Breadcrumb" className='mb-6 block text-lg'>
        <ol className='flex '>
            {breadcrumbs.map((breadcrumb,index) => (
                <li key={index} className={clsx(breadcrumb.active ? "text-gray-900":"text-gray-500")}>
                    <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    {index < breadcrumbs.length - 1 ? (
                        <span className="mx-2 inline-block">/</span>
                        ) : null}
                </li>
            ))}
        </ol>
    </nav>
  )
}
