import useSWR from "swr"

const fetcher = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        const error = new Error("Error de data");
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    const { data } = await res.json();
    return data;
}

export function useApiSWR(url) {
    const { data, error } = useSWR(url, fetcher)

    return {
        data: data,
        isLoading: !error && !data,
        isError: error
    }
}

