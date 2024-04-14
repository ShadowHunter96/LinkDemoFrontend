import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import { confirm } from './Confirmation';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


const LinksGrid = () => {
  const [links, setLinks] = useState([])
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
    loadLinks();
  }, [])

  const loadLinks = async () => {
    const result = await axios.get("http://localhost:8081/links-api/links/active")
    setLinks(result.data)
  }

  const deleteLink = async (linkId) => {
    confirm('Are you sure you want to delete this link?', 'Yes', 'No')
      .then(async (result) => {
        if (result) {
          try {
            await axios.delete(`http://localhost:8081/links-api/delete/${linkId}`);
            setLinks(currentLinks => currentLinks.filter(link => link.id !== linkId));
            navigate('/');
          } catch (error) {
           console.error('Error deleting the link:', error);
          }
        }
      });
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Links List</h1>
        <Link className="btn btn-success my-2" to="/addnewlink">Add New Link</Link>
        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">URL</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {links.map((link, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{link.name}</td>
                <td>{link.url}</td>
                <td>
                <Link className="btn btn-outline-primary mx-2" to={`/editlink/${link.id}`}>Edit</Link>
                <button className="btn btn-danger mx-2" onClick={() => deleteLink(link.id)}>Delete</button>
              </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LinksGrid;
