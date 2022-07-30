import Link from 'next/link';
import React from 'react';

export default function AdminCard({
	title,
	number = 0,
	bg = '#ccc',
	link = '/',
}) {
	return (
		<Link href={link}>
			<a className='admin-card' style={{ background: bg }}>
				<div className='admin-card__number'>{number}</div>
				<div className='admin-card__title'>{title}</div>
			</a>
		</Link>
	);
}
