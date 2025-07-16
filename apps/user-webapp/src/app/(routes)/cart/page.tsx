"use client"

import { useState } from "react"
import { Trash2, Plus, Minus } from "lucide-react"
import { Button } from "@user-webapp/components/ui/button"
import { Card } from "@user-webapp/components/ui/card"
import { Separator } from "@user-webapp/components/ui/separator"
import Link from "next/link"

// Mock data - replace with actual data from your backend
const initialCartItems = [
  {
    id: 1,
    name: "Grilled Salmon Bowl",
    restaurant: "Ocean Fresh",
    price: 24.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  },
  {
    id: 2,
    name: "Vegetarian Meal Plan - 5 Days",
    restaurant: "Green Eats",
    price: 89.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
  }
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    )
  }

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const tax = subtotal * 0.1
  const total = subtotal + tax

  return (
    <div className="container py-8 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>
      
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4">
          {cartItems.length === 0 ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
              <Link className="mt-4" href="/">Continue Shopping</Link>
            </Card>
          ) : (
            cartItems.map((item) => (
              <Card key={item.id} className="p-4">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.restaurant}</p>
                    <p className="font-medium mt-2">${item.price.toFixed(2)}</p>
                    
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeItem(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

        <div className="md:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax (10%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}