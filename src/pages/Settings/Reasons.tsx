import React, { useEffect } from 'react'
import { ActionsDialog, CGrid } from '../../components';
import { dialogAction } from '../../store/atom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import ApiList from '../../api/ApiList';
import useReasonsColumns from './hooks/useReasonsColumns';
import { useTranslation } from 'react-i18next';


const Reasons = () => {
    const columns = useReasonsColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    useEffect(() => {
        setStateActionType({ ...stateActionType[0], reasons: true });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='reasons' />
                )
            }
            <CGrid
                role='reasons'
                url={ApiList.getReasons}
                columns={columns}
                addButton
                addButtonTitle={t('Add New Reason')!}
            />
        </>
    )
}

export default Reasons