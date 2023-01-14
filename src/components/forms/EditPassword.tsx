import { Alert, Box, TextField } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from "recoil";
import { dialogAction } from "../../store/atom";
import { useEffect } from 'react';

export const EditPassword = () => {
    const { t } = useTranslation();
    const dialogActionState = useRecoilState(dialogAction);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const Schema = Yup.object().shape({
        password: Yup.string().required(`${t('This field is required')!},  ${t('ValidValue')!}`).min(8, t('PasswordLength')!),
        password_confirm: Yup.string().when("password", {
            is: (val: any) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                t('Both password need to be the same')!
            )
        })
    });

    const formik = useFormik({
        initialValues: {
            password: "",
            password_confirm: ""
        },

        validationSchema: Schema,
        onSubmit: (values) => {
            
        },
    });

    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                password: e.target.name === 'password' ? e.target.value : dialogActionState[0].submitData.password,
                password_confirmation: e.target.name === 'password_confirm' ? e.target.value : dialogActionState[0].submitData.password_confirmation
            }
        });
        formik.handleChange(e);
    }
    useEffect(() => {
        if (formik.isValid && formik.values.password.length > 0 && formik.values.password_confirm.length > 0) {
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
        <Box minWidth='100%'>
            <TextField
                id="password"
                label={t('Password')}
                {...formik.getFieldProps("password")}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3, width: '100% !important' }}
                fullWidth
            />
            {formik.errors.password && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.password}</Alert>)}
            <TextField
                fullWidth
                id="password_confirm"
                label={t('Confirm Password')}
                {...formik.getFieldProps("password_confirm")}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            {formik.errors.password_confirm && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.password_confirm}</Alert>)}
        </Box>
    );
}

export default EditPassword;
