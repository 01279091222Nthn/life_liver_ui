import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { render } from '@testing-library/react';


const thumbsContainer = {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16
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
    boxSizing: 'border-box'
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



const Predition = () => {

    const [files, setFiles] = useState([]);
    const [result,setResult] =useState();
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
                         saveClipboard()
                        }}
                />
            </div>
        </div>
    ));

    const saveClipboard = () =>{
        files.map(f => {
            let formData = new FormData()
            formData.append('file', f)
            const res =  axios({
                method: "post",
                url: "http://127.0.0.1:8000/clipboard/",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" }
            })
        })
    }

    const predict = async () =>{
        const res = await axios.get("http://127.0.0.1:8000/predict/");
        setResult(res.data.length);
    }

    useEffect(() => {
        // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
        return () => {
            files.forEach(file => {
                URL.revokeObjectURL(file.preview)
            });
        }
    }, []);

    return (
        <section className="container">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            <aside style={thumbsContainer}>
                {thumbs}
            </aside>
            <button onClick={() => predict()}>kjio</button>
        </section>
    );

}


export default Predition;


