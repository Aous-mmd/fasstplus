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

    const [title, setTitle] = useState<string>('');
    const [neighbrhood, setNeighbrhood] = useState<string>('');
    const [price, setPrice] = useState<string>(dialogActionState[0].data.price || '');
    const [order_date, setOrder_date] = useState<any>(dialogActionState[0].data.order_date || '');
    const [details, setDetails] = useState<string>('');
    const [city_id, setCity_id] = useState<string>('');
    const [note, setNote] = useState<string>(dialogActionState[0].data.note || '');
    const [user_id, setuser_id] = useState<string>(dialogActionState[0].data.user_id || '');
    const [service_id, setservice_id] = useState<string>(dialogActionState[0].data.service_id || '');
    const [provider_id, setprovider_id] = useState<string>(dialogActionState[0].data.provider_id || '');
    const [finish_date, setfinish_date] = useState<any>(dialogActionState[0].submitData.finish_date || '');
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
        if (Object.keys(dialogActionState[0].data).length > 0) {
            console.log(dialogActionState[0].data)
            if (dialogActionState[0].data?.title!)
                setTitle(dialogActionState[0].data.title)
            else setTitle(dialogActionState[0].data.order_address.title);
            if (dialogActionState[0].data.neighborhood)
                setNeighbrhood(dialogActionState[0].data.neighborhood);
            else setNeighbrhood(dialogActionState[0].data.order_address.neighborhood);
            if (dialogActionState[0].data.details)
                setDetails(dialogActionState[0].data.details);
            else setDetails(dialogActionState[0].data.order_address.details);
            if (dialogActionState[0].data.city_id)
                setCity_id(dialogActionState[0].data.city_id);
            else setCity_id(dialogActionState[0].data.order_address.city_id);
        }
    }, []);
    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (e.target.name === 'title')
            setTitle(e.target.value);
        else if (e.target.name === 'price')
            setPrice(e.target.value);
        else if (e.target.name === 'neighborhood')
            setNeighbrhood(e.target.value);
        else if (e.target.name === 'order_date')
            setOrder_date(e.target.value);
        else if (e.target.name === 'details')
            setDetails(e.target.value);
        else if (e.target.name === 'city_id')
            setCity_id(e.target.value);
        else if (e.target.name === 'user_id')
            setuser_id(e.target.value);
        else if (e.target.name === 'service_id')
            setservice_id(e.target.value);
        else if (e.target.name === 'provider_id')
            setprovider_id(e.target.value);
        else if (e.target.name === 'note')
            setNote(e.target.value);
        else if (e.target.name === 'finish_date')
            setfinish_date(e.target.value);
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                [e.target.name]: e.target.value,
            }
        });
    };


    const handleChange = async (event: SelectChangeEvent) => {
        if (event.target.name === 'city_id')
            setCity_id(event.target.value);
        if (event.target.name === 'user_id')
            setuser_id(event.target.value);
        if (event.target.name === 'provider_id')
            setprovider_id(event.target.value);
        if (event.target.name === 'service_id') {
            setservice_id(event.target.value);
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
                    {t('title')}
                    <TextField
                        fullWidth
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={3}>
                    {t('price')}
                    <TextField
                        id="price"
                        fullWidth
                        name="price"
                        value={price}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={3}>
                    {t('neighborhood')}
                    <TextField
                        id="neighborhood"
                        fullWidth
                        name="neighborhood"
                        value={neighbrhood}
                        onChange={(e) => formChange(e)}
                        sx={{ mb: 3 }}
                    />
                </Grid>
                <Grid item xs={3}>
                    {t('order_date')}
                    <TextField
                        fullWidth
                        id="order_date"
                        name="order_date"
                        type='datetime-local'
                        value={order_date}
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
                value={details}
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
                            value={city_id}
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
                            value={user_id}
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
                            value={service_id}
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
                            value={provider_id}
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
                                    value={note}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                            </Grid>
                            <Grid item xs={3}>
                                {t('finish_date')}
                                <TextField
                                    fullWidth
                                    type='date'
                                    id="finish_date"
                                    name="finish_date"
                                    value={finish_date}
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