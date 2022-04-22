import { OrderUpdateDef, enumOrder } from './../types/order.type';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  createOrder,
  deleteOrders,
  InitialStateDef,
  OrderDef,
  updateOrder
} from '../orders';
import { ORDER_FEATURE_KEY } from '../constants/order.key';

const initialState: InitialStateDef = {
  _id: '',
  listOrder: [],
  status: enumOrder.PREPARING,
  username: '',
  createAt: '',
  error: false
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
export const uploadOrders = createAsyncThunk(
  `${ORDER_FEATURE_KEY}/create`,
  async (values: OrderDef[], { rejectWithValue }) => {
    try {
      const response = await createOrder(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const updateOrders = createAsyncThunk(
  `${ORDER_FEATURE_KEY}/update`,
  async (values: OrderUpdateDef, { rejectWithValue }) => {
    try {
      const response = await updateOrder(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const removeOrders = createAsyncThunk(
  `${ORDER_FEATURE_KEY}/delete`,
  async (values: string[], { rejectWithValue }) => {
    try {
      const response = await deleteOrders(values);
      return response.data;
    } catch (err: any) {
      return rejectWithValue(err.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: ORDER_FEATURE_KEY,
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<OrderDef>) {
      const index = state.listOrder.findIndex(
        order => order.food?._id === action.payload.food?._id
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
      if (!action.payload.amount) {
        state.listOrder[action.payload.position].amount = 0;
      }
      state.listOrder[action.payload.position].amount = action.payload.amount;
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
    addListOrder(
      state,
      action: PayloadAction<{
        status: string;
        listOrders: OrderDef[];
        username: string;
        createAt: string;
        _id: string;
      }>
    ) {
      const { status, listOrders, username, createAt, _id } = action.payload;
      state.status = status;
      state.listOrder = listOrders;
      state.username = username;
      state.createAt = createAt;
      state._id = _id;
    },
    removeOrder(state, action: PayloadAction<number>) {
      state.listOrder.splice(action.payload, 1);
    },
    changeStatusOrder(state, action: PayloadAction<string>) {
      state.status = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addCase(uploadOrders.fulfilled, state => {
      state._id = '';
      state.createAt = '';
      state.error = false;
      state.listOrder = [];
      state.status = enumOrder.PREPARING;
      state.username = '';
    });
    builder.addCase(uploadOrders.rejected, state => {
      state.error = true;
    });

    builder.addCase(updateOrders.fulfilled, state => {
      state._id = '';
      state.createAt = '';
      state.error = false;
      state.listOrder = [];
      state.status = enumOrder.PREPARING;
      state.username = '';
    });
    builder.addCase(updateOrders.rejected, state => {
      state.error = true;
    });
  }
});

export const {
  addOrder,
  changeAmountOrder,
  changeNoteOrder,
  addListOrder,
  removeOrder,
  changeStatusOrder
} = orderSlice.actions;

export const orderReducer = orderSlice.reducer;
