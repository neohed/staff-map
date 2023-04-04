import {useState, useEffect, useContext} from "react";
import {getUrl} from "./fetch-helpers";
import SetValueContext, {getContextValue} from "./SetValueContext";
import { getFetchHeaders } from "./fetch-helpers";
import type {AuthUser} from "./SetValueContext";

function useFetch(url: string, skip: boolean = false) {
    const [data, setData] = useState({});
    const context = useContext(SetValueContext);
    const {token} = getContextValue(context, 'AUTH') as AuthUser;

    useEffect( () => {
        const abortController = new AbortController();

        async function fetchData() {
            const fullUrl = getUrl(url);
            try {
                const response = await fetch(fullUrl, {
                    signal: abortController.signal,
                    headers: getFetchHeaders({token, setContentType: false})
                });

                if (response.ok) {
                    const res = await response.json();

                    if (abortController.signal.aborted) {
                        return;
                    }

                    setData(res)
                }
            } catch(e) {
                console.log(e)
            }
        }

        !skip && fetchData()

        return () => {
            abortController.abort();
        }
    }, [url, setData, skip])

    return data
}

export default useFetch
