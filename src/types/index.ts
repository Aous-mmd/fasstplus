export type TMenu = {
    name: string;
    to: string;
    icon: React.ReactElement;
    items?: TMenuItem[];
}

export type TMenuItem = {
    name: string;
    to: string;
    icon: React.ReactElement;
}