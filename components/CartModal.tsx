import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'
import CartItem from './CartItem'
import { useCartStore } from '@/stores/cart'
import { formatNumberToUSD } from '@/utils/common'

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  maxWidth: '100%',
  p: 1,
}

const cartListContaienerStyle = {
  maxHeight: '380px',
  overflowY: 'auto',
}

const cartListStyle = {
  display: "flex", 
  flexDirection: "column", 
  gap: "12px",
}

export default function CartModal() {
  const { showCartModal, toggleCartModal, cart, totalPrice, totalQuantity } = useCartStore()

  return (
    <div>
      <Modal
        open={showCartModal}
        onClose={toggleCartModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Card>
            <CardContent>
              <Typography gutterBottom variant="h2" fontWeight={700} fontSize={18}>
                Cart
              </Typography>
              <Box sx={cartListContaienerStyle}>
                {totalQuantity
                  ? <Box sx={cartListStyle}>
                      {cart.map(cartItem => 
                        <CartItem key={cartItem.id} cartItem={cartItem} />  
                      )}
                    </Box>
                  : <Typography textAlign="center" color="GrayText">Cart is empty</Typography>
                }
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }} marginTop={2}>
                <Stack direction="row" gap={1}>
                  <Typography>Total Price</Typography>
                  <Typography fontWeight={700} color="green">{formatNumberToUSD(totalPrice)}</Typography>
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Modal>
    </div>
  )
}