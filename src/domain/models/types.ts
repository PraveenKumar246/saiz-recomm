// ─── Widget Configuration ───────────────────────────────────────────
export interface WidgetConfig {
  brandCode: string;
  productCode: string;
  visitorId: string;
  language: string;
  metadata?: Record<string, string | undefined>;
}

// ─── Measurement Range ──────────────────────────────────────────────
export interface MeasurementRange {
  min: number;
  max: number;
  display: boolean;
}

// ─── Product Size Measurement ───────────────────────────────────────
export interface ProductMeasurement {
  productSize: string;
  chest: number;
  waist: number;
  hip: number;
  length: number;
  chestRange: MeasurementRange;
  waistRange: MeasurementRange;
  hipRange: MeasurementRange;
  lengthRange: MeasurementRange;
  heightRange: MeasurementRange | null;
}

// ─── Product Image ──────────────────────────────────────────────────
export interface ProductImage {
  src: string;
}

// ─── Display Flags ──────────────────────────────────────────────────
export interface DisplayConfig {
  chest: boolean;
  waist: boolean;
  hip: boolean;
  length: boolean;
}

// ─── Dynamic Fit Model ──────────────────────────────────────────────
export interface DynamicFitModel {
  waist: number;
  chest: number;
  hip: number;
  height: number;
  productSize: string;
}

// ─── Product Domain Model ───────────────────────────────────────────
export interface Product {
  id: string;
  brandCode: string;
  productCode: string;
  productName: string;
  garmentType: string;
  isActive: boolean;
  status: string;
  productGenderType: string;
  sourceProductId: string;
  measurements: ProductMeasurement[];
  images: ProductImage[];
  display: DisplayConfig;
  hasAttributes: boolean;
  hasNudges: boolean;
  showNudges: boolean;
  nudges: any[];
  useDynamicFitModel: boolean;
  dynamicFitModel: DynamicFitModel;
}

// ─── User Body Measurements ─────────────────────────────────────────
export interface UserMeasurements {
  gender: 'male' | 'female' | 'other';
  age: number;
  height: number;
  weight: number;
  heightUnit: 'cm' | 'in';
  weightUnit: 'kg' | 'lbs';
}

// ─── Size Recommendation ────────────────────────────────────────────
export interface SizeRecommendation {
  size: string;
  fitLabel: 'too tight' | 'fits right' | 'too loose';
  confidence: number;
}

// ─── Fit Result for a body part ─────────────────────────────────────
export interface FitResult {
  bodyPart: string;
  fitLabel: 'too tight' | 'fits right' | 'too loose';
  userValue: number;
  rangeMin: number;
  rangeMax: number;
}

// ─── Theme Settings ─────────────────────────────────────────────────
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  surfaceAlt: string;
  text: string;
  textSecondary: string;
  border: string;
  accent: string;
  success: string;
  warning: string;
  danger: string;
}

export interface Theme {
  mode: ThemeMode;
  colors: ThemeColors;
  brandCode: string;
}

// ─── Screen Identifiers ────────────────────────────────────────────
export type ScreenId =
  | 'welcome'
  | 'info'
  | 'avatar'
  | 'analyze'
  | 'sizePreferences'
  | 'input'
  | 'recommendation';

// ─── API Response (raw) ─────────────────────────────────────────────
export interface ProductApiResponse {
  id: string;
  brandCode: string;
  productCode: string;
  productName: string;
  garmentType: string;
  isActive: boolean;
  status: string;
  shopifyStatus: string;
  sourceProductId: string;
  productGenderType: string;
  productMeasurements: ProductMeasurement[];
  productImages: ProductImage[];
  productAttributes: unknown[];
  hasAttributes: boolean;
  nudges: unknown[];
  hasNudges: boolean;
  showNudges: boolean;
  display: DisplayConfig;
  useDynamicFitModel: boolean;
  dynamicFitModel: DynamicFitModel;
  automatNudge: unknown | null;
  displayAutomatNudge: boolean;
}
