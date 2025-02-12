import { API_ENDPOINTS } from "@/constants/api-endpoints";
import { URL } from "@/constants/url";

export async function fetchProducts() {
  try {
    const res = await fetch(`${URL}${API_ENDPOINTS.PRODUCTS}`);
    
    if (!res.ok) {
      throw new Error('Failed to fetch products' + res.statusText);
    }

    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error in fetchProducts:", error);
    throw error;
  }
}