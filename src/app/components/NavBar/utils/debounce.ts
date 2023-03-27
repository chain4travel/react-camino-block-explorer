export function debounce(
    func: {
        (search: string | string[]): Promise<void>
        apply: (arg0: string, arg1: string[]) => void
    },
    wait: number | undefined,
    immediate = false,
) {
    var timeout: string | number | NodeJS.Timeout | null | undefined

    return (...args: string[]) => {
        // let context = this;
        let context = args[0]
        let later = () => {
            timeout = null
            if (!immediate) func.apply(context, args)
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}
