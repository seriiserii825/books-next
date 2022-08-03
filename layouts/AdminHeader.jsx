import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { CustomContext } from '../context/Context';
import { useRouter } from 'next/router';

export default function AdminHeader() {
	const router = useRouter();
	const { toggleSidebar, setIsVisibleAdminMedia } = useContext(CustomContext);
	const addMediaBtn = () => {
		return (
			<button
				onClick={() => setIsVisibleAdminMedia(true)}
				className='btn btn--success'>
				Add Media
			</button>
		);
	};

	return (
		<header className='admin-header'>
			<div
				className='admin-header__toggle'
				onClick={() => toggleSidebar()}>
				<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 448 512'>
					<path
						d='M0 96C0 78.33 14.33 64 32 64H416C433.7 64 448 78.33 448 96C448 113.7 433.7 128 416 128H32C14.33 128 0 113.7 0 96zM0 256C0 238.3 14.33 224 32 224H416C433.7 224 448 238.3 448 256C448 273.7 433.7 288 416 288H32C14.33 288 0 273.7 0 256zM416 448H32C14.33 448 0 433.7 0 416C0 398.3 14.33 384 32 384H416C433.7 384 448 398.3 448 416C448 433.7 433.7 448 416 448z'
						fill='#999'
					/>
				</svg>
			</div>
			<div className='admin-header__buttons'>
				{addMediaBtn()}
				{router.pathname === '/media/create' && (
					<Link href='/media'>
						<a className='btn'>View Media</a>
					</Link>
				)}
			</div>
			<div className='admin-header__profile'>
				<Link href='/'>
					<a>
						<Image
							src='/svg/user-lock.svg'
							alt='logo'
							width={30}
							height={30}
						/>
					</a>
				</Link>
			</div>
		</header>
	);
}
