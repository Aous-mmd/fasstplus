import React from "react";
import { 
    Language,
    Settings,
    DataSaverOff,
    Report,
    Summarize,
    Notifications,
    LocalShipping,
    Policy,
    Article,
    LocationCity,
    Info,
    DesignServices,
    People
} from "@mui/icons-material";
import { TMenu } from "./types";
import { useTranslation } from 'react-i18next';


export const _Nav = (): TMenu[] => {
    const { t } = useTranslation();
    return [
        {
            name: t("Statistics"),
            to: "/statistics",
            icon: <DataSaverOff />,
        },
        {
            name: t("Users"),
            to: "",
            icon: <People />,
            items: [
                {
                    name: t("Clients"),
                    to: "/users/clients",
                    icon: <People />,
                },
                {
                    name: t("Admins"),
                    to: "/users/admins",
                    icon: <People />,
                },
            ],
        },
        {
            name: t("Services"),
            to: '',
            icon: <DesignServices />,
            items: [
                {
                    name: t("Services"),
                    to: "/services",
                    icon: <DesignServices />,
                },
                {
                    name: t("Services Provider"),
                    to: "/services/providers",
                    icon: <DesignServices />,
                },
            ],
        },
        {
            name: t("Settings"),
            to: '',
            icon: <Settings />,
            items: [
                {
                    name: t("Company Info"),
                    to: "/settings/company_info",
                    icon: <Info />,
                },
                {
                    name: t("Cities"),
                    to: "/settings/cities",
                    icon: <LocationCity />,
                },
                {
                    name: t("Reasons"),
                    to: "/settings/reasons",
                    icon: <Article />,
                },
            ],
        },
        {
            name: t("Policies"),
            to: '',
            icon: <Policy />,
            items: [
                {
                    name: t("Privacy Policy"),
                    to: "/policies/privacy_policy",
                    icon: <Policy />,
                },
                {
                    name: t("terms"),
                    to: "/policies/terms",
                    icon: <Policy />,
                },
            ],
        },
        {
            name: t("Orders"),
            to: "/orders",
            icon: <LocalShipping />,
        },
        {
            name: t("Notifications"),
            to: "/notifications",
            icon: <Notifications />,
        },
        {
            name: t("Reports"),
            to: "/reports",
            icon: <Summarize />,
        },
    ];
}

export default _Nav;