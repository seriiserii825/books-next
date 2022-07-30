import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../../components/admin/form/Form';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

export default function Create() {
	const router = useRouter();
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState('');
	const [status, setStatus] = useState(1);

	const nameHandler = (e) => {
		setName(e.target.value);
	};

	const statusHandler = (e) => {
		setStatus(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = { name, status };
		axios
			.post('/category', data)
			.then((res) => {
				setErrors([]);
				setName('');
				router.push('/category');
			})
			.catch((err) => {
				if (err.response.data && err.response.data.errors) {
					setErrors(err.response.data.errors);
				}
			});
	};

	return (
		<AdminLayout>
			<Form label='Add Category'>
				<div className='form__flex'>
					<div
						className={
							errors.name
								? 'form__item form__item--error'
								: 'form__item'
						}>
						<label className='form__label' htmlFor='name'>
							Name
						</label>
						<input
							onChange={nameHandler}
							type='text'
							placeholder='Enter name...'
							value={name}
						/>
						<p className='text-error'>
							{errors.name && errors.name}
						</p>
					</div>
					<div className='form__item'>
						<label className='form__label' htmlFor='status'>
							Status
						</label>
						<select
							name='status'
							id='status'
							value={status}
							onChange={statusHandler}>
							<option value={1}>Active</option>
							<option value={0}>Inactive</option>
						</select>
					</div>
				</div>
				<button className='btn' onClick={onSubmit}>
					Submit
				</button>
			</Form>
		</AdminLayout>
	);
}
