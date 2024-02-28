import { Box, Chip, Grid } from '@mui/material'

import AddressLink from 'app/components/AddressLink'
import { IAddress } from 'types/address'
import React from 'react'
import { RoutesConfig } from 'utils/route-paths'
import { getAddressFromUrl } from 'utils/route-utils'
import moment from 'utils/helpers/moment'

export const AddressSection = ({ type, timestamp, id, chainType }: IAddress) => {
    const routesConfig = RoutesConfig()
    return (
        <>
            <Grid container item xs={12} lg={6} alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <AddressLink
                        to={`${routesConfig.BASE_PATH}/${chainType}${routesConfig.TRANSACTION}/${id}`}
                        value={id}
                        typographyVariant="subtitle1"
                        truncate={true}
                    />
                    {moment(timestamp).fromNow()}
                </Grid>
            </Grid>
            <Grid
                container
                item
                xs={12}
                lg={6}
                alignItems="center"
                justifyContent="center"
                spacing={1}
            >
                <Grid item xs={6} md>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'right',
                            backgroundColor: 'primary.light',
                            borderRadius: '50%',
                            width: '50px',
                            height: '50px',
                        }}
                    >
                        {getAddressFromUrl()[0]}
                    </Box>
                </Grid>
                <Grid item xs={6} md sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Chip
                        label={type}
                        size="small"
                        style={{ minWidth: '61px', height: 'min-content' }}
                    />
                </Grid>
            </Grid>
        </>
    )
}
