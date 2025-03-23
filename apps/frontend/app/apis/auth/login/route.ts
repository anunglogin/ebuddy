import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const body = await req.json();
        const username = body.username;
        const password = body.password;

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL+'/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            cache: 'no-cache',
            body: JSON.stringify({email:username, password}),
        });
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({ message: data.message }, { status: response.status })
        }

        return NextResponse.json(data)
    } catch (e) {
        console.log(e)
        return NextResponse.json({ message: `Internal Server error ${e}` }, { status: 500 });
    }
}