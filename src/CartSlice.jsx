import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // start with empty cart
  },
  reducers: {
    // ✅ Add item reducer
    addItem: (state, action) => {
      const { name, image, cost } = action.payload; // Destructure product details
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // If already in cart, increase quantity
        existingItem.quantity++;
      } else {
        // Else push new item with quantity = 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    // ✅ Remove item reducer
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    // ✅ Update quantity reducer
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate) {
        itemToUpdate.quantity = quantity;
      }
    },
  },
});

// ✅ Export action creators to use in ProductList.jsx & CartItem.jsx
export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

// ✅ Export reducer to use in store.js
export default CartSlice.reducer;
