import getConfig from "next/config"
import { NextConfig } from "next"

const { publicRuntimeConfig }: NextConfig = getConfig()
const baseUrl: string = publicRuntimeConfig?.baseUrl
const limit: number = publicRuntimeConfig?.requestLimit

export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  thumbnail: string
  images: string[]
}

export type GetProductsResponse = {
  products: Product[]
  total: number
  skip: number
  limit: number
}

export type GetProductsRequest = {
  page: number
}

export async function getProducts(req: GetProductsRequest) {
  const url = new URL(baseUrl + "products")
  const skip = (req.page - 1) * limit
  url.searchParams.append("limit", limit.toString())
  url.searchParams.append("skip", skip.toString())

  const res = await fetch(url)
  const data: GetProductsResponse = await res.json()
  return data
}
