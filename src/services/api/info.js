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


export const infoApi = createApi({
    reducerPath: 'infoApi',
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
                  shop {
                    name
                    moneyFormat
                    brand {
                      shortDescription
                      slogan
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


export const { useQueryQuery } = infoApi