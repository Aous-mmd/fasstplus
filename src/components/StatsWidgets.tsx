import React from 'react'
import {
    CWidgetStatsA,
    CCol,
    CRow
} from '@coreui/react'
import { CChartLine, CChartBar } from '@coreui/react-chartjs';
import { useTranslation } from 'react-i18next';
import { TStats } from '../pages/Stats/types';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

type Props = {
    data: TStats;
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
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: '#321fdb',
                                        data: [65, 59, 84, 84, 51, 55, 40],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: 30,
                                        max: 89,
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="info"
                    value={props.data?.providers_count}
                    title={t('providers_count')}
                    chart={
                        <CChartLine
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'transparent',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        pointBackgroundColor: '#39f',
                                        data: [1, 18, 9, 17, 34, 22, 11],
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        min: -9,
                                        max: 39,
                                        display: false,
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 1,
                                    },
                                    point: {
                                        radius: 4,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="warning"
                    value={props.data?.today_orders}
                    title={t('today_orders')}
                    chart={
                        <CChartLine
                            className="mt-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: [78, 81, 80, 45, 34, 12, 40],
                                        fill: true,
                                    },
                                ],
                            }}
                            options={{
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                maintainAspectRatio: false,
                                scales: {
                                    x: {
                                        display: false,
                                    },
                                    y: {
                                        display: false,
                                    },
                                },
                                elements: {
                                    line: {
                                        borderWidth: 2,
                                        tension: 0.4,
                                    },
                                    point: {
                                        radius: 0,
                                        hitRadius: 10,
                                        hoverRadius: 4,
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={3}>
                <CWidgetStatsA
                    className="mb-4"
                    color="danger"
                    value={props.data?.today_income}
                    title={t('today_income')}
                    chart={
                        <CChartBar
                            className="mt-3 mx-3"
                            style={{ height: '70px' }}
                            data={{
                                labels: [
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                    'May',
                                    'June',
                                    'July',
                                    'August',
                                    'September',
                                    'October',
                                    'November',
                                    'December',
                                    'January',
                                    'February',
                                    'March',
                                    'April',
                                ],
                                datasets: [
                                    {
                                        label: 'My First dataset',
                                        backgroundColor: 'rgba(255,255,255,.2)',
                                        borderColor: 'rgba(255,255,255,.55)',
                                        data: [78, 81, 80, 45, 34, 12, 40, 85, 65, 23, 12, 98, 34, 84, 67, 82],
                                        barPercentage: 0.6,
                                    },
                                ],
                            }}
                            options={{
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    x: {
                                        grid: {
                                            display: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                    y: {
                                        grid: {
                                            display: false,
                                            drawBorder: false,
                                            drawTicks: false,
                                        },
                                        ticks: {
                                            display: false,
                                        },
                                    },
                                },
                            }}
                        />
                    }
                />
            </CCol>
            <CCol sm={12}>
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