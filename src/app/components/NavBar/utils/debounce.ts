export function debounce(
    func: {
        (search: string | string[]): Promise<void>
        apply: (arg0: string, arg1: string[]) => void
    },
    wait: number,
    immediate = false,
) {
    var timeout: string | NodeJS.Timeout | number | undefined

    return (...args: string[]) => {
        // let context = this;
        let context = args[0]
        let later = () => {
            timeout = undefined
            if (!immediate) func.apply(context, args)
        }
        let callNow = immediate && !timeout
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
        if (callNow) func.apply(context, args)
    }
}
