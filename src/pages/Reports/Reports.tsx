import React from 'react'
import { CGrid } from '../../components'
import useReportsColumn from './hooks/useReportsColumn'
import ApiList from '../../api/ApiList'
import useReportsOrderColumns from './hooks/useReportsOrderColumns';
import useReportsProviderColumns from './hooks/useReportsProviderColumns';
import { Grid, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

type Props = {}

const Reports = (props: Props) => {
    const columns = useReportsColumn();
    const columnsorder = useReportsOrderColumns();
    const columnsprovider = useReportsProviderColumns();
    const { t } = useTranslation();
    const [startDate, setStartDate] = React.useState('2023-01-01');
    const [endDate, setEndDate] = React.useState('2024-01-01');

    return (
        <Grid container spacing={2} style={{ overflowY: 'scroll' }}>
            <Grid item xs={12}>
                <TextField
                    fullWidth
                    label={t('start_date')}
                    value={startDate}
                    sx={{ mb: 2 }}
                    type='date'
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    sx={{ mb: 2 }}
                    fullWidth
                    label={t('end_date')}
                    value={endDate}
                    type='date'
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </Grid>
            <Grid item xs={12} mb={5} minHeight='350px'>
                <Typography variant='h6'>{t('Users')}</Typography>
                <CGrid
                    startDate={startDate}
                    endDate={endDate}
                    role='reports'
                    columns={columns}
                    url={ApiList.getUsersreport}
                    custom
                    place='users'
                />
            </Grid>
            <Grid item xs={12} mt={6} mb={5} minHeight='350px'>
                <Typography variant='h6'>{t('Orders')}</Typography>
                <CGrid
                    startDate={startDate}
                    endDate={endDate}
                    role='reports'
                    columns={columnsorder}
                    url={ApiList.getOrdersreport}
                    custom
                    place='orders'
                />
            </Grid>
            <Grid item xs={12} mt={6} mb={5} minHeight='350px'>
                <Typography variant='h6'>{t('Provider')}</Typography>
                <CGrid
                    startDate={startDate}
                    endDate={endDate}
                    role='reports'
                    columns={columnsprovider}
                    url={ApiList.getProvidersReport}
                    custom
                    place='providers'
                />
            </Grid>
        </Grid>
    )
}

export default Reports