import React, { MutableRefObject, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Sidebar, Menu, useProSidebar } from 'react-pro-sidebar';
import { _Nav } from "../_nav";
import { Box, useTheme, IconButton } from '@mui/material';
import { colorsTheme } from '../theme';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';
import { MenuOutlined } from '@mui/icons-material';
import { CMenuItem, CSubMenu } from '../components';
import { findTheNameofLocation } from '../utils/findTheNameofLocation';

type Props = {
    myRef: MutableRefObject<any>;
    isCollapsed: boolean;
    setIsCollapsed: (value: boolean) => void;
}

const SideBar = (props: Props) => {
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);
    const { i18n } = useTranslation();
    const { collapseSidebar, collapsed } = useProSidebar();
    const navigation = _Nav();
    const location = useLocation();
    const [selected, setSelected] = useState<string>('');
    const currentLocation = findTheNameofLocation(navigation, location);
    return (
        <Box display='flex' height='100%' flex='1' ref={props.myRef} sx={{
            "& .pro-inner-item": {
                padding: '5px 35px 5px 20px !important',
            },
            "& .ps-menu-button:hover": {
                color: `${colors.Secondary[500]} !important`,
                backgroundColor: `${colors.Primary[200]} !important`
            },
            "& .ps-sidebar-root": {
                border: '0'
            },
            "& .ps-submenu-content": {

                "*": {
                    color: `${colors.Grey[300]} !important`,
                },
                backgroundColor: `${colors.Primary[800]} !important`
            },
        }}>
            <Sidebar backgroundColor={colors.Primary[600]} rtl={i18n.language === 'ar' || i18n.language === 'kr'}>
                <Menu
                    menuItemStyles={{
                        button: ({ level, active }) => {
                            return {
                                color: active ? colors.Secondary[400] : colors.Primary[200],
                                backgroundColor: active ? colors.Primary[300] : undefined,
                            };
                        },
                    }}
                >
                    {!props.isCollapsed && (
                        <Box display='flex' justifyContent='space-between' alignItems='center' padding={3}>
                            <img
                                src={require('../assets/img/LOGO.svg').default}
                                width='150px'
                                height='100px'
                                alt='Fast Plus Logo'
                            />
                            <IconButton onClick={() => {
                                const wrapper = document.getElementsByClassName('content')[0] as HTMLElement;
                                wrapper.style.flex = '25';
                                props.setIsCollapsed(!collapsed);
                                collapseSidebar()
                            }}>
                                <MenuOutlined sx={{ color: colors.Secondary[500] }} />
                            </IconButton>
                        </Box>
                    )}
                    {props.isCollapsed && (
                        <Box display='flex' justifyContent='center' alignItems='center' padding={3}>
                            <IconButton onClick={() => {
                                const wrapper = document.getElementsByClassName('content')[0] as HTMLElement;
                                wrapper.style.flex = '25'
                                props.setIsCollapsed(!collapsed);
                                collapseSidebar()
                            }}>
                                <MenuOutlined sx={{ color: colors.Secondary[500] }} />
                            </IconButton>
                        </Box>
                    )}
                    <Box>
                        {navigation.map((menu) => {
                            if (menu?.items && menu?.items.length > 0) {
                                return (
                                    <CSubMenu
                                        location={currentLocation}
                                        key={_.uniqueId()}
                                        menu={menu}
                                        selected={selected}
                                        setSelected={setSelected}
                                    />
                                )
                            } else {
                                return (
                                    <CMenuItem
                                        key={_.uniqueId()}
                                        name={menu.name}
                                        icon={menu.icon}
                                        location={currentLocation}
                                        selected={selected}
                                        setSelected={setSelected}
                                        to={menu.to}
                                    />
                                )
                            }
                        })}
                    </Box>
                </Menu>
            </Sidebar>
        </Box>
    )
}

export default SideBar