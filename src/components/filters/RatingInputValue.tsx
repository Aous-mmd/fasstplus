import { Box, Rating, RatingProps } from '@mui/material';
import { GridFilterInputValueProps } from '@mui/x-data-grid';
import React from 'react'
export const RatingInputValue = (props: GridFilterInputValueProps) => {
    const { item, applyValue, focusElementRef } = props;

    const ratingRef: React.Ref<any> = React.useRef(null);
    React.useImperativeHandle(focusElementRef, () => ({
        focus: () => {
            ratingRef.current
                .querySelector(`input[value="${Number(item.value) || ''}"]`)
                .focus();
        },
    }));

    const handleFilterChange: RatingProps['onChange'] = (event, newValue) => {
        applyValue({ ...item, value: newValue });
    };

    return (
        <Box
            sx={{
                display: 'inline-flex',
                flexDirection: 'row',
                alignItems: 'center',
                height: 48,
                pl: '20px',
            }}
        >
            <Rating
                name="custom-rating-filter-operator"
                placeholder="Filter value"
                value={Number(item.value)}
                onChange={handleFilterChange}
                precision={0.5}
                ref={ratingRef}
            />
        </Box>
    );
}

export default RatingInputValue