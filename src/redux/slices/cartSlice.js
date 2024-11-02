import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  products: [],
};

const cartSlice = createSlice({
  name: "Cart",
  initialState,
  reducers: {
    setShowCart: (state, action) => {
      state.showCart = action.payload;
    },
    addProductInCart: (state, action) => {
      const product = action.payload;
      // Check if the product is already in the cart
      const existingProduct = state.products.find((p) => p._id === product._id);

      if (existingProduct) {
        // If it exists, increase the quantity
        existingProduct.quantity += 1;
      } else {
        // If it doesn't exist, add it to the cart with quantity 1
        state.products.push({ ...product, quantity: 1 });
      }
    },
    removeProductInCart: (state, action) => {},
  },
});

// export the action to change showCart state
export const { setShowCart, addProductInCart, removeProductInCart } =
  cartSlice.actions;

// exporting reducer itself to configure it in store
export default cartSlice.reducer;
