import { useAuth } from "../features/account"
import { fetchData } from "./fetch-helpers"
import { ValueType } from "./fetch-helpers";

function usePost<T extends Record<string, ValueType> | FormData>(url: string) {
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

/*
function usePost<T extends Record<string, ValueType> | FormData>(...) {
  // ...existing code...
  fetchData(url, { body: data as BodyType });
  // ...existing code...
}
*/