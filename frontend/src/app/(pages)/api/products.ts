import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch('https://fullstack-go-next-app.onrender.com/products');
    const data = await response.json();

    if (response.ok) {
      res.status(200).json(data);
    } else {
      res.status(response.status).json({ message: 'Failed to fetch products' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}