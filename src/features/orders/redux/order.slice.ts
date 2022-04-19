import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InitialStateDef, OrderDef } from "../orders";
import { ORDER_FEATURE_KEY } from "./../constants/order.key";
const initialState: InitialStateDef = {
  listOrder: [],
};

// export const getAllOrders = createAsyncThunk(
//   `${ORDER_FEATURE_KEY}/getAll`,
//   async (_, { rejectWithValue }) => {
//     try {
//     } catch (err: any) {
//       return rejectWithValue(err.response.data);
//     }
//   }
// );

const orderSlice = createSlice({
  name: ORDER_FEATURE_KEY,
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<OrderDef>) {
      const index = state.listOrder.findIndex(
        (order) => order.food?._id === action.payload.food?._id
      );
      if (index === -1) {
        state.listOrder.push(action.payload);
        return;
      }
      const amount = state.listOrder[index].amount || 0;
      state.listOrder[index].amount = amount + 1;
    },
    changeAmountOrder(
      state,
      action: PayloadAction<{
        amount: number;
        position: number;
      }>
    ) {
      state.listOrder[action.payload.position].amount =
        action.payload.amount + 1;
    },
    changeNoteOrder(
      state,
      action: PayloadAction<{
        note: string;
        position: number;
      }>
    ) {
      state.listOrder[action.payload.position].note = action.payload.note;
    },
  },
  extraReducers: () => {},
});

export const { addOrder, changeAmountOrder, changeNoteOrder } =
  orderSlice.actions;

export const orderReducer = orderSlice.reducer;
