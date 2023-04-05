import {useState, useEffect} from "react";
import {getUrl} from "./fetch-helpers";
import { getFetchHeaders } from "./fetch-helpers";
import { useAuth } from "../modules/account";

function useFetch(url: string, skip: boolean = false) {
    const [data, setData] = useState({});
    const {token} = useAuth();

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
                        return
                    }

                    setData(res)
                }
            } catch(e) {
                console.log(e)
            }
        }

        !skip && fetchData()

        return () => {
            abortController.abort()
        }
    }, [url, setData, skip])

    return data
}

export default useFetch
