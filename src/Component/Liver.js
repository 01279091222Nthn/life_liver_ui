import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export const Liver = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        const GetData = async () => {
            axios.get('http://127.0.0.1:8000/benhgan/')
                .then((res) => {
                    setData(res.data)
                })
        };
        GetData();
    }, []);

    return (
        <div>
            <div>
                <p className="bread">
                    <span>Bệnh gan</span>
                </p>
                <div className="grid-product">
                    {data.map((d, i) => (
                        <Link to={`/Liver/${d.maBenh}`}>
                            <div className='home-news-card' style={{height:'350px'}}>
                                <div className='home-new-card-img'>
                                    <img src={d.hinhAnh} style={{width:'100%'}}/>
                                </div>
                                <p style={{margin:'30px'}}>{d.tenBenh}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}
