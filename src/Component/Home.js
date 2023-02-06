import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Flickity from 'react-flickity-component'
import { Link } from 'react-router-dom'

export const Home = () => {

  // const[pos,setPos]=useState(0)
  // const element1 = useRef()

  // const updatePos = () =>{
  //   setPos(window.scrollY)
  // }

  // useEffect(()=>{
  //   window.addEventListener("scroll",updatePos);
  //   //removes the eventlistener when the component is unmounted
  //   return () => {
  //     window.removeEventListener("scroll",updatePos);
  //   };
  // },[])

  const [data, setData] = useState([])

  const flickityOptions1 = {
    wrapAround: true,
    autoPlay: 3000,
    initialIndex: 1,
  }
  const flickityOptions2 = {
    groupCells: true,
    pageDots: false
  }

  useEffect(() => {
    const GetData = async () => {
      const url = `http://127.0.0.1:8000/lathuoc/`
      axios.get(url, data)
        .then((res) => {
          setData(res.data)
        })
    }
    GetData();
  }, []);

  return (
    <>
      <Flickity // default ''
        elementType={'div'} // default 'div'
        options={flickityOptions1} // takes flickity options {}
        disableImagesLoaded={false} // default false
        reloadOnUpdate // default false
        static // default false
      >
        <img style={{ maxHeight: '500px' }} src="http://127.0.0.1:8000/media/uploads/z4046959297329_1682a984b8ec073f10ffd74c9db3087b.jpg" />
        <img style={{ maxHeight: '500px' }} src="http://127.0.0.1:8000/media/uploads/z4046964010769_cb26a8841f4358e6394b1b05c8ab37bc.jpg" />
        <img style={{ maxHeight: '500px' }} src="http://127.0.0.1:8000/media/uploads/z4053386410104_bc9aa9917d7035951d51feb58007744e.jpg" />

      </Flickity>
      <div style={{marginTop:'50px'}}>
        <Flickity
          options={flickityOptions2} // takes flickity options {}
          disableImagesLoaded={false} // default false
          reloadOnUpdate // default false
          static // default false
        >
          {data.map((d, i) => (
            <div className="grid-card home" key={i}>
              <div key={i} className="card">
                <div style={{ display: 'flex', height: 150, justifyContent: 'center' }}>
                  <img src={d.hinhAnh} style={{ maxHeight: '140px', maxWidth: '160px', borderRadius: '3px', marginTop: '10px' }} alt='' />
                </div>
                <div className="card-body">
                  <h4 className="card-title">{d.tenLa}</h4>
                  <p className="card-text" >{d.giaBan}₫ - 100g</p>
                  <Link to={`/Product/${d.maLa}`} className='link'>
                    <button className="btn btn-icon-card">
                      <i className="bi bi-arrow-right"></i>
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </Flickity>
      </div>
    </>
  )
}
