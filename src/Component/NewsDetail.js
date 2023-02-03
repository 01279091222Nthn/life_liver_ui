import axios from "axios";
import { React, useEffect, useState } from "react";
import { useParams } from "react-router";
import News from "./News";


const NewsDetail = () => {

    const params = useParams()
    const [news, setNews] = useState([])

    useEffect(() => {
        const GetData = async () => {
            try {
                const res = await axios.get(
                    `http://127.0.0.1:8000/tintuc/${params.maTinTuc}/`
                );
                setNews(res.data);
            } catch (error) {
                console.log(error);
            }
        };
        GetData();
    }, []);

    return (
        <>
            <div className='news-tittle'>
                <h2>{news.tieuDe}</h2>
                <p>Ngày đăng: {news.ngayDang}</p>
            </div>
            <div class="ql-editor new-detail" dangerouslySetInnerHTML={{ __html: news.noiDungKhac }}>
            </div>
        </>
    )
}

export default NewsDetail;