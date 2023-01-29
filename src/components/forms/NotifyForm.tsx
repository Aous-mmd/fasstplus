import { TextField } from '@mui/material'
import React from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';

type Props = {}

const NotifyForm = (props: Props) => {
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
                id="ar_title"
                name="ar_title"
                label={t('ar_title')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.ar_title ?
                            dialogActionState[0].submitData.ar_title :
                            dialogActionState[0].data?.ar_title ? dialogActionState[0].data?.ar_title : '' : dialogActionState[0].data?.ar_title ? dialogActionState[0].data?.ar_title : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ar_body"
                name="ar_body"
                label={t('ar_body')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.ar_body ?
                            dialogActionState[0].submitData.ar_body :
                            dialogActionState[0].data?.ar_body ? dialogActionState[0].data?.ar_body : '' : dialogActionState[0].data?.ar_body ? dialogActionState[0].data?.ar_body : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="en_title"
                name="en_title"
                label={t('en_title')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.en_title ?
                            dialogActionState[0].submitData.en_title :
                            dialogActionState[0].data?.en_title ? dialogActionState[0].data?.en_title : '' : dialogActionState[0].data?.en_title ? dialogActionState[0].data?.en_title : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="en_body"
                name="en_body"
                label={t('en_body')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.en_body ?
                            dialogActionState[0].submitData.en_body :
                            dialogActionState[0].data?.en_body ? dialogActionState[0].data?.en_body : '' : dialogActionState[0].data?.en_body ? dialogActionState[0].data?.en_body : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ku_title"
                name="ku_title"
                label={t('ku_title')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.ku_title ?
                            dialogActionState[0].submitData.ku_title :
                            dialogActionState[0].data?.ku_title ? dialogActionState[0].data?.ku_title : '' : dialogActionState[0].data?.ku_title ? dialogActionState[0].data?.ku_title : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ku_body"
                name="ku_body"
                label={t('ku_body')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.ku_body ?
                            dialogActionState[0].submitData.ku_body :
                            dialogActionState[0].data?.ku_body ? dialogActionState[0].data?.ku_body : '' : dialogActionState[0].data?.ku_body ? dialogActionState[0].data?.ku_body : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
        </>
    )
}

export default NotifyForm