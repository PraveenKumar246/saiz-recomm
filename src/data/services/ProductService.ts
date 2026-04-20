import type { ProductApiResponse } from '../../domain/models/types';

const BASE_URL = import.meta.env.VITE_SAIZ_API_BASE_URL;
const API_KEY = import.meta.env.VITE_SAIZ_API_KEY;

/**
 * ProductService
 * Single Responsibility: Handles all product-related API communication.
 * Refactored to use ES6 functional pattern.
 */
export const productService = {
  /**
   * Fetches product data for the widget by brand and product code.
   * @throws Error if the request fails or response is not ok.
   */
  getProductForWidget: async (
    brandCode: string,
    productCode: string,
    baseUrl: string = BASE_URL,
    apiKey: string = API_KEY
  ): Promise<ProductApiResponse> => {
    const url = `${baseUrl}/GetProductForWidget/${brandCode}/${productCode}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'SAIZ-API-KEY': apiKey,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch product: ${response.status} ${response.statusText}`
      );
    }

    const data: ProductApiResponse = await response.json();
    console.log(data)
    return data;
  },
};
