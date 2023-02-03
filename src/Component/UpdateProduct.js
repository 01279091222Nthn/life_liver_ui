import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-hot-toast'
import { Link, useParams } from 'react-router-dom'
import { useQuill } from 'react-quilljs';
import 'react-quill/dist/quill.snow.css';

export const UpdateProduct = () => {

    const params = useParams()
    const tenLa = useRef()
    const tenKhac = useRef()
    const tenKhoaHoc = useRef()
    const soLuongCon = useRef()
    const giaBan = useRef()
    const hinhAnh = useRef()
    const [file, setFile] = useState()
    const [benhGan, setBenhGan] = useState([])
    const { quill, quillRef } = useQuill()
    const [dieuTri, setDieuTri] = useState([])

    React.useEffect(() => {
        if (quill) {
            getLaThuoc()
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
                const range = quill.getSelection();
                quill.insertEmbed(range.index, 'image', res.data.file);

            }).catch((res) => {
                console.log(res);
            })
        }
    }

    const onUpdateLaThuoc = () => {
        const laThuoc = {
            hinhAnh: hinhAnh.current.files[0],
            tenLa: tenLa.current.value,
            tenKhac: tenKhac.current.value,
            tenKhoaHoc: tenKhoaHoc.current.value,
            soLuongCon: soLuongCon.current.value,
            giaBan: giaBan.current.value,
            noiDungKhac: quill.root.innerHTML
        }
        axios.patch(`http://127.0.0.1:8000/lathuoc/${params.maLa}/`, laThuoc, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
            .then((res) => {
                toast.success('Cập nhật thành công');
            }).catch((res) => {
                toast.error('Cập nhật thành công');
            })
    }

    const getLsBenh = () => {
        axios.get('http://127.0.0.1:8000/benhgan/').then((res) => {
            setBenhGan(res.data)
        }).catch((error) => {
            console.log('error');
        })
    }

    const getLaThuoc = async () => {
        await axios.get(`http://127.0.0.1:8000/lathuoc/${params.maLa}/`).
        then((res) => {
            tenLa.current.value = res.data.tenLa
            tenKhac.current.value = res.data.tenKhac
            tenKhoaHoc.current.value = res.data.tenKhoaHoc
            giaBan.current.value = res.data.giaBan
            soLuongCon.current.value = res.data.soLuongCon
            setFile(res.data.hinhAnh)
            quill.setContents(quill.clipboard.convert(res.data.noiDungKhac))
        }).catch((res) => {
            console.log(res);
        })
    }

    const getDieuTri = async () => {
        axios.get(`http://127.0.0.1:8000/dieutri/${params.maLa}/`)
            .then((res) => {
                const dieutri = res.data.map((r) => r.maBenh)
                setDieuTri(dieutri)
            })
    }

    const handleOnChangeDieuTri = async (maBenh) => {
        dieuTri.includes(maBenh) ? (
            setDieuTri(dieuTri.filter((d) => d !== maBenh))
        )
            : (
                setDieuTri([...dieuTri, maBenh])
            )
    }

    const updateDieuTri = async () => {
        const data = {
            'maLa': params.maLa,
            'maBenh': dieuTri
        }
        axios.post('http://127.0.0.1:8000/dieutri/update/', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
    }

    function onHandleChangeFile(){
        const file=hinhAnh.current.files[0]
        file.preview = URL.createObjectURL(file)
        setFile(file.preview)
    }

    useEffect(() => {
        getDieuTri()
        getLsBenh()
    }, [])

    return (
        <>
            <p className="bread">
                <span>Chỉnh sửa sản phẩm</span>
            </p>
            <div className='container'>

                <div className='row'>
                    <div className='col-2'>
                        <p>Hình ảnh</p>
                    </div>
                    <div className='col-6'>
                        <img style={{ maxHeight: 200, display: 'block' }} src={file} alt='' />
                        <input
                            onChange={() => onHandleChangeFile()}
                            style={{ margin: '10px 0 10px 0' }} type={"file"} ref={hinhAnh} />
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
                                <input onChange={() => handleOnChangeDieuTri(b.maBenh)} type={'checkbox'} style={{ margin: '0 5px' }}
                                    defaultChecked={dieuTri.some((d) => d === b.maBenh)}
                                />
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
                    <Link to={'/Manager/Product'}><button className='btn btn-cancel'>Huỷ</button>
                        <button className='btn-submit btn'
                            onClick={() => {
                                onUpdateLaThuoc()
                                updateDieuTri()
                            }}>Lưu</button>
                    </Link>
                </div>
            </div>

        </>
    )
}

export default UpdateProduct