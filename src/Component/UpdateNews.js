import axios from 'axios';
import React, { useRef, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useQuill } from 'react-quilljs';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';

export const UpdateNews = () => {


    const { quill, quillRef } = useQuill();
    const params = useParams()
    const tieuDe = useRef()
    const hinhAnh = useRef()
    const [file, setFile] = useState()
    const navigate = useNavigate()

    React.useEffect(() => {
        if (quill) {
            getTinTuc()
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


    const getTinTuc = () => {
        axios.get(`http://127.0.0.1:8000/tintuc/${params.maTinTuc}/`)
            .then((res) => {
                tieuDe.current.value = res.data.tieuDe
                setFile(res.data.hinhAnh)
                quill.setContents(quill.clipboard.convert(res.data.noiDungKhac))
            }).catch((res) => {
                console.log(res)
            })
    }

    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D');
    }

    const onHandleUpdateTinTuc = () => {
        const data = {
            maTinTuc: removeAccents(tieuDe.current.value,),
            hinhAnh:hinhAnh.current.files[0],
            tieuDe: tieuDe.current.value,
            noiDungKhac: quill.root.innerHTML
        }
        axios.patch(`http://127.0.0.1:8000/tintuc/${params.maTinTuc}/`, data,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })
            .then((res) => {
                navigate('/Manager/News')
                toast.success('Cập nhật thành công')
            })
            .catch((res) => {
                toast.error('Cập nhật thất bại')
            })
    }

    function onHandleChangeFile(){
        const file=hinhAnh.current.files[0]
        file.preview = URL.createObjectURL(file)
        setFile(file.preview)
    }

    return (
        <>
            <p className="bread">
                <span>Chỉnh sửa tin tức</span>
            </p>
            <div className='container'>

                <div className='row'>
                    <div className='col-2'>
                        <p>Hình ảnh</p>
                    </div>
                    <div className='col-6'>
                        <img style={{ maxHeight: 200, display:'block' }} src={file}  alt='' />
                        <input
                        onChange={()=>onHandleChangeFile()}
                        style={{ margin:'10px 0 10px 0' }} type={"file"} ref={hinhAnh}/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Tiêu đề</p>
                    </div>
                    <div className='col-10'>
                        <textarea ref={tieuDe} />
                    </div>
                </div>

                <div>
                    <div>
                        <div ref={quillRef} style={{ height: '300px' }} />
                    </div>
                </div>

                <div className='row' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={'/Manager/News'}><button className='btn btn-cancel'>Huỷ</button></Link>
                    <button className='btn-submit btn' onClick={() => onHandleUpdateTinTuc()}>Lưu</button>
                </div>
            </div>
        </>
    )
}
