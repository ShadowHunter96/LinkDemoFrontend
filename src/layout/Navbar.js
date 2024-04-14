import React from "react";
import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">Unicorn University</Link>
        <form className="d-flex" role="search">
          <Link className="btn btn-success mx-2" to="/">Home</Link>
          <Link className="btn btn-success mx-2" to="/linksgrid">linksgrid</Link>
          <Link className="btn btn-success mx-2" to="/linkspreview">linkspreview</Link>
          <Link className="btn btn-success mx-2" to="/addnewlink">Add new Link</Link>
        </form>
      </div>
    </nav>
  )
}