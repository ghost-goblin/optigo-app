import { createApi } from '@reduxjs/toolkit/query/react'
import axios from 'axios'


const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: '' }) =>
  async ({ url, method, data, params, headers }) => {
    try {
      const result = await axios({
        url: baseUrl + url,
        method,
        data,
        params,
        headers,
      })
      return { data: result.data }
    } catch (axiosError) {
      const err = axiosError
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      }
    }
  };


export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: axiosBaseQuery({
        baseUrl: `https://${process.env.REACT_APP_SHOPIFY_STORE_URL}/api/2024-04/graphql.json`,
      }),
      endpoints(build) {
        return {
          query: build.query({ 
            query: () => ({ 
            url: '', 
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Storefront-Access-Token': `${process.env.REACT_APP_SHOPIFY_ACCESS_TOKEN}`,
              },
            method: 'POST',
            data: {
                query: `{
                    products(first: 3) {
                      edges {
                        node {
                          id
                          title
                          handle
                          description
                          featuredImage {
                            src
                          }
                          variants(first: 5) {
                            nodes {
                              price {
                                amount
                                currencyCode
                              }
                            }
                          }
                        }
                      }
                    }
                  } 
                `
              }
            })
          }) 
        }
    }
});


export const { useQueryQuery} = productsApi