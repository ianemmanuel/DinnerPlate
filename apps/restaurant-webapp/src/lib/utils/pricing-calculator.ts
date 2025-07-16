import { Variant, AddOn, Promotion } from "@restaurant-webapp/lib/validators/pricing-validator"

export interface PricingBreakdown {
  basePrice: number;
  startingPrice: number;
  maxPrice: number;
  discountedStartingPrice?: number;
  discountedMaxPrice?: number;
  hasActivePromotions: boolean;
  bestPromotion?: Promotion;
  savings?: {
    startingPriceSavings: number;
    maxPriceSavings: number;
  };
}

export function calculateMealPricing(
  basePrice: string | number,
  variants: Variant[] = [],
  addOns: AddOn[] = [],
  promotions: Promotion[] = []
): PricingBreakdown {
  const basePriceNum = typeof basePrice === 'string' ? parseFloat(basePrice) || 0 : basePrice;
  
  if (basePriceNum <= 0) {
    return {
      basePrice: 0,
      startingPrice: 0,
      maxPrice: 0,
      hasActivePromotions: false,
    };
  }

  // Calculate variant price modifiers
  const variantModifiers = variants.flatMap(variant => 
    variant.options.map(option => option.priceModifier)
  );
  
  // Calculate add-on prices
  const addOnPrices = addOns.map(addOn => addOn.priceModifier);
  
  // Find minimum and maximum price modifiers
  const minVariantModifier = variantModifiers.length > 0 ? Math.min(...variantModifiers) : 0;
  const maxVariantModifier = variantModifiers.length > 0 ? Math.max(...variantModifiers) : 0;
  const maxAddOnPrice = addOnPrices.length > 0 ? Math.max(...addOnPrices) : 0;
  
  // Calculate starting price (base + minimum variant modifier)
  const startingPrice = basePriceNum + minVariantModifier;
  
  // Calculate maximum price (base + max variant modifier + max add-on)
  const maxPrice = basePriceNum + maxVariantModifier + maxAddOnPrice;
  
  // Find the best active promotion
  const activePromotions = promotions.filter(promo => promo.isActive);
  let bestPromotion: Promotion | undefined;
  let maxDiscount = 0;
  
  activePromotions.forEach(promotion => {
    let discount = 0;
    
    switch (promotion.type) {
      case 'percentage':
        discount = (promotion.value / 100) * startingPrice;
        break;
      case 'fixed':
        discount = promotion.value;
        break;
      case 'bogo':
        discount = startingPrice * 0.5; // 50% off for BOGO
        break;
      case 'bundle':
        discount = Math.max(0, startingPrice - promotion.value);
        break;
    }
    
    if (discount > maxDiscount) {
      maxDiscount = discount;
      bestPromotion = promotion;
    }
  });
  
  const result: PricingBreakdown = {
    basePrice: basePriceNum,
    startingPrice: Math.max(0, startingPrice),
    maxPrice: Math.max(0, maxPrice),
    hasActivePromotions: activePromotions.length > 0,
  };
  
  // Apply best promotion if available
  if (bestPromotion && maxDiscount > 0) {
    const discountedStarting = Math.max(0, startingPrice - maxDiscount);
    const discountedMax = Math.max(0, maxPrice - maxDiscount);
    
    result.discountedStartingPrice = discountedStarting;
    result.discountedMaxPrice = discountedMax;
    result.bestPromotion = bestPromotion;
    result.savings = {
      startingPriceSavings: startingPrice - discountedStarting,
      maxPriceSavings: maxPrice - discountedMax,
    };
  }
  
  return result;
}

export function formatPrice(price: number): string {
  return price.toFixed(2);
}

export function getPromotionDisplayText(promotion: Promotion): string {
  switch (promotion.type) {
    case 'percentage':
      return `${promotion.value}% OFF`;
    case 'fixed':
      return `$${promotion.value} OFF`;
    case 'bogo':
      return 'BUY 1 GET 1';
    case 'bundle':
      return `BUNDLE $${promotion.value}`;
    default:
      return promotion.label;
  }
}