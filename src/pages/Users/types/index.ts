import { Provider } from "../../Services/types";

export type TClients = {
    msg: string;
    data: TClientsData;
    errors: any[];
}

export type TClientsData = {
    users: User[];
    count: number;
}

export type User = {
    full_name: string;
    country_code: string;
    phone_number: string;
    email?: string;
    image?: string;
    block: number;
    active: number;
    lang_id?: number;
    id: number;
}

export type TAdmins = {
    msg: string;
    data: TAdminsData;
    errors: any[];
}

export type TAdminsData = {
    admins: Admin[];
    count: number;
}

export type Admin = {
    id: number;
    full_name: string;
    country_code: string;
    phone_number: string;
    email: string;
    block: number;
    active: number;
    lang_id: number;
    image?: string;
}


export type Tservices = {
    msg: string;
    data: TservicesData;
    errors: any[];
}

export type TservicesData = {
    services: Service[];
    count: number;
}

export type Service = {
    id: number;
    default_name: string;
    order: number;
    image: string;
    rate: number;
    category_id: number;
    active: number;
    all_lang: Lang[];
    lang: Lang;
}

export type Lang = {
    id: number;
    name: string;
    description: string;
    lang_id: number;
    service_id: number;
    text?: string;
}

type OptionalData = {
    password_confirmation: string;
    password: string;
    ids?: number[];
    ar_name?: string;
    en_name?: string;
    ku_name?: string;
    ar_text?: string;
    en_text?: string;
    ku_text?: string;
}

export type TSData = Partial<User & Admin & Service & Provider & OptionalData>;