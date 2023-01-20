import Head from 'next/head'
import dynamic from 'next/dynamic'
import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Pagination from '@mui/material/Pagination'
import ProductCard, { Placeholder } from '@/components/ProductCard'
import CartModal from '@/components/CartModal'
import { GetServerSideProps } from "next"
import { useQuery } from "react-query"
import { useRouter } from 'next/router'
import { getProducts } from "@/lib/product"
import { getPagination } from '@/lib/pagination'

const Header = dynamic(() => import('@/components/Header'), { ssr: false })

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page ? parseInt(context.query.page as string) : 1

  return {
    props: { page }
  }
}

const containerStyle = {
  paddingTop: "80px",
  paddingBottom: "100px",
}

type Props = {
  page: number
}

export default function IndexPage({ page }: Props) {
  const queryKey = `products-${page}`
  const { isLoading, data } = useQuery(queryKey, () => getProducts({ page }))
  const router = useRouter()

  if (!data && isLoading) {
    return (
      <>
        <Header title="Product List" />
        <Container maxWidth="sm" sx={containerStyle}>
          <Grid container spacing={2}>
            <ProductPlaceholders />
          </Grid>
        </Container>
      </>
    )
  }

  const pagination = getPagination({
    limit: 10,
    countAll: data?.total ?? 0,
  })

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) =>
    router.push(`/?page=${value}`)

  return (
    <>
      <Head><title>Product List</title></Head>
      <Header title="Product List" />
      <Container maxWidth="sm" sx={containerStyle}>
        <Grid container spacing={2}>
          {data?.products.map((product) =>
            <Grid key={product.id} item xs={12} sm={6}>
              <ProductCard product={product}/>
            </Grid>
          )}
          <Grid 
            item xs={12} 
            marginTop={2}
            sx={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <Pagination 
              count={pagination.totalPage}
              page={page}
              onChange={handleChangePage}
            />
          </Grid>
        </Grid>
      </Container>
      <CartModal />
    </>
  )
}

function ProductPlaceholders() {
  return (
    <>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Placeholder />
      </Grid>
    </>
  )
}
