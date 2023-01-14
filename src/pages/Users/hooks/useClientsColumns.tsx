import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { ToolBarActions } from '../../../components';
import { useGetFilters } from '../../../hooks';
import { ActiveValue } from '../../../components/filters';

const useClientsColumns = (): GridColumns => {
    const { t } = useTranslation();
    const filterSelect = useGetFilters(ActiveValue, 'number');
    return [
        { field: 'id', hide: true },
        {
            field: 'full_name',
            headerName: t('Full Name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true
        },
        {
            field: 'phone_number',
            headerName: t('Number')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true
        },
        {
            field: 'verification_code',
            headerName: t('Verification Code')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true
        },
        {
            field: 'active',
            headerName: t('Active')!,
            minWidth: 200,
            flex: 0.1,
            filterOperators: filterSelect,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.value === 0 ? 'No' : 'Yes'}</div>
            }
        },
        {
            field: 'block',
            headerName: t('Block')!,
            minWidth: 200,
            filterOperators: filterSelect,
            flex: 0.1,
            renderCell: (params) => {
                return <div>{params.value === 0 ? 'No' : 'Yes'}</div>
            }
        },
        {
            field: '',
            headerName: t('Actions')!,
            minWidth: 300,
            flex: 0.5,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => {
                return <ToolBarActions role='client' deletes={false} params={params.row} />
            }
        },
    ];
}

export default useClientsColumns