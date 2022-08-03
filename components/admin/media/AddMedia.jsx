import React, { useRef, useState, useContext } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CustomContext } from './../../../context/Context';

export default function AddMedia() {
	const router = useRouter();
	const imageRef = useRef();
	const [files, setFiles] = useState('');
	const [images_url, setImagesUrl] = useState('');
	const [setIsVisibleAdminMedia] = useContext(CustomContext);

	const filesHandler = (e) => {
		const files = Array.from(imageRef.current.files);
		setFiles(files);
		const images = files.map((file) => {
			return file.name;
		});
		setImagesUrl(images);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		let formData = new FormData();

		for (let i = 0; i < files.length; i++) {
			formData.append(`files[${i}]`, files[i]);
		}

		axios
			.post('/media', formData)
			.then((res) => {
				router.push('/media');
			})
			.catch((error) => {
				console.log(error.response, 'error.response');
			});
	};

	return (
		<div className='add-media'>
			<div className='add-media__body'>
				<div className='form__flex'>
					<div className='form__image'>
						<div className='form__icon'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								width='50'
								height='50'>
								<path
									style={{
										stroke: 'none',
										fill: '#000',
										fillOpacity: 1,
									}}
									d='M10.293 17.832a3.123 3.123 0 0 0 4.418 0l7.164-7.16v23.703a3.124 3.124 0 1 0 6.25 0V10.672l7.164 7.168a3.13 3.13 0 0 0 4.422 0 3.126 3.126 0 0 0 0-4.418L27.21.922A3.093 3.093 0 0 0 25 0c-.8 0-1.602.305-2.207.914l-12.5 12.504a3.114 3.114 0 0 0 0 4.414Zm36.582 16.543H31.25a6.248 6.248 0 0 1-6.25 6.25 6.248 6.248 0 0 1-6.25-6.25H3.125A3.124 3.124 0 0 0 0 37.5v9.375A3.124 3.124 0 0 0 3.125 50h43.75A3.124 3.124 0 0 0 50 46.875V37.5a3.124 3.124 0 0 0-3.125-3.125Zm-4.688 10.156a2.35 2.35 0 0 1-2.343-2.343 2.35 2.35 0 0 1 2.343-2.344 2.35 2.35 0 0 1 2.344 2.343 2.35 2.35 0 0 1-2.343 2.344Zm0 0'
								/>
							</svg>
						</div>
						<input
							onChange={filesHandler}
							type='file'
							placeholder='Enter image...'
							ref={imageRef}
							multiple
						/>
						<ul className='form__list'>
							{images_url &&
								images_url.map((image_url) => {
									return <li key={image_url}>{image_url}</li>;
								})}
						</ul>
					</div>
					<button className='btn' onClick={onSubmit}>
						Submit
					</button>
					<button
						className='btn btn--danger'
						onClick={() => setIsVisibleAdminMedia(false)}>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}
