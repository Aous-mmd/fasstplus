import React, { useRef, useState } from 'react'
import TopBar from './TopBar'
import Routers from '../Routers'
import SideBar from './SideBar'
import { Box, LinearProgress, useTheme } from '@mui/material';
import { useRecoilState } from 'recoil'
import { dialogAction } from '../store/atom'
import { ToastContainer } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
const Layout = () => {
    const dialogActionState = useRecoilState(dialogAction);
    const { i18n } = useTranslation();
    const theme = useTheme();
    const myRef = useRef();
    const [topWidth, setTopWidth] = useState<number>();

    useEffect(() => {
        const test = myRef.current as any;
        setTopWidth(window.screen.width - test.offsetWidth);
    }, [])

    return (
        <Box height="100%" display='flex' width='100%'>
            {
                dialogActionState[0].submit && (
                    <LinearProgress sx={{ zIndex: 999999999, position: 'fixed', top: '0', width: '100%' }} />
                )
            }
            <ToastContainer
                position="top-right"
                autoClose={5000}
                closeOnClick
                rtl={!(i18n.language === 'en' || i18n.language === 'en-US')}
                pauseOnFocusLoss
                pauseOnHover
                theme={theme.palette.mode}
            />
            <SideBar myRef={myRef} />
            <main className='content'>
                <TopBar width={topWidth!} />
                <Routers />
            </main>
        </Box>
    )
}

export default Layout