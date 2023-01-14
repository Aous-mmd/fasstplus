import React from 'react'
import { CircularProgress, useTheme } from '@mui/material';
import { colorsTheme } from '../theme';

const Loader = () => {
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);
    return (
        <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ color: colors.Primary[400] }} />
        </div>
    )
}

export default Loader