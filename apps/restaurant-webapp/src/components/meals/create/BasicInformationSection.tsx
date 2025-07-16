"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@restaurant-webapp/components/ui/card";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@restaurant-webapp/components/ui/form";
import { Input } from "@restaurant-webapp/components/ui/input";
import { Textarea } from "@restaurant-webapp/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@restaurant-webapp/components/ui/select";
import { Badge } from "@restaurant-webapp/components/ui/badge";
import { Switch } from "@restaurant-webapp/components/ui/switch";
import { UseFormReturn } from "react-hook-form";
import { MealFormData } from "@restaurant-webapp/lib/validators/meal-validators"

const MEAL_CATEGORIES = [
  { value: "appetizers", label: "Appetizers" },
  { value: "main-course", label: "Main Course" },
  { value: "desserts", label: "Desserts" },
  { value: "beverages", label: "Beverages" },
  { value: "salads", label: "Salads" },
  { value: "soups", label: "Soups" },
  { value: "sandwiches", label: "Sandwiches" },
  { value: "pasta", label: "Pasta" },
  { value: "pizza", label: "Pizza" },
  { value: "burgers", label: "Burgers" },
  { value: "seafood", label: "Seafood" },
  { value: "vegetarian", label: "Vegetarian" },
  { value: "vegan", label: "Vegan" },
  { value: "breakfast", label: "Breakfast" },
  { value: "lunch", label: "Lunch" },
  { value: "dinner", label: "Dinner" }
];

interface BasicInformationSectionProps {
  form: UseFormReturn<MealFormData>;
}

export function BasicInformationSection({ form }: BasicInformationSectionProps) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center space-x-2">
            <span>Basic Information</span>
            <Badge variant="secondary">Required</Badge>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Essential details about your meal that customers will see first. Make sure to provide clear, 
            appetizing descriptions that highlight what makes your dish special.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Meal Name *</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Grilled Salmon with Lemon Butter"
                    {...field}
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-base">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {MEAL_CATEGORIES.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Describe your meal... Include ingredients, cooking method, and what makes it special."
                  className="min-h-[100px] text-base resize-none"
                  {...field}
                />
              </FormControl>
              <div className="flex justify-between text-sm text-muted-foreground">
                <FormMessage />
                <span>{field.value?.length || 0}/500</span>
              </div>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="preparationTime"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preparation Time (minutes)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min="1"
                    max="300"
                    placeholder="30"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                    className="text-base"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex items-center space-x-4 pt-8">
            <FormField
              control={form.control}
              name="isPopular"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">Popular Item</FormLabel>
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="isRecommended"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">Recommended</FormLabel>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}