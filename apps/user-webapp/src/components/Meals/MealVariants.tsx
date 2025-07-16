'use client';

import { useState } from 'react';
import { Button } from '@user-webapp/components/ui/button';
import { MealVariant } from '@user-webapp/types/meal';

type Props = {
  variants: MealVariant[];
};

export default function MealVariants({ variants }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (name: string) => {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  if (variants.length <= 1) return null;

  return (
    <div className="space-y-2">
      <h3 className="font-medium">Size</h3>
      <div className="flex gap-2">
        {variants.map((variant) => {
          const isSelected = selected.includes(variant.name);

          return (
            <Button
              key={variant.name}
              onClick={() => toggle(variant.name)}
              className={`
                flex-1 
                transition-all
                ${isSelected
                  ? 'bg-primary text-white shadow-md'
                  : 'bg-background border border-border text-foreground hover:bg-muted'}
              `}
            >
              {variant.name} - {variant.price}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
