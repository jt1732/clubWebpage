import { addleader, adminLogout, sessionAuth } from '@/src/actions/actions';
import NavBar from '@/app/components/NavBar';
import Footer from '@/app/components/Footer';
import Link from 'next/link';

const CreateClub = async ({ }) => {

    const session = await sessionAuth()

    if (!session) {
        return (
            <div>
            <h1 className='text-center'>Unauthorized</h1>
            <p className='text-center'>You do not have permission to view this page.</p>
            <Link href='/' className='btn btn-lg' style={{ display: 'flex', justifyContent: 'center' }}>Home</Link></div>
        );
        }
    
  else {
    return (
        <div>
        <div>
            <NavBar />
        </div>
            <div className="mt-3">
            <Link className="btn btn-primary mb-4" style={{marginRight: '5px'}} href="/login/admin/createClub">Create New Club</Link>
            <Link className="btn btn-primary mb-4" style={{marginRight: '5px'}} href="/login/admin/createLeader">Create New Leader</Link>
            <Link className="btn btn-secondary mb-4" style={{marginRight: '5px'}} href="/login/admin/application/1">View Applications</Link>
            <button type="submit" className="btn btn-danger mb-4" style={{ marginRight: '5px' }} onClick={adminLogout}>Log out</button>
            </div>
            <div>

            <form action={addleader}>
                    <div className="mb-3">
                        <label  className="form-label">First name</label>
                        <input type="text" className="form-control" id="firstName" name="firstName" required maxLength={32}></input>
                        <div id="firstNameInfo" className="form-text">Maximum of 32 characters.</div>
                    </div>
                    <div className="mb-3">
                        <label  className="form-label">Last name</label>
                        <input type="text" className="form-control" id="lastName" name="lastName" required maxLength={32}></input>
                        <div id="lastNameInfo" className="form-text">Maximum of 32 characters.</div>
                    </div>
                    <input type="hidden" name="action" value="create"></input>
                    <button type="submit" className="btn btn-success mb-5 mt-3">Save</button>
                </form>


            </div>
        <div>
            <Footer />
        </div>
        </div>
    )
    }
}

export default CreateClub
