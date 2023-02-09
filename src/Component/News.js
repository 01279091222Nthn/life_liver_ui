import axios from "axios";
import { React, useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Store/Provider";


const News = () => {

    const [data, setData] = useState([])
    const { search } = useContext(Context)
    const [page, setPage] = useState({
        current: 0,
        start: 0,
        end: 5,
    })

    const onChangePage = (num) => {
        const i = num
        setPage(
            {
                ...page,
                current: i,
                start: i * 5,
                end: i * 5 + 5,
            })
    }

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

    const pagelist = () => {
        const lis = []
        for (let i = 1; i <= Math.ceil(data.length / 5); i++) {
            lis.push(<li class="page-item" onClick={() => onChangePage(i - 1)}><a class="page-link" href="#">{i}</a></li>)
        }
        return lis
    }


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

        // return [hour, minutes].join(":") + " " + [day, month, year].join("/");
        return [day, month, year].join("/");
    }

    return (
        <>
            <div>
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
                <div className="">
                    {data.slice(page.start, page.end).map((d, i) => (
                        <Link key={i} to={d.maTinTuc} className='link'>
                            <div className="ls-news">
                                <div className="row">
                                    <div className="col-4">
                                        <img src={d.hinhAnh} style={{maxWidth:'80%'}} alt='' />
                                    </div>
                                    <div className="col-8" style={{ display: 'flex', flexDirection: 'column' }}>
                                        <p>{d.tieuDe}</p>
                                        <p style={{ color: 'grey' }}>{formatDate(d.ngayDang)}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="container" style={{ display: 'flex', justifyContent: 'center' }}>
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                    <span class="sr-only">Previous</span>
                                </a>
                            </li>
                            {
                                pagelist().map((d) => (
                                    <>{d}</>
                                ))
                            }
                            <li class="page-item">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                    <span class="sr-only">Next</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}

export default News;