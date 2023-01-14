import React, { useEffect } from 'react'
import ActionsDialog from '../../components/ActionsDialog'
import { CGrid } from '../../components'
import useServicesColumns from './hooks/useServicesColumns';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import ApiList from '../../api/ApiList';

const Services = () => {
    const columns = useServicesColumns();
    const stateActionType = useRecoilState(dialogAction);
    const setStateActionType = useSetRecoilState(dialogAction);

    useEffect(() => {
        setStateActionType({ ...stateActionType[0], service: true });
        // eslint-disable-next-line
    }, []);

    return (
        <>
            {
                stateActionType[0].open && (
                    <ActionsDialog role='services' />
                )
            }
            <CGrid
                role='services'
                url={ApiList.getServices}
                columns={columns}
            />
        </>
    )
}

export default Services