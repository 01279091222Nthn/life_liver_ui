import React from "react";

const Card = ({ data }) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: '25% 25% 25% 25%', overflowY: 'scroll', height: '90vh' }}>
            {data.map((d,i) => (
               <div key={i} className="card" style={{width:'200px',height:'300px', margin:'20px'}}>
               <img className="card-img-top" src={d.img} alt="Card image" style={{maxHeight:'150px'}}/>
               <div className="card-body">
                 <h4 className="card-title">{d.name}</h4>
                 <p className="card-text">20000vnd/100gram</p>
                 <a href="#" className="btn btn-primary">Thêm vào giỏ</a>
               </div>
             </div>
            ))}
        </div>
    )
}

export default Card;