/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { prisma } from '@/src/lib/db'
import Link from 'next/link'

const ClubPage = async ({params} : { params: any}) => {
  const { pageNum } = await params;
  const limit = 15

    const clubs = await prisma.club.findMany({
        where: {
              application: false
            },
        
            select: {
              id: true,
              clubName: true,
              clubDescription: true,
              clubModerator: {
                select: {
                  firstName: true,
                  lastName: true,
                },
              },
            },
            
            take: limit, 
            skip: (limit * (pageNum -1))
    })
  return (
    <div>
      <div>
        <NavBar />
      </div>
      <div className="container">
        <p className='mt-3'>Clubs displayed: {clubs.length}</p>
        <div className="row">
            {clubs.slice(0, limit).map((club, index) => (
                <React.Fragment key={club.id}>
                {index % 3 == 0 && <div className="w-100"></div>}

                <div className="col-6 col-lg-4 mt-3 mb-5">
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h3 className="card-title">{club.clubName}</h3>
                            <h6 className="card-subtitle mb-2 text-muted">Moderator: {club.clubModerator.firstName} {club.clubModerator.lastName}</h6>
                            <p className="card-text">{club.clubDescription}</p>
                            <a className="card-link btn btn-primary" href="clubDetails.php?id=" >View Club Details</a>
                        </div>
                    </div>
                </div>

            </React.Fragment>
            ))}

            {pageNum > 1  && <Link href={`/clubs/${pageNum - 1}`}>Previous page</Link>}
            {clubs.length == limit && <Link href={`/clubs/${pageNum + 1}`}>Next page</Link>}

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default ClubPage
