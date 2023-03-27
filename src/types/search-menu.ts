export interface SearchMenuItem {
    type: string
    link: string
    label: string
    avatar: string
    avatarColor: string
}

export interface ISearchMenu {
    open: boolean
    loading: boolean
    menuItems: SearchMenuItem[]
    search: string
}
