import React from 'react';
import Form from '../../components/admin/form/Form';
import AdminLayout from '../../layouts/AdminLayout';

export default function Create() {
	return (
		<AdminLayout>
			<Form label='Add Category'>
				<div className='form__flex'>
					<div className='form__item'>
						<label className="form__label" htmlFor='name'>Name</label>
						<input type='text' placeholder='Enter name...' />
					</div>
					<div className='form__item'>
						<label className="form__label" htmlFor='status'>Status</label>
						<select name="status" id="status">
							<option value="1">Active</option>
							<option value="0">Inactive</option>
						</select>
					</div>
				</div>
				<button className="btn">Submit</button>
			</Form>
		</AdminLayout>
	);
}
