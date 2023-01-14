import React, { useEffect } from 'react'
import { ActionsDialog, CGrid } from '../../components';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import ApiList from '../../api/ApiList';
import useProvidersColumns from './hooks/useProvidersColumns';

const Providers = () => {
    const columns = useProvidersColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);

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
            />
        </>
    )
}

export default Providers