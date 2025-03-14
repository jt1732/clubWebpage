import Link from 'next/link'
import React from 'react'

const NavBar = () => {
  return (
    <div>
      {/* Navigation bar setup */}
      <header>
        <nav className="navbar navbar-expand-lg bg-body-tertiary nav-pills">
            <div className="container-fluid">
                {/* Brand/logo for the navbar */}
                <Link className="navbar-brand me-4 mb-1" href="/">Jt</Link>
                {/* Button for toggling the navbar on smaller screens */}
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {/* Navigation links */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item me-4">
                            <Link className="nav-link btn light mb-1" aria-current="page" href="/">Home</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link btn light mb-1" href='/clubs/1'>Clubs</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className=" nav-link btn light mb-1" href='/events/1'>Events</Link>
                        </li>
                        <li className="nav-item me-4">
                            <Link className="nav-link btn light" href='/applications'>Apply</Link>
                        </li>
                        </ul>
                        {/* Navigation link for admin login */}
                        <div className="d-flex justify-content-center">
                            <Link className="btn btn-success me-4 mb-1 text-center" href='/login'>Admin</Link>
                        </div>

                        {/* Form to search for clubs, leaders, categories, or meeting days */}
                        <form className="d-flex" action={`/search`}>
                            <div className="input-group mb-1">
                                {/* Dropdown to select the search criteria */}
                                <select name="searchBy" defaultValue={'clubName'} className="form-select" aria-label="Search by">
                                    <option value="clubName">Search by</option>
                                    <option value="clubName">Clubs</option>
                                    <option value="clubModerator">Leaders</option>
                                    <option value="clubCategories">Category</option>
                                    <option value="clubEvents">Event Name</option>
                                </select>
                                {/* Input field for search query */}
                                <input className="form-control" type="search" placeholder="Search" aria-label="Search" name="action"></input>
                                {/* Button to trigger the search */}
                                <button className="btn btn-success" type="submit"  value="submit">Search</button>
                            </div>
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    </div>
  )
}

export default NavBar
