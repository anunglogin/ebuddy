import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse> {
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const id = req.nextUrl.searchParams.get('id') ?? '';
        let url = process.env.NEXT_PUBLIC_BASE_URL + '/users/fetch-user-data';
        if (id !== '') {
            url = process.env.NEXT_PUBLIC_BASE_URL + '/users/detail-user-data/'+id;
        }
        const response = await fetch(url, {
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

export async function POST(req: NextRequest): Promise<NextResponse> {
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const body = await req.json();

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/create-user-data', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: body.name,
                email: body.email,
                password: body.password,
                totalAverageWeightRatings: body.totalAverageWeightRatings,
                numberOfRents: body.totalNumberOfRent
            })
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

export async function PUT(req: NextRequest): Promise<NextResponse> {
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const body = await req.json();
        const id = req.nextUrl.searchParams.get('id') ?? '';

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/update-user-data/'+id, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: body.name,
                email: body.email,
                totalAverageWeightRatings: body.totalAverageWeightRatings,
                totalNumberOfRents: body.totalNumberOfRents
            })
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

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    try {
        const token = req.headers.get('Authorization');
        if (!token) {
            return NextResponse.json({error: 'Unauthorized'}, {status: 401});
        }
        const id = req.nextUrl.searchParams.get('id') ?? '';

        const response = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/users/delete-user-data/'+id, {
            method: 'DELETE',
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