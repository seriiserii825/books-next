import React from 'react';

export default function Form({ children, label }) {
	return (
		<div className='form'>
			<header className='form__header'>{label}</header>
			<div className='form__body'>{children}</div>
		</div>
	);
}
