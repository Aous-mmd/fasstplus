import React, { useEffect } from 'react'
import { ActionsDialog, CGrid } from '../../components';
import ApiList from '../../api/ApiList';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import useTermsColumns from './hooks/useTermsColumns';
import { useTranslation } from 'react-i18next';

const Terms = () => {
    const columns = useTermsColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    useEffect(() => {
        setStateActionType({ ...stateActionType[0], terms: true });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='terms' />
                )
            }
            <CGrid
                role='terms'
                url={ApiList.getTerms}
                columns={columns}
                addButton
                addButtonTitle={t('Add New Terms')!}
            />
        </>
    )
}

export default Terms