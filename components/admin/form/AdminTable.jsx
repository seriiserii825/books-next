import React from 'react';

export default function AdminTable({ children }) {
	return (
		<div className='admin-table'>
			<header className='admin-table__header'></header>
			<div className='admin-table__body'>{children}</div>
			<footer className='admin-table__footer'></footer>
		</div>
	);
}
