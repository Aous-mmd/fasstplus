import { useState } from 'react'
import { useEffect } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../store/atom';
import { CallApi } from '../api/CallApi';
import ApiList from '../api/ApiList';

const useReFetchData = (role: string, offset: number) => {

    const [Tdata, setData] = useState<any>();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const dialogActionState = useRecoilState(dialogAction);
    const resetState = useResetRecoilState(dialogAction);
    const [uurl, setUUUrl] = useState<string>(role === 'providers' ? ApiList.getProviders : '')
    const fetchData = async () => {
        await CallApi.get(uurl, {
            params: {

                limit: 10,
                offset: offset,
                status: 2
            }
        }).then(response => {
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
    }, []);

    useEffect(() => {
        if (dialogActionState[0].isSuccess) {
            fetchData();
        }
        // eslint-disable-next-line
    }, [dialogActionState[0].isSuccess]);

    const data = Tdata?.data;
    return { data, isSuccess }
}

export default useReFetchData