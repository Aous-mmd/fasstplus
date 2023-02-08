import React from "react";
import { Language, Settings, SupportAgent, Report } from "@mui/icons-material";
import { TMenu } from "./types";
import { useTranslation } from 'react-i18next';


export const _Nav = (): TMenu[] => {
    const { t } = useTranslation();
    return [
        {
            name: t("Statistics"),
            to: "/statistics",
            icon: <Report />,
        },
        {
            name: t("Users"),
            to: "",
            icon: <Language />,
            items: [
                {
                    name: t("Clients"),
                    to: "/users/clients",
                    icon: <Language />,
                },
                {
                    name: t("Admins"),
                    to: "/users/admins",
                    icon: <Language />,
                },
            ],
        },
        {
            name: t("Services"),
            to: '',
            icon: <Settings />,
            items: [
                {
                    name: t("Services"),
                    to: "/services",
                    icon: <Settings />,
                },
                {
                    name: t("Services Provider"),
                    to: "/services/providers",
                    icon: <SupportAgent />,
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
                    icon: <Settings />,
                },
                {
                    name: t("Cities"),
                    to: "/settings/cities",
                    icon: <Settings />,
                },
                {
                    name: t("Reasons"),
                    to: "/settings/reasons",
                    icon: <SupportAgent />,
                },
            ],
        },
        {
            name: t("Policies"),
            to: '',
            icon: <Settings />,
            items: [
                {
                    name: t("Privacy Policy"),
                    to: "/policies/privacy_policy",
                    icon: <Settings />,
                },
                {
                    name: t("terms"),
                    to: "/policies/terms",
                    icon: <Settings />,
                },
            ],
        },
        {
            name: t("Orders"),
            to: "/orders",
            icon: <Report />,
        },
        {
            name: t("Notifications"),
            to: "/notifications",
            icon: <Report />,
        },
        {
            name: t("Reports"),
            to: "/reports",
            icon: <Report />,
        },
    ];
}

export default _Nav;