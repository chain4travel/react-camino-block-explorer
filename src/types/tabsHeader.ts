export interface ITabsHeader {
    tabValue: number
    changeAction: (event: React.SyntheticEvent, newValue: number) => void
    children: JSX.Element
    tabOptions: ITabOptions[]
}

export interface ITabOptions {
    label: string
    value: string
}
