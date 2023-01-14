import React from 'react'
import { SubMenu } from 'react-pro-sidebar'
import CMenuItem from './CMenuItem'
import { TMenu } from '../types';
import _ from 'lodash';

type Props = {
    menu: TMenu;
    selected: string;
    setSelected: (selected: string) => void;
    location: string;
}

const CSubMenu: React.FC<Props> = ({ menu, selected, setSelected, location }) => {
    // eslint-disable-next-line
    const test = menu.items?.map((item) => {
        const lists = Object.values(item);
        if (lists[0] === location || lists[1] === location) return item.name;
    });
    return (
        <SubMenu label={menu.name} icon={menu.icon} defaultOpen={selected ? (test?.[0] === selected || test?.[1] === selected) : ((test?.[0] !== undefined && test?.[0] === location) || (test?.[1] !== undefined && test?.[1] === location))}>
            {
                menu?.items?.map((item: Record<string, any>) =>
                    <CMenuItem
                        key={_.uniqueId()}
                        name={item.name}
                        icon={item.icon}
                        location={location}
                        selected={selected}
                        setSelected={setSelected}
                        to={item.to}
                    />
                )
            }
        </SubMenu>
    )
}

export default CSubMenu