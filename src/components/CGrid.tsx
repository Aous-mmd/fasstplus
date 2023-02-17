import React, { useState, useEffect } from 'react'
import { Box, useTheme, FormControl, FormControlLabel, FormLabel, RadioGroup, Radio } from '@mui/material';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport } from '@mui/x-data-grid'
import { colorsTheme } from '../theme'
import { Add } from '@mui/icons-material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../store/atom';
import CButton from './CButton';
import CustomOverLay from './CustomOverLay';
import { useFetchData } from '../hooks';
import { useTranslation } from 'react-i18next';

type Props = {
    columns: GridColDef[];
    addButton?: boolean;
    addButtonTitle?: string;
    role: string;
    url: string;
    status?: number;
    users?: boolean;
    cities?: boolean;
    reasons?: boolean;
    providers?: boolean;
    orders?: boolean;
    startDate?: any;
    endDate?: any;
    custom?: boolean;
    place?: string;
}

function CustomToolbar() {
    return (
        <GridToolbarContainer>
            <GridToolbarExport sx={{ backgroundColor: 'green' }} />
        </GridToolbarContainer>
    );
}

const CGrid: React.FC<Props> = ({ url, custom, place, columns, startDate, endDate, addButton, addButtonTitle, role, status, users, cities, reasons, providers, orders }) => {
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    const [pageSize, setPageSize] = useState(10);
    const dialogActionState = useRecoilState(dialogAction);
    const [page, setPage] = React.useState(0);
    const [value, setValue] = React.useState<number>(role === 'orders' ? 4 : users || place === 'users' ? 0 : place === 'orders' ? 4 : 2);
    const [Cstatus, setCstatus] = React.useState<number>(
        role === 'orders' ? 4 : users || place === 'users' ? 0 : place === 'orders' ? 4 : 2
    );
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCstatus(parseInt((event.target as HTMLInputElement).value));
        setValue(parseInt((event.target as HTMLInputElement).value));
    };
    const queryOptions = React.useMemo(
        () => ({
            page,
            pageSize,
            status: Cstatus,
            start_date: startDate,
            end_date: endDate
        }),
        [page, pageSize, Cstatus, startDate, endDate],
    );
    const { data, isSuccess, pageInfo } = useFetchData(url, queryOptions);

    return (
        <Box width='100%' height='100%'>
            <Box width='100%' mb={1} display='flex' justifyContent='space-between' alignItems='center'>
                <FormControl>
                    {
                        (users) && (
                            <>
                                <FormLabel id="demo-controlled-radio-buttons-group">{t('Filter')}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={0} control={<Radio />} label={t('All')} />
                                    <FormControlLabel value={1} control={<Radio />} label={t('showActive')} />
                                    <FormControlLabel value={2} control={<Radio />} label={t('showunActive')} />
                                    <FormControlLabel value={3} control={<Radio />} label={t('Blocked')} />
                                </RadioGroup>
                            </>
                        )
                    }
                    {
                        orders && (
                            <>
                                <FormLabel id="demo-controlled-radio-buttons-group">{t('Filter')}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={4} control={<Radio />} label={t('All')} />
                                    <FormControlLabel value={0} control={<Radio />} label={t('Done')} />
                                    <FormControlLabel value={1} control={<Radio />} label={t('Pending')} />
                                    <FormControlLabel value={2} control={<Radio />} label={t('Canceled')} />
                                    <FormControlLabel value={3} control={<Radio />} label={t('Approved')} />
                                </RadioGroup>
                            </>
                        )
                    }
                    {
                        (cities || reasons || providers) && (
                            <>
                                <FormLabel id="demo-controlled-radio-buttons-group">{t('Filter')}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={2} control={<Radio />} label={t('All')} />
                                    <FormControlLabel value={0} control={<Radio />} label={t('showActive')} />
                                    <FormControlLabel value={1} control={<Radio />} label={t('showunActive')} />
                                </RadioGroup>
                            </>
                        )
                    }
                    {
                        role === 'reports' ?
                            place === 'users' ? <>
                                <FormLabel id="demo-controlled-radio-buttons-group">{t('Filter')}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={0} control={<Radio />} label={t('All')} />
                                    <FormControlLabel value={1} control={<Radio />} label={t('showActive')} />
                                    <FormControlLabel value={2} control={<Radio />} label={t('showunActive')} />
                                    <FormControlLabel value={3} control={<Radio />} label={t('Blocked')} />
                                </RadioGroup>
                            </> : place === 'providers' ? <>
                                <FormLabel id="demo-controlled-radio-buttons-group">{t('Filter')}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={2} control={<Radio />} label={t('All')} />
                                    <FormControlLabel value={0} control={<Radio />} label={t('showActive')} />
                                    <FormControlLabel value={1} control={<Radio />} label={t('showunActive')} />
                                </RadioGroup>
                            </> : <>
                                <FormLabel id="demo-controlled-radio-buttons-group">{t('Filter')}</FormLabel>
                                <RadioGroup
                                    aria-labelledby="demo-controlled-radio-buttons-group"
                                    name="controlled-radio-buttons-group"
                                    value={value}
                                    row
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={4} control={<Radio />} label={t('All')} />
                                    <FormControlLabel value={0} control={<Radio />} label={t('Done')} />
                                    <FormControlLabel value={1} control={<Radio />} label={t('Pending')} />
                                    <FormControlLabel value={2} control={<Radio />} label={t('Canceled')} />
                                    <FormControlLabel value={3} control={<Radio />} label={t('Approved')} />
                                </RadioGroup>
                            </>
                            : <></>
                    }
                </FormControl>
                {
                    addButton && (
                        <CButton
                            title={addButtonTitle!}
                            children={<Add />}
                            onClick={() => setDialogActionState({ ...dialogActionState[0], open: true, add: true, admin: role === 'admin', client: role === 'client', service: role === 'service', providers: role === 'providers' })}
                        />
                    )
                }
            </Box>
            <DataGrid
                rows={data}
                disableSelectionOnClick
                showCellRightBorder
                rowHeight={role === 'services' ? 85 : 52}
                pageSize={pageSize}
                rowCount={pageInfo || 0}
                pagination
                loading={!isSuccess}
                page={page}
                paginationMode='server'
                rowsPerPageOptions={[10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
                onPageSizeChange={page => setPageSize(page)}
                onPageChange={(newPage) => setPage(newPage)}
                filterMode='server'
                sx={{
                    backgroundColor: colors.Primary[600],
                    color: colors.Primary[100],
                    border: '1px solid black',
                    "& *": {
                        color: colors.Primary[100],
                        borderColor: colors.Primary[100],
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: `1px solid ${colors.Primary[100]}`,
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        borderBottom: `1px solid ${colors.Primary[100]}`,
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: `1px solid ${colors.Primary[100]}`,
                    },
                }}
                components={{
                    NoRowsOverlay: CustomOverLay,
                    Toolbar: custom ? CustomToolbar : undefined,
                }}
                columns={columns}
            />
        </Box>
    )
}

export default CGrid