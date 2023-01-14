
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { ToolBarActions } from '../../../components';
import { ActiveValue } from '../../../components/filters';
import { useGetFilters } from '../../../hooks';

const useProvidersColumns = (): GridColumns => {
    const { t } = useTranslation();
    const filterSelect = useGetFilters(ActiveValue, 'number');
    return [
        { field: 'id', hide: true },
        {
            field: 'company_name',
            headerName: t('company_name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true
        },
        {
            field: 'provider_email',
            headerName: t('Email')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'first_name',
            headerName: t('first_name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'second_name',
            headerName: t('second_name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'active',
            headerName: t('Active')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
            filterOperators: filterSelect,
            renderCell: (params) => {
                return <div>{params.value === 0 ? 'No' : 'Yes'}</div>
            }
        },
        {
            field: 'provider_phone_number',
            headerName: t('Phone Number')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'provider_phone_number_2',
            headerName: `${t('Phone Number')!} 2`,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'job_title',
            headerName: t('job_title')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
        },
        {
            field: '',
            headerName: t('Actions')!,
            minWidth: 300,
            flex: 0.5,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => {
                return <ToolBarActions role='providers' deletes={true} params={params.row} />
            }
        },
    ];
}

export default useProvidersColumns