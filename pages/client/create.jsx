import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Form from '../../components/admin/form/Form';
import AdminLayout from '../../layouts/AdminLayout';
import axios from 'axios';

export default function Create() {
    const router = useRouter();
    const [errors, setErrors] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile_number, setMobileNumber] = useState('');
    const [gender, setGender] = useState('male');
    const [address, setAddress] = useState('');
    const [status, setStatus] = useState(1);

    const nameHandler = (e) => {
        setName(e.target.value);
    };
    const emailHandler = (e) => {
        setEmail(e.target.value);
    };
    const mobileNumberHandler = (e) => {
        setMobileNumber(e.target.value);
    };
    const genderHandler = (e) => {
        setGender(e.target.value);
    };
    const addressHandler = (e) => {
        setAddress(e.target.value);
    };
    const statusHandler = (e) => {
        setStatus(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            name,
            email,
            mobile_number,
            gender,
            address,
            status,
        };
        axios
            .post('/client', data)
            .then((res) => {
                router.push('/client');
            })
            .catch((err) => {
                if (err.response.data && err.response.data.errors) {
                    setErrors(err.response.data.errors);
                }
            });
    };

    return (
        <AdminLayout>
            <Form label='Add Client'>
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
                            errors.email
                                ? 'form__item form__item--error'
                                : 'form__item'
                        }>
                        <label className='form__label' htmlFor='email'> Email </label>
                        <input
                            onChange={emailHandler}
                            type='email'
                            placeholder='Enter email...'
                            value={email}
                        />
                        <p className='text-error'>
                            {errors.email && errors.email}
                        </p>
                    </div>
                </div>
                <div className={'form__flex'}>
                    <div
                        className={
                            errors.mobile_number
                                ? 'form__item form__item--error'
                                : 'form__item'
                        }>
                        <label className='form__label' htmlFor='mobile_number'>
                            Mobile Number
                        </label>
                        <input
                            onChange={mobileNumberHandler}
                            type='text'
                            placeholder='Enter mobile_number...'
                            value={mobile_number}
                        />
                        <p className='text-error'>
                            {errors.mobile_number && errors.mobile_number}
                        </p>
                    </div>
                    <div
                        className={
                            errors.gender
                                ? 'form__item form__item--error'
                                : 'form__item'
                        }>
                        <label className='form__label' htmlFor='gender'>
                            Gender
                        </label>
                        <select
                            name='gender'
                            id='gender'
                            value={gender}
                            onChange={genderHandler}>
                            <option value={'male'}>Male</option>
                            <option value={'female'}>Female</option>
                        </select>
                        <p className='text-error'>
                            {errors.gender && errors.gender}
                        </p>
                    </div>
                </div>
                <div className="form__flex">
                    <div
                        className={
                            errors.address
                                ? 'form__item form__item--error'
                                : 'form__item'
                        }>
                        <label className='form__label' htmlFor='address'>
                            Address
                        </label>
                        <textarea name="" id="" cols="30" rows="10"
                                  onChange={addressHandler}
                                  placeholder='Enter address...'
                                  value={address}
                        ></textarea>
                        <p className='text-error'>
                            {errors.address && errors.address}
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
    )
        ;
}
