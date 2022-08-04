import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Form from '../../components/admin/form/Form';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';
import Media from '../../components/admin/media/Media';

export default function Create() {
	const router = useRouter();
	const [id, setId] = useState(null);
	const [errors, setErrors] = useState([]);
	const [showMedia, setShowMedia] = useState(false);
	const [name, setName] = useState('');
	const [categories, setCategories] = useState([]);
	const [category_id, setCategoryId] = useState('');
	const [description, setDescription] = useState('');
	const [amount, setAmount] = useState('');
	const [cover_image, setCoverImage] = useState('');
	const [media_images, setMediaImages] = useState([]);
	const [author, setAuthor] = useState('');
	const [status, setStatus] = useState(1);

	const getItem = () => {
		axios
			.get('/book/' + id)
			.then((res) => {
				const {
					name,
					category_id,
					description,
					amount,
					cover_image,
					author,
					status,
				} = res.data.data;
				setName(name);
				setCategoryId(category_id);
				setDescription(description);
				setAmount(amount);
				setCoverImage(cover_image);
				setAuthor(author);
				setStatus(status);
			})
			.catch((err) => {
				if (err.response.data && err.response.data.errors) {
					setErrors(err.response.data.errors);
				}
			});
	};

	useEffect(() => {
		if (router.isReady) {
			setId(router.query.id);
			if (id) {
				getItem();
			}
		}
	}, [router.isReady, id]);

	const nameHandler = (e) => {
		setName(e.target.value);
	};
	const categoriesHandler = (e) => {
		setCategoryId(e.target.value);
	};
	const descriptionHandler = (e) => {
		setDescription(e.target.value);
	};
	const amountHandler = (e) => {
		setAmount(e.target.value);
	};
	const coverImageHandler = (e) => {
		document.body.style.overflow = 'hidden';
		setShowMedia(true);
	};
	const authorHandler = (e) => {
		setAuthor(e.target.value);
	};
	const statusHandler = (e) => {
		setStatus(e.target.value);
	};

	const closeMedia = () => {
		document.body.style.overflow = 'initial';
		setShowMedia(false);
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const data = {
			name,
			category_id,
			description,
			amount: parseInt(amount),
			cover_image,
			author,
			status,
		};
		axios
			.put('/book/' + id, data)
			.then((res) => {
				router.push('/book');
			})
			.catch((err) => {
				if (err.response.data && err.response.data.errors) {
					setErrors(err.response.data.errors);
				}
			});
	};

	let getBooks = () => {
		axios
			.get('/book_create')
			.then((res) => {
				setCategories(res.data.categories);
			})
			.catch((err) => {
				console.log(err, 'er');
			});
	};

	useEffect(() => {
		getBooks();
	}, []);

	useEffect(() => {
		setCoverImage(media_images[0]);
	}, [media_images]);

	return (
		<AdminLayout>
			{showMedia && (
				<Media onClose={() => closeMedia()} onImages={setMediaImages} />
			)}
			<Form label='Edit Book'>
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
					<div
						className={
							errors.name
								? 'form__item form__item--error'
								: 'form__item'
						}>
						<label className='form__label' htmlFor='categories'>
							Categories
						</label>
						<select
							id='categories'
							value={category_id}
							onChange={categoriesHandler}>
							{categories &&
								categories.map((category) => (
									<option
										key={category.id}
										value={category.id}>
										{category.name}
									</option>
								))}
						</select>
						<p className='text-error'>
							{errors.category_id && errors.category_id}
						</p>
					</div>
				</div>
				<div className='form__flex'>
					<div
						className={
							errors.name
								? 'form__item form__item--error'
								: 'form__item'
						}>
						<label className='form__label' htmlFor='description'>
							Description
						</label>
						<textarea
							onChange={descriptionHandler}
							value={description}></textarea>
						<p className='text-error'>
							{errors.description && errors.description}
						</p>
					</div>
					<div
						className={
							errors.name
								? 'form__item form__item--error'
								: 'form__item'
						}>
						<label className='form__label' htmlFor='amount'>
							Amount
						</label>
						<input
							type='text'
							onChange={amountHandler}
							value={amount}
						/>
						<p className='text-error'>
							{errors.amount && errors.amount}
						</p>
					</div>
				</div>
				<div className='form__flex'>
					<div
						className={
							errors.name
								? 'form__item form__item--error'
								: 'form__item'
						}>
						<label className='form__label' htmlFor='cover_image'>
							Cover image
						</label>
						<button
							className='btn btn--success'
							onClick={coverImageHandler}
							value={cover_image}>
							Add image
						</button>
						{cover_image && (
							<p className='form__url'>{cover_image}</p>
						)}
						<p className='text-error'>
							{errors.cover_image && errors.cover_image}
						</p>
					</div>
					<div
						className={
							errors.name
								? 'form__item form__item--error'
								: 'form__item'
						}>
						<label className='form__label' htmlFor='author'>
							Author
						</label>
						<input
							type='text'
							onChange={authorHandler}
							value={author}
						/>
						<p className='text-error'>
							{errors.author && errors.author}
						</p>
					</div>
				</div>
				<div className='form__flex'>
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
