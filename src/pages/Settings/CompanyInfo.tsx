import React from 'react'
import { Alert, Grid, TextField } from '@mui/material'
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import { CButton, Loader } from '../../components';
import useFetchData from '../../hooks/useFetchData';
import ApiList from '../../api/ApiList';
import { useEffect } from 'react';
import { CallApi } from '../../api/CallApi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';

const CompanyInfo = () => {
    const { t } = useTranslation();
    const setDialogActionState = useSetRecoilState(dialogAction);
    const dialogActionState = useRecoilState(dialogAction);
    const Schema = Yup.object().shape({
        email: Yup.string().email(t('Invalid email')!).required(t('This field is required')!),
    });
    const { data, isSuccess } = useFetchData(ApiList.getCompanyInfo);
    const formik = useFormik({
        initialValues: {
            email: '',
            phone_number: ''
        },

        validationSchema: Schema,
        onSubmit: (values) => {
            setDialogActionState({ ...dialogActionState[0], submit: true });
            CallApi.post(ApiList.editCompanyInfo, { ...values }).then((res) => {
                setDialogActionState({ ...dialogActionState[0], submit: false, open: false, isSuccess: true });
            })
        },
    });


    useEffect(() => {
        if (isSuccess) formik.setValues(data.company);
        // eslint-disable-next-line
    }, [isSuccess]);


    if (!data)
        return <Loader />
    return (
        <Grid container spacing={2} display='block'>
            <TextField
                fullWidth
                id="email"
                name="email"
                label={t('Email')}
                value={formik.values.email}
                onChange={formik.handleChange}
                sx={{ mb: 3 }}
            />
            {formik.errors.email && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.email}</Alert>)}
            <TextField
                fullWidth
                id="phone_number"
                name="phone_number"
                label={t('Phone Number')}
                value={formik.values.phone_number}
                onChange={formik.handleChange}
                sx={{ mb: 3 }}
            />
            {formik.errors.phone_number && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.phone_number}</Alert>)}
            <CButton title={t('Save')!} width="100%"
                onClick={formik.handleSubmit}
                disabled={!formik.isValid} />
        </Grid>
    )
}

export default CompanyInfo