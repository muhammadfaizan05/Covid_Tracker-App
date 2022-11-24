import React from "react";

import axios from "axios";


export async function getdata(){


    let covidata=await axios.get("https://covid-19.dataflowkit.com/v1/world");
       
    let a=covidata.data["Total Cases_text"];
    let totalcases=a.replaceAll(',','');

    let b=covidata.data["Total Recovered_text"];
    let recovery=b.replaceAll(',','');

    let c= covidata.data["Total Deaths_text"];
    let death=c.replaceAll(',','');

    
    let datatosend={"totalcases":totalcases,"recovery":recovery,"totaldeath":death,"lastUpdate":covidata.data["Last Update"]};

    return datatosend;

}
