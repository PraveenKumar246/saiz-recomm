import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { Product, WidgetConfig } from '../../domain/models/types';
import { productService } from '../../data/services/ProductService';
import { ProductMapper } from '../../data/mappers/ProductMapper';

// ─── State Shape ────────────────────────────────────────────────────
interface ProductState {
  config: WidgetConfig | null;
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductState = {
  config: null,
  product: null,
  loading: false,
  error: null,
};

// ─── Async Thunk ────────────────────────────────────────────────────
export const fetchProduct = createAsyncThunk(
  'product/fetchProduct',
  async (config: WidgetConfig, { rejectWithValue }) => {
    try {
      const rawResponse = await productService.getProductForWidget(
        config.brandCode,
        config.productCode
      );
      const product = ProductMapper.toDomain(rawResponse);
      return { config, product };
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      return rejectWithValue(message);
    }
  }
);

// ─── Slice ──────────────────────────────────────────────────────────
const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    resetProduct: (state) => {
      state.product = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProduct.fulfilled, (state, action: PayloadAction<{ config: WidgetConfig; product: Product }>) => {
        state.loading = false;
        state.config = action.payload.config;
        state.product = action.payload.product;
      })
      .addCase(fetchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetProduct } = productSlice.actions;
export default productSlice.reducer;
