import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function AdminMenuItem({ label, icon, url = '', items = [] }) {
	const router = useRouter();
	const [isActive, setIsActive] = useState(false);
	const toggleActive = () => setIsActive(!isActive);
	let itemLink = url ? (
		<Link href={url}>
			<a>{label}</a>
		</Link>
	) : (
		<div onClick={toggleActive} className='admin-menu-item__title'>
			<span>{label}</span>
		</div>
	);

	let icon_class = isActive
		? 'admin-menu-item__right admin-menu-item__right--active'
		: 'admin-menu-item__right';

	let submenu_icon = (
		<Image src='/svg/file-minus.svg' width={14} height={20} alt='' />
	);
	useEffect(
		function openActiveMenu() {
			if (router.pathname.includes(label.toLowerCase())) {
				setIsActive(true);
			}
		},
		[label]
	);


	return (
		<li className='admin-menu-item'>
			<header className='admin-menu-item__header'>
				<div className='admin-menu-item__icon'>
					<Image src={icon} width={20} height={20} alt='Logo' />
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
			{isActive && items.length && (
				<div className='admin-menu-icon__body'>
					<ul className='admin-submenu'>
						{items.map((item, index) => {
							const activeClass =
								router.pathname === item.url
									? 'admin-submenu__item active'
									: 'admin-submenu__item';
							return (
								<li className={activeClass} key={index}>
									<div className='admin-submenu__icon'>
										{submenu_icon}
									</div>
									<Link href={item.url}>
										{index === 0 ? (
											<a>Add item</a>
										) : (
											<a>View list</a>
										)}
									</Link>
								</li>
							);
						})}
					</ul>
				</div>
			)}
		</li>
	);
}
