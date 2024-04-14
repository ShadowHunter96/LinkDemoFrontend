import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { confirm } from './Confirmation';
import JoditEditor from 'jodit-react';
import LinkChangesGrid from './LinkChangesGrid';


const EditLink = () => {
    let navigate = useNavigate();
    let { id } = useParams();

    const [link, setLink] = useState({
        name: '',
        url: '',
        description: '',
        availableInFirefox: false,
        availableInChrome: false,
        isActive: true,
        openInNewWindow: false
    });

    const editor = useRef(null);

    const [file, setFile] = useState(null);
    const [description, setDescription] = useState('');


    const onInputChange = (e) => {
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setLink({ ...link, [e.target.name]: value });
    };

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    useEffect(() => {
        
            loadLink(id);
    }, [id]);

    const loadLink = async (id) => {
        const result = await axios.get(`http://localhost:8081/links-api/link/${id}`);
        setLink(result.data);
        setDescription(result.data.description)
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(link)
        const updatedLink = { ...link, description };

        if (!updatedLink.name || !updatedLink.url || !updatedLink.description) {
            alert("Fill in all mandatory fields please...");
            return;
        }

        const formData = new FormData();
        formData.append('name', link.name);
        formData.append('url', link.url);
        formData.append('description', description);
        formData.append('availableInFirefox', link.availableInFirefox);
        formData.append('availableInChrome', link.availableInChrome);
        formData.append('isActive', link.isActive ?? 'false');
        formData.append('isActive', link.isActive);
        formData.append('openInNewWindow', link.openInNewWindow);

        if (file) {
            formData.append('image', file);
        }

        try {
            if (id) {
                await axios.put(`http://localhost:8081/links-api/update/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                });
            } 
            navigate('/');
        } catch (error) {
            console.error('Error saving link:', error);
        }
    };

    const deleteLink = async (linkId) => {
        const isConfirmed = await confirm('Are you sure you want to delete this link?', 'Yes', 'No');
        if (isConfirmed) {
          try {
            await axios.delete(`http://localhost:8081/links-api/delete/${linkId}`);
             navigate('/');
          } catch (error) {
            console.error('Error deleting the link:', error);
          }
        }
      };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center">{id ? 'Edit Link' : 'Add Link'}</h2>
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
                                value={link.description}
                                onChange={(newDescription) => setDescription(newDescription)}
                            />


                        </div>

                        <button type="submit" className="btn btn-outline-primary">
                            Submit
                        </button>

                        {id && (
                            <button type="button" className="btn btn-danger mx-2" onClick={() => deleteLink(link.id)}>Delete</button>
                        )}
                        <Link to="/" className="btn btn-outline-danger mx-2">
                            Cancel
                        </Link>

                        
                    </form>
                </div>
            </div>
            <LinkChangesGrid linkId={id}/>
        </div>
        
    );
};

export default EditLink;