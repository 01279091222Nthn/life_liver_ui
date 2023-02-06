import axios from 'axios'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import { Context } from '../Store/Provider'

export const DialogSearch = () => {

    const option = [
        { title: 'Lá thuốc' },
        { title: 'Tin tức' },
    ]
    const [benhGan, setBenhGan] = useState([])
    const filter = useRef()
    const { search, setSearch } = useContext(Context)
    const navigate = useNavigate()
    const [benhSelected, setBenhSelected] = useState([])

    const handleSearch = () => {
        setSearch({ ...search, text: filter.current.value, benh: benhSelected })
        if (search.filter === 0) {
            navigate('/Product')
        }
        else {
            navigate('/News')
        }
    }

    const handleClose = () => {
        setBenhSelected(search.benh)
    }

    useEffect(() => {
        const getBenhGan = () => {
            axios.get('http://127.0.0.1:8000/benhgan/')
                .then((res) => {
                    setBenhGan(res.data)
                })
        }
        getBenhGan()
    }, [search])

    return (
        <div id="search" className="modal fade" role="dialog" on>
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={() => handleClose()}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className='textbox'>
                            <input ref={filter} placeholder='Nhập tìm kiếm' />
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            {
                                option.map((o, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            setSearch({ ...search, filter: i })
                                        }}
                                        className={i === search.filter ? 'tag checked' : 'tag'}>{o.title}</button>
                                ))
                            }
                        </div>
                        <div style={{ marginTop: '10px' }}>
                            {
                                search.filter === 0 ?
                                    benhGan.map((b, i) => (
                                        <button key={i} className={benhSelected.includes(b.maBenh) ? 'tag checked' : 'tag'}
                                            onClick={() => {
                                                setBenhSelected(
                                                    benhSelected.includes(b.maBenh) === false
                                                        ? [...benhSelected, b.maBenh]
                                                        : benhSelected.filter((bs) => bs !== b.maBenh))
                                            }}>{b.tenBenh}</button>
                                    ))
                                    : <></>
                            }
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className='btn btn-submit' data-dismiss="modal" onClick={() => {
                            handleSearch()
                        }}>Tìm kiếm</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
