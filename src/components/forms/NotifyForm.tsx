import React, { useEffect, useState } from 'react'
import { Checkbox, FormControl, FormControlLabel, InputLabel, ListItemText, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, TextField } from '@mui/material'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../../store/atom';
import { useTranslation } from 'react-i18next';
import { CallApi } from '../../api/CallApi';
import ApiList from '../../api/ApiList';
import { TClientsData } from '../../pages/Users/types';

type Props = {}

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

const NotifyForm = (props: Props) => {
    const dialogActionState = useRecoilState(dialogAction);
    const setDialogActionState = useSetRecoilState(dialogAction);
    const { t } = useTranslation();

    const [value, setValue] = React.useState('0');
    const formChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                [e.target.name]: e.target.value,
                status: value
            }
        });
    };


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue((event.target as HTMLInputElement).value);
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                status: (event.target as HTMLInputElement).value
            }
        })
    };

    const [personName, setPersonName] = React.useState<number[]>([]);

    const handloChange = (event: SelectChangeEvent<any>) => {
        const {
            target: { value },
        } = event;
        const tempArr = [...personName, ...event.target.value];
        const uniqueArray = tempArr.filter(function (item, pos) {
            return tempArr.indexOf(item) === pos;
        })
        setPersonName(uniqueArray);
        setDialogActionState({
            ...dialogActionState[0],
            submitData: {
                ...dialogActionState[0].submitData,
                ids: uniqueArray
            }
        })
    };

    const [users, setUsers] = useState<TClientsData>();

    useEffect(() => {
        (async () => {
            await CallApi.get(ApiList.getNotifyUsers).then(response => setUsers(response.data.data));
        })();

    }, []);

    return (
        <>
            <TextField
                fullWidth
                id="ar_title"
                name="ar_title"
                label={t('ar_title')}
                value={dialogActionState[0].submitData.ar_title || ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ar_body"
                name="ar_body"
                label={t('ar_body')}
                value={dialogActionState[0].submitData.ar_body || ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="en_title"
                name="en_title"
                label={t('en_title')}
                value={dialogActionState[0].submitData.en_title || ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="en_body"
                name="en_body"
                label={t('en_body')}
                value={dialogActionState[0].submitData.en_body || ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ku_title"
                name="ku_title"
                label={t('ku_title')}
                value={dialogActionState[0].submitData.ku_title || ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <TextField
                fullWidth
                id="ku_body"
                name="ku_body"
                label={t('ku_body')}
                value={dialogActionState[0].submitData.ku_body || ''}
                onChange={(e) => formChange(e)}
                sx={{ mb: 3 }}
            />
            <FormControl>
                <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    value={value}
                    row
                    onChange={handleChange}
                >
                    <FormControlLabel value="0" control={<Radio />} label={t('all_users')} />
                    <FormControlLabel value="1" control={<Radio />} label={t('specific_user')} />
                </RadioGroup>
            </FormControl>
            <FormControl sx={{ m: 1, width: 300 }}>
                <InputLabel id="demo-multiple-checkbox-label">{t('Users')}</InputLabel>
                <Select
                    labelId="demo-multiple-checkbox-label"
                    id="demo-multiple-checkbox"
                    multiple
                    value={personName}
                    disabled={value !== '1'}
                    onChange={handloChange}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                        const arr: any = [];
                        users?.users?.forEach((service) => {
                            if (selected.find((x: any) => x === service.id)) {
                                arr.push(service.full_name);
                            }
                        })
                        return arr.join(", ");
                    }}
                    MenuProps={MenuProps}
                >
                    {users?.users.map((user) => (
                        <MenuItem key={user.full_name} value={user.id}>
                            <Checkbox checked={personName?.indexOf(user.id) > -1} />
                            <ListItemText primary={user.full_name} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </>
    )
}

export default NotifyForm