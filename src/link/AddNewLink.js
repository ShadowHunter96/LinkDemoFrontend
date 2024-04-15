import React, { useState, useRef } from 'react';
import { Link, useNavigate, } from 'react-router-dom';
import axios from 'axios';
import JoditEditor from 'jodit-react';


const AddNewLink = () => {
    let navigate = useNavigate();


    const [link, setLink] = useState({
        name: '',
        url: '',
        description: '',
        availableInFirefox: false,
        availableInChrome: false,
        isActive: true,
        openInNewWindow: false,
        deleted: false
    });

    const editor = useRef(null);

    const [file, setFile] = useState(null);


    const onInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLink({ ...link, [e.target.name]: value });

    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const onEditorChange = (newDescription) => {
        setLink(prevLink => ({ ...prevLink, description: newDescription }));
    };




    const onSubmit = async (e) => {
        console.log(link)
        e.preventDefault();

        if (!link.name || !link.url || !link.description) {
            alert("Fill in all mandatory fields please...");
            return;
        }

        const formData = new FormData();
        Object.entries(link).forEach(([key, value]) =>
            formData.append(key, value)
        );

        if (file) {
            formData.append('image', file);
        }

        try {
            await axios.post('http://localhost:8081/links-api/save', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            navigate('/');
        } catch (error) {
            console.error('Error saving link:', error);
        }
    };


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center"> Add new Link</h2>
                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" name="name" value={link.name} onChange={onInputChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label">URL</label>
                            <input type="text" className="form-control" name="url" value={link.url} onChange={onInputChange} />
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" name="availableInFirefox" checked={link.availableInFirefox} onChange={onInputChange} />
                            <label className="form-check-label" htmlFor="availableInFirefox">Available in Firefox</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" name="availableInChrome" checked={link.availableInChrome} onChange={onInputChange} />
                            <label className="form-check-label" htmlFor="availableInChrome">Available in Chrome</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" name="isActive" checked={link.isActive} onChange={onInputChange} />
                            <label className="form-check-label" htmlFor="active">Is Active</label>
                        </div>
                        <div className="mb-3 form-check">
                            <input type="checkbox" className="form-check-input" name="openInNewWindow" checked={link.openInNewWindow} onChange={onInputChange} />
                            <label className="form-check-label" htmlFor="openInNewWindow">Open in New Window</label>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="image" className="form-label">Image</label>
                            <input
                                type="file"
                                className="form-control"
                                name="image"
                                onChange={onFileChange}
                            />
                        </div>

                        <div>
                            <p>Description</p>

                            <JoditEditor
                                ref={editor}
                                value={link.description} // Použijte description z link objektu
                                onChange={onEditorChange} // Aktualizujte stav pomocí této funkce
                            />

                        </div>
                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>
                        <Link to="/" className="btn btn-outline-danger mx-2">
                            Cancel
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddNewLink;