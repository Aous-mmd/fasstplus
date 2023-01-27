export type Orders = {
    msg:    string;
    data:   TOrders;
    errors: any[];
}

export type TOrders = {
    orders:      Order[];
    total_count: number;
}

export type Order = {
    id:               number;
    type:             string;
    status:           string;
    order_date:       Date;
    image_one:        null;
    image_two:        null;
    note:             string;
    address:          null;
    user_id:          number;
    service_id:       number;
    approval_date:    Date;
    finish_date:      null;
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
    provider_phone_number_2: null;
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
    lang:         Lang;
}

export type Lang = {
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
