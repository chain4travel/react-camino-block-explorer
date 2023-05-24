import React from 'react'
import { Button } from '@mui/material'
import { ITransactionDetails } from 'types/transaction'

const RoundButton = ({ sx, children, disabled, onClick, ...props }: ITransactionDetails) => {
    return (
        <Button
            disableRipple={disabled}
            sx={{
                color: 'white',
                borderColor: 'secondary.main',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderRadius: '100%',
                minWidth: 'min-content',
                ...sx,
            }}
            onClick={onClick}
            {...props}
        >
            {children}
        </Button>
    )
}

export default RoundButton
