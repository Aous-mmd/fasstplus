import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';
import { CallApi } from '../../api/CallApi';
import ApiList from '../../api/ApiList';

type Props = {
    data: any;
}

const OrderForm = (props: Props) => {
    const dialogActionState = useRecoilState(dialogAction);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    const [provider, setProvider] = useState<string>();
    const [providerId, setProviderId] = useState<string>();

    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                [e.target.name]: e.target.value,
            }
        });
    };


    const handleChange = (event: SelectChangeEvent) => {
        if (event.target.name === 'service_id') {
            CallApi.get(ApiList.getOrderProviders, { params: { service_id: event.target.value } }).then(response => setProvider(response.data.providers));
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
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label={t('title')}
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.title ?
                                    dialogActionState[0].submitData.title :
                                    dialogActionState[0].data.title ? dialogActionState[0].data.title : '' : dialogActionState[0].data.title ? dialogActionState[0].data.title : ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="price"
                        fullWidth
                        name="price"
                        label={t('price')}
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.price ?
                                    dialogActionState[0].submitData.price :
                                    dialogActionState[0].data.price ? dialogActionState[0].data.price : '' : dialogActionState[0].data.price ? dialogActionState[0].data.price : ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        id="neighborhood"
                        fullWidth
                        name="neighborhood"
                        label={t('neighborhood')}
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.neighborhood ?
                                    dialogActionState[0].submitData.neighborhood :
                                    dialogActionState[0].data.neighborhood ? dialogActionState[0].data.neighborhood : '' : dialogActionState[0].data.neighborhood ? dialogActionState[0].data.neighborhood : ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        id="order_date"
                        name="order_date"
                        type='date'
                        value={
                            Object.keys(dialogActionState[0].submitData).length > 0 ?
                                dialogActionState[0].submitData.order_date ?
                                    dialogActionState[0].submitData.order_date :
                                    dialogActionState[0].data.order_date ? dialogActionState[0].data.order_date : '' : dialogActionState[0].data.order_date ? dialogActionState[0].data.order_date : ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
            </Grid>
            <TextField
                fullWidth
                id="details"
                name="details"
                multiline
                rows={3}
                label={t('details')}
                value={
                    Object.keys(dialogActionState[0].submitData).length > 0 ?
                        dialogActionState[0].submitData.details ?
                            dialogActionState[0].submitData.details :
                            dialogActionState[0].data.details ? dialogActionState[0].data.details : '' : dialogActionState[0].data.details ? dialogActionState[0].data.details : ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <Grid container spacing={2}>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="city">{t('City')}</InputLabel>
                        <Select
                            labelId="city"
                            id="select-city"
                            name='city_id'
                            value={dialogActionState[0].submitData?.city_id ? dialogActionState[0].submitData?.city_id : ''}
                            onChange={handleChange}
                        >
                            {
                                props.data?.cities?.map((city: any) => <MenuItem key={city.default_name} value={city.id}>{city.default_name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="user">{t('User')}</InputLabel>
                        <Select
                            labelId="user"
                            id="select-user"
                            name='user_id'
                            value={dialogActionState[0].submitData?.user_id ? dialogActionState[0].submitData?.user_id : ''}
                            onChange={handleChange}
                        >
                            {
                                props.data?.users?.map((user: any) => <MenuItem key={user.full_name} value={user.id}>{user.full_name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="service">{t('Service')}</InputLabel>
                        <Select
                            labelId="service"
                            id="select-service"
                            name='service_id'
                            value={dialogActionState[0].submitData?.service_id ? dialogActionState[0].submitData?.service_id : ''}
                            onChange={handleChange}
                        >
                            {
                                props.data?.services?.map((service: any) => <MenuItem key={service.default_name} value={service.id}>{service.default_name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        id="provider"
                        name="provider"
                        disabled
                        label={t('provider')}
                        value={provider}
                        sx={{ mb: 3 }}
                    />
                </Grid>
            </Grid>
        </Box>
    )
}

export default OrderForm