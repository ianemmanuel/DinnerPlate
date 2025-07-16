"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@restaurant-webapp/components/ui/card";
import { Button } from "@restaurant-webapp/components/ui/button";
import { Input } from "@restaurant-webapp/components/ui/input";
import { Label } from "@restaurant-webapp/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@restaurant-webapp/components/ui/select";
import { Switch } from "@restaurant-webapp/components/ui/switch";
import { Badge } from "@restaurant-webapp/components/ui/badge";
import { Plus, X, Tag, Calendar, Percent, Gift } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MealFormData } from "@restaurant-webapp/lib/validators/meal-validators"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@restaurant-webapp/components/ui/dialog";
import { v4 as uuidv4 } from 'uuid';

const PROMOTION_TYPES = [
  { value: "percentage", label: "Percentage Off", icon: Percent },
  { value: "fixed", label: "Fixed Amount Off", icon: Tag },
  { value: "bogo", label: "Buy One Get One", icon: Gift },
  { value: "bundle", label: "Bundle Deal", icon: Gift }
];

interface PromotionsSectionProps {
  form: UseFormReturn<MealFormData>;
}

export function PromotionsSection({ form }: PromotionsSectionProps) {
  const [isAddingPromotion, setIsAddingPromotion] = useState(false);
  const [newPromotion, setNewPromotion] = useState({
    type: "percentage" as const,
    value: 0,
    label: "",
    startDate: "",
    endDate: "",
    isActive: true
  });

  const promotions = form.watch("promotions") || [];

  const addPromotion = () => {
    if (newPromotion.label && newPromotion.value > 0) {
      const promotion = {
        id: uuidv4(),
        ...newPromotion
      };
      
      form.setValue("promotions", [...promotions, promotion]);
      setNewPromotion({
        type: "percentage",
        value: 0,
        label: "",
        startDate: "",
        endDate: "",
        isActive: true
      });
      setIsAddingPromotion(false);
    }
  };

  const removePromotion = (id: string) => {
    form.setValue("promotions", promotions.filter(p => p.id !== id));
  };

  const togglePromotionStatus = (id: string) => {
    form.setValue("promotions", promotions.map(p => 
      p.id === id ? { ...p, isActive: !p.isActive } : p
    ));
  };

  const getPromotionIcon = (type: string) => {
    const promotionType = PROMOTION_TYPES.find(pt => pt.value === type);
    return promotionType ? promotionType.icon : Tag;
  };

  const getPromotionDescription = (promotion: any) => {
    switch (promotion.type) {
      case "percentage":
        return `${promotion.value}% off`;
      case "fixed":
        return `$${promotion.value} off`;
      case "bogo":
        return "Buy 1 Get 1 Free";
      case "bundle":
        return `Bundle for $${promotion.value}`;
      default:
        return "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className="flex items-center space-x-2">
            <Tag className="h-5 w-5" />
            <span>Promotions</span>
          </CardTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Create special offers and promotional badges to attract customers. Set discounts, 
            limited-time offers, or bundle deals to boost sales.
          </p>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Add special offers and promotional badges
          </p>
          <Dialog open={isAddingPromotion} onOpenChange={setIsAddingPromotion}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Promotion
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Promotion</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="promo-type">Promotion Type</Label>
                  <Select 
                    value={newPromotion.type} 
                    onValueChange={(value: any) => setNewPromotion(prev => ({ ...prev, type: value }))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROMOTION_TYPES.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center space-x-2">
                            <type.icon className="h-4 w-4" />
                            <span>{type.label}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="promo-value">Value</Label>
                  <Input
                    id="promo-value"
                    type="number"
                    placeholder={newPromotion.type === "percentage" ? "e.g., 20" : "e.g., 5.00"}
                    value={newPromotion.value}
                    onChange={(e) => setNewPromotion(prev => ({ ...prev, value: Number(e.target.value) }))}
                  />
                </div>

                <div>
                  <Label htmlFor="promo-label">Display Label</Label>
                  <Input
                    id="promo-label"
                    placeholder="e.g., Limited Time Offer"
                    value={newPromotion.label}
                    onChange={(e) => setNewPromotion(prev => ({ ...prev, label: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="start-date">Start Date (Optional)</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={newPromotion.startDate}
                      onChange={(e) => setNewPromotion(prev => ({ ...prev, startDate: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="end-date">End Date (Optional)</Label>
                    <Input
                      id="end-date"
                      type="date"
                      value={newPromotion.endDate}
                      onChange={(e) => setNewPromotion(prev => ({ ...prev, endDate: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    checked={newPromotion.isActive}
                    onCheckedChange={(checked) => setNewPromotion(prev => ({ ...prev, isActive: checked }))}
                  />
                  <Label>Active</Label>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setIsAddingPromotion(false)}>
                    Cancel
                  </Button>
                  <Button onClick={addPromotion}>
                    Add Promotion
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {promotions.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Tag className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p>No promotions added yet</p>
            <p className="text-sm">Add special offers to attract customers</p>
          </div>
        ) : (
          <div className="space-y-3">
            {promotions.map((promotion) => {
              const IconComponent = getPromotionIcon(promotion.type);
              return (
                <div key={promotion.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <IconComponent className="h-5 w-5 text-primary" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{promotion.label}</h4>
                          <Badge variant={promotion.isActive ? "default" : "secondary"}>
                            {promotion.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {getPromotionDescription(promotion)}
                        </p>
                        {(promotion.startDate || promotion.endDate) && (
                          <div className="flex items-center space-x-2 text-xs text-muted-foreground mt-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {promotion.startDate && new Date(promotion.startDate).toLocaleDateString()}
                              {promotion.startDate && promotion.endDate && " - "}
                              {promotion.endDate && new Date(promotion.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={promotion.isActive}
                        onCheckedChange={() => togglePromotionStatus(promotion.id)}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removePromotion(promotion.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}