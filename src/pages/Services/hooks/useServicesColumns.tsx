
import { GridColumns } from '@mui/x-data-grid';
import { useTranslation } from 'react-i18next';
import { ToolBarActions } from '../../../components';
import defaultImage from '../../../assets/no_image.png'
import { Rating } from '@mui/material';
import { ActiveValue, RatingInputValue } from '../../../components/filters';
import { useGetFilters } from '../../../hooks';

const useServicesColumns = (): GridColumns => {
    const { t } = useTranslation();
    const filter = useGetFilters(RatingInputValue, 'number');
    const filterSelect = useGetFilters(ActiveValue, 'number');
    return [
        { field: 'id', hide: true },
        {
            field: 'default_name',
            headerName: t('Name')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true
        },
        {
            field: 'image',
            headerName: t('Image')!,
            minWidth: 200,
            flex: 0.1,
            hideable: true,
            renderCell: (params) => <img style={{ width: '90%', height: '75%', objectFit: 'contain' }} src={params.value === 'no image yet' ? defaultImage : `${process.env.REACT_APP_URL}/uploads/${params.value}`} alt={'s'} />
        },
        {
            field: 'rate',
            headerName: t('Rate')!,
            minWidth: 200,
            flex: 0.1,
            filterOperators: filter,
            hideable: true,
            renderCell: (params) => {
                return <Rating className='stars' name="read-only" value={params.value} readOnly />
            }
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
            field: '',
            headerName: t('Actions')!,
            minWidth: 300,
            flex: 0.5,
            disableColumnMenu: true,
            sortable: false,
            renderCell: (params) => {
                return <ToolBarActions role='services' deletes={false} params={params.row} />
            }
        },
    ];
}

export default useServicesColumns