import React, { useEffect } from 'react'
import { Alert, TextField } from '@mui/material';
import { dialogAction } from '../../store/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useTranslation } from 'react-i18next';
import Permissions from './Permissions';
import * as Yup from 'yup';
import { useFormik } from 'formik';

type TAdd = {
    permission?: any;
    role?: string;
    selectedRadio: number[];
    selectedChecked: number[];
    setSelectedChecked: React.Dispatch<React.SetStateAction<number[]>>;
    setSelectedRadio: React.Dispatch<React.SetStateAction<number[]>>;
}

const AddForm: React.FC<TAdd> = ({ permission, role, selectedRadio, selectedChecked, setSelectedChecked, setSelectedRadio }) => {
    const dialogActionState = useRecoilState(dialogAction);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    const Schema = Yup.object().shape({
        email: Yup.string().email(t('Invalid email')!).required(t('This field is required')!),
        password: Yup.string().required(`${t('This field is required')!},  ${t('ValidValue')!}`).min(8, t('PasswordLength')!)
    });
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Schema,
        onSubmit: (values: any) => {
        },
    });
    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        formik.handleChange(e);
        setDialogActionState({
            ...dialogActionState[0],
            data: {
                ...dialogActionState[0].data,
                country_code: '+964',
                [e.target.name]: e.target.value
            }
        })
    };

    useEffect(() => {
        if (formik.isValid && formik.values.email.length > 0) {
            setDialogActionState({
                ...dialogActionState[0],
                valid: true
            })
        } else {
            setDialogActionState({
                ...dialogActionState[0],
                valid: false
            })
        }
        // eslint-disable-next-line
    }, [formik.isValid]);

    return (
        <>
            <form style={{ height: '100%' }}>
                {
                    (role !== 'terms' && role !== 'providers' && role !== 'cities') && (
                        <>
                            <TextField
                                fullWidth
                                id="fullName"
                                name="full_name"
                                label={t('Full Name')}
                                type='text'
                                value={dialogActionState[0].data.full_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            {
                                dialogActionState[0].client ? (
                                    <TextField
                                        fullWidth
                                        id="phoneNumber"
                                        name="phone_number"
                                        label={t('Phone Number')}
                                        value={dialogActionState[0].data.phone_number || ''}
                                        onChange={(e) => formChange(e)}
                                        sx={{ mb: 3 }}
                                    />
                                ) : (
                                    <>
                                        <TextField
                                            fullWidth
                                            id="email"
                                            name="email"
                                            label={t('Email')}
                                            value={dialogActionState[0].data.email || formik.values.email}
                                            onChange={(e) => formChange(e)}
                                            error={formik.touched.email && Boolean(formik.errors.email)}
                                            helperText={formik.touched.email && formik.errors.email}
                                            sx={{ mb: 3 }}
                                        />
                                        {formik.errors.email && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.email}</Alert>)}
                                    </>

                                )
                            }
                            <TextField
                                fullWidth
                                id="password"
                                name="password"
                                label={t('Password')}
                                value={dialogActionState[0].data.password || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            {formik.errors.password && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.password}</Alert>)}
                        </>
                    )
                }
                {
                    role === 'providers' && (
                        <>
                            <TextField
                                fullWidth
                                id="company_name"
                                name="company_name"
                                label={t('company_name')}
                                value={dialogActionState[0].data.company_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="provider_email"
                                name="provider_email"
                                label={t('Email')}
                                value={dialogActionState[0].data.provider_email || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="first_name"
                                name="first_name"
                                label={t('first_name')}
                                value={dialogActionState[0].data.first_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="second_name"
                                name="second_name"
                                label={t('second_name')}
                                value={dialogActionState[0].data.second_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="provider_phone_number"
                                name="provider_phone_number"
                                label={t('Phone Number')}
                                value={dialogActionState[0].data.provider_phone_number || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="provider_phone_number_2"
                                name="provider_phone_number_2"
                                label={t('Phone Number')}
                                value={dialogActionState[0].data.provider_phone_number_2 || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="job_title"
                                name="job_title"
                                label={t('job_title')}
                                value={dialogActionState[0].data.job_title || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                        </>
                    )
                }
                {
                    role === 'terms' && (
                        <>
                            <TextField
                                fullWidth
                                id="order"
                                name="order"
                                label={t('order')}
                                value={dialogActionState[0].data.order || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="ar_text"
                                name="ar_text"
                                label={t('ar_text')}
                                value={dialogActionState[0].data.ar_text || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="en_text"
                                name="en_text"
                                label={t('en_text')}
                                value={dialogActionState[0].data.en_text || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="ku_text"
                                name="ku_text"
                                label={t('ku_text')}
                                value={dialogActionState[0].data.ku_text || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                        </>
                    )
                }
                {
                    role === 'cities' && (
                        <>
                            <TextField
                                fullWidth
                                id="order"
                                name="order"
                                label={t('order')}
                                value={dialogActionState[0].data.order || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="ar_name"
                                name="ar_name"
                                label={t('ar_name')}
                                value={dialogActionState[0].data.ar_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="en_name"
                                name="en_name"
                                label={t('en_name')}
                                value={dialogActionState[0].data.en_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                            <TextField
                                fullWidth
                                id="ku_name"
                                name="ku_name"
                                label={t('ku_name')}
                                value={dialogActionState[0].data.ku_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                        </>
                    )
                }
            </form>
            <div style={{ height: '100%' }}>
                {
                    permission !== undefined ?
                        <Permissions
                            selectedRadio={selectedRadio}
                            selectedChecked={selectedChecked}
                            setSelectedChecked={setSelectedChecked}
                            setSelectedRadio={setSelectedRadio}
                            permission={permission}
                        /> : role === 'admin' ? 'Loading permissions ...' : ''
                }
            </div>
        </>
    );
}

export default AddForm