import React, { useEffect } from 'react'
import ApiList from '../../api/ApiList'
import { ActionsDialog, CGrid } from '../../components'
import useNotificationsColumns from './hooks/useNotificationsColumns'
import { useTranslation } from 'react-i18next';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';

type Props = {}

const Notifications = (props: Props) => {
    const columns = useNotificationsColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    useEffect(() => {
        setStateActionType({ ...stateActionType[0], notify: true });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='notifications' />
                )
            }
            <CGrid
                columns={columns}
                role='notifications'
                url={ApiList.getNotifications}
                addButton
                addButtonTitle={t('add_notifications')!}
            />
        </>
    )
}

export default Notifications