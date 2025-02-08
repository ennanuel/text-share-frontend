import { useState, useEffect } from "react";

import { ModifiedError } from "../types/error.type";

export function useFetch<Data>(url: string, options: RequestInit): {
    loading: boolean;
    error: { statusCode?: number, message: string; } | null;
    data: Data | null;
    retry: () => void;
} {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<{ statusCode?: number; message: string; } | null>(null);
    const [data, setData] = useState<Data|null>(null);
    const [refetch, setRefetch] = useState(0);

    const retry = () => setRefetch(refetch + 1);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(url, options)
            .then((response) => {
                response
                    .json()
                    .then((result) => {
                        if (response.status !== 200) {
                            setError({ statusCode: response.status, message: "" });
                            throw result;
                        }
                        setData(result)
                    })
                    .catch((error) => { 
                        console.error((error as ModifiedError).message);
                        setError({ statusCode: response.status, message: (error as ModifiedError).message });
                    })
            })
            .catch((error) => {
                console.error((error as ModifiedError).message);
                setError((prev) => ({ ...prev, message: (error as ModifiedError).message }));
            })
            .finally(() => setLoading(false));
    }, [url, refetch]);

    return { loading, error, data, retry };
}