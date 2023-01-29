
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';

const useNotificationsColumns = (): GridColumns => {
    const { t } = useTranslation();
    return [
        { field: 'id', hide: true },
        {
            field: 'ar_title',
            headerName: t('ar_title')!,
            minWidth: 30,
            flex: 0.09,
            hideable: true,
        },
        {
            field: 'ar_body',
            headerName: t('ar_body')!,
            minWidth: 30,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'en_title',
            headerName: t('en_title')!,
            minWidth: 30,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'en_body',
            headerName: t('en_body')!,
            minWidth: 30,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'ku_title',
            headerName: t('ku_title')!,
            minWidth: 30,
            flex: 0.1,
            hideable: true,
        },
        {
            field: 'ku_body',
            headerName: t('ku_body')!,
            minWidth: 30,
            flex: 0.1,
            hideable: true,
        },
    ];
}

export default useNotificationsColumns