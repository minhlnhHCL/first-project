export const wrapPromise = (promise) => {
    // Initial status
    let status = 'pending'

    let result;
    const suspender = promise.then(
        res => {
            status = 'success'
            result = res
        },
        err => {
            status = 'error'
            result = err
        }
    )
    const read = () => {
        switch (status) {
            case 'pending':
                throw suspender
            case 'error':
                throw result
            default:
                return result
        }
    }

    return { read }
}