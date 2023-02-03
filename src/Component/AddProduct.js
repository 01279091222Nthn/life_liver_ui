import axios from 'axios'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useNavigate } from 'react-router-dom'
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';
export const AddProduct = () => {

    const navigate = useNavigate()
    const hinhAnh = useRef()
    const tenLa = useRef()
    const tenKhac = useRef()
    const tenKhoaHoc = useRef()
    const soLuongCon = useRef()
    const giaBan = useRef()
    const [benhGan, setBenhGan] = useState([])
    const { quill, quillRef } = useQuill();
    React.useEffect(() => {
        if (quill) {
            quill.getModule('toolbar').addHandler('image', imageHandler);
            quill.on('text-change', (delta, oldDelta, source) => {
                // console.log(quill.getText()); // Get text only
                // console.log(JSON.stringify(quill.getContents())); // Get delta contents
                // console.log(quill.root.innerHTML); // Get innerHTML using quill
                // console.log(quillRef.current.firstChild.innerHTML); // Get innerHTML using quillRef
            });
        }
    }, [quill]);

    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();
        input.onchange = async () => {
            const formdata = {
                uploadId: 'anxo',
                uploadContent: 'avatar',
                file: input.files[0],
            };
            console.log(formdata);
            axios.post(`http://127.0.0.1:8000/upload/`, formdata, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            }
            ).then((res) => {
                console.log(res);
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', res.data.file);

            }).catch((res) => {
                console.log(res);
            })
        }
    }

    const onAddLaThuoc = () => {
        const laThuoc = {
            maLa: removeAccents(tenLa.current.value),
            hinhAnh:hinhAnh.current.files[0],
            tenLa: tenLa.current.value,
            tenKhac: tenKhac.current.value,
            tenKhoaHoc: tenKhoaHoc.current.value,
            soLuongCon: soLuongCon.current.value,
            giaBan: giaBan.current.value,
            noiDungKhac: quill.root.innerHTML
        }
        console.log(laThuoc);
        axios.post('http://127.0.0.1:8000/lathuoc/', laThuoc,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        .then((res) => {
            navigate('/Manager/Product')
            toast.success('Thêm thành công');
        }).catch((res) => {
            toast.error('Thêm thất bại');
        })
    }

    const getLsBenh = () => {
        axios.get('http://127.0.0.1:8000/benhgan/').then((res) => {
            setBenhGan(res.data)
        }).catch((error) => {
            console.log('error');
        })
    }

    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/ /g, '');
    }

    useEffect(() => {
        getLsBenh()
    }, [])

    return (
        <>
            <p className="bread">
                <span> Thêm Sản phẩm</span>
            </p>
            <div className='container'>
                <div className='row'>
                    <div className='col-2'>
                        <p>Hình ảnh</p>
                    </div>
                    <div className='col-10'>
                        <input type={'file'} ref={hinhAnh}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Tên lá thuốc</p>
                    </div>
                    <div className='col-10'>
                        <input ref={tenLa} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Tên khác</p>
                    </div>
                    <div className='col-10'>
                        <input ref={tenKhac} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Tên khoa học</p>
                    </div>
                    <div className='col-10'>
                        <input ref={tenKhoaHoc} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Điều trị</p>
                    </div>
                    <div className='col-10'>
                        {benhGan.map((b) => (
                            <>
                                <input type={'checkbox'} style={{ margin: '0 5px' }} />
                                <label>{b.tenBenh}</label>
                                <br></br>
                            </>
                        ))
                        }
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Số lượng</p>
                    </div>
                    <div className='col-10'>
                        <input type={'number'} ref={soLuongCon} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Giá bán</p>
                    </div>
                    <div className='col-10'>
                        <input type={'number'} ref={giaBan} />
                    </div>
                </div>

                <div>
                    <div>
                        <div ref={quillRef} style={{ height: '300px' }} />
                    </div>
                </div>

                <div className='row' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={'/Manager/Product'}><button className='btn btn-cancel'>Huỷ</button></Link>
                    <button className='btn-submit btn' onClick={() => onAddLaThuoc()}>Thêm</button>
                </div>
            </div>
        </>
    )
}
