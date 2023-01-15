
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { ToolBarActions } from '../../../components';
import { ActiveValue } from '../../../components/filters';
import { useGetFilters } from '../../../hooks';

const useTermsColumns = (): GridColumns => {
    const { t } = useTranslation();
    const filterSelect = useGetFilters(ActiveValue, 'number');
    return [
        { field: 'id', hide: true },
        {
            field: 'order',
            headerName: t('order')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
        },
        {
            field: 'ar_name',
            headerName: t('ar_name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.row.all_lang.filter((lang: any) => lang.lang_id === 1)?.[0]?.text}</div>
            }
        },
        {
            field: 'en_name',
            headerName: t('en_name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.row.all_lang.filter((lang: any) => lang.lang_id === 2)?.[0]?.text || t('No Data')}</div>
            }
        },
        {
            field: 'ku_name',
            headerName: t('ku_name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
            renderCell: (params) => {
                return <div>{params.row.all_lang.filter((lang: any) => lang.lang_id === 3)?.[0]?.text || t('No Data')}</div>
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
                return <ToolBarActions role='terms' deletes={true} params={params.row} />
            }
        },
    ];
}

export default useTermsColumns