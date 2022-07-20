import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import AdminMenuItem from './AdminMenuItem';

export default function AdminMenu() {
	let submenu_icon = (
		<Image src='/svg/file-minus.svg' width={20} height={20} alt='' />
	);
	return (
		<ul className='admin-menu'>
			<AdminMenuItem
				label='Dashboard'
				icon='/svg/dashboard.svg'
				url='/'
				link={true}></AdminMenuItem>
			<AdminMenuItem label='Category' icon='/svg/file-plus.svg'>
				<ul className='admin-submenu'>
					<li className='admin-submenu__item'>
						<div className='admin-submenu__icon'>
							{submenu_icon}
						</div>
						<Link href='/'>
							<a>Add item</a>
						</Link>
					</li>
					<li className='admin-submenu__item'>
						<div className='admin-submenu__icon'>
							{submenu_icon}
						</div>
						<Link href='/' className='admin-submenu__item'>
							<a>List item</a>
						</Link>
					</li>
				</ul>
			</AdminMenuItem>
		</ul>
	);
}
