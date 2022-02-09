import { Box, Drawer, LinearProgress } from '@mui/material';
import { createContext, useContext } from 'react'

import useSWR from "swr";

const fetcher = async ({url, form, method}) => {
    const res = await fetch(url, {
        method: method,
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(form)
    });

    if (!res.ok) {
        const error = new Error("Error de data");
        error.info = await res.json();
        error.status = res.status;
        throw error;
    }

    const { data } = await res.json();
    return data;
};

export const ApiContext = createContext()
export const useApi = () => useContext(ApiContext)
   


export const ApiProvider = ({ children }) => {

    let hello = 'Prueba'

    const CONTEXT_FETCHER = ( id, method, form, urlApi ) => {
        switch (method) {
            case 'PUT':
                const { data, error } = useSWR(
                    id ? urlApi : null,
                    fetcher(urlApi, form, method)
                );

                if (error) {
                    return <Box sx={{ display: "flex" }}>error</Box>;
                }

                if (!data) {
                    return (
                        <Drawer title=" Población" description="-" asunto="Población">
                            <Box sx={{ width: '100%' }}>
                                <LinearProgress />
                            </Box>
                        </Drawer>
                    );
                }

            //   case 'GET':

            // case 'DELETE':


            default:
                return res
                    .status(500)
                    .json({ success: false, error: 'Falla de servidor' });
        }
    }


    return <ApiContext.Provider value={{ hello, CONTEXT_FETCHER }}>
        {
            children
        }
    </ApiContext.Provider>

};

