import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import Rating from '@mui/material/Rating'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import { 
  Button, 
  CardActionArea, 
  CardActions,
  Skeleton
} from '@mui/material'
import { Product } from '@/lib/product'
import { formatNumberToUSD } from '@/utils/common'
import { useCartStore } from '@/stores/cart'

type Props = {
  product: Product
}

export default function ProductCard({ product }: Props) {
  const { addItem } = useCartStore()

  return (
    <Card elevation={4}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={product.thumbnail}
          alt={product.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" fontWeight={500} fontSize={14} component="div" textOverflow="ellipsis">
            {product.title}
          </Typography>
          <Typography variant="body1" fontWeight={500} fontSize={12} color="text.primary" marginBottom={2}>
            {formatNumberToUSD(product.price)}
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography fontSize={12} color="text.secondary">
              {product.rating}
            </Typography>
            <Rating 
              name="read-only" 
              value={product.rating} 
              precision={0.5} 
              size="small"
              readOnly 
            />
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack>
          <Button 
            onClick={() => addItem(product)} 
            size="small" 
            color="primary" 
            startIcon={<ShoppingCartIcon />}
          >
            Add to cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}

export function Placeholder() {
  return (
    <Card elevation={4}>
      <CardActionArea>
        <Skeleton variant="rounded" width="100%" height={140} />
        <CardContent>
          <Skeleton variant="rounded" width="100%" height={18} style={{ marginBottom: "10px" }} />
          <Skeleton variant="rounded" width="100%" height={18} style={{ marginBottom: "10px" }} />
          <Stack direction="row" spacing={1} alignItems="center">
            <Skeleton variant="rounded" width={14} height={18} />
            <Rating 
              name="read-only" 
              value={0} 
              precision={0.5} 
              size="small"
              readOnly 
            />
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Stack>
          <Button disabled size="small" color="primary" startIcon={<ShoppingCartIcon />}>
            Add to cart
          </Button>
        </Stack>
      </CardActions>
    </Card>
  )
}
