export async function GET(request: Request) {
  const res = await fetch('https://fullstack-go-next-app.onrender.com/products');
  const data = await res.json();

  return new Response(JSON.stringify(data), {
    headers: {
      'Access-Control-Allow-Origin': 'https://fullstack-go-next-app-4.onrender.com',
    }
  });
}