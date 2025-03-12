import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import randomInteger from 'random-int'

const prisma = new PrismaClient();

export async function GET(req: Request) {

    try {

        const { searchParams } = new URL(req.url);
        const query = searchParams.get('query') || '';

        if (query == ''){
            
            const leaderCount = await prisma.leader.count()

            const leaders = await prisma.leader.findMany({
                take: 5, 
                skip: (leaderCount > 5) ? randomInteger(0, leaderCount - 1) : 0
                
            })


            return NextResponse.json(leaders);

        } else {

                const leaders = await prisma.leader.findMany({
                    where: {
                        OR: [
                            {
                              firstName: {
                                contains: query
                              },
                            },
                            { 
                                lastName: {
                                    contains: query
                                  },
                            },
                          ],
                    },
                    take: 5,
                });

                return NextResponse.json(leaders);

            
        }
    } catch (error) {
        console.error('Error fetching leaders:', error);
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}
