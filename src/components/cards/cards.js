import React from "react";
import './cards.css';
import { Card, CardContent, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import { getdata } from '../fetchdata/fetchdata';
import { useEffect } from "react";
import { useState } from "react";

export default function Cards() {


    let [data, setdata] = useState({});
    useEffect(() => {
        const fetchdata = async () => {
            try {
                let resp = await getdata();
                setdata(resp);
            }
            catch (e) {
                alert('No Data Found/ Check Your Internet');
            }
        }
        fetchdata();

    }, [])


    return (<>

        <img src="Covid-1.jpg" id="mainimg" />
        <h2 className="main_title">Globally Situation of Covid-19</h2>
        <div className="container ">
            <Grid container spacing={3} justify='center' >
                <Grid item component={Card} xs={12} md={3} className="card infected">
                    <CardContent >
                        <Typography color='textsecondary' gutterBottom >Infected</Typography>
                        <Typography variant='h5'> <CountUp start={0} end={data.totalcases} duration={2} separator=","/> </Typography>
                        <Typography color='textsecondary'>{new Date(data.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>No. of Active cases of Covid-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className="card recovered" >
                    <CardContent>
                        <Typography color='textsecondary' gutterBottom >Recovered</Typography>
                        <Typography variant='h5'><CountUp start={0} end={data.recovery} duration={2} separator=','/></Typography>
                        <Typography color='textsecondary'>{new Date(data.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>No. of Recovered cases of Covid-19</Typography>
                    </CardContent>
                </Grid>

                <Grid item component={Card} xs={12} md={3} className="card death">
                    <CardContent>
                        <Typography color='textsecondary' gutterBottom  >Deaths</Typography>
                        <Typography variant='h5'><CountUp start={0} end={data.totaldeath} duration={2} separator=','/></Typography>
                        <Typography color='textsecondary'>{new Date(data.lastUpdate).toDateString()}</Typography>
                        <Typography variant='body2'>No. of Deaths of Covid-19</Typography>
                    </CardContent>
                </Grid>

            </Grid>
        </div>
        <hr />
    </>
    )
}