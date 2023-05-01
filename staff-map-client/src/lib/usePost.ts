import { useAuth } from "../modules/account"
import { fetchData } from "./fetch-helpers"

function usePost<T extends object>(url: string) {
    const {token} = useAuth();

    return (body: T): Promise<T | never> => {
        return fetchData(url, {
            method: 'POST',
            token,
            body,
        })
    }
}

export default usePost
