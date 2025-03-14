"use client";

import React from 'react'
import { prisma } from '@/src/lib/db'
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const Search = async () => {

    

    const searchParams = useSearchParams();
    const searchBy = searchParams.get('searchBy')
    const action = searchParams.get('action')?? ""
    console.log(searchBy)
    console.log(action)
    const limit = 15
    let whereCondition = {}
    
    if (searchBy == 'clubModerator'){
        whereCondition ={
            application: false,
            clubModerator: {
                OR: [
                    { firstName: { contains: action } },
                    { lastName: { contains: action } }
                  ]
            },
        }
    } else if (searchBy == 'clubCategories'){
        whereCondition ={
            application: false,
            clubCategories: {
                some: {
                    categoryName: {
                        contains: action,
                    },
                }   
            },
        }
    } else if (searchBy == 'clubEvents'){
        whereCondition ={
            application: false,
            clubEvents: {
                some: {
                    OR: [
                        { eventDescription: { contains: action } },
                        { eventName: { contains: action } }
                      ]
                },
            } 
        }

    } else {
        whereCondition ={
            application: false,
            clubName: {
                contains: action, 
            },
        }
    }

    const results = await prisma.club.findMany({
        where: whereCondition,
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
        take: limit     
    
    });

  return (
    <div>
      <div>
        <NavBar />
      </div>
       <div>
       <div className="container">
        <p className='mt-3'>Clubs displayed: {results.length}</p>
        <div className="row">
            {results.slice(0, limit).map((result, index) => (
                <React.Fragment key={result.id}>
                {index % 3 == 0 && <div className="w-100"></div>}

                <div className="col-6 col-lg-4 mt-3 mb-5">
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h3 className="card-title">{result.clubName}</h3>
                            <h6 className="card-subtitle mb-2 text-muted">Moderator: {result.clubModerator.firstName} {result.clubModerator.lastName}</h6>
                            <p className="card-text">{result.clubDescription}</p>
                            <Link className="card-link btn btn-primary" href={`/clubdetails/${result.id}`} >View Club Details</Link>
                        </div>
                    </div>
                </div>

            </React.Fragment>
            ))}
        </div>
      </div>
       </div>
      <div>
        <Footer />
      </div>
    </div>
        
  )
}

export default Search;

