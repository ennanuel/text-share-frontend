import { useState, useEffect } from "react";

import { ModifiedError } from "../types/error.type";

export function useFetch<Data>(url: string, options: RequestInit): {
    loading: boolean;
    failed: boolean;
    data: Data | null;
} {
    const [loading, setLoading] = useState(true);
    const [failed, setFailed] = useState(false);
    const [data, setData] = useState<Data|null>(null);

    useEffect(() => {
        setLoading(true);
        setFailed(false);

        fetch(url, options)
            .then((response) => {
                response
                    .json()
                    .then((result) => {
                        if (response.status !== 200) throw result;
                        setData(result)
                    })
                    .catch((error) => { 
                        console.error((error as ModifiedError).message);
                        setFailed(true);
                    })
            })
            .catch((error) => {
                console.error((error as ModifiedError).message);
                setFailed(true);
            })
            .finally(() => setLoading(false));
    }, [url]);

    return { loading, failed, data };
}