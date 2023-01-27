import React, { useState } from 'react'
import { Box, useTheme, Checkbox, FormControl, FormGroup, FormControlLabel } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid'
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
}

const CGrid: React.FC<Props> = ({ url, columns, addButton, addButtonTitle, role, status }) => {
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const [pageSize, setPageSize] = useState(10);
    const dialogActionState = useRecoilState(dialogAction);
    const [page, setPage] = React.useState(0);
    const [active, setActive] = React.useState(true);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setActive(event.target.checked);
    };
    const { t } = useTranslation();
    const queryOptions = React.useMemo(
        () => ({
            page,
            pageSize,
        }),
        [page, pageSize],
    );
    const { data, isSuccess, pageInfo } = useFetchData(url, queryOptions, status);

    return (
        <Box width='100%' height='100%'>
            <Box width='100%' mb={1} display='flex' justifyContent='space-between'>
                <FormControl component="fieldset">
                    <FormGroup aria-label="position" row>
                        <FormControlLabel
                            value="end"
                            control={<Checkbox
                                checked={active}
                                onChange={handleChange}
                            />}
                            label={t('showActive')}
                            labelPlacement="end"
                        />
                        <FormControlLabel
                            value="end"
                            control={<Checkbox
                                checked={active}
                                onChange={handleChange}
                            />}
                            label={t('showunActive')}
                            labelPlacement="end"
                        />
                    </FormGroup>
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
                filterMode='client'
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
                }}
                columns={columns}
            />
        </Box>
    )
}

export default CGrid