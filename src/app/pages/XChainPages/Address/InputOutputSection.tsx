import { Fund, InputsOutputs } from 'types/transaction'
import { Grid, Paper, Typography } from '@mui/material'

import DetailsField from 'app/components/DetailsField'
import React from 'react'
import useWidth from 'app/hooks/useWidth'

export const InputOutputSection = ({ inputs, outputs }: InputsOutputs) => {
    const { isTablet } = useWidth()
    return (
        <>
            <Grid
                container
                item
                xs={12}
                md={6}
                alignItems={{ md: 'center', xs: 'flex-start' }}
                justifyContent="center"
                spacing={2}
            >
                {isTablet && (
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            component="h6"
                            fontWeight="fontWeightBold"
                            sx={{ textTransform: 'capitalize' }}
                        >
                            Inputs
                        </Typography>
                    </Grid>
                )}
                {inputs &&
                    inputs.map((item, index) => {
                        return (
                            <Grid key={index} container item xs justifyContent="center">
                                <InputCard address={item.address} value={item.value} />
                            </Grid>
                        )
                    })}
            </Grid>
            <Grid
                container
                item
                xs={12}
                md={6}
                alignItems={{ md: 'center', xs: 'flex-end' }}
                justifyContent="center"
                spacing={2}
            >
                {isTablet && (
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            component="h6"
                            fontWeight="fontWeightBold"
                            sx={{ textTransform: 'capitalize' }}
                        >
                            Outputs
                        </Typography>
                    </Grid>
                )}
                {outputs &&
                    outputs.map((item, index) => {
                        return (
                            <Grid key={index} container item xs justifyContent="center">
                                <OutputCard address={item.address} value={item.value} />
                            </Grid>
                        )
                    })}
            </Grid>
        </>
    )
}

const InputCard = ({ address, value }: Fund) => {
    return (
        <Paper
            sx={{
                padding: '15px',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'none',
                maxWidth: '500px',
                width: '100%',
            }}
        >
            <Typography
                variant="body1"
                component="h5"
                fontWeight="fontWeightBold"
                sx={{ marginBottom: '15px' }}
            >
                Input
            </Typography>
            <DetailsField
                field="From"
                value={address}
                type="string"
                tooltip="Fee"
                allowCopy={true}
            />
            <DetailsField field="Value" value={value} type="ncam" tooltip="Fee" />
        </Paper>
    )
}

const OutputCard = ({ address, value }: Fund) => {
    return (
        <Paper
            sx={{
                padding: '15px',
                gap: '10px',
                display: 'flex',
                flexDirection: 'column',
                backgroundImage: 'none',
                maxWidth: '500px',
                width: '100%',
            }}
        >
            <Typography
                variant="body1"
                component="h5"
                fontWeight="fontWeightBold"
                sx={{ marginBottom: '15px' }}
            >
                Output
            </Typography>
            <DetailsField field="To" value={address} type="string" tooltip="Fee" allowCopy={true} />
            <DetailsField field="Value" value={value} type="ncam" tooltip="Fee" />
        </Paper>
    )
}
