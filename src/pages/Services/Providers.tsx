import React, { useEffect } from 'react'
import { ActionsDialog, CGrid } from '../../components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import ApiList from '../../api/ApiList';
import useProvidersColumns from './hooks/useProvidersColumns';
import { useTranslation } from 'react-i18next';

const Providers = () => {
    const columns = useProvidersColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    
    useEffect(() => {
        setStateActionType({ ...stateActionType[0], providers: true });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='providers' />
                )
            }
            <CGrid
                role='providers'
                columns={columns}
                url={ApiList.getProviders}
                addButton
                addButtonTitle={t('Add New Providers')!}
            />
        </>
    )
}

export default Providers