import React, { useEffect, useState } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../store/atom';
import { Box, useTheme, Dialog, DialogActions, Slide, AppBar, Toolbar, IconButton, Typography } from '@mui/material';
import { colorsTheme } from '../theme';
import { useTranslation } from 'react-i18next';
import CButton from './CButton';
import { CallApi } from '../api/CallApi';
import ApiList from '../api/ApiList';
import { User } from '../pages/Users/types';
import useRefs from 'react-use-refs';
import { TransitionProps } from '@mui/material/transitions';
import { Close } from '@mui/icons-material';
import { AddForm, ConfirmForm, EditPassword, EditForm } from './forms';
import EditCity from './forms/EditCity';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});
type Props = {
    role: string;
}

type CusomObject = {
    [x: string]: any;
}
export const ActionsDialog: React.FC<Props> = ({ role }) => {
    const setDialogActionState = useSetRecoilState(dialogAction);
    const dialogActionState = useRecoilState(dialogAction);
    const resetState = useResetRecoilState(dialogAction);
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);
    const { t } = useTranslation();
    const data = dialogActionState[0].data as User;
    const [permissions, setPermissions] = useState<Tpermissions>();
    const [selectedRadio, setSelectedRadio] = useState<number[]>([]);
    const [selectedChecked, setSelectedChecked] = useState<number[]>([]);
    const [
        ar_name,
        en_name,
        ku_name,
        en_description,
        ar_description,
        ku_description,
    ] = useRefs<HTMLInputElement>(null);
    const refs = [ar_name, en_name, ku_name, en_description, ar_description, ku_description];
    const [selectImage, setSelectedImage] = useState();
    const saveData = async () => {

        let mainData: any = {};
        let ApiUrl: string;
        let sendData;
        if (role === 'client') {
            if (dialogActionState[0].add) {
                ApiUrl = ApiList.AddClients;
                sendData = { ...dialogActionState[0].data }
            } else if (dialogActionState[0].edit) {
                ApiUrl = ApiList.EditClients;
                sendData = { ...dialogActionState[0].submitData, user_id: data.id }
            } else if (dialogActionState[0].activate) {
                ApiUrl = ApiList.ActivateClients;
                sendData = { user_id: data.id }
            } else if (dialogActionState[0].editPassword) {
                ApiUrl = ApiList.editUserPassword;
                sendData = { user_id: data.id, ...dialogActionState[0].submitData };
            }
            else {
                ApiUrl = ApiList.BlockClient;
                sendData = { user_id: data.id }
            }
        } else if (role === 'admin') {
            if (dialogActionState[0].add) {
                ApiUrl = ApiList.AddAdmin;
                sendData = { ...dialogActionState[0].data, ids: [...selectedChecked, ...selectedRadio] };
                delete sendData.country_code;
            } else if (dialogActionState[0].edit) {
                ApiUrl = ApiList.EditAdmin;
                sendData = { ...dialogActionState[0].submitData, user_id: data.id, ids: [...selectedChecked, ...selectedRadio] }
            } else if (dialogActionState[0].activate) {
                ApiUrl = ApiList.activateAdmin;
                sendData = { user_id: data.id };
            } else if (dialogActionState[0].editPassword) {
                ApiUrl = ApiList.editAdminPassword;
                sendData = { user_id: data.id, ...dialogActionState[0].submitData };
            } else if (dialogActionState[0].edit_role) {
                ApiUrl = ApiList.editAdminPermissions;
                sendData = { user_id: data.id, ids: [...selectedChecked, ...selectedRadio] };
            }
            else {
                ApiUrl = ApiList.BlockAdmin;
                sendData = { user_id: data.id };
            }
        } else if (role === 'services') {
            if (dialogActionState[0].activate) {
                ApiUrl = ApiList.activateService;
                sendData = { service_id: data.id }
            } else {
                const fakeData = refs.map((singleRef) => {
                    const singleRefObject = singleRef.current as CusomObject;
                    const keyName = Object.keys(singleRefObject);
                    const inputChildRef = singleRefObject[`${keyName[0]}`] as React.RefObject<HTMLInputElement>;
                    const inputChild = inputChildRef.current as HTMLInputElement;
                    const restValu = inputChild.children[1].children[0] as HTMLInputElement;
                    return restValu
                });
                fakeData.forEach((child) => {
                    mainData = Object.assign(mainData, { [child.getAttribute('name')!]: child.value })
                })
                ApiUrl = ApiList.editService;
                sendData = {
                    service_id: data.id,
                    ...mainData!,
                    image: selectImage
                }
            }
        } else if (role === 'providers') {
            if (dialogActionState[0].activate) {
                ApiUrl = ApiList.activateProviders;
                sendData = { provider_id: data.id }
            } else if (dialogActionState[0].delete) {
                ApiUrl = ApiList.deleteProviders;
                setDialogActionState({ ...dialogActionState[0], submit: true });
                await CallApi.delete(ApiUrl!, { data: { provider_id: data.id } }).then(res => {
                    setDialogActionState({ ...dialogActionState[0], submit: false, open: false, isSuccess: true });
                }).catch(error => setDialogActionState({ ...dialogActionState[0], submit: false }));
                resetState();
                return;
            } else {
                ApiUrl = ApiList.editProviders;
                console.log({ ...dialogActionState[0].submitData, provider_id: data.id })
                sendData = { ...dialogActionState[0].submitData, provider_id: data.id };
                setDialogActionState({ ...dialogActionState[0], submit: true });
                await CallApi.post(ApiUrl!, { ...sendData }, { headers: { 'Content-Type': 'application/json' } }).then(res => {
                    setDialogActionState({ ...dialogActionState[0], submit: false, open: false, isSuccess: true });
                }).catch(error => setDialogActionState({ ...dialogActionState[0], submit: false }));
                resetState();
                return;
            }
        } else if (role === 'cities') {
            if (dialogActionState[0].activate) {
                ApiUrl = ApiList.activateCities;
                sendData = { city_id: data.id }
            } else if (dialogActionState[0].edit) {
                ApiUrl = ApiList.editCities;
                sendData = { city_id: data.id, ...dialogActionState[0].submitData }
            }
        }
        setDialogActionState({ ...dialogActionState[0], submit: true });
        await CallApi.post(ApiUrl!, { ...sendData }, { headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "multipart/form-data" } }).then(res => {
            setDialogActionState({ ...dialogActionState[0], submit: false, open: false, isSuccess: true });
        }).catch(error => setDialogActionState({ ...dialogActionState[0], submit: false }));
        resetState();
    }

    useEffect(() => {
        if (role === 'admin' && (dialogActionState[0].edit_role || dialogActionState[0].add)) {
            (async () => {
                if (dialogActionState[0].add)
                    await CallApi.get(ApiList.getPermissions).then(res => {
                        setPermissions(res.data.data.permissions);
                    });
                else {
                    const checked: number[] = [];
                    const radios: number[] = [];
                    await CallApi.post(ApiList.getAdminPermissions, { user_id: data.id }).then(res => {
                        Object.values((res.data.data.permissions) as TPermissions).forEach((permission: Admin[]) => {
                            permission.forEach((perm) => {
                                if (perm.checked) {
                                    radios.push(perm.id);
                                }
                                perm?.children?.forEach((child) => {
                                    if (child.checked) {
                                        checked.push(child.id)
                                    }
                                })
                            })
                        })
                        setSelectedRadio(radios);
                        setSelectedChecked(checked);
                        setPermissions(res.data.data.permissions);
                    })
                }
            })();
        }
        return () => {
            setPermissions(undefined);
            resetState();
        }
        // eslint-disable-next-line
    }, []);
    return (
        <Dialog sx={{
            "& .MuiDialog-container .MuiPaper-root[role='dialog']": {
                width: ((dialogActionState[0].admin && !dialogActionState[0].edit) || (role === 'services' && dialogActionState[0].edit)) ? '100vw !important' : '30vw !important'
            },
            "& .MuiDialog-paperFullScreen": { backgroundColor: colors.Primary[100], color: colors.Grey[700] }
        }} open={true}
            fullScreen={(role === 'admin' &&
                (dialogActionState[0].add || dialogActionState[0].edit_role))
                || (role === 'services' && dialogActionState[0].edit) ? true : false}
            TransitionComponent={(role === 'admin' &&
                (dialogActionState[0].add || dialogActionState[0].edit_role))
                || (role === 'services' && dialogActionState[0].edit) ? Transition : undefined}>
            {

                (
                    ((dialogActionState[0].admin) &&
                        (dialogActionState[0].add || dialogActionState[0].edit_role))
                    || (role === 'services' && dialogActionState[0].edit)
                ) && (
                    <AppBar sx={{ position: 'relative', zIndex: 101, backgroundColor: colors.Primary[400] }}>
                        <Toolbar>
                            <IconButton
                                edge="start"
                                color="inherit"
                                onClick={() => resetState()}
                                aria-label="close"
                            >
                                <Close />
                            </IconButton>
                            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                {dialogActionState[0].add ? t('Add New Admin') : t('Edit Admin')}
                            </Typography>
                            <CButton disabled={!dialogActionState[0].valid && dialogActionState[0].admin} onClick={() => saveData()} title={t('Save')!} />
                        </Toolbar>
                    </AppBar>
                )
            }
            <Box sx={{
                backgroundColor: colors.Primary[100], color: colors.Grey[700]
            }}>
                <Box padding={2}>
                    {
                        (dialogActionState[0].edit || dialogActionState[0].edit_role) && (
                            <EditForm
                                selectedRadio={selectedRadio}
                                selectedChecked={selectedChecked}
                                setSelectedChecked={setSelectedChecked}
                                setSelectedRadio={setSelectedRadio}
                                setSelectedImage={setSelectedImage}
                                permission={permissions}
                                role={role}
                                refs={refs}
                            />
                        )
                    }
                    {
                        dialogActionState[0].block && (
                            <ConfirmForm name={role === 'admin' || role === 'client' ? dialogActionState[0].data.full_name! : dialogActionState[0].data.default_name!} />
                        )
                    }
                    {
                        dialogActionState[0].activate && (
                            <ConfirmForm name={((role === 'admin' || role === 'client' ? dialogActionState[0].data.full_name! : dialogActionState[0].data.default_name!) || (role === 'providers' ? dialogActionState[0].data.first_name! : dialogActionState[0].data.first_name!))} />
                        )
                    }
                    {
                        dialogActionState[0].delete && (
                            <ConfirmForm name={dialogActionState[0].data.first_name!} />
                        )
                    }
                    {
                        dialogActionState[0].editPassword && (
                            <EditPassword />
                        )
                    }
                    {
                        dialogActionState[0].add && (
                            <AddForm
                                selectedRadio={selectedRadio}
                                selectedChecked={selectedChecked}
                                setSelectedChecked={setSelectedChecked}
                                setSelectedRadio={setSelectedRadio}
                                permission={permissions}
                                role={role}
                            />
                        )
                    }
                    {
                        (role === 'cities' && dialogActionState[0].edit) && (
                            <EditCity />
                        )
                    }
                </Box>
                {
                    (((role === 'client') || ((role === 'admin') && !dialogActionState[0].add && !dialogActionState[0].edit_role))
                        || (role === 'services' && !dialogActionState[0].edit) || (role === 'providers') || (role === 'cities'))

                    && (
                        <DialogActions>
                            <CButton title={t('Cancel')!} onClick={() => resetState()} />
                            <CButton title={t('Save')!}
                                onClick={() => saveData()}
                                disabled={
                                    (
                                        ((role === 'client' || role === 'admin' || role === 'providers' || role === 'cities') && !dialogActionState[0].editPassword)
                                        || dialogActionState[0].valid || dialogActionState[0].activate || dialogActionState[0].delete) ? false : true
                                } />
                        </DialogActions>
                    )
                }
            </Box>
        </Dialog>
    );
}

export default ActionsDialog;


export interface Tpermissions {
    msg: string;
    data: Data;
    errors: any[];
}

export interface Data {
    permissions: TPermissions;
}

export interface TPermissions {
    User: Admin[];
    Admin: Admin[];
    Order: Admin[];
    Service: Admin[];
}

export interface Admin {
    id: number;
    name: string;
    en_type: Type;
    ar_type: string;
    checked?: number,
    ku_type: KuType;
    parent_id: number | null;
    type?: Type;
    children?: Admin[];
    lang: Lang;
}

export enum Type {
    Admin = "Admin",
    Order = "Order",
    Service = "Service",
    User = "User",
}

export enum KuType {
    Bikaranîvan = "bikaranîvan",
    Emir = "emir",
    Rêvebir = "Rêvebir",
}

export interface Lang {
    id: number;
    name: string;
    permission_id: number;
    lang_id: number;
}
