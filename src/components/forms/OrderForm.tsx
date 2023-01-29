import React, { useState, useEffect } from 'react'
import { Box, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';
import { CallApi } from '../../api/CallApi';
import ApiList from '../../api/ApiList';
import _ from 'lodash';

const OrderForm = () => {
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
        setDialogActionState({
            ...dialogActionState[0],
            submitData: { ...dialogActionState[0].data }
        })
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
        if (event.target.name === 'service_id') {
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
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        label={t('title')}
                        value={dialogActionState[0].submitData.title || ''}
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
                        value={dialogActionState[0].submitData.price || ''}
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
                        value={dialogActionState[0].submitData.neighborhood || ''}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={3}>
                    <TextField
                        fullWidth
                        id="order_date"
                        name="order_date"
                        type='datetime-local'
                        value={dialogActionState[0].submitData.order_date || ''}
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
                value={dialogActionState[0].submitData.details || ''}
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
                            value={dialogActionState[0].submitData?.city_id || ''}
                            onChange={handleChange}
                        >
                            {
                                cities?.map((city: any) => <MenuItem key={city.default_name} value={city.id}>{city.default_name}</MenuItem>)
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
                            value={dialogActionState[0].submitData?.user_id || ''}
                            onChange={handleChange}
                        >
                            {
                                users?.map((user: any) => <MenuItem key={user.full_name} value={user.id}>{user.full_name}</MenuItem>)
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
                            value={dialogActionState[0].submitData?.service_id || ''}
                            onChange={handleChange}
                        >
                            {
                                services?.map((service: any) => <MenuItem key={service.default_name} value={service.id}>{service.default_name}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={3}>
                    <FormControl fullWidth variant="filled" sx={{ minWidth: 120 }}>
                        <InputLabel id="provider">{t('Provider')}</InputLabel>
                        <Select
                            labelId="provider"
                            id="select-provider"
                            disabled={providers?.length > 0 ? false : !providers ? false : true}
                            name='provider_id'
                            value={dialogActionState[0].submitData?.provider_id || ''}
                            onChange={handleChange}
                        >
                            {
                                providers?.map((provider: any) => <MenuItem key={_.uniqueId()} value={provider.id}>{provider.first_name} {provider.second_name}</MenuItem>)
                            }
                            {
                                !providers && (
                                    <MenuItem value={dialogActionState[0].data?.provider?.id}>{dialogActionState[0].data?.provider?.first_name} {dialogActionState[0].data?.provider?.second_name}</MenuItem>
                                )
                            }
                        </Select>
                    </FormControl>
                </Grid>
                {
                    dialogActionState[0].edit && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    id="note"
                                    name="note"
                                    multiline
                                    rows={3}
                                    label={t('note')}
                                    value={dialogActionState[0].submitData.note || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                <TextField
                                    fullWidth
                                    type='date'
                                    id="finish_date"
                                    name="finish_date"
                                    label={t('finish_date')}
                                    value={dialogActionState[0].submitData.finish_date || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                            </Grid>
                        </>
                    )
                }
            </Grid>
        </Box>
    )
}

export default OrderForm