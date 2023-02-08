
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { ToolBarActions } from '../../../components';

const useOrdersColumns = (): GridColumns => {
    const { t } = useTranslation();
    return [
        { field: 'id', hide: true },
        {
            field: 'service_name',
            headerName: t('service_name')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.row.service.lang.name}</div>
            }
        },
        {
            field: 'client_name',
            headerName: t('client_name')!,
            minWidth: 30,
            flex: 0.1,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.row.user.full_name}</div>
            }
        },
        {
            field: 'client_phone',
            headerName: t('client_phone')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.row.user.phone_number}</div>
            }
        },
        {
            field: 'client_city',
            headerName: t('client_city')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.row.order_address.city_name}</div>
            }
        },
        {
            field: 'type',
            headerName: t('type')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
        },
        {
            field: 'status',
            headerName: t('status')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
        },
        {
            field: 'price',
            headerName: t('price')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
        },
        {
            field: 'order_date',
            headerName: t('order_date')!,
            minWidth: 40,
            flex: 0.2,
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
                return <ToolBarActions role='orders' deletes={true} params={params.row} />
            }
        },
    ];
}

export default useOrdersColumns