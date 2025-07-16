"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@restaurant-webapp/components/ui/card"
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@restaurant-webapp/components/ui/form";
import { Input } from "@restaurant-webapp/components/ui/input";
import { Badge } from "@restaurant-webapp/components/ui/badge";
import { DollarSign, TrendingUp, Tag, Sparkles } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MealFormData } from "@restaurant-webapp/lib/validators/meal-validators";
import { calculateMealPricing, formatPrice, getPromotionDisplayText } from "@restaurant-webapp/lib/utils/pricing-calculator"

interface PricingSectionProps {
  form: UseFormReturn<MealFormData>;
}

export function PricingSection({ form }: PricingSectionProps) {
  const price = form.watch("price");
  const variants = form.watch("variants") || [];
  const addOns = form.watch("addOns") || [];
  const promotions = form.watch("promotions") || [];

  // Calculate pricing breakdown with memoization for performance
  const pricingBreakdown = useMemo(() => {
    return calculateMealPricing(price, variants, addOns, promotions);
  }, [price, variants, addOns, promotions]);

  // Update form with calculated pricing
  useMemo(() => {
    if (pricingBreakdown.basePrice > 0) {
      form.setValue("pricingCalculation", {
        basePrice: pricingBreakdown.basePrice,
        startingPrice: pricingBreakdown.startingPrice,
        maxPrice: pricingBreakdown.maxPrice,
        discountedStartingPrice: pricingBreakdown.discountedStartingPrice,
        discountedMaxPrice: pricingBreakdown.discountedMaxPrice,
        hasActivePromotions: pricingBreakdown.hasActivePromotions,
      });
    }
  }, [pricingBreakdown, form]);

  const hasVariantsOrAddOns = variants.length > 0 || addOns.length > 0;
  const showDiscountedPrices = pricingBreakdown.hasActivePromotions && pricingBreakdown.discountedStartingPrice !== undefined;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
        <CardTitle className="flex items-center space-x-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          <span>Pricing</span>
          <Badge variant="secondary">Required</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Set your base price and watch as variants and promotions automatically calculate the final pricing range.
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* Base Price Input */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base font-medium">Base Price *</FormLabel>
                <FormControl>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="0.00"
                      {...field}
                      className="pl-10 text-lg font-medium h-12"
                      type="number"
                      step="0.01"
                      min="0"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Pricing Preview */}
        {pricingBreakdown.basePrice > 0 && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              <h4 className="font-medium">Price Range Preview</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Starting Price */}
              <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-green-50 to-green-100 dark:from-green-950/30 dark:to-green-900/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-green-700 dark:text-green-300">
                    Starting From
                  </span>
                  {showDiscountedPrices && (
                    <Badge variant="destructive" className="text-xs">
                      {getPromotionDisplayText(pricingBreakdown.bestPromotion!)}
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1">
                  {showDiscountedPrices ? (
                    <>
                      <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                        ${formatPrice(pricingBreakdown.discountedStartingPrice!)}
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        ${formatPrice(pricingBreakdown.startingPrice)}
                      </div>
                      <div className="text-xs text-green-600 dark:text-green-400 font-medium">
                        Save ${formatPrice(pricingBreakdown.savings!.startingPriceSavings)}
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-green-700 dark:text-green-300">
                      ${formatPrice(pricingBreakdown.startingPrice)}
                    </div>
                  )}
                </div>
              </div>

              {/* Maximum Price */}
              <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/30 dark:to-blue-900/30 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                    Up To
                  </span>
                  {hasVariantsOrAddOns && (
                    <Badge variant="outline" className="text-xs">
                      With Options
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-1">
                  {showDiscountedPrices ? (
                    <>
                      <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                        ${formatPrice(pricingBreakdown.discountedMaxPrice!)}
                      </div>
                      <div className="text-sm text-muted-foreground line-through">
                        ${formatPrice(pricingBreakdown.maxPrice)}
                      </div>
                      <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        Save ${formatPrice(pricingBreakdown.savings!.maxPriceSavings)}
                      </div>
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                      ${formatPrice(pricingBreakdown.maxPrice)}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Active Promotions Banner */}
            {pricingBreakdown.hasActivePromotions && (
              <div className="rounded-lg bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200 dark:border-purple-800 p-4">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700 dark:text-purple-300">
                    Active Promotion Applied
                  </span>
                </div>
                <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                  Customers will see discounted prices with the best available offer
                </p>
              </div>
            )}

            {/* Pricing Factors */}
            {hasVariantsOrAddOns && (
              <div className="rounded-lg bg-muted/30 p-4 space-y-3">
                <div className="flex items-center space-x-2">
                  <Tag className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Pricing Factors</span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {variants.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Variants:</span>
                      <span className="font-medium">
                        {variants.reduce((acc, v) => acc + v.options.length, 0)} options
                      </span>
                    </div>
                  )}
                  
                  {addOns.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Add-ons:</span>
                      <span className="font-medium">{addOns.length} available</span>
                    </div>
                  )}
                  
                  {promotions.filter(p => p.isActive).length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Active Promotions:</span>
                      <span className="font-medium text-purple-600">
                        {promotions.filter(p => p.isActive).length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Helpful Tips */}
        {!hasVariantsOrAddOns && pricingBreakdown.basePrice > 0 && (
          <div className="rounded-lg border border-dashed border-muted-foreground/30 p-4 text-center">
            <p className="text-sm text-muted-foreground">
              💡 Add variants or add-ons to create flexible pricing options for your customers
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}