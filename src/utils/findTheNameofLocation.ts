import { TMenu } from '../types/index';
export const findTheNameofLocation = (navigation: TMenu[], location: any) => {
    let result = 'Dashboard';
    navigation.forEach((item) => {
        if (item.items) {
            item.items.forEach((path) => {
                if (path.to === location.pathname) {
                    result = path.name;
                }
            });
        } else {
            if (item.to === location.pathname) {
                result = item.name;
            }
        }
    })
    return result;
}