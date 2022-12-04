import React from "react";
import { Link, Route, Routes } from "react-router-dom";

const New = ({ data }) => {
    return (
        <>
            <div style={{ height: '90vh' }}>
                <div style={{ overflowY: 'scroll', height: '90%' }}>
                    {data.map((d, i) => (
                        <Link key={i} to={'cádcc'} className='link'>
                            <div className="ls-new">
                                <img src={d.img} style={{ height: '150px', width: '150px' }} />
                                <h4>{d.name}</h4>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    )
}

export default New;