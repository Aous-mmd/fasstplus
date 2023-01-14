import { TextField } from '@mui/material'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';

const EditCity = () => {
    const dialogActionState = useRecoilState(dialogAction);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const { t } = useTranslation();

    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                [e.target.name]: e.target.value,
            }
        });
    };

    return (
        <>
            <TextField
                fullWidth
                id="order"
                name="order"
                label={t('order')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.order ?
                            dialogActionState[0].submitData.order :
                            dialogActionState[0].data.order ? dialogActionState[0].data.order : '' : dialogActionState[0].data.order ? dialogActionState[0].data.order : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ar_name"
                name="ar_name"
                label={t('ar_name')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData?.ar_name?.length! > 0 ? dialogActionState[0].submitData?.ar_name :
                            dialogActionState[0].data.all_lang?.length! > 0 ? dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 1)[0].name : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 1)[0].name : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 1)[0].name}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="en_name"
                name="en_name"
                label={t('en_name')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData?.en_name?.length! > 0 ? dialogActionState[0].submitData?.en_name :
                            dialogActionState[0].data.all_lang?.length! > 0 ? dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 2)[0].name : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 2)[0].name : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 2)[0].name}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ku_name"
                name="ku_name"
                label={t('ku_name')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData?.ku_name?.length! > 0 ? dialogActionState[0].submitData?.ku_name :
                            dialogActionState[0].data.all_lang?.length! > 0 ? dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 3)[0].name : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 3)[0].name : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === 3)[0].name}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
        </>
    )
}

export default EditCity