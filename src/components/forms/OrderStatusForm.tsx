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
    const [cities, setCities] = useState<any>();
    const [users, setUsers] = useState<any>();
    const [services, setServices] = useState<any>();
    useEffect(() => {
        (async () => {
            await CallApi.get(ApiList.getOrderServices).then(res => {
                setServices(res.data.data.services);
            });
            await CallApi.get(ApiList.getOrderUsers).then(res => {
                setUsers(res.data.data.users);
            });
            await CallApi.get(ApiList.getOrderCities).then(res => {
                setCities(res.data.data.cities);
            });
        })();
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
        if (event.target.name === 'status') {
            await CallApi.get(ApiList.getOrderProviders, { params: { service_id: event.target.value } }).then(response => setProvider(response.data.data.providers));
        }
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                [event.target.name]: event.target.value,
            }
        });
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
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.price ?
                                    dialogActionState[0].submitData.price :
                                    dialogActionState[0].data?.price ? dialogActionState[0].data?.price : '' : dialogActionState[0].data?.price ? dialogActionState[0].data?.price : ''}
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
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.reject_reason ?
                                    dialogActionState[0].submitData.reject_reason :
                                    dialogActionState[0].data.reject_reason ? dialogActionState[0].data.reject_reason : '' : dialogActionState[0].data.reject_reason ? dialogActionState[0].data.reject_reason : ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="order_date"
                        name="order_date"
                        type='datetime-local'
                        label={t('order_date')}
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.order_date ?
                                    dialogActionState[0].submitData.order_date :
                                    dialogActionState[0].data.order_date ? dialogActionState[0].data.order_date : '' : dialogActionState[0].data.order_date ? dialogActionState[0].data.order_date : ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        id="finish_date"
                        name="finish_date"
                        type='datetime-local'
                        label={t('finish_date')}
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.finish_date ?
                                    dialogActionState[0].submitData.finish_date :
                                    dialogActionState[0].data.finish_date ? dialogActionState[0].data.finish_date : '' : dialogActionState[0].data.finish_date ? dialogActionState[0].data.finish_date : ''}
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
                            value={dialogActionState[0].submitData?.status ? dialogActionState[0].submitData?.status : dialogActionState[0].data?.status}
                            onChange={handleChange}
                        >
                            <MenuItem value="Approved">{t('Approved')}</MenuItem>
                            <MenuItem value="Canceled">{t('Canceled')}</MenuItem>
                            <MenuItem value="Pending">{t('Pending')}</MenuItem>
                            <MenuItem value="Done">{t('Done')}</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                {
                    (dialogActionState[0].submitData?.status === 'Approved' || dialogActionState[0].data?.status === 'Approved') && (
                        <Grid item xs={12}>
                            <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
                                <InputLabel id="provider">{t('Provider')}</InputLabel>
                                <Select
                                    labelId="provider"
                                    id="select-provider"
                                    disabled={providers?.length > 0 ? false : !providers ? false : true}
                                    name='provider_id'
                                    value={dialogActionState[0].submitData?.provider_id ? dialogActionState[0].submitData?.provider_id : dialogActionState[0].data?.provider_id}
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
                    )
                }
            </Grid>
        </Box>
    )
}

export default OrderStatusForm