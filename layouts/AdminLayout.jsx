import React from 'react';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({children}) {
	return (
		<div className='admin-layout'>
			<div className='admin-layout__sidebar'>
				<AdminSidebar />
			</div>
			<div className='admin-layout__body'>
				<AdminHeader />
				<div className='admin-layout__main'>{children}</div>
				<AdminFooter />
			</div>
		</div>
	);
}
