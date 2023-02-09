import axios from 'axios';
import React, { useRef } from 'react'
import { toast } from 'react-hot-toast';
import { useQuill } from 'react-quilljs';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

export const AddLiver = () => {

    const { quill, quillRef } = useQuill();
    const tenBenh = useRef()
    const hinhAnh = useRef()
    const navigate = useNavigate()

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

    function removeAccents(str) {
        return str.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
    }

    const onHandleAddBenhGan = () => {
        const date = new Date()
        date.setHours(date.getHours() - 7);
        const data = {
            maBenh: removeAccents(tenBenh.current.value),
            hinhAnh: hinhAnh.current.files[0],
            tenBenh: tenBenh.current.value,
            noiDungKhac: quill.root.innerHTML,
        }
        console.log(data);
        axios.post('http://127.0.0.1:8000/benhgan/', data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then((res) => {
                navigate('/Manager/Liver')
                toast.success('Thêm thành công');
            })
            .catch((res) => {
                toast.error('Thêm thất bại');
            })
    }

    return (
        <div>
            <p className="bread">
                <span>Thêm bệnh gan</span>
            </p>
            <div className='container'>

                <div className='row'>
                    <div className='col-2'>
                        <p>Hình ảnh</p>
                    </div>
                    <div className='col-10'>
                        <input type={"file"} ref={hinhAnh} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-2'>
                        <p>Tên bệnh</p>
                    </div>
                    <div className='col-10'>
                        <textarea ref={tenBenh} />
                    </div>
                </div>

                <div>
                    <div>
                        <div ref={quillRef} style={{ height: '300px' }} />
                    </div>
                </div>

                <div className='row' style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Link to={'/Manager/Liver'}><button className='btn btn-cancel'>Huỷ</button></Link>
                    <button className='btn-submit btn' onClick={() => onHandleAddBenhGan()}>Thêm</button>
                </div>
            </div>
        </div>
    )
}
