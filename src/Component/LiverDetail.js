import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';

export const LiverDetail = () => {
    const params = useParams()
    const [benh, setBenh] = useState([])

    useEffect(() => {
        const GetData = async () => {
            await axios.get(
                    `http://127.0.0.1:8000/benhgan/${params.maBenh}/`
                )
            .then((res)=>setBenh(res.data))
        };
        GetData();
        window.scrollTo(0, 0);
    }, []);
    return (
        <div>
            <p className='bread'>
                <span>Liver</span>
                <i class="bi bi-chevron-right" />
                <span>{benh.tenBenh}</span>
            </p>
            <div className='news-tittle'>
                <h2>Bệnh: {benh.tenBenh}</h2>
            </div>
            <div class="ql-editor new-detail" dangerouslySetInnerHTML={{ __html: benh.noiDungKhac }}>
            </div>
        </div>
    )
}
