import React, { useState } from 'react'
import { Button, Alert, Snackbar, Tooltip } from '@mui/material'
import Slide, { SlideProps } from '@mui/material/Slide'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import Icon from '@mdi/react'
import { mdiContentCopy } from '@mdi/js'

type TransitionProps = Omit<SlideProps, 'direction'>

function TransitionUp(props: TransitionProps) {
    return <Slide {...props} direction="left" />
}

export default function CopyButton({
    value,
    bordered = true,
}: {
    value: string
    bordered?: boolean
}) {
    const [open, setOpen] = useState(false)
    const [transition, setTransition] = useState<React.ComponentType<TransitionProps> | undefined>(
        undefined,
    )

    async function copyToClipboard(text: string) {
        await navigator.clipboard.writeText(text)
    }

    const handleClick = (Transition: React.ComponentType<TransitionProps>) => () => {
        setTransition(() => Transition)
        setOpen(true)
        copyToClipboard(value)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            {!bordered ? (
                <>
                    <Tooltip title="Copy to clipboard" placement="bottom">
                        <Button
                            variant="text"
                            onClick={handleClick(TransitionUp)}
                            sx={{ p: 0, minWidth: 'min-content', color: 'inherit' }}
                            disableRipple
                        >
                            <Icon path={mdiContentCopy} size={0.8} />
                        </Button>
                    </Tooltip>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={transition}
                        key={transition ? transition.name : ''}
                        autoHideDuration={5000}
                        sx={{ top: { xs: '74px !important', md: '84px !important' } }}
                    >
                        <Alert severity="success" sx={{ borderRadius: '12px' }}>
                            Copied to clipboard
                        </Alert>
                    </Snackbar>
                </>
            ) : (
                <>
                    <Button
                        onClick={handleClick(TransitionUp)}
                        variant="outlined"
                        color="secondary"
                        sx={{
                            borderRadius: '25px',
                            maxHeight: '40px',
                            borderWidth: '1.5px',
                            minWidth: '40px',
                            '&:hover': {
                                borderColor: 'primary.contrastText',
                            },
                        }}
                    >
                        <ContentCopyOutlinedIcon
                            sx={{ color: 'primary.contrastText', fontSize: '17px' }}
                        />
                    </Button>
                    <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={open}
                        onClose={handleClose}
                        TransitionComponent={transition}
                        key={transition ? transition.name : ''}
                        autoHideDuration={5000}
                        sx={{ top: { xs: '74px !important', md: '84px !important' } }}
                    >
                        <Alert severity="success" sx={{ borderRadius: '12px' }}>
                            Copied to clipboard
                        </Alert>
                    </Snackbar>
                </>
            )}
        </>
    )
}
