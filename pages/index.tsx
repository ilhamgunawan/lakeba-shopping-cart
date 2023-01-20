import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TopBar from '@/components/TopBar'
import ProductCard, { Placeholder } from '@/components/ProductCard'
import { GetServerSideProps } from "next"
import { useQuery } from "react-query"
import { getProducts } from "@/lib/product"

export const getServerSideProps: GetServerSideProps = async (context) => {
  const page = context.query.page ? parseInt(context.query.page as string) : 1

  return {
    props: { page }
  }
}

type Props = {
  page: number
}

export default function IndexPage({ page }: Props) {
  const queryKey = `products-${page}`
  const { isLoading, data } = useQuery(queryKey, () => getProducts({ page }))

  if (!data && isLoading) {
    return (
      <>
        <TopBar title="Product List" />
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <ProductPlaceholders />
          </Grid>
        </Container>
      </>
    )
  }

  return (
    <>
      <TopBar title="Product List" />
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          {data?.products.map((product) =>
            <Grid key={product.id} item xs={12} sm={6}>
              <ProductCard product={product}/>
            </Grid>
          )}
        </Grid>
      </Container>
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
