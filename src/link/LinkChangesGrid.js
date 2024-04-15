import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import HTMLReactParser from 'html-react-parser/lib/index';


const LinkChangesGrid = ({ linkId }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/links-api/${linkId}/history`);
        setHistory(response.data);
        console.log(response)
      } catch (error) {
        console.error('Error fetching link history:', error);
      }
    };

    fetchHistory();
  }, [linkId]);


  return (
    <table className="table">
      <thead>
        <tr>

          <th scope="col">Revision Type</th>
          <th scope="col">Date</th>
          <th scope="col">Name</th>
          <th scope="col">URL</th>
          <th scope="col">Description</th>
          <th scope="col">Available in Firefox</th>
          <th scope="col">Available in Chrome</th>
          <th scope="col">Is Active</th>
          <th scope="col">Open in New Window</th>
          <th scope="col">Deleted</th>
        </tr>
      </thead>
      <tbody>
        {history.map((item, index) => (
          <tr key={item.revisionDate}>
            <th scope="row">{item.revisionType}</th>
            <td>{item.revisionDate}</td>
            <td>{item.name}</td>
            <td>{item.url}</td>
            <td>{ HTMLReactParser(item.description) }</td>
            <td>{item.availableInFirefox ? 'Yes' : 'No'}</td>
            <td>{item.availableInChrome ? 'Yes' : 'No'}</td>
            <td>{item.active ? 'Yes' : 'No'}</td>
            <td>{item.openInNewWindow ? 'Yes' : 'No'}</td>
            <td>{item.deleted ? 'Yes' : 'No'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LinkChangesGrid;

