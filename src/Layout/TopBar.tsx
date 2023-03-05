import React from 'react'
import { Box, useTheme, IconButton, InputBase, NativeSelect, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, DialogActions, Button, Alert } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, colorsTheme } from '../theme';
import { LightModeOutlined, DarkModeOutlined, Search, PersonOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { CallApi } from '../api/CallApi';
import ApiList from '../api/ApiList';
import { CDropdown, CDropdownItem, CDropdownMenu, CDropdownToggle } from '@coreui/react';
import Cookies from 'js-cookie';
import { useAuth } from '../App';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../store/atom';

const lngs: Record<string, any> = {
    'ar': { nativeName: 'العربية' },
    'en': { nativeName: 'English' },
    'kr': { nativeName: 'Kurdish' }
};

type Props = {
    width: number;
}

const TopBar = (props: Props) => {
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { t, i18n } = useTranslation();
    let auth = useAuth();
    let navigate = useNavigate();
    const setDialogActionState = useSetRecoilState(dialogAction);
    const dialogActionState = useRecoilState(dialogAction);
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const Schema = Yup.object().shape({
        old_password: Yup.string().required(`${t('This field is required')!},  ${t('ValidValue')!}`).min(8, t('PasswordLength')!),
        password: Yup.string().required(`${t('This field is required')!},  ${t('ValidValue')!}`).min(8, t('PasswordLength')!),
        password_confirmation: Yup.string().required(t('This field is required')!).when("password", {
            is: (val: any) => (val && val.length > 0 ? true : false),
            then: Yup.string().oneOf(
                [Yup.ref("password")],
                t('Both password need to be the same')!
            )
        })
    });

    const formik = useFormik({
        initialValues: {
            old_password: "",
            password: "",
            password_confirmation: ""
        },

        validationSchema: Schema,
        onSubmit: (values) => {
            setDialogActionState({ ...dialogActionState[0], submit: true });
            CallApi.post('/admin/auth/password/change', { ...values }).then(res => {
                setDialogActionState({ ...dialogActionState[0], submit: false });
                toast.success(res.data.msg)
            }).catch(err => { setDialogActionState({ ...dialogActionState[0], submit: false }); toast.error(err.response.data.errors[0]) })
        },
    });

    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        formik.handleChange(e);
    }

    return (
        <Box display='flex' sx={{
            backgroundColor: colors.Primary[200], zIndex: 100, position: 'fixed', top: 0,
            left: i18n.language === 'ar' || i18n.language === 'kr' ? '0' : window.screen.width - props.width,
            right: i18n.language === 'ar' || i18n.language === 'kr' ? window.screen.width - props.width : '0',
            transition: 'all 0.5s ease-in-out', width: props.width
        }} justifyContent='space-between' p={2} width="100%" height='10%'>
            {/* <Box display='flex' sx={{ backgroundColor: colors.Primary[600] }} borderRadius="5px">
                <InputBase sx={{ marginInlineStart: 2, flex: 1, color: colors.Primary[100] }} placeholder={t('Search')!} />
                <IconButton type='button' sx={{ p: 1 }}>
                    <Search sx={{ color: colors.Primary[100] }} />
                </IconButton>
            </Box> */}
            <Box display='flex'>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'light' ?
                        <DarkModeOutlined sx={{ color: colors.Primary[500] }} /> :
                        <LightModeOutlined sx={{ color: colors.Light[500] }} />
                    }
                </IconButton>
                <IconButton>
                    <CDropdown component="li">
                        <CDropdownToggle style={{ backgroundColor: 'transparent', border: '0' }}>
                            <PersonOutlined sx={{ color: colors.Primary[700] }} />
                        </CDropdownToggle>
                        <CDropdownMenu>
                            <CDropdownItem onClick={handleClickOpen}>{t('Change Password')}</CDropdownItem>
                            <CDropdownItem onClick={() => {
                                Cookies.remove('jwt');
                                setDialogActionState({ ...dialogActionState[0], submit: true });
                                async function logout() {
                                    await CallApi.delete('/admin/logout').then(res => {
                                        setDialogActionState({ ...dialogActionState[0], submit: false });
                                        window.location.href = "/login";
                                        auth.signout(() => { });
                                    })
                                }
                                logout();
                            }}>{t('Logout')}</CDropdownItem>
                        </CDropdownMenu>
                    </CDropdown>
                </IconButton>
                <NativeSelect
                    sx={{ ":hover": { cursor: 'pointer' }, p: 1, color: colors.Primary[700] }}
                    value={Object.keys(lngs).indexOf(i18n.language) + 1 || lngs[i18n.language]}
                    onChange={(e) => {
                        i18n.changeLanguage(parseInt(e.target.value) === 1 ? 'ar' : parseInt(e.target.value) === 2 ? 'en-US' : 'kr');
                        localStorage.setItem('lang_id', e.target.value);
                        CallApi.post(ApiList.changeLang, { lang_id: e.target.value });
                    }}
                >
                    {Object.keys(lngs).map((lng, index) => (
                        <option style={{ padding: 1 }} key={lng} value={index + 1}>
                            {lngs[lng].nativeName}
                        </option>
                    ))}
                </NativeSelect>
            </Box>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{t('Change Password')}</DialogTitle>
                <DialogContent>
                    <Box minWidth='100%' component="form" mt={2}>
                        <TextField
                            id="old_password"
                            label={t('old_Password')}
                            {...formik.getFieldProps("old_password")}
                            onChange={(e) => formChange(e)}
                            sx={{ mb: 3, width: '100% !important' }}
                            fullWidth
                        />
                        {formik.errors.old_password && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.old_password}</Alert>)}
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
                            id="password_confirmation"
                            label={t('Confirm Password')}
                            {...formik.getFieldProps("password_confirmation")}
                            onChange={(e) => formChange(e)}
                            sx={{ mb: 3 }}
                        />
                        {formik.errors.password_confirmation && (<Alert sx={{ marginBottom: '25px', width: '100%' }} severity="error">{formik.errors.password_confirmation}</Alert>)}
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>{t('Cancel')}</Button>
                    <Button onClick={() => {
                        formik.submitForm();
                    }} variant='outlined' disabled={!formik.isValid}>{t('Save')}</Button>
                </DialogActions>
            </Dialog>

        </Box >
    )
}

export default TopBar