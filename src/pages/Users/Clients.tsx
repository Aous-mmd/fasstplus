import React from 'react'
import useClientsColumns from './hooks/useClientsColumns';
import { CGrid } from '../../components';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import ActionsDialog from '../../components/ActionsDialog';
import ApiList from '../../api/ApiList';
const Clients = () => {
    const columns = useClientsColumns();
    const { t } = useTranslation();
    const stateActionType = useRecoilState(dialogAction);

    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='client' />
                )
            }
            <CGrid
                role='client'
                url={ApiList.CilentsList}
                columns={columns}
                addButton
                addButtonTitle={t('Add New Client')!}
            />
        </>
    )
}

export default Clients