import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div>
        <footer>
            <div className="container"> 
                {/* Start of footer container */}
                    {/* Row containing footer elements, styled with Bootstrap classes */}
                    <footer className="row row-cols-2 py-3 my-3 border-top">
                        <div className="col mb-3 mt-3">
                            {/* Link with SVG logo. Could represent the site's main branding or homepage link */}
                            <Link href="/" className="d-flex align-items-center mb-3 link-body-emphasis text-decoration-none">
                                <svg className="bi me-2" width="40" height="32">
                                    <use href="#bootstrap"></use>
                                </svg>
                            </Link>
                            {/* Displaying an image logo for the college */}
                            <img src="/logo.png" alt="Jt logo"></img>
                        </div>


                        {/* Nested footer section for links and copyright */}
                        <footer className="py-3 my-4">
                            {/* Navigation links in the footer */}
                            <ul className="nav justify-content-center border-bottom pb-3 mb-3">
                                <li className="nav-item"><Link href="/" className="nav-link px-2 text-body-secondary">Jt Clubs Page</Link></li>
                            </ul>


                            {/* Copyright section */}
                            <p className="text-center text-body-secondary">© Jacob Turnbull 2025 | Created by Jacob Turnbull</p>


                            {/* Bootstrap attribution */}
                            <p className="text-center text-body-secondary">Bootstrap design components used under the <Link href="https://getbootstrap.com/docs/5.0/about/license/" target="_blank" rel="noopener noreferrer">MIT license</Link>.</p>
                        </footer>

                    </footer> {/* End of main footer section */}

                </div> {/* End of footer container */}
        </footer>
    </div>
  )
}

export default Footer
