import React, { useState, useEffect } from 'react';
import AdminLayout from '../../layouts/AdminLayout';
import Form from '../../components/admin/form/Form';
import MediaTable from '../../components/admin/media/MediaTable';

export default function Index() {
	return (
		<AdminLayout>
			<Form label='List Media'>
				<MediaTable />
			</Form>
		</AdminLayout>
	);
}
