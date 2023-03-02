import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from '@mui/material'

export default function PageContainer({
    pageTitle,
    metaContent,
    children,
}: {
    pageTitle: string
    metaContent: string
    children: React.ReactNode
}) {
    return (
        <Container maxWidth="xl" sx={{ minHeight: '500px', p: '0px !important' }}>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaContent} />
            </Helmet>
            {children}
        </Container>
    )
}
