export type TProviders = {
    msg: string;
    data: TProvidersData;
    errors: any[];
}

export type TProvidersData = {
    providers: Provider[];
    count: number;
}

export type Provider = {
    id: number;
    company_name: string | null;
    provider_email: string;
    first_name: string;
    second_name: string;
    provider_phone_number: string;
    provider_phone_number_2: string;
    job_title: string;
    active: number;
    service_providers: ServiceProvider[];
}

export type ServiceProvider = {
    id: number;
    default_name: string;
    order: number;
    image: string;
    rate: number;
    fast: number;
    price: number;
    quality: number;
    category_id: number;
    active: number;
    pivot: Pivot;
}

export type Pivot = {
    provider_id: number;
    service_id: number;
}

export type TTerms = {
    msg:    string;
    data:   TPolicy;
    errors: any[];
}

export type TPolicy = {
    policies: Policy[];
}

export type Policy = {
    id:      number;
    text:    string;
    lang_id: number;
}