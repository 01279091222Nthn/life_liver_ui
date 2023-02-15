import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export const TrainingModel = () => {

    const files = useRef([])
    const [la, setLa] = useState([])
    const [process, setProcess] = useState(0)
    const val = useRef()
    const batch = useRef()
    const lr = useRef()
    const epochs = useRef()

    const uploadFiles = () => {
        let proc = 0;
        setProcess(0)
        axios.delete(`http://127.0.0.1:8000/training/delete/`)
            .then((res) => {
                Promise.all(la.map(async (l, i) => {
                    const data = {
                        'label': l.maLa,
                        'image': Array.from(files.current[i].files),
                    }
                    await axios.post(`http://127.0.0.1:8000/training/upload/`, data, {
                        headers: {
                            "Content-Type": 'multipart/form-data'
                        }
                    })
                        .then((res) => {
                            proc = proc + (1000 / la.length)
                            console.log(proc);
                            setProcess(proc);
                            if (i + 1 === la.length) {
                                axios.post('http://127.0.0.1:8000/training/', {
                                    val_split: val.current.value / 100,
                                    epochs: epochs.current.value,
                                    batch: batch.current.value,
                                    lr: lr.current.value,
                                }, {
                                    headers: {
                                        "Content-Type": "multipart/form-data"
                                    }
                                })
                                    .then((res) => {
                                    })
                            }
                        })
                        .catch((res) => {
                            toast.error('Tải ảnh lên thất bại')
                        })
                }))
            })

    }

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/lathuoc/')
            .then((res) => setLa(res.data));
    }, [])
    return (
        <div className='row'>
            <div className='col-6'>
                <div className='upload-img-box'>
                    {
                        la.map((l) =>
                            <div className='train-img-box'>
                                <h2>{l.tenLa}</h2>
                                <input type={'file'} ref={ref => (files.current = [...files.current, ref])} multiple="multiple" />
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='col-6'>
                <div className='train-model-box'>
                    <div className='advance-box'>
                        <h2>Cấu hình</h2>
                        <div className='row'>
                            <div className='col-3'>
                                <p>Validation Split</p>
                            </div>
                            <div className='col-8'>
                                <input ref={val} type={'number'} defaultValue={10} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <p>Epochs</p>
                            </div>
                            <div className='col-8'>
                                <input ref={epochs} type={'number'} defaultValue={10} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <p>Batch size</p>
                            </div>
                            <div className='col-8'>
                                <input ref={batch} type={'number'} defaultValue={16} />
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-3'>
                                <p>Learning rate</p>
                            </div>
                            <div className='col-8'>
                                <input ref={lr} type={'number'} defaultValue={0.0001} />
                            </div>
                        </div>
                    </div>
                    <div className='advance-btn-box'>
                        <button onClick={() => {
                            uploadFiles()
                        }}>Huấn luyện</button>
                        <button onClick={() => {
                            console.log(val.current.value);
                        }}>Cấu hình mặc định</button>
                    </div>
                </div>
                <div class="progress">
                    <div class="progress-bar" role="progressbar" aria-valuenow='10'
                        aria-valuemin="0" aria-valuemax="100" style={{ width: `${process}px` }}>
                    </div>
                </div>
            </div>
        </div>
    )
}
