import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Container } from '@mui/material'
import { StringArraySupportOption } from 'prettier'

export default function PageContainer({
    pageTitle,
    metaContent,
    metaKeywords,
    children,
}: {
    pageTitle: string
    metaContent: string
    metaKeywords?: string
    children: React.ReactNode
}) {
    return (
        <Container maxWidth="xl" sx={{ minHeight: '500px', p: '0px !important' }}>
            <Helmet>
                <title>{pageTitle}</title>
                <meta name="description" content={metaContent} />
                <meta name="keywords" content={metaKeywords} />
            </Helmet>
            {children}
        </Container>
    )
}
