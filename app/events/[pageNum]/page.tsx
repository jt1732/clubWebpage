/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import NavBar from '../../components/NavBar'
import Footer from '../../components/Footer'
import { prisma } from '@/src/lib/db'
import Link from 'next/link'

const EventPage = async ({params} : { params: any}) => {
  const { pageNum } = await params;
  const limit = 15

    const events = await prisma.event.findMany({
        where: {
            club: {
              application: false,
            }
            },
        
            select: {
              eventDay: true,
              eventDescription: true,
              eventLocation: true,
              eventName: true,
              club: {
                select: {
                  id: true,
                  clubName: true,
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
        <p className='mt-3'>Events displayed: {events.length}</p>
        <div className="row">
            {events.slice(0, limit).map((event, index) => (
                <React.Fragment key={event.club.id}>
                {index % 3 == 0 && <div className="w-100"></div>}

                <div className="col-6 col-lg-4 mt-3 mb-5">
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h3 className="card-title">{event.club.clubName}</h3>
                            <h6 className="card-subtitle mb-3 text-muted">Event: {event.eventName}</h6>
                            <p className="card-subtitle mb-4 text-muted">{event.eventDescription} <br /> Location: {event.eventLocation} <br/> Day: {event.eventDay}</p>
                            <Link className="card-link btn btn-primary" href={`/clubdetails/${event.club.id}`} >View Club Details</Link>
                        </div>
                    </div>
                </div>

            </React.Fragment>
            ))}

            {pageNum > 1  && <Link href={`/events/${pageNum - 1}`}>Previous page</Link>}
            {events.length == limit && <Link href={`/events/${pageNum + 1}`}>Next page</Link>}

        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )
}

export default EventPage
