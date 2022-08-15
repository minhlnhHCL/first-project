import axios from "axios"
import { wrapPromise } from "./wrapPromise"

export const fetchData = (url) => {
    const promise = axios.get(url)
        .then(res => res.data)
        .catch(err => console.log(err))

    return wrapPromise(promise)
}