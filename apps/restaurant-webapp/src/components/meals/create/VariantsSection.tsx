"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@restaurant-webapp/components/ui/card";
import { Button } from "@restaurant-webapp/components/ui/button";
import { Input } from "@restaurant-webapp/components/ui/input";
import { Label } from "@restaurant-webapp/components/ui/label";
import { Switch } from "@restaurant-webapp/components/ui/switch";
import { Badge } from "@restaurant-webapp/components/ui/badge";
import { Plus, X, Settings, Trash2, Info } from "lucide-react";
import { UseFormReturn } from "react-hook-form";
import { MealFormData } from "@restaurant-webapp/lib/validators/meal-validators"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@restaurant-webapp/components/ui/dialog";
import { Alert, AlertDescription } from "@restaurant-webapp/components/ui/alert";
import { v4 as uuidv4 } from 'uuid'

interface VariantsSectionProps {
  form: UseFormReturn<MealFormData>;
}

export function VariantsSection({ form }: VariantsSectionProps) {
  const [isAddingVariant, setIsAddingVariant] = useState(false);
  const [newVariant, setNewVariant] = useState({
    name: "",
    isRequired: false,
    allowMultiple: false,
    options: [{ label: "", priceModifier: 0, isDefault: false, isAvailable: true }]
  });

  const variants = form.watch("variants") || [];
  const addOns = form.watch("addOns") || [];

  const addVariant = () => {
    if (newVariant.name && newVariant.options[0].label) {
      const variant = {
        id: uuidv4(),
        name: newVariant.name,
        isRequired: newVariant.isRequired,
        allowMultiple: newVariant.allowMultiple,
        options: newVariant.options.map(opt => ({
          id: uuidv4(),
          label: opt.label,
          priceModifier: opt.priceModifier,
          isDefault: opt.isDefault,
          isAvailable: opt.isAvailable
        }))
      };
      
      form.setValue("variants", [...variants, variant]);
      setNewVariant({
        name: "",
        isRequired: false,
        allowMultiple: false,
        options: [{ label: "", priceModifier: 0, isDefault: false, isAvailable: true }]
      });
      setIsAddingVariant(false);
    }
  };

  const removeVariant = (id: string) => {
    form.setValue("variants", variants.filter(v => v.id !== id));
  };

  const addOption = () => {
    setNewVariant(prev => ({
      ...prev,
      options: [...prev.options, { label: "", priceModifier: 0, isDefault: false, isAvailable: true }]
    }));
  };

  const removeOption = (index: number) => {
    setNewVariant(prev => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index)
    }));
  };

  const updateOption = (index: number, field: string, value: any) => {
    setNewVariant(prev => ({
      ...prev,
      options: prev.options.map((opt, i) => 
        i === index ? { ...opt, [field]: value } : opt
      )
    }));
  };

  const addAddOn = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    const newAddOn = {
      id: uuidv4(),
      label: "",
      priceModifier: 0,
      isDefault: false,
      maxAllowed: 1,
      isRequired: false
    };
    form.setValue("addOns", [...addOns, newAddOn]);
  };

  const removeAddOn = (id: string) => {
    form.setValue("addOns", addOns.filter(a => a.id !== id));
  };

  const updateAddOn = (id: string, field: string, value: any) => {
    form.setValue("addOns", addOns.map(addon => 
      addon.id === id ? { ...addon, [field]: value } : addon
    ));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Settings className="h-5 w-5" />
          <span>Variants & Add-ons</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Variants Section */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Variants</h3>
              <p className="text-xs text-muted-foreground max-w-md">
                Create different options for your meal like sizes (Small, Medium, Large), spice levels, or cooking styles. 
                Each variant can modify the base price and customers can choose from these options.
              </p>
            </div>
            <Dialog open={isAddingVariant} onOpenChange={setIsAddingVariant}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" type="button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Variant
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Variant</DialogTitle>
                </DialogHeader>
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      Variants are different options for the same meal (e.g., Small/Medium/Large sizes). 
                      Each option can have a different price modifier.
                    </AlertDescription>
                  </Alert>

                  <div>
                    <Label htmlFor="variant-name">Variant Group Name</Label>
                    <Input
                      id="variant-name"
                      placeholder="e.g., Size, Spice Level, Cooking Style"
                      value={newVariant.name}
                      onChange={(e) => setNewVariant(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newVariant.isRequired}
                        onCheckedChange={(checked) => setNewVariant(prev => ({ ...prev, isRequired: checked }))}
                      />
                      <div>
                        <Label>Required Selection</Label>
                        <p className="text-xs text-muted-foreground">Customer must choose an option</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={newVariant.allowMultiple}
                        onCheckedChange={(checked) => setNewVariant(prev => ({ ...prev, allowMultiple: checked }))}
                      />
                      <div>
                        <Label>Allow Multiple</Label>
                        <p className="text-xs text-muted-foreground">Customer can select multiple options</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Label>Variant Options</Label>
                      <Button variant="outline" size="sm" onClick={addOption} type="button">
                        <Plus className="h-3 w-3 mr-1" />
                        Add Option
                      </Button>
                    </div>
                    <div className="space-y-3">
                      {newVariant.options.map((option, index) => (
                        <div key={index} className="p-4 border rounded-lg space-y-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            <div>
                              <Label className="text-xs">Option Label</Label>
                              <Input
                                placeholder="e.g., Small, Medium, Large"
                                value={option.label}
                                onChange={(e) => updateOption(index, 'label', e.target.value)}
                              />
                            </div>
                            <div>
                              <Label className="text-xs">Price Modifier ($)</Label>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                value={option.priceModifier}
                                onChange={(e) => updateOption(index, 'priceModifier', Number(e.target.value))}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4">
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={option.isDefault}
                                  onCheckedChange={(checked) => updateOption(index, 'isDefault', checked)}
                                />
                                <Label className="text-xs">Default Selection</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Switch
                                  checked={option.isAvailable}
                                  onCheckedChange={(checked) => updateOption(index, 'isAvailable', checked)}
                                />
                                <Label className="text-xs">Available</Label>
                              </div>
                            </div>
                            {newVariant.options.length > 1 && (
                              <Button variant="ghost" size="sm" onClick={() => removeOption(index)} type="button">
                                <X className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddingVariant(false)} type="button">
                      Cancel
                    </Button>
                    <Button onClick={addVariant} type="button">
                      Add Variant
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
          
          {variants.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
              <Settings className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="font-medium">No variants added yet</p>
              <p className="text-sm">Add variants like size, spice level, or customizations</p>
            </div>
          ) : (
            <div className="space-y-4">
              {variants.map((variant) => (
                <div key={variant.id} className="p-4 border rounded-lg bg-muted/20">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{variant.name}</h4>
                      {variant.isRequired && <Badge variant="secondary">Required</Badge>}
                      {variant.allowMultiple && <Badge variant="outline">Multiple</Badge>}
                    </div>
                    <Button variant="ghost" size="sm" onClick={() => removeVariant(variant.id)} type="button">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {variant.options.map((option) => (
                      <div key={option.id} className="p-3 bg-background border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-sm">{option.label}</span>
                          <div className="flex items-center space-x-1">
                            {option.isDefault && <Badge variant="outline" className="text-xs">Default</Badge>}
                            {!option.isAvailable && <Badge variant="destructive" className="text-xs">Unavailable</Badge>}
                          </div>
                        </div>
                        {option.priceModifier !== 0 && (
                          <p className="text-xs text-muted-foreground">
                            {option.priceModifier > 0 ? '+' : ''}${option.priceModifier.toFixed(2)}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add-ons Section */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Add-ons</h3>
              <p className="text-xs text-muted-foreground max-w-md">
                Optional extras that customers can add to their meal like extra cheese, drinks, sides, or sauces. 
                Each add-on has its own price and can be set as required or optional.
              </p>
            </div>
            <Button variant="outline" size="sm" onClick={addAddOn} type="button">
              <Plus className="h-4 w-4 mr-2" />
              Add Add-on
            </Button>
          </div>
          
          {addOns.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground border-2 border-dashed rounded-lg">
              <Plus className="h-12 w-12 mx-auto mb-2 opacity-30" />
              <p className="font-medium">No add-ons added yet</p>
              <p className="text-sm">Add extras like sides, drinks, or upgrades</p>
            </div>
          ) : (
            <div className="space-y-3">
              {addOns.map((addOn) => (
                <div key={addOn.id} className="p-4 border rounded-lg bg-muted/20">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
                    <div>
                      <Label className="text-xs">Add-on Label</Label>
                      <Input
                        placeholder="e.g., Extra Cheese"
                        value={addOn.label}
                        onChange={(e) => updateAddOn(addOn.id, 'label', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Price ($)</Label>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        value={addOn.priceModifier}
                        onChange={(e) => updateAddOn(addOn.id, 'priceModifier', Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Max Allowed</Label>
                      <Input
                        type="number"
                        placeholder="1"
                        value={addOn.maxAllowed || 1}
                        onChange={(e) => updateAddOn(addOn.id, 'maxAllowed', Number(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={addOn.isDefault}
                          onCheckedChange={(checked) => updateAddOn(addOn.id, 'isDefault', checked)}
                        />
                        <Label className="text-xs">Default</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={addOn.isRequired}
                          onCheckedChange={(checked) => updateAddOn(addOn.id, 'isRequired', checked)}
                        />
                        <Label className="text-xs">Required</Label>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <Button variant="ghost" size="sm" onClick={() => removeAddOn(addOn.id)} type="button">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}