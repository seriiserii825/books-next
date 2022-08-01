import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../../layouts/AdminLayout';
import Form from '../../components/admin/form/Form';
import AdminTable from '../../components/admin/form/AdminTable';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Preloader from '../../components/animation/Preloader';
import { Transition, animated } from 'react-spring';
import Media from '../../components/admin/media/Media';

export default function Index() {
	return (
		<AdminLayout>
			<Form label='List Media'>
				<Media />
			</Form>
		</AdminLayout>
	);
}
