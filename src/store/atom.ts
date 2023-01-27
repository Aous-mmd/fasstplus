import { atom } from 'recoil';
import { TSData } from '../pages/Users/types';

export const dialogAction = atom({
    key: 'dialog', // unique ID (with respect to other atoms/selectors)
    default: {
        lang_id: 1,
        add: false,
        edit: false,
        editPassword: false,
        delete: false,
        orders: false,
        valid: false,
        activate: false,
        block: false,
        service: false,
        terms: false,
        open: false,
        submit: false,
        isSuccess: false,
        providers: false,
        data: {} as TSData,
        client: false,
        admin: false,
        edit_role: false,
        cities: false,
        reasons: false,
        submitData: {} as TSData
    },
});