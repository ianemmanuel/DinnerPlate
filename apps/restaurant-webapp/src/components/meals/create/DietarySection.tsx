"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@restaurant-webapp/components/ui/card"
import { Button } from "@restaurant-webapp/components/ui/button"
import { Badge } from "@restaurant-webapp/components/ui/badge"
import { Leaf, AlertTriangle } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { MealFormData } from "@restaurant-webapp/lib/validators/meal-validators"

const DIETARY_TAGS = [
  { id: "vegetarian", label: "Vegetarian", color: "bg-green-100 text-green-800" },
  { id: "vegan", label: "Vegan", color: "bg-green-100 text-green-800" },
  { id: "halal", label: "Halal", color: "bg-blue-100 text-blue-800" },
  { id: "kosher", label: "Kosher", color: "bg-blue-100 text-blue-800" },
  { id: "gluten-free", label: "Gluten Free", color: "bg-yellow-100 text-yellow-800" },
  { id: "dairy-free", label: "Dairy Free", color: "bg-yellow-100 text-yellow-800" },
  { id: "keto", label: "Keto", color: "bg-purple-100 text-purple-800" },
  { id: "low-carb", label: "Low Carb", color: "bg-purple-100 text-purple-800" },
  { id: "high-protein", label: "High Protein", color: "bg-red-100 text-red-800" },
  { id: "organic", label: "Organic", color: "bg-green-100 text-green-800" },
  { id: "low-sodium", label: "Low Sodium", color: "bg-blue-100 text-blue-800" },
  { id: "sugar-free", label: "Sugar Free", color: "bg-yellow-100 text-yellow-800" }
];

const ALLERGENS = [
  { id: "gluten", label: "Gluten" },
  { id: "dairy", label: "Dairy" },
  { id: "eggs", label: "Eggs" },
  { id: "fish", label: "Fish" },
  { id: "shellfish", label: "Shellfish" },
  { id: "tree-nuts", label: "Tree Nuts" },
  { id: "peanuts", label: "Peanuts" },
  { id: "soy", label: "Soy" },
  { id: "sesame", label: "Sesame" },
  { id: "mustard", label: "Mustard" },
  { id: "celery", label: "Celery" },
  { id: "lupin", label: "Lupin" },
  { id: "molluscs", label: "Molluscs" },
  { id: "sulfites", label: "Sulfites" }
];

interface DietarySectionProps {
  form: UseFormReturn<MealFormData>;
}

export function DietarySection({ form }: DietarySectionProps) {
  const dietaryTags = form.watch("dietaryTags") || [];
  const allergens = form.watch("allergens") || [];

  const toggleDietaryTag = (tagId: string) => {
    const currentTags = form.getValues("dietaryTags") || [];
    const newTags = currentTags.includes(tagId)
      ? currentTags.filter(id => id !== tagId)
      : [...currentTags, tagId];
    form.setValue("dietaryTags", newTags);
  };

  const toggleAllergen = (allergenId: string) => {
    const currentAllergens = form.getValues("allergens") || [];
    const newAllergens = currentAllergens.includes(allergenId)
      ? currentAllergens.filter(id => id !== allergenId)
      : [...currentAllergens, allergenId];
    form.setValue("allergens", newAllergens);
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center space-x-2">
            <Leaf className="h-5 w-5" />
            <span>Dietary Information</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Help customers find meals that match their dietary preferences and restrictions. 
            Accurate allergen information is essential for customer safety.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dietary Tags */}
        <div>
          <h3 className="text-sm font-medium mb-3">Dietary Tags</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {DIETARY_TAGS.map((tag) => (
              <Button
                key={tag.id}
                type="button"
                variant={dietaryTags.includes(tag.id) ? "default" : "outline"}
                size="sm"
                onClick={() => toggleDietaryTag(tag.id)}
                className="justify-start h-auto p-3"
              >
                <div className="flex items-center space-x-2">
                  <div className={`w-2 h-2 rounded-full ${tag.color.split(' ')[0]}`} />
                  <span className="text-xs">{tag.label}</span>
                </div>
              </Button>
            ))}
          </div>
          {dietaryTags.length > 0 && (
            <div className="mt-3 p-3 bg-muted/50 rounded-lg">
              <div className="text-xs text-muted-foreground mb-2">Selected dietary tags:</div>
              <div className="flex flex-wrap gap-2">
                {dietaryTags.map((tagId) => {
                  const tag = DIETARY_TAGS.find(t => t.id === tagId);
                  return tag ? (
                    <Badge key={tagId} variant="secondary" className={tag.color}>
                      {tag.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>

        {/* Allergens */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <AlertTriangle className="h-4 w-4 text-orange-500" />
            <h3 className="text-sm font-medium">Allergens</h3>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Select all allergens that this meal contains or may contain due to cross-contamination
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {ALLERGENS.map((allergen) => (
              <Button
                key={allergen.id}
                type="button"
                variant={allergens.includes(allergen.id) ? "destructive" : "outline"}
                size="sm"
                onClick={() => toggleAllergen(allergen.id)}
                className="justify-start h-auto p-3"
              >
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-3 w-3" />
                  <span className="text-xs">{allergen.label}</span>
                </div>
              </Button>
            ))}
          </div>
          {allergens.length > 0 && (
            <div className="mt-3 p-3 bg-destructive/5 border border-destructive/20 rounded-lg">
              <div className="text-xs text-destructive mb-2">⚠️ Contains allergens:</div>
              <div className="flex flex-wrap gap-2">
                {allergens.map((allergenId) => {
                  const allergen = ALLERGENS.find(a => a.id === allergenId);
                  return allergen ? (
                    <Badge key={allergenId} variant="destructive">
                      {allergen.label}
                    </Badge>
                  ) : null;
                })}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}