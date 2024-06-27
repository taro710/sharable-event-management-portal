import { NextResponse, NextRequest } from 'next/server';

export const middleware = (req: NextRequest) => {
  const requestHeaders = new Headers(req.headers);
  requestHeaders.set('x-pathname', req.nextUrl.pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
};
