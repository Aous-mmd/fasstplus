import { Button, useTheme } from '@mui/material';
import React from 'react'
import { colorsTheme } from '../theme';

type Props = {
    title: string;
    children?: React.ReactElement;
    onClick?: () => void;
    disabled?: boolean;
    width?: string;
}

const CButton: React.FC<Props> = ({ title, children, onClick, disabled, width }) => {
    const theme = useTheme();
    const colors = colorsTheme(theme.palette.mode);

    return (
        <Button sx={{
            width: width || 'auto',
            backgroundColor: `${!disabled ? colors.Primary[500] : colors.Primary[100]} !important`,
            color: `${!disabled ? colors.Grey[200] : colors.Grey[900]} !important`, ":hover": {
                backgroundColor: colors.Primary[200],
                color: colors.Grey[900]
            }
        }} onClick={onClick} disabled={disabled || false} variant={!disabled ? 'outlined' : 'contained'}>
            {children}
            {title}
        </Button>
    )
}

export default CButton