
import { prisma } from "@/src/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  const clubId = parseInt(params.id, 10);
  console.log(clubId)
  const club = await prisma.club.findUnique({
  
          select: {
              clubDescription: true,
              clubName: true,
  
              clubCategories: {
                  select: {
                      categoryName: true,
                  },
              },
              clubEvents: {
                  select: {
                      eventName: true,
                      eventDescription: true,
                      eventLocation: true,
                      eventDay: true,
                  },
              },
              clubModerator: {
                  select: {
                      firstName: true,
                      lastName: true,
                  },
              },
          },
          where: {
              id: clubId,
              application: false,
          },
  
      });

  console.log(club)
  return NextResponse.json(club);
}
