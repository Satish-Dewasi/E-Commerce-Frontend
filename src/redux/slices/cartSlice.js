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
      const { product, productQuantity } = action.payload;

      const existingProduct = state.products.find((p) => p._id === product._id);

      if (existingProduct) {
        existingProduct.quantity += productQuantity;
      } else {
        state.products.push({ ...product, quantity: productQuantity });
      }
    },
    removeProductInCart: (state, action) => {},
    emptyCart: (state) => {
      state.products = [];
    },
  },
});

// export the action to change showCart state
export const { setShowCart, addProductInCart, removeProductInCart, emptyCart } =
  cartSlice.actions;

// exporting reducer itself to configure it in store
export default cartSlice.reducer;
