import { useMessageError } from "hooks/useMessageError";
//import axios from "axios";


// crear Poblacion
export const postDataPoblacion = async (url, form) => {

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(form)
        })
        const data = await res.json();
        if (!data.success) {
            const { errors } = useMessageError(data.error)
            return { errors }
        } else {            
            router.push('/poblacion')
        }
    } catch (error) {
        console.log(error)
    }
}

