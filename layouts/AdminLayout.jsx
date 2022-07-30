import React, { useContext } from 'react';
import { useRouter } from 'next/router';
import { CustomContext } from '../context/Context';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

export default function AdminLayout({ children }) {
	const router = useRouter();
	let { isVisibleSidebar } = useContext(CustomContext);

	let sidebar_class = isVisibleSidebar
		? 'admin-layout__sidebar'
		: 'admin-layout__sidebar admin-layout__sidebar--hidden';

	let body_class = isVisibleSidebar
		? 'admin-layout__body'
		: 'admin-layout__body admin-layout__body--full';

	return (
		<div className='wrapper'>
			<div className='admin-layout'>
				<div className={sidebar_class}>
					<AdminSidebar />
				</div>
				<div className={body_class}>
					<AdminHeader />
					<div className='admin-layout__main'>{children}</div>
				</div>
			</div>
		</div>
	);
}
