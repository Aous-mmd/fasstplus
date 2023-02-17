import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ApiList from '../../api/ApiList';
import { CallApi } from '../../api/CallApi';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';

type Props = {}

const OrderStatusForm = (props: Props) => {
    const dialogActionState = useRecoilState(dialogAction);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    const [providers, setProvider] = useState<any>();

    useEffect(() => {
        (async () => {
            await CallApi.get(ApiList.getOrderProviders, { params: { service_id: dialogActionState[0].data?.service_id } }).then(response => setProvider(response.data.data.providers));
        })();
        setDialogActionState({
            ...dialogActionState[0],
            submitData: { ...dialogActionState[0].data }
        });
    }, [])
    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {

        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                [e.target.name]: e.target.value,
            }
        });
    };


    const handleChange = async (event: SelectChangeEvent) => {
        if (event.target.value === 'Approved') {
            setDialogActionState({
                ...dialogActionState[0],
                submitData: {
                    ...dialogActionState[0].submitData,
                    [event.target.name]: event.target.value,
                    reject_reason: null,
                }
            });
        }
        else {
            setDialogActionState({
                ...dialogActionState[0],
                submitData: {
                    ...dialogActionState[0].submitData,
                    [event.target.name]: event.target.value,
                }
            });
        }
    };

    return (
        <Box
            component="form"
        >
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        id="price"
                        name="price"
                        label={t('price')}
                        value={dialogActionState[0].submitData.price || ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="reject_reason"
                        fullWidth
                        multiline
                        rows={3}
                        name="reject_reason"
                        label={t('reject_reason')}
                        value={dialogActionState[0].submitData.reject_reason || ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    {t('order_date')}
                    <TextField
                        fullWidth
                        id="order_date"
                        name="order_date"
                        autoFocus
                        type='datetime-local'
                        value={dialogActionState[0].submitData.order_date || ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    {t('finish_date')}
                    <TextField
                        fullWidth
                        id="finish_date"
                        name="finish_date"
                        autoFocus
                        type='date'
                        value={dialogActionState[0].submitData.finish_date || ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="Status">{t('Status')}</InputLabel>
                        <Select
                            labelId="Status"
                            id="select-Status"
                            name='status'
                            value={dialogActionState[0].submitData?.status || ''}
                            onChange={handleChange}
                        >
                            <MenuItem value="Approved">{t('Approved')}</MenuItem>
                            <MenuItem value="Canceled">{t('Canceled')}</MenuItem>
                            <MenuItem value="Pending">{t('Pending')}</MenuItem>
                            <MenuItem value="Done">{t('Done')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="provider">{t('Provider')}</InputLabel>
                        <Select
                            labelId="provider"
                            id="select-provider"
                            disabled={dialogActionState[0].submitData?.status !== 'Approved'}
                            name='provider_id'
                            value={dialogActionState[0].submitData?.provider_id || ''}
                            onChange={handleChange}
                        >
                            {
                                providers?.map((provider: any) => <MenuItem key={provider.first_name} value={provider.id}>{provider.first_name} {provider.second_name}</MenuItem>)
                            }
                            {
                                !providers && (
                                    <MenuItem value={dialogActionState[0].data?.provider?.id}>{dialogActionState[0].data?.provider?.first_name} {dialogActionState[0].data?.provider?.second_name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderStatusForm