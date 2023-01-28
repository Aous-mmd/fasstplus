import React from 'react'
import { Typography } from '@mui/material';
import { MenuItem } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';

type Props = {
    name: string;
    to: string;
    icon: any;
    selected: string;
    setSelected(selected: string): void;
    location: string;
}

const CMenuItem: React.FC<Props> = ({ name, to, icon, selected, setSelected, location }) => {
    const tempLocation = useLocation();
    return (
        <MenuItem key={_.uniqueId()}
            active={selected ?
                name === selected
                : location === name
            }
            onClick={() => setSelected(name)} icon={icon} routerLink={<Link to={to} />}>
            <Typography>
                {name}
            </Typography>
        </MenuItem>
    )
}

export default CMenuItem