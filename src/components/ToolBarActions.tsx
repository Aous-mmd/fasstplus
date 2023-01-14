import React from 'react'
import { Box, IconButton, Tooltip } from '@mui/material'
import { Block, Edit, OnlinePrediction, Delete, Lock, Rule } from '@mui/icons-material';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { dialogAction } from '../store/atom';
import { useTranslation } from 'react-i18next';

type Props = {
    params: any;
    deletes: boolean;
    role: string;
}

const ToolBarActions: React.FC<Props> = ({ params, deletes, role }) => {

    const setDialogActionState = useSetRecoilState(dialogAction);
    const dialogActionState = useRecoilState(dialogAction);
    const { t } = useTranslation();



    return (
        <Box display='flex'>
            <Tooltip title={t('Edit')!}>
                <IconButton onClick={() => setDialogActionState({
                    ...dialogActionState[0],
                    open: true,
                    edit: true,
                    activate: false,
                    delete: false,
                    editPassword: false,
                    edit_role: false,
                    block: false,
                    data: params,
                    admin: role === 'admin',
                    client: role === 'client',
                    service: role === 'services',
                    cities: role === 'cities'
                })}>
                    <Edit />
                </IconButton>
            </Tooltip>
            <Tooltip title={t('Activate/deActivate')!}>
                <IconButton onClick={() => setDialogActionState({
                    ...dialogActionState[0],
                    edit: false,
                    activate: true,
                    delete: false,
                    editPassword: false,
                    edit_role: false,
                    block: false,
                    open: true,
                    data: params,
                    admin: role === 'admin',
                    client: role === 'client',
                    service: role === 'services',
                    cities: role === 'cities'
                })}>
                    <OnlinePrediction
                        sx={!params.active ? { '& path': { color: '#d32f2f !important' } } : { '& path': { color: 'green !important' } }}
                    />
                </IconButton>
            </Tooltip>
            {
                (role === 'admin' || role === 'client') && (
                    <>
                        <Tooltip title={t('Change Password')!}>
                            <IconButton onClick={() => setDialogActionState({
                                ...dialogActionState[0],
                                edit: false,
                                activate: false,
                                delete: false,
                                editPassword: true,
                                edit_role: false,
                                block: false,
                                open: true,
                                data: params,
                                admin: role === 'admin',
                                client: role === 'client',
                                service: false
                            })}>
                                <Lock />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title={t('Block/UnBlock')!}>
                            <IconButton onClick={() => setDialogActionState({
                                ...dialogActionState[0],
                                edit: false,
                                activate: false,
                                delete: false,
                                editPassword: false,
                                edit_role: false,
                                block: true,
                                open: true,
                                data: params,
                                admin: role === 'admin',
                                client: role === 'client',
                                service: false
                            })}>
                                <Block
                                    sx={!params.block ? { '& path': { color: '#d32f2f !important' } } : {}}
                                />
                            </IconButton>
                        </Tooltip>
                    </>
                )
            }
            {
                role === 'admin' && (
                    <Tooltip title={t('Edit Permissions')!}>
                        <IconButton onClick={() => setDialogActionState({
                            ...dialogActionState[0],
                            edit: false,
                            activate: false,
                            delete: false,
                            editPassword: false,
                            edit_role: true,
                            block: false,
                            open: true,
                            data: params,
                            admin: true,
                            client: false,
                            service: false
                        })}>
                            <Rule />
                        </IconButton>
                    </Tooltip>
                )
            }
            {
                deletes && (
                    <Tooltip title={t('Delete')!}>
                        <IconButton onClick={() => setDialogActionState({
                            ...dialogActionState[0],
                            edit: false,
                            activate: false,
                            delete: true,
                            editPassword: false,
                            edit_role: false,
                            block: false,
                            open: true,
                            data: params,
                            admin: role === 'admin',
                            client: role === 'client',
                            service: role === 'services',
                            providers: role === 'providers',
                            cities: role === 'cities'
                        })}>
                            <Delete sx={{ '& path': { color: '#d32f2f !important' } }} />
                        </IconButton>
                    </Tooltip>
                )
            }
        </Box>
    )
}

export default ToolBarActions