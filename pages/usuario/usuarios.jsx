import { Box, Paper, Grid, LinearProgress } from "@mui/material";

//importaciones

import Drawer from "components/Drawer";

import { useRouter } from "next/router";



import {useApiSWR} from "hooks/useApiSWR";
import useSWR from "swr";

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

const usuarios = () => {

    const router = useRouter();

    const { data, error } = useSWR("/api/user/user", fetcher)

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




    return (
        <Drawer title=" Población" description="-" asunto="Población">
            <Box md={2} sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <ul>
                        {
                            data.users.map(user => {
                                <li key={user.id}> {user.name}</li>
                            })
                        }
                    </ul>
                </Grid>
            </Box>
        </Drawer>
    );
};

export default usuarios;
