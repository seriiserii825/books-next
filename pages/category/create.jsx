import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../../components/admin/form/Form';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

export default function Create() {
	const router = useRouter();
	console.log(router, 'router')
	const [errors, setErrors] = useState([]);
	const [name, setName] = useState('');
	const [status, setStatus] = useState(1);

	const nameHandler = (e) => {
		setName(e.target.value);
		console.log(name, 'nam');
	};

	const statusHandler = (e) => {
		setStatus(e.target.value);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = { name, status };
		const config = {
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
			},
		};
		axios
			.post('https://localhost:8088/api/category', data, config)
			.then((res) => {
				setErrors([]);
				setName('');
				router.push('/category');
			})
			.catch((err) => {
				if (err.response.data && err.response.data.errors) {
					setErrors(err.response.data.errors);
					console.log(errors, 'errors');
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
