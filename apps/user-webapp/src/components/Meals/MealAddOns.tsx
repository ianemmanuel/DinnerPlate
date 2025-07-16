'use client';

import { useState } from 'react';
import { Button } from '@user-webapp/components/ui/button';
import { MealAddOn } from '@user-webapp/types/meal';

type Props = {
  addOns: MealAddOn[];
};

export default function MealAddOns({ addOns }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  if (addOns.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Add-ons</h3>
      <div className="grid grid-cols-2 gap-2">
        {addOns.map((addOn) => {
          const isSelected = selected.includes(addOn.name);

          return (
            <Button
              key={addOn.name}
              onClick={() => toggle(addOn.name)}
              className={`
                flex justify-between 
                transition-all
                ${isSelected
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-background border border-border text-foreground hover:bg-muted'}
              `}
            >
              <span>{addOn.name}</span>
              <span className="text-sm">
                +{addOn.price}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
