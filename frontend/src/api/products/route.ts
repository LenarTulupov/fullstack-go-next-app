import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://fullstack-go-next-app.onrender.com/products');
    
    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }
    
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}