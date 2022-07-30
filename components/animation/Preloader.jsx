import React from 'react';

export default function Preloader() {
	return (
		<div className='preloader'>
			<div className='preloader__balls'>
				<div className='preloader__ball preloader__ball--one'></div>
				<div className='preloader__ball preloader__ball--two'></div>
				<div className='preloader__ball preloader__ball--three'></div>
			</div>
		</div>
	);
}
