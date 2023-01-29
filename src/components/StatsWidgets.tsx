import React from 'react'
import {
    CWidgetStatsA,
    CCol,
    CRow
} from '@coreui/react';
import { useTranslation } from 'react-i18next';
import { TStats, TStatsOrder } from '../pages/Stats/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

type Props = {
    data: TStats;
    Orders: TStatsOrder;
}

const StatsWidgets = (props: Props) => {
    const { t } = useTranslation();
    return (
        <CRow>
            <CCol sm={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="primary"
                    value={props.data?.users_count}
                    title={t('Users')}
                />
            </CCol>
            <CCol sm={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={props.data?.providers_count}
                    title={t('providers_count')}
                />
            </CCol>
            <CCol sm={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="warning"
                    value={props.data?.today_orders}
                    title={t('today_orders')}
                />
            </CCol>
            <CCol sm={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value={props.data?.today_income}
                    title={t('today_income')}
                />
            </CCol>
            <CCol sm={12}>
                <Typography variant='h5' mt={2} mb={2}>{t('last_three_orders')}</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('type')}</TableCell>
                                <TableCell align="left">{t('Status')}</TableCell>
                                <TableCell align="left">{t('User')}</TableCell>
                                <TableCell align="left">{t('finish_date')}</TableCell>
                                <TableCell align="left">{t('price')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.Orders?.orders.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.type}
                                    </TableCell>
                                    <TableCell align="left">{row.status}</TableCell>
                                    <TableCell align="left">{row.user.full_name}</TableCell>
                                    <TableCell align="left">{row.finish_date}</TableCell>
                                    <TableCell align="left">{row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CCol>
            <CCol sm={12}>
                <Typography variant='h5' mt={2} mb={2}>{t('most_orders_users')}</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('Full Name')}</TableCell>
                                <TableCell align="left">{t('Phone Number')}</TableCell>
                                <TableCell align="left">{t('Email')}</TableCell>
                                <TableCell align="left">{t('country_code')}</TableCell>
                                <TableCell align="left">{t('orders_count')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data?.most_orders_users.map((row) => (
                                <TableRow
                                    key={row.full_name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.full_name}
                                    </TableCell>
                                    <TableCell align="left">{row.phone_number}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.country_code}</TableCell>
                                    <TableCell align="left">{row.orders_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CCol>
            <CCol sm={12} style={{ marginTop: 5 }}>
                <Typography variant='h5' mt={2} mb={2}>{t('most_orders_providers')}</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('Full Name')}</TableCell>
                                <TableCell align="left">{t('Phone Number')}</TableCell>
                                <TableCell align="left">{t('Email')}</TableCell>
                                <TableCell align="left">{t('job_title')}</TableCell>
                                <TableCell align="left">{t('orders_count')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.data?.most_orders_providers.map((row) => (
                                <TableRow
                                    key={row.provider_email}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.first_name} {row.second_name}
                                    </TableCell>
                                    <TableCell align="left">{row.provider_phone_number}</TableCell>
                                    <TableCell align="left">{row.provider_email}</TableCell>
                                    <TableCell align="left">{row.job_title}</TableCell>
                                    <TableCell align="left">{row.orders_count}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </CCol>
            <CCol sm={12} style={{ marginTop: 5 }}>
                <Typography variant='h5' mt={2} mb={2}>{t('top_time_service')}</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('Full Name')}</TableCell>
                                <TableCell align="left">{t('orders_count')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {props.data?.top_time_service.default_name}
                                </TableCell>
                                <TableCell align="left">{props.data?.top_time_service.orders_count}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CCol>
            <CCol sm={12} style={{ marginTop: 5 }}>
                <Typography variant='h5' mt={2} mb={2}>{t('top_rated_service')}</Typography>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>{t('Full Name')}</TableCell>
                                <TableCell align="left">{t('price')}</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {props.data?.top_rated_service.default_name}
                                </TableCell>
                                <TableCell align="left">{props.data?.top_rated_service.price}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </CCol>
        </CRow>
    )
}

export default StatsWidgets