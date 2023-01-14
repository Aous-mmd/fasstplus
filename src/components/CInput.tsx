import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { TextField } from '@mui/material'
import { useRecoilState } from 'recoil';
import { dialogAction } from '../store/atom';

type Props = {
    formChange: (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
    name: "ar_name" | "en_name" | "ku_name" | "en_description" | "ar_description" | "ku_description";
    label: string;
    type: string;
    dir?: string;
    dataIndex: number;
    [x: string]: any;
}

const CInput = forwardRef<any, Props>((props, ref) => {
    const dialogActionState = useRecoilState(dialogAction);
    const inputRef = useRef<HTMLInputElement>(null);
    const { dataindexval, defval } = props;
    const [localState, setLocalState] = useState<string>('');
    //Initialise your refs here
    useImperativeHandle(ref, () => ({
        [props.name]: inputRef,
    }));
    return (
        <TextField
            fullWidth
            ref={inputRef}
            inputProps={{
                dataid: Object.keys(dialogActionState[0].submitData).length > 0 ?
                    (dialogActionState[0].submitData.all_lang!).length > 0 ? (dialogActionState[0].submitData.all_lang!).filter((lang) => lang.lang_id)[0].id : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].id
                    : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].id,
                datadesc: Object.keys(dialogActionState[0].submitData).length > 0 ?
                    (dialogActionState[0].submitData.all_lang!).length > 0 ? (dialogActionState[0].submitData.all_lang!).filter((lang) => lang.lang_id)[0].description : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].description
                    : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].description,
                datalang: Object.keys(dialogActionState[0].submitData).length > 0 ?
                    (dialogActionState[0].submitData.all_lang!).length > 0 ? (dialogActionState[0].submitData.all_lang!).filter((lang) => lang.lang_id)[0].lang_id : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].lang_id
                    : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].lang_id,
                dataservice: Object.keys(dialogActionState[0].submitData).length > 0 ?
                    (dialogActionState[0].submitData.all_lang!).length > 0 ? (dialogActionState[0].submitData.all_lang!).filter((lang) => lang.lang_id)[0].service_id : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].service_id
                    : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0].service_id,
            }}
            {...props}
            value={localState.length > 0 ? localState : dialogActionState[0].data.all_lang?.filter((lang) => lang.lang_id === dataindexval)[0][defval === 'name' ? 'name' : 'description']}
            sx={{ mb: 3 }}
            onChange={(e) => setLocalState(e.target.value)}
        />
    )
})

export default CInput