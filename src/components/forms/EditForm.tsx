import React, { RefObject, useState, useEffect } from 'react'
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';
import Permissions from './Permissions';
import { Lang } from '../../pages/Users/types';
import CInput from '../CInput';
import { CallApi } from '../../api/CallApi';
import ApiList from '../../api/ApiList';
type Props = {
    role: string;
    permission?: any;
    selectedRadio: number[];
    selectedChecked: number[];
    setSelectedChecked: React.Dispatch<React.SetStateAction<number[]>>;
    setSelectedRadio: React.Dispatch<React.SetStateAction<number[]>>;
    setSelectedImage: React.Dispatch<React.SetStateAction<any>>;
    [x: string]: any;
}

export type RefHandler = {
    imageRef: RefObject<HTMLInputElement>;
};


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const EditForm = ((props: Props) => {
    const dialogActionState = useRecoilState(dialogAction);
    const { permission, role, selectedRadio, selectedChecked, setSelectedChecked, setSelectedRadio, setSelectedImage } = props;
    const setDialogActionState = useSetRecoilState(dialogAction);
    const { t } = useTranslation();
    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        if (role !== 'services') {
            setDialogActionState({
                ...dialogActionState[0],
                submitData: {
                    ...dialogActionState[0].submitData,
                    [e.target.name]: e.target.value,
                    ids: personName
                }
            });
        } else {
            const data: Lang = {
                id: parseInt(e.target.getAttribute('dataid')!),
                description: e.target.getAttribute('datadesc')!,
                lang_id: parseInt(e.target.getAttribute('datalang')!),
                service_id: parseInt(e.target.getAttribute('dataservice')!),
                name: e.target.value
            }
            setDialogActionState({
                ...dialogActionState[0],
                submitData: {
                    ...dialogActionState[0].submitData,
                    all_lang: dialogActionState[0].submitData && Object.keys(dialogActionState[0].submitData).length > 0 ?
                        (dialogActionState[0].submitData.all_lang!).length > 0 ?
                            dialogActionState[0].submitData.all_lang?.map((lang, index) => {
                                if (lang.lang_id === data.lang_id) {
                                    return {
                                        ...data
                                    }
                                }
                                return lang
                            }) : [{ ...data } as Lang]
                        : [{ ...data } as Lang]
                }
            });
        }
    };

    const [personName, setPersonName] = React.useState<number[]>(dialogActionState[0].data.service_providers?.map((service) => service.id)!);
    const [services, setServices] = useState<any[]>([]);
    const handleChange = (event: SelectChangeEvent<any>) => {
        const tempArr = [...personName, ...event.target.value];
        const uniqueArray = tempArr.filter(function (item, pos) {
            return tempArr.indexOf(item) === pos;
        })
        setPersonName(uniqueArray);
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                ids: [...uniqueArray]
            }
        });
    };

    useEffect(() => {
        if (role === 'providers') {
            CallApi.get(ApiList.getAllServices).then(res => {
                setServices(res.data.data.services);
            })
        }
        setDialogActionState({
            ...dialogActionState[0],
            submitData: { ...dialogActionState[0].data }
        })
        // eslint-disable-next-line
    }, []);


    return (
        <>
            {!dialogActionState[0].edit_role && (
                <form>
                    {
                        (role === 'admin' || role === 'client') && (
                            <TextField
                                fullWidth
                                id="fullName"
                                name="full_name"
                                label={t('Full Name')}
                                type='text'
                                value={dialogActionState[0].submitData.full_name || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                        )
                    }
                    {
                        role === 'services' && (
                            <>
                                <CInput
                                    name="ar_name"
                                    label={t('ar_name')}
                                    type='text'
                                    defval='name'
                                    dir='rtl'
                                    dataindexval={1}
                                    ref={props.refs[0]}
                                />
                                <CInput
                                    name="ar_description"
                                    label={t('ar_description')}
                                    type='text'
                                    defval='desctipion'
                                    dir='rtl'
                                    multiline
                                    minRows={4}
                                    dataindexval={1}
                                    ref={props.refs[1]}
                                />
                                <CInput
                                    name="en_name"
                                    defval='name'
                                    label={t('en_name')}
                                    type='text'
                                    dataindexval={2}
                                    ref={props.refs[2]}
                                />
                                <CInput
                                    name="en_description"
                                    label={t('en_description')}
                                    type='text'
                                    defval='desctipion'
                                    multiline
                                    minRows={4}
                                    dataindexval={2}
                                    ref={props.refs[3]}
                                />
                                <CInput
                                    name="ku_name"
                                    label={t('ku_name')}
                                    type='text'
                                    defval='name'
                                    dir='rtl'
                                    dataindexval={3}
                                    ref={props.refs[4]}
                                />
                                <CInput
                                    name="ku_desctipion"
                                    label={t('ku_desctipion')}
                                    type='text'
                                    dir='rtl'
                                    defval='desctipion'
                                    multiline
                                    minRows={4}
                                    dataindexval={3}
                                    ref={props.refs[5]}
                                />
                                <TextField
                                    fullWidth
                                    name="image"
                                    type='file'
                                    sx={{ mb: 3 }}
                                    onChange={(e) => setSelectedImage((e.target as any).files[0])}
                                />
                            </>
                        )
                    }
                    {
                        role === 'client' && (
                            <TextField
                                fullWidth
                                id="phoneNumber"
                                name="phone_number"
                                label={t('Phone Number')}
                                value={dialogActionState[0].submitData.phone_number || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />
                        )
                    }
                    {
                        role === 'admin' && (
                            <TextField
                                fullWidth
                                id="provider_email"
                                name="email"
                                label={t('Email')}
                                value={dialogActionState[0].submitData.email || ''}
                                onChange={(e) => formChange(e)}
                                sx={{ mb: 3 }}
                            />

                        )
                    }
                    {
                        role === 'providers' && (
                            <>
                                <TextField
                                    fullWidth
                                    id="company_name"
                                    name="company_name"
                                    label={t('company_name')}
                                    value={dialogActionState[0].submitData.company_name || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="provider_email"
                                    name="provider_email"
                                    label={t('Email')}
                                    value={dialogActionState[0].submitData.provider_email || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="first_name"
                                    name="first_name"
                                    label={t('first_name')}
                                    value={dialogActionState[0].submitData.first_name || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="second_name"
                                    name="second_name"
                                    label={t('second_name')}
                                    value={dialogActionState[0].submitData.second_name || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="provider_phone_number"
                                    name="provider_phone_number"
                                    label={t('Phone Number')}
                                    value={dialogActionState[0].submitData.provider_phone_number || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="provider_phone_number_2"
                                    name="provider_phone_number_2"
                                    label={`${t('Phone Number')} 2`}
                                    value={dialogActionState[0].submitData?.provider_phone_number_2 || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="job_title"
                                    name="job_title"
                                    label={t('job_title')}
                                    value={dialogActionState[0].submitData.job_title || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <FormControl sx={{ m: 1, width: 300 }}>
                                    <InputLabel id="demo-multiple-checkbox-label">{t('Services')}</InputLabel>
                                    <Select
                                        labelId="demo-multiple-checkbox-label"
                                        id="demo-multiple-checkbox"
                                        multiple
                                        value={dialogActionState[0].submitData.service_providers?.map((service) => service.id)}
                                        onChange={handleChange}
                                        input={<OutlinedInput label={t('Services')} />}
                                        renderValue={(selected: any) => {
                                            const arr: any = [];
                                            services.forEach((service) => {
                                                if (selected.find((x: any) => x === service.id)) {
                                                    arr.push(service.default_name);
                                                }
                                            })
                                            return arr.join(", ");
                                        }}
                                        MenuProps={MenuProps}
                                    >
                                        {services?.map((service) => {
                                            return (
                                                <MenuItem key={service.default_name} value={service.id}>
                                                    <Checkbox checked={personName.indexOf(service.id) > -1} />
                                                    <ListItemText primary={service.default_name} />
                                                </MenuItem>
                                            )
                                        }
                                        )}
                                    </Select>
                                </FormControl>
                            </>
                        )
                    }
                    {
                        role === 'reasons' && (
                            <>
                                <TextField
                                    fullWidth
                                    id="ar_name"
                                    name="ar_name"
                                    label={t('ar_name')}
                                    value={dialogActionState[0].submitData?.ar_name || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="en_name"
                                    name="en_name"
                                    label={t('en_name')}
                                    value={dialogActionState[0].submitData?.en_name || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                                <TextField
                                    fullWidth
                                    id="ku_name"
                                    name="ku_name"
                                    label={t('ku_name')}
                                    value={dialogActionState[0].submitData?.ku_name || ''}
                                    onChange={(e) => formChange(e)}
                                    sx={{ mb: 3 }}
                                />
                            </>
                        )
                    }
                </form>
            )}
            {
                dialogActionState[0].edit_role && (
                    <form>
                        {
                            permission !== undefined ?
                                <Permissions
                                    selectedRadio={selectedRadio}
                                    selectedChecked={selectedChecked}
                                    setSelectedChecked={setSelectedChecked}
                                    setSelectedRadio={setSelectedRadio}
                                    permission={permission}
                                /> : 'Loading permissions ...'
                        }
                    </form>
                )
            }
        </>
    );
})

export default EditForm