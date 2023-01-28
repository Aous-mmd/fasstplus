import React, { useEffect } from 'react'
import ActionsDialog from '../../components/ActionsDialog'
import { CGrid } from '../../components'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import ApiList from '../../api/ApiList';
import useCitiesColumns from './hooks/useCitiesColumns';
import { useTranslation } from 'react-i18next';

const Cities = () => {
    const columns = useCitiesColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    useEffect(() => {
        setStateActionType({ ...stateActionType[0], cities: true });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='cities' />
                )
            }
            <CGrid
                role='cities'
                url={ApiList.getCities}
                columns={columns}
                addButton
                cities={true}
                addButtonTitle={t('Add New City')!}
            />
        </>
    )
}

export default Cities