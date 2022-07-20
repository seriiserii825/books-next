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
				items={[{ url: '/' }, { url: '/' }]}
			/>
			<AdminMenuItem
				label='Books'
				icon='/svg/book.svg'
				items={[{ url: '/' }, { url: '/' }]}
			/>
		</ul>
	);
}
