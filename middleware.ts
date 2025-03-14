import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { updateSession } from './src/actions/actions'
 
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}