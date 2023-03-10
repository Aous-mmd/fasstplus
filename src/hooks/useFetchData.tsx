import { useState, useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../store/atom';
import { CallApi } from '../api/CallApi';
import { TPolicy, TProvidersData } from '../pages/Services/types';
import { TAdminsData, TClientsData, TservicesData } from '../pages/Users/types';
import { TOrders } from '../pages/Orders/types';
import { TNotifications } from '../pages/Notifications/types';

type pageOptions = {
    page: number;
    pageSize: number;
    status: number;
    start_date?: any;
    end_date?: any;
}
const useFetchData = (uurl: string, options?: pageOptions) => {
    const [Tdata, setData] = useState<any>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const dialogActionState = useRecoilState(dialogAction);
    const resetState = useResetRecoilState(dialogAction);
    const fetchData = async () => {
        if (options)
            await CallApi.get(uurl, {
                params: {

                    limit: options.pageSize,
                    offset: options.page * 10,
                    status: options.status,
                    start_date: options?.start_date,
                    end_date: options?.end_date
                }
            }).then(response => {
                setData(response.data);
                setDialogActionState({ ...dialogActionState[0], isSuccess: false });
                setIsSuccess(true);
            }).catch(err => {
                setIsSuccess(false);
            })
        else
            await CallApi.get(uurl).then(response => {
                setData(response.data);
                setDialogActionState({ ...dialogActionState[0], isSuccess: false });
                setIsSuccess(true);
            }).catch(err => {
                setIsSuccess(false);
            })
        resetState();
    }
    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [options?.page, options?.pageSize, options?.status, options?.end_date, options?.start_date]);

    useEffect(() => {
        resetState();
        if (dialogActionState[0].isSuccess) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [dialogActionState[0].isSuccess]);

    if (!options) {
        return { data: Tdata?.data, isSuccess };
    }

    const tempData = Tdata?.data as (NonNullable<Partial<TAdminsData & TClientsData & TservicesData & TProvidersData & TPolicy & TOrders & TNotifications>>);
    const pageInfo = Tdata?.data.count;
    if (tempData) {
        const testData: any[] = Object.values(tempData).filter((item) => Array.isArray(item));
        const data = testData[0];
        return {
            data, isSuccess, pageInfo
        }
    }
    return { data: [], isSuccess, pageInfo }
}

export default useFetchData