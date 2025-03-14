import { prisma } from '@/src/lib/db'
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import { adminLogout, deleteClub, sessionAuth } from '@/src/actions/actions';
import Link from 'next/link';

const AdminPage = async ({ params }: { params: any }) => {

  const { pageNum } = await params;
  const limit = 15
  const session = await sessionAuth()


  const clubs = await prisma.club.findMany({
    where: {
      application: false
    },
    select: {
      clubName: true,
      id: true,
      clubDescription: true,
      clubCategories: {
        select: {
          categoryName: true,
        },
      },
      clubEvents: {
        select: {
          eventDay: true,
          eventDescription: true,
          eventLocation: true,
          eventName: true,
        },
      },
      clubModerator: {
        select: {
          firstName: true,
          lastName: true,
        },
      },

    },

    take: limit,
    skip: (limit * (pageNum - 1))

  })

  if (!session) {
    return (
      <div>
        <h1 className='text-center'>Unauthorized</h1>
        <p className='text-center'>You do not have permission to view this page.</p>
        <Link href='/' className='btn btn-lg' style={{ display: 'flex', justifyContent: 'center' }}>Home</Link></div>
    );
  }

  return (
    <div>
      <div>
        <NavBar />
      </div>

      <div className="container-xxl my-custom-container mt-3">
      <Link className="btn btn-primary mb-4" style={{marginRight: '5px'}} href="/login/admin/createClub">Create New Club</Link>
      <Link className="btn btn-primary mb-4" style={{marginRight: '5px'}} href="/login/admin/createLeader">Create New Leader</Link>
      <Link className="btn btn-secondary mb-4" style={{marginRight: '5px'}} href="/login/admin/application/1">View Applications</Link>
      <button type="submit" className="btn btn-danger mb-4" style={{ marginRight: '5px' }} onClick={adminLogout}>Log out</button>

        <table className='table table-striped table-bordered'>

          <thead className='table-dark'>
              <tr>
              <th>Id</th>
              <th>Club Name</th>
              <th>Club Moderator</th>
              <th>Club Categories</th>
              <th>Club Description</th>
              <th>Club Events</th>
              <th>Action</th>
              </tr>
          </thead>

          {clubs.slice(0, limit).map((club, index) => (
            <tbody key={index}>
              <tr>
              <td>{club.id}</td>
              <td>{club.clubName}</td>
              <td>{club.clubModerator.firstName} {club.clubModerator.lastName}</td>
              <td>{club.clubCategories.map((category, index) => (
                <div key={index}>{category.categoryName}   </div>
              ))}</td>
              <td>{club.clubDescription}</td>
              <td>
                {club.clubEvents.map((event, index) => (
                  <div key={index}>{event.eventName}, {event.eventDescription}, {event.eventLocation}, {event.eventDay}</div>
                ))}
              </td>
              <td>
                <div>
                  <Link href={`/login/admin/edit/${club.id}`} className='btn btn-primary btn-sm' >Edit</Link>
                  <form action={deleteClub}>
                    <button type='submit' className='btn btn-danger btn-sm' value={club.id} name='clubId'>Delete</button>
                  </form>
                </div>
              </td>
              </tr>
            </tbody>
          ))}
        </table>

        {pageNum > 1 && <Link href={`/clubs/${pageNum - 1}`}>Previous page</Link>}
        {clubs.length == limit && <Link href={`/clubs/${pageNum + 1}`}>Next page</Link>}
      </div>
      <div>
        <Footer />
      </div>
    </div>

  )

}

export default AdminPage;