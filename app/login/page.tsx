"use client";

import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { adminLogin, sessionAuth } from '@/src/actions/actions';
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation"

const Login = () => {

  const [session, setSession] = useState();
  const router = useRouter();

  useEffect(() => {
    async function checkSession() { 
    const res = await sessionAuth();
      if (res) {
        router.push("/login/admin/1"); 
      } else {
        setSession(res);
      }
    }
    checkSession();
  }, [])

    return (
      <div>
        <div>{session}</div>
        <div>
          <NavBar />
        </div>
      
      <div className="container-md my-5">
        <h1 className="mb-5">Admin Login</h1> 
        <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

        <form action={adminLogin}>

            <div className="form-floating">
            <input type="text" className="form-control" name="username" placeholder="example" required></input>
            <label htmlFor="floatingInput">Username</label>
            </div>

            <div className="form-floating">
              <input type="password" className="form-control" name="password" placeholder="Password" required></input>
              <label htmlFor="floatingPassword">Password</label>
            </div>

            <button className="mt-4 w-100 btn btn-lg btn-primary"  type='submit'>Sign in</button>
        
        </form>
      
      </div>



        <div>
          <Footer />
        </div>
      </div>
          
    )
  }

export default Login;

