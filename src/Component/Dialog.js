import axios from "axios";
import React, { useState, useEffect, useContext, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Link } from "react-router-dom";
import { Context } from "../Store/Provider";

const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
};

const thumb = {
    display: 'inline-flex',
    borderRadius: 2,
    border: '1px solid #eaeaea',
    marginBottom: 8,
    marginRight: 8,
    width: 100,
    height: 100,
    padding: 4,
    boxSizing: 'border-box',
};

const thumbInner = {
    display: 'flex',
    minWidth: 0,
    overflow: 'hidden'
};

const img = {
    display: 'block',
    width: 'auto',
    height: '100%'
};

const Dialog = () => {

    const [files, setFiles] = useState([]);
    const { setResult } = useContext(Context)
    const [option, setOption] = useState(1)
    const videoRef = useRef(null)
    const photoRef = useRef(null)
    const [file, setFile] = useState(false)

    const getUserCamera = () => {
        if (videoRef.current === null) {
            navigator.mediaDevices.getUserMedia({
                video: {
                    height: 800,
                    width: 800
                }
            })
                .then((stream) => {
                    videoRef.current.srcObject = stream
                    videoRef.current.play()
                })
                .catch((error) => {
                    console.log(error);
                })
        }
        setFile(false)
    }

    const stopUserCamera = () => {
        if (videoRef.current !== null) {
            const stream = videoRef.current.srcObject
            stream.getTracks().forEach((track) => {
                track.stop();
            });
            videoRef.current.srcObject = null;
        }
    };

    const takePhoto = () => {
        let video = videoRef.current
        let photo = photoRef.current

        photo.width = 800;
        photo.height = 720;

        photo.getContext('2d').drawImage(video, 0, 0, photo.width, photo.height);

        photo.toBlob((blob) => {
            const file = new File([blob], "image.png");
            const dT = new DataTransfer();
            dT.items.add(file);
            console.log([dT.files[0]]);
            setFiles([dT.files[0]])
        });
        setFile(true)
    }


    const detection = () => {
        var image = new FormData();
        files.map((f) => {
            image.append("file", f)
        })
        axios.post("http://127.0.0.1:8000/predict/", image, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then((res) => {
            setResult(res.data)
        });
    }

    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': []
        },
        onDrop: acceptedFiles => {
            setFiles(acceptedFiles.map(file => Object.assign(file, {
                preview: URL.createObjectURL(file)
            })));
        }
    });

    const thumbs = files.map(file => (
        <div style={thumb} key={file.name}>
            <div style={thumbInner}>
                <img
                    src={file.preview}
                    style={img}
                    onLoad={() => {
                        URL.revokeObjectURL(file.preview)
                    }}
                />
            </div>
        </div>
    ));

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => {
            files.forEach(file => {
                URL.revokeObjectURL(file.preview)
            });
        }
    }, []);


    return (
        <div id="detection" className="modal fade" role="dialog">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={() => setFiles([])}>&times;</button>
                    </div>
                    <div className="modal-body">
                        <div className="camera-img-option">
                            <button
                                onClick={() => {
                                    setOption(1)
                                    stopUserCamera()
                                }}
                                className="btn" style={option === 1 ? { backgroundColor: 'lightgray' } : {}}>
                                <i class="bi bi-card-image"></i>
                            </button>
                            <button
                                onClick={() => {
                                    setOption(0)
                                    getUserCamera()
                                }}
                                className="btn"
                                style={option === 0 ? { backgroundColor: 'lightgray' } : {}}>
                                <i class="bi bi-camera"></i>
                            </button>
                        </div>
                        {
                            option === 0 ?
                                <div className="container" style={{textAlign:'center'}}>
                                    <video className="container" style={file === true ? { display: 'none' } : { display: 'unset' }} ref={videoRef}></video>
                                    <canvas className="container" style={file === false ? { display: 'none' } : { display: 'unset' }} ref={photoRef} />
                                    <button
                                    className="cam-btn"
                                    onClick={() => takePhoto()}>
                                        <i class="bi bi-camera"></i>
                                    </button>
                                    <button 
                                    className="cam-btn"
                                    onClick={() => getUserCamera()}>
                                        <i class="bi bi-arrow-clockwise"></i>
                                    </button>
                                </div>
                                : <section className="container">
                                    <div style={{ height: '100px', padding: '10px', color: 'gray', border: '2px dashed lightgray', borderRadius: '8px', textAlign: 'center' }} {...getRootProps({ className: 'dropzone' })}>
                                        <input {...getInputProps()} />
                                        <p>Thả ảnh hoặc nhấn vào đây để chọn</p>
                                        <i class="bi bi-upload"></i>
                                    </div>
                                    <aside style={thumbsContainer}>
                                        {thumbs}
                                    </aside>
                                </section>
                        }
                    </div>
                    <div className="modal-footer">
                        <Link to={'/Predict'} className='link'>
                            <button className='btn btn-submit' data-toggle="modal" data-target="#detection"
                                onClick={() => {
                                    detection()
                                }}>Tìm kiếm</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dialog;