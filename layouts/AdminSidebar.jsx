import React from 'react';
import AdminMenu from '../components/admin/navigation/AdminMenu';

export default function AdminSidebar() {
	return (
		<div className='admin-sidebar'>
			<header className='admin-sidebar__header'>
				<h1 className='admin-sidebar__title'>Books</h1>
			</header>
			<AdminMenu/>
		</div>
	);
}
