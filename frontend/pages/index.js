import Head from 'next/head'
import { useState } from 'react'
import { Typography, Container} from '@mui/material'
import { LoadingButton } from '@mui/lab'
import Grid from '@mui/material/Unstable_Grid2'
import Footer from '../components/Footer'

import axios from 'axios'

const apiURL = process.env.NEXT_PUBLIC_API_URL || 'http://api.testnet.local/envs';

export default function Home() {
    const [envData, setEnvData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleButtonClick = () => {
        if (!isLoading) {
          setError(null);
          setIsLoading(true);

          axios.post(apiURL)
          .then((response) => {
            setEnvData(response.data);
            setIsLoading(false);
          })
          .catch((error) => {
            try {
                setError('Error: ' + error.response.data);
            }
            catch (e) {
                setError('Error: ouch!');
            }
            setEnvData(null);
            setIsLoading(false);
          });        
        }
    };


    return (
        <Container style={{marginTop: '2em'}}>
            <Head>
                <title>zktestnet.fyi</title>
                <meta name="description" content="zktestnet.fyi" />
            </Head>
                <div>
                    <Container maxWidth="lg">
                        <Typography variant="h3" textAlign="center" fontWeight="700">🧪 ZK-TESTNET<span style={{fontSize: "0em"}}> </span>.FYI 🏗️</Typography>
                        {/* animated keyframes gradient text */}
                        <Grid container direction="column" spacing={1} alignItems="top" justifyContent="center">
                            <Grid item>
                            <Typography variant="h3" fontSize="2em" textAlign="center" className="linear-wipe" fontWeight="700">
                                ZK Rollup as a service
                            </Typography>
                            </Grid>
                            <Grid item>
                            <Typography textAlign="center">
                                Create shareable short lived zk rollups 
                            </Typography>
                            </Grid>
                            <Grid>
                                <Grid container direction="column" alignItems="center" spacing={1} justifyContent="center">
                                    <Grid item>
                                            <Grid item alignItems="stretch" style={{ display: "flex" }}>
                                                <LoadingButton variant="contained" loading={isLoading} onClick={handleButtonClick}>Create</LoadingButton>
                                            </Grid>
                                    </Grid>
                                    {
                                        envData && <pre>{JSON.stringify(envData, null, 2)}</pre>
                                    }
                                </Grid>
                            </Grid>
                            {error && 
                                <Grid>
                                <Typography color='red' textAlign="center">
                                    {error}
                                </Typography>
                                </Grid>
                            }
                        </Grid>
                    </Container>
                </div>
            <Footer/>
        </Container>
    )
}
