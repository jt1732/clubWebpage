import React from 'react'
import NavBar from './components/NavBar'
import { prisma } from '@/src/lib/db'
import randomInteger from 'random-int';
import Footer from './components/Footer';

const IndexSchoolClub = async () => {


  const clubCount = await prisma.club.count()
  
  const clubs = await prisma.club.findMany({
    
    where: {
      application: false
    },

    select: {
      id: true,
      clubName: true,
      clubDescription: true,
    },
    
    take: 3, 
    skip: (clubCount > 3) ? randomInteger(0, clubCount - 1) : 0

  });
  
  return (
    <div>
      <div>
        <NavBar></NavBar>
      </div>
      <div>
        {/* Hero section with a background image and text overlay */}
        <div className="container-md my-5 position-relative">
          {/* Background image for the hero section */}
          <img src="/hero-background.jpg" className="img-fluid border rounded" alt="school image"></img>
          {/* Text overlay for the hero section */}
          <div className="position-absolute text-shadow text-center top-50 start-50 translate-middle">
            <h1 style={{fontSize: "calc(1.1rem + 1vw)"}} className="display-4 text-white"><strong>Welcome to {"Jt's"} Club/Group Website</strong></h1>
            <h3 style={{fontSize: "calc(0.5rem + 1vw)"}} className="text-white">Your source for information about clubs and groups.</h3>
          </div>
        </div>
      </div>
      <div>
      <div className="container-md my-5">
        <h2>Featured Clubs</h2>
        {/* Carousel for showing multiple featured clubs */}
        <div id="carouselExampleIndicators" className="carousel carousel-dark slide">
        <ol className="carousel-indicators">
          {clubs.map((_,index) => (
            <li
                key={index} 
                style={{ listStyle: "none", color: 'black' }}
                data-bs-target="#carouselExampleIndicators" 
                data-bs-slide-to={index} 
                className={index === 0 ? "active" : ""} >
            </li>
          ))}
        </ol>
          <div className="carousel-inner">
            {/* Carousel items go here */}
            {clubs.map((club,index) => (
            <div key={club.id} className={`carousel-item ${index === 0 ? "active" : ""}`} style={{ backgroundColor: "#F8F9FA", height: "300px" }}>
              <div className='carousel-caption d-flex h-100 justify-content-center'>
                <div className='d-flex flex-column justify-content-center text-dark'>
                  <h5>{club.clubName}</h5>
                  <p>{club.clubDescription}</p>
                </div>
              </div>
            </div>
            ))}
          </div>
          <div>
              <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="sr-only">Previous</span>
              </a>
              <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="sr-only">Next</span>
              </a>
          </div>
        </div> 
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
        
  )
}

export default IndexSchoolClub;

