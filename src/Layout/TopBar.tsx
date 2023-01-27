import React from 'react'
import { Box, useTheme, IconButton, InputBase, NativeSelect } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext, colorsTheme } from '../theme';
import { LightModeOutlined, DarkModeOutlined, Search, PersonOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { CallApi } from '../api/CallApi';
import ApiList from '../api/ApiList';

const lngs: Record<string, any> = {
    'ar': { nativeName: 'العربية' },
    'en': { nativeName: 'English' },
    'kr': { nativeName: 'Kurdish' }
};

type Props = {
    width: number;
}

const TopBar = (props: Props) => {
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);
    const { t, i18n } = useTranslation();
    return (
        <Box display='flex' sx={{ backgroundColor: colors.Primary[200], zIndex: 100, position: 'fixed', top: 0, transition: 'all 0.5s ease-in-out', width: props.width }} justifyContent='space-between' p={2} width="100%" height='10%'>
            <Box display='flex' sx={{ backgroundColor: colors.Primary[600] }} borderRadius="5px">
                <InputBase sx={{ marginInlineStart: 2, flex: 1, color: colors.Primary[100] }} placeholder={t('Search')!} />
                <IconButton type='button' sx={{ p: 1 }}>
                    <Search sx={{ color: colors.Primary[100] }} />
                </IconButton>
            </Box>
            <Box display='flex'>
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === 'light' ?
                        <DarkModeOutlined sx={{ color: colors.Primary[500] }} /> :
                        <LightModeOutlined sx={{ color: colors.Light[500] }} />
                    }
                </IconButton>
                <IconButton>
                    <PersonOutlined sx={{ color: colors.Primary[700] }} />
                </IconButton>
                <NativeSelect
                    sx={{ ":hover": { cursor: 'pointer' }, p: 1, color: colors.Primary[700] }}
                    value={Object.keys(lngs).indexOf(i18n.language) + 1 || lngs[i18n.language]}
                    onChange={(e) => {
                        i18n.changeLanguage(parseInt(e.target.value) === 1 ? 'ar' : parseInt(e.target.value) === 2 ? 'en-US' : 'kr');
                        localStorage.setItem('lang_id', e.target.value);
                        CallApi.post(ApiList.changeLang, { lang_id: e.target.value });
                    }}
                >
                    {Object.keys(lngs).map((lng, index) => (
                        <option style={{ padding: 1 }} key={lng} value={index + 1}>
                            {lngs[lng].nativeName}
                        </option>
                    ))}
                </NativeSelect>
            </Box>
        </Box >
    )
}

export default TopBar