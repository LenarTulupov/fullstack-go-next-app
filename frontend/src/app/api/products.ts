import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    try {
        const response = await fetch('https://fullstack-go-next-app.onrender.com/products');
        const data = await response.json();

        if (response.ok) {
            return NextResponse.json(data);
        } else {
            return NextResponse.json({ message: 'Failed to fetch products' }, { status: response.status });
        }
    } catch (error) {
        return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
    }
}