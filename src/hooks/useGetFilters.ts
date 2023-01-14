import { GridFilterItem } from "@mui/x-data-grid";

export const useGetFilters = (component: any, type: string) => {
    return [{
        label: '=',
        value: '=',
        getApplyFilterFn: (filterItem: GridFilterItem) => {
            if (
                !filterItem.columnField ||
                (!filterItem.value && filterItem.value !== 0 && filterItem.value !== 1) ||
                !filterItem.operatorValue
            ) {
                return null;
            }

            return (params: any): boolean => {
                return params.value === filterItem.value;
            };
        },
        InputComponent: component,
        InputComponentProps: { type },
    }]
}

export default useGetFilters;