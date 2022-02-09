

export const usePOSTDATA = async (url, form) => {

    const res = await fetch(url, {
        method: 'POST',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(form)
    })
    const data = await res.json();    

    return {
        data: data
    }
};

