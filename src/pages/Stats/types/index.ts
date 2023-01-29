export type Stats = {
    msg:    string;
    data:   TStats;
    errors: any[];
}

export type TStats = {
    users_count:           number;
    most_orders_users:     MostOrdersUser[];
    providers_count:       number;
    most_orders_providers: MostOrdersProvider[];
    today_orders:          number;
    today_income:          number;
    top_time_service:      TopService;
    top_rated_service:     TopService;
}

export type MostOrdersProvider = {
    id:                      number;
    company_name:            string;
    provider_email:          string;
    first_name:              string;
    second_name:             string;
    provider_phone_number:   string;
    provider_phone_number_2: null | string;
    job_title:               string;
    active:                  number;
    orders_count:            number;
}

export type MostOrdersUser = {
    id:           number;
    full_name:    string;
    country_code: string;
    phone_number: string;
    email:        null;
    image:        null;
    block:        number;
    active:       number;
    lang_id:      number;
    orders_count: number;
}

export type TopService = {
    id:            number;
    default_name:  string;
    order:         number;
    image:         string;
    rate:          number;
    fast:          number;
    price:         number;
    quality:       number;
    category_id:   number;
    active:        number;
    all_lang:      Lang[];
    lang:          Lang;
    orders_count?: number;
}

export type Lang = {
    id:          number;
    name:        string;
    description: string;
    lang_id:     number;
    service_id:  number;
}

export type StatsOrder = {
    msg:    string;
    data:   TStatsOrder;
    errors: any[];
}

export type TStatsOrder = {
    orders: Order[];
}

export type Order = {
    id:               number;
    type:             string;
    status:           string;
    order_date:       string;
    image_one:        null;
    image_two:        null;
    note:             null | string;
    address:          null;
    user_id:          number;
    service_id:       number;
    approval_date:    string;
    finish_date:      string;
    order_address_id: number;
    price:            number;
    reject_reason:    string;
    created_at:       Date;
    provider_id:      number;
    order_address:    OrderAddress;
    service:          Service;
    user:             User;
    provider:         Provider;
}

export type OrderAddress = {
    id:           number;
    title:        string;
    neighborhood: string;
    details:      string;
    city_id:      number;
}

export type Provider = {
    id:                      number;
    company_name:            string;
    provider_email:          string;
    first_name:              string;
    second_name:             string;
    provider_phone_number:   string;
    provider_phone_number_2: string;
    job_title:               string;
    active:                  number;
}

export type Service = {
    id:           number;
    default_name: string;
    order:        number;
    image:        string;
    rate:         number;
    fast:         number;
    price:        number;
    quality:      number;
    category_id:  number;
    active:       number;
    lang:         Langs;
}

export type Langs = {
    id:          number;
    name:        string;
    description: string;
    lang_id:     number;
    service_id:  number;
}

export type User = {
    id:           number;
    full_name:    string;
    phone_number: string;
}
