import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { confirm } from './path/to/your/confirmFunction'; // Cesta k vaší confirm funkci

const LinkForm = () => {
  let { id } = useParams();
  let navigate = useNavigate();

  // Funkce pro smazání odkazu
  const deleteLink = async () => {
    confirm('Are you sure you want to delete this link?', 'Yes', 'No').then(
      async (result) => {
        if (result) {
          try {
            await axios.delete(`http://localhost:8081/api/links/delete/${id}`);
            navigate('/'); // Přesměrujte uživatele po úspěšném smazání
          } catch (error) {
            console.error('There was an error deleting the link:', error);
            // Zde byste měli zpracovat chybu, například zobrazit uživatelské upozornění
          }
        }
      }
    );
  };

  // Zde bude vaše logika formuláře

  return (
    <div>
      {/* Vaše ostatní formové prvky */}
      {id && (
        <button type="button" className="btn btn-danger" onClick={deleteLink}>
          Delete
        </button>
      )}
      {/* Další prvky UI */}
    </div>
  );
};

export default LinkForm;
