import { useAuth } from "../modules/account"
import { doFetch } from "./fetch-helpers"

function usePost<T extends object>(url: string) {
    const {token} = useAuth();

    return (data: T): Promise<T | never> => {
        return doFetch(url, data, {
            method: 'POST',
            setContentType: true,
            token,
        })
    }
}

export default usePost
