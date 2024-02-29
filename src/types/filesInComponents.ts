export interface IDetailsField {
    field: string
    value?: string | number | React.ReactElement
    type: string
    icon?: React.ReactElement
    tooltip?: string
    detailsLink?: string
    allowCopy?: boolean
    style?: React.CSSProperties
    abbreviate?: boolean
    dataCy?: string
}

export interface IField {
    type: string
    value?: number | string | React.ReactElement
    fontWeight?: string
    abbreviate?: boolean
    field?: string
    dataCy?: string
}

export interface ICamAmount {
    amount: number
    currency?: string
    style?: React.CSSProperties
    camAmountStyle?: React.CSSProperties
    abbreviate?: boolean
    dataCy?: string
    type?: string
}

export interface IAddressLink {
    to: string
    value?: string | number
    typographyVariant?:
        | 'button'
        | 'caption'
        | 'h1'
        | 'h2'
        | 'h3'
        | 'h4'
        | 'h5'
        | 'h6'
        | 'subtitle1'
        | 'subtitle2'
        | 'body1'
        | 'body2'
        | 'overline'
        | 'inherit'
        | undefined
    truncate?: boolean
    dataCy?: string
}
