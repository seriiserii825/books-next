import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function AdminMenuItem({ label, icon, url = '', children }) {
	const [isActive, setIsActive] = useState(false);
  const toggleActive = () => setIsActive(!isActive);
	let itemLink = url ? (
		<Link href={url}>
			<a>{label}</a>
		</Link>
	) : (
		<div
			onClick={toggleActive}
			className='admin-menu-item__title'>
			<span>{label}</span>
		</div>
	);

let icon_class = isActive ? 'admin-menu-item__right admin-menu-item__right--active' : 'admin-menu-item__right';

	return (
		<li className='admin-menu-item'>
			<header className='admin-menu-item__header'>
				<div className='admin-menu-item__icon'>
					<Image src={icon} width={30} height={30} alt='Logo' />
				</div>
				{itemLink}
				{!url && (
					<div className={icon_class}>
						<Image
							src='/svg/chevron-left.svg'
							width={20}
							height={16}
							alt=''
						/>
					</div>
				)}
			</header>
			{isActive && (
				<div className='admin-menu-icon__body'>{children}</div>
			)}
		</li>
	);
}
