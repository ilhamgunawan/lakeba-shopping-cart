import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import TopBar from '@/components/TopBar'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import ProductCard, { Placeholder } from '@/components/ProductCard'
import CartModal from '@/components/CartModal'
import { GetServerSideProps } from "next"
import { useQuery } from "react-query"
import { getProducts } from "@/lib/product"
import { useCartStore } from '@/stores/cart'

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
  const { showAddItemSuccessMessage, hideSuccessMessage } = useCartStore()

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
      <CartModal />
      <Snackbar
        open={showAddItemSuccessMessage}
        autoHideDuration={3000}
        onClose={hideSuccessMessage}
        message="Item added to cart"
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={hideSuccessMessage}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
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
