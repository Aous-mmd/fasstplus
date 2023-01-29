export type Notifications = {
    msg: string;
    data: TNotifications;
    errors: any[];
}

export type TNotifications = {
    notifications: Notification[];
}

export type Notification = {
    id: number;
    ar_title: string;
    ar_body: string;
    en_title: string;
    en_body: string;
    ku_title: string;
    ku_body: string;
    type: string;
    order_id: null;
    previous_status: null;
}
