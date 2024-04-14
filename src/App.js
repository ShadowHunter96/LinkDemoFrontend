
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './layout/Navbar';
import Home from './pages/Home.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditLink from './link/EditLink.js';
import LinksGrid from './link/LinksGrid.js';
import LinkPreview from './link/LinkPreview.js';
import AddNewLink from './link/AddNewLink.js';


function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/editlink/:id" element={<EditLink/>}></Route>
        <Route exact path="/linksgrid" element={<LinksGrid/>}></Route>
        <Route exact path="/linkspreview" element={<LinkPreview/>}></Route>
        <Route exact path="/addnewlink" element={<AddNewLink/>}></Route>
      </Routes>


      

      </Router>
      
    </div>
  );
}

export default App;
