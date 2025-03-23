import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/fetch-user-data', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        const data = await response.json();
        if (!response.ok) {
            return NextResponse.json({message: data.message}, {status: response.status});
        }

        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ message: `Internal Server error ${e}` }, { status: 500 });
    }
}