import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AdminMenuItem from './AdminMenuItem';

export default function AdminMenu() {
	return (
		<ul className='admin-menu'>
			<AdminMenuItem
				label='Dashboard'
				icon='/svg/dashboard.svg'
				url='/'
				link={true}></AdminMenuItem>
			<AdminMenuItem
				label='Category'
				icon='/svg/file-plus.svg'
				items={[{ url: '/category/create' }, { url: '/category' }]}
			/>
			<AdminMenuItem
				label='Book'
				icon='/svg/book.svg'
				items={[{ url: '/book/create' }, { url: '/book' }]}
			/>
			<AdminMenuItem
				label='User'
				icon='/svg/user.svg'
				items={[{ url: '/user/create' }, { url: '/user' }]}
			/>
		</ul>
	);
}
