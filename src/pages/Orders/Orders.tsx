import React, { useEffect } from 'react'
import useOrdersColumns from './hooks/useOrdersColumns';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';
import { ActionsDialog, CGrid } from '../../components';
import ApiList from '../../api/ApiList';

type Props = {}

const Orders = (props: Props) => {
    const columns = useOrdersColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    useEffect(() => {
        setStateActionType({ ...stateActionType[0], orders: true });
        // eslint-disable-next-line
    }, []);
    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='orders' />
                )
            }
            <CGrid
                role='orders'
                url={ApiList.getOrders}
                columns={columns}
                addButton
                addButtonTitle={t('Add New Order')!}
            />
        </>
    )
}

export default Orders