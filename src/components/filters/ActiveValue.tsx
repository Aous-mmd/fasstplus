import { Box, FormControl, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';
import { GridFilterInputValueProps } from '@mui/x-data-grid'
import React, { useState } from 'react'

const ActiveValue = (props: GridFilterInputValueProps) => {
    const { item, applyValue } = props;
    const handleFilterChange: SelectProps['onChange'] = (event, newValue) => {
        setActive(event.target.value);
        applyValue({ ...item, value: event.target.value });
    };
    const [active, setActive] = useState(item.value);
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
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={active}
                    label="Age"
                    onChange={handleFilterChange}
                >
                    <MenuItem value={0}>No</MenuItem>
                    <MenuItem value={1}>Yes</MenuItem>
                </Select>
            </FormControl>
        </Box>
    )
}

export default ActiveValue