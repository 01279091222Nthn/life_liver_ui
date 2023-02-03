import axios from "axios";
import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store/Provider";


const News = () => {

    const [data, setData] = useState([])
    const { search } = useContext(Context)

    useEffect(() => {
        const GetData = async () => {
            const url = search.text === '' ? 'http://127.0.0.1:8000/tintuc/'
                : `http://127.0.0.1:8000/tintuc/search/${search.text}/`
            axios.get(url)
                .then((res) => {
                    setData(res.data)
                })
        };
        GetData();
    }, [search]);


    const formatDate = (date) => {
        var d = new Date(date);
        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = d.getFullYear();
        var hour = "" + d.getHours();
        var minutes = "" + d.getMinutes();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;
        if (hour.length < 2) hour = "0" + hour;
        if (minutes.length < 2) minutes = "0" + minutes;

        return [hour, minutes].join(":") + " " + [day, month, year].join("/");
    }

    return (
        <>
            <div style={{ height: '90vh' }}>
                <p className="bread">
                    <span>Tin tức</span>
                    {
                        search.text.length > 0 ?
                            <>
                                <i class="bi bi-chevron-right" />
                                <span>{search.text}</span>
                            </>
                            : <></>
                    }
                </p>
                {data.map((d, i) => (
                    <Link key={i} to={d.maTinTuc} className='link'>
                        <div className="ls-news">
                            <div style={{ display: 'flex', height: '85%' }}>
                                <img src={d.hinhAnh} style={{ maxHeight: '150px', maxWidth: '200px', alignSelf: 'center' }} alt='' />
                                <div style={{ margin: 10, fontSize: '30px' }}>{d.tieuDe}</div>
                            </div>
                            <div>
                                <p style={{ float: 'right', color: 'grey' }}>{formatDate(d.ngayDang)}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}

export default News;