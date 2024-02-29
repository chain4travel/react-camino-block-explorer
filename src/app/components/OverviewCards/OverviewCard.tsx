import { Box, Card, CardContent, Typography } from '@mui/material'
import React, { FC } from 'react'

import LoadingWrapper from 'app/components/LoadingWrapper'
import { Status } from 'types'

type OverviewCardProps = {
    title: string
    value: string
    loading: Status
    subValue?: string
    onClick?: () => void
    dataCy?: string
}

const OverviewCard: FC<OverviewCardProps> = ({
    title,
    value,
    loading,
    subValue,
    onClick,
    dataCy,
}) => {
    return (
        <Card
            variant="outlined"
            sx={{
                display: 'flex',
                flex: 1,
                minHeight: '150px',
                backgroundColor: 'card.background',
                textAlign: 'center',
                p: '1rem 2rem',
                borderRadius: '12px',
                cursor: onClick ? 'pointer' : 'default',
                borderColor: 'card.border',
            }}
            onClick={onClick}
        >
            <CardContent
                sx={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    alignItems: 'center',
                    p: '0',
                }}
            >
                <Typography variant="h6" component="span" sx={{ color: 'card.title', pb: '25px' }}>
                    {title}
                </Typography>
                <Box
                    sx={{
                        display: 'flex',
                        gap: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <LoadingWrapper loading={loading} failedLoadingMsg="-">
                        <Typography
                            variant="h4"
                            component="span"
                            fontWeight="fontWeightBold"
                            sx={{ color: 'card.contrastText' }}
                            data-cy={dataCy}
                        >
                            {value}
                        </Typography>
                        {subValue && (
                            <Typography
                                variant="h6"
                                component="span"
                                sx={{ color: 'card.subValue' }}
                            >
                                {subValue}
                            </Typography>
                        )}
                    </LoadingWrapper>
                </Box>
            </CardContent>
        </Card>
    )
}

export default OverviewCard
