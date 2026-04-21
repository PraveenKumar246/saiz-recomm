import type { Product, ProductApiResponse } from '../../domain/models/types';

/**
 * ProductMapper
 * Single Responsibility: Converts raw API responses into domain models.
 * Keeps the data layer decoupled from the domain layer.
 */
export const ProductMapper = {
  /**
   * Maps the raw API response to a clean Product domain model.
   */
  toDomain: (raw: ProductApiResponse): Product => ({
    id: raw.id,
    brandCode: raw.brandCode,
    productCode: raw.productCode,
    productName: raw.productName,
    garmentType: raw.garmentType,
    isActive: raw.isActive,
    status: raw.status,
    productGenderType: raw.productGenderType,
    sourceProductId: raw.sourceProductId,
    measurements: raw.productMeasurements.map((m) => ({
      productSize: m.productSize,
      chest: m.chest,
      waist: m.waist,
      hip: m.hip,
      length: m.length,
      chestRange: { ...m.chestRange },
      waistRange: { ...m.waistRange },
      hipRange: { ...m.hipRange },
      lengthRange: { ...m.lengthRange },
      heightRange: m.heightRange ? { ...m.heightRange } : null,
    })),
    images: raw.productImages.map((img) => ({ src: img.src })),
    display: { ...raw.display },
    hasAttributes: raw.hasAttributes,
    hasNudges: raw.hasNudges,
    showNudges: raw.showNudges,
    nudges: Array.isArray(raw.nudges) ? raw.nudges : [],
    useDynamicFitModel: raw.useDynamicFitModel,
    dynamicFitModel: { ...raw.dynamicFitModel },
  }),
};
