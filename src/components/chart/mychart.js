import React from "react";
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import { Chart as ChartJS, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js';

ChartJS.register(LineController, LineElement, PointElement, LinearScale, Title);


export function Graph(props) {


    return (
        <div className="chartt" >
            <Chart
                type='bar'
                data={
                    {
                        labels: ['Cases', 'Deaths', 'Recoveries'],
                        datasets: [{
                            label: 'cases',
                            data: [{ id: 'Cases', nested: { value: props.record.totalcases } }, { id: 'Deaths', nested: { value: props.record.totaldeaths } }, { id: 'Recoveries', nested: { value: props.record.totalrecovered } }],
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.2)',
                                'rgba(255, 99, 132, 0.2)',
                                'rgba(75, 192, 192, 0.2)',

                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(75, 192, 192, 1)',

                            ],
                            borderWidth: 1
                        }]



                    }


                }
                options={

                    {
                        parsing: {
                            xAxisKey: 'id',
                            yAxisKey: 'nested.value'
                        },
                        plugins: {
                            title: {
                                display: true,
                                text: props.record.country
                            }
                        },

                    }
                }


            />
        </div>
    )
}


