import React, { useEffect, useState } from "react";
import './country.css';
import { useRef } from "react";
import axios from 'axios';
import { Graph } from "../chart/mychart";





export default function Country(props) {

    let [datamilla, setdatamilla] = useState(false);
    let [confirmed, setconfirmed] = useState(0);
    let [recovered, setrecovered] = useState(0);
    let [death, setdeath] = useState(0);
    let [countryname, setcountry] = useState();


    let [names, Setnames] = useState([]);
    let resp = [];
    const getdata = async () => {
        resp = await axios.get("https://restcountries.com/v2/all");
        resp.data.forEach(element => {
            names.push(element.name);
            Setnames([...names])
        });
    }
    useEffect(() => {
        getdata();
    }, [])


    let searchkey = useRef();
    async function fetchdata() {
        setdatamilla(false);
        //Make first Letter Capital
        countryname = searchkey.current.value;
        countryname = countryname.charAt(0).toUpperCase() + countryname.slice(1);
        setcountry(countryname);

        //Getting the data from API
        //npm start

        try {
            let resp = await axios.get("https://covid-19.dataflowkit.com/v1/" + countryname);
            console.log(resp);
            if (resp) {
                if (resp.data['Country_text'] == "World") {
                    alert("NO Such COuntry Exist");
                    setdatamilla(false);
                }
                else {
                    setdatamilla(true);
                    setconfirmed(resp.data['Total Cases_text']);
                    setrecovered(resp.data['Total Recovered_text']);
                    setdeath(resp.data['Total Deaths_text']);

                    let confirmed1 = resp.data['Total Cases_text'];
                    let recovered1 = resp.data['Total Recovered_text'];
                    let deaths1 = resp.data['Total Deaths_text'];
                    confirmed1 = confirmed1.replaceAll(',', '');
                    recovered1 = recovered1.replaceAll(',', '');
                    deaths1 = deaths1.replaceAll(',', '');
                    // console.log(confirmed1,recovered1,deaths1);

                    props.SetRecord({
                        'totalcases': confirmed1,
                        'totaldeaths': recovered1,
                        'totalrecovered': deaths1
                    })
                }
            }
        }
        catch (e) {
            alert('No Such Country Exist');
            setdatamilla(false);
        }
    }


    function CoutrykaData() {
        console.log("Country-Name" + countryname);
        return <>
            {/* <div id="container">
                <h4 id="confirm">Confirmed:<span>{confirmed}</span></h4>
                <h4 id="recover">Recovered:<span>{recovered}</span></h4>
                <h4 id="death">Deaths:<span>{death}</span></h4>
            </div> */}
            <h2 className="country_tag">Covid-19 Cases details of {countryname}</h2>
            <div className="pracise_container">
                <div className="row1-container">
                    <div className="box box-down cyan">
                        <h2>Recovered</h2>
                        <p>{recovered}</p>
                        <img src="https://assets.codepen.io/2301174/icon-supervisor.svg" alt="" />
                    </div>
                    <div className="box red">
                        <h2>Confirmed</h2>
                        <p>{confirmed}</p>
                        <img src="https://assets.codepen.io/2301174/icon-team-builder.svg" alt="" />
                    </div>
                    <div className="box box-down blue">
                        <h2>Deaths</h2>
                        <p>{death}</p>
                        <img src="https://assets.codepen.io/2301174/icon-calculator.svg" alt="" />
                    </div>
                </div>
                <div className="row2-container">
                    <div className="box orange">
                        <h2>Guidlines</h2>
                        <p>Wear a Mask</p>
                        <p>Maintain Distance</p>
                        <img src="https://assets.codepen.io/2301174/icon-karma.svg" alt="" />
                    </div>
                </div>
            </div>
        </>
    }

    return <>

        <hr />
        <h1>Search Data of Individual Country Down Here!</h1>
        {/* <input type='search' ref={searchkey} className='text_box' placeholder='Search Data of Any Country' /><br /> */}
        <select id="country" ref={searchkey} className='text_box' name="country" class="form-control" onChange={fetchdata}>
            {names.map((name) => {
                return <option value={name}>{name}</option>;
            })}

        </select>

        {/* <button onClick={fetchdata} className='button-85'>Find Now</button> */}

        {datamilla && <CoutrykaData />}
        {datamilla && <CoutrykaData /> && <Graph record={props.record} />}

    </>
}


