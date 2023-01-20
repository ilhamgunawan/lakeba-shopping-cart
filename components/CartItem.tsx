import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import DeleteIcon from '@mui/icons-material/Delete'
import { Cart } from '@/stores/cart'
import { formatNumberToUSD } from '@/utils/common'
import { useCartStore } from '@/stores/cart'

type Props = {
  cartItem: Cart
}

export default function CartItem({ cartItem }: Props) {
  const { addItem, removeItem, decreaseItemQuantity } = useCartStore()

  return (
    <Card variant="outlined">
      <Grid container>
        <Grid item xs={3} padding={1}>
          <CardMedia
            component="img"
            height="100%"
            width="auto"
            image={cartItem.product.thumbnail}
            alt={cartItem.product.title}
          />
        </Grid>
        <Grid item xs={9} padding={1}>
          <Typography fontWeight={500} fontSize={14}>
            {cartItem.product.title}
          </Typography>
          <Stack direction="row">
            <Typography fontWeight={500} fontSize={12} color="text.primary" marginRight={1}>
              {formatNumberToUSD(cartItem.product.price)}
            </Typography>
            <Typography fontWeight={500} fontSize={12} color="text.primary">
              ({cartItem.quantity})
            </Typography>
          </Stack>
          <Stack direction="row" gap={1}>
            <Typography fontWeight={700} fontSize={12}>Total Price</Typography>
            <Typography fontWeight={700} fontSize={12} color="green" marginBottom={2}>
              {formatNumberToUSD(cartItem.price)}
            </Typography>
          </Stack>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={() => removeItem(cartItem.id)} aria-label="delete">
                <DeleteIcon />
              </IconButton>
              <IconButton 
                aria-label="delete"
                disabled={cartItem.quantity === 1}
                onClick={() => decreaseItemQuantity(cartItem.product)}
              >
                <RemoveCircleOutlineIcon />
              </IconButton>
              <Typography variant="body1" fontWeight={500} fontSize={12} color="text.primary">
                {cartItem.quantity}
              </Typography>
              <IconButton onClick={() => addItem(cartItem.product)} aria-label="delete">
                <AddCircleOutlineIcon />
              </IconButton>
            </Stack>
          </Box>
        </Grid>
      </Grid>
    </Card>
  )
}
