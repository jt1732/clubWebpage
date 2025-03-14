"use server";
import { prisma } from "../lib/db";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { jwtVerify, SignJWT } from "jose";
import { NextRequest, NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function addleader(formData:FormData) {

  const newLeader = await prisma.leader.create({

    data: {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,

    }
  })

  redirect('/login/admin/1')
  
}

export async function createClub(formData: FormData) {
  try{        
      const modId = parseInt(formData.get('clubModerator') as string, 10);

      const newClub = await prisma.club.create({
      
          data: {          
              clubName: formData.get('clubName') as string,
              clubModerator: {
                  connect: {id: modId},
              },
              clubDescription: formData.get('clubDescription') as string,   
              application: false,

          }
      })

      await Promise.all(
          formData.getAll('clubCategories').map(async (category) => {
            return prisma.category.create({
              data: {
                categoryName: category as string,
                club: {
                  connect: { id: newClub.id },
                },
              },
            });
          })
        );

        await Promise.all(
          formData.getAll('eventDay').map(async (day,index) => {

              const name = formData.getAll('eventName') as string[]
              const description = formData.getAll('eventDescription') as string[]
              const location = formData.getAll('eventLocation') as string[]

              return prisma.event.create({
                  data: { 
                      eventName: name[index],
                      eventLocation: location[index],
                      eventDescription: description[index],
                      eventDay: day,
                      club: {
                          connect: { id: newClub.id },
                        },

              },
              });
          })
          );

  } catch(error){
      console.log(error)
  }

}

export async function createClubApplication(formData: FormData) {
    try{        
        const modId = parseInt(formData.get('clubModerator') as string, 10);

        const newClub = await prisma.club.create({
        
            data: {          
                clubName: formData.get('clubName') as string,
                clubModerator: {
                    connect: {id: modId},
                },
                clubDescription: formData.get('clubDescription') as string,   
                application: true,

            }
        })

        await Promise.all(
            formData.getAll('clubCategories').map(async (category) => {
              return prisma.category.create({
                data: {
                  categoryName: category as string,
                  club: {
                    connect: { id: newClub.id },
                  },
                },
              });
            })
          );

          await Promise.all(
            formData.getAll('eventDay').map(async (day,index) => {

                const name = formData.getAll('eventName') as string[]
                const description = formData.getAll('eventDescription') as string[]
                const location = formData.getAll('eventLocation') as string[]

                return prisma.event.create({
                    data: { 
                        eventName: name[index],
                        eventLocation: location[index],
                        eventDescription: description[index],
                        eventDay: day,
                        club: {
                            connect: { id: newClub.id },
                          },

                },
                });
            })
            );

    } catch(error){
        console.log(error)
    }

}

const secretKey = 'loginAuthClub'
const key = new TextEncoder().encode(secretKey)

export async function encrypt(payload:any) {
  return await new SignJWT(payload)
    .setProtectedHeader({alg: 'HS256'})
    .setIssuedAt(Date.now())
    .setExpirationTime('600 sec from now')
    .sign(key)
  
}

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jwtVerify(input, key, {
    algorithms: ['HS256']
  })
  return payload
  
}

export async function adminLogout() {
  (await cookies()).delete('session')
  redirect('/')

}

export async function acceptClub(formData: FormData) {

  const clubId = parseInt(formData.get('clubId') as string || '0', 10);
  const clubs = await prisma.club.update({
    where : {
      id: clubId ,
    },
    data: {
      application: false,
    }
    
  })

  redirect('/login/admin/1')

}

export async function deleteClub(formData: FormData) {

  const clubId = parseInt(formData.get('clubId') as string || '0', 10);
  const clubs = await prisma.club.delete({
    where : {
      id: clubId ,
    }, 
  })

  redirect('/login/admin/1')

}

export async function adminLogin(formData: FormData) {
  const password = formData.get('password') as string
  const user = await prisma.adminLogin.findFirst({
    where: {
      username: formData.get('username') as string,
    },
    select: {
      username: true,
      hashedPassword: true,
    }
  })

  const isPasswordCorrect = await bcrypt.compare(password, user?.hashedPassword ?? "");
  if (isPasswordCorrect){
    const session = await encrypt({user})
    const expires = new Date(Date.now() + 600 * 1000)
    await (await cookies()).set('session', session, {expires, httpOnly: true})
    redirect("/login/admin/1")
  } else {
  }
}

export async function updateSession(request:NextRequest) {
  const session = request.cookies.get('session')?.value
  if (!session) return

  const parsed = await decrypt(session)
  parsed.expires = new Date(Date.now() + 600 * 1000 )
  const res = NextResponse.next()
  res.cookies.set({
    name: 'session',
    value: await encrypt(parsed),
    httpOnly: true,
    expires: parsed.expires
  })

  return res
}

export async function sessionAuth() {
  const session = (await cookies()).get('session')?.value
  if (!session) return
  return await decrypt(session);
  
}