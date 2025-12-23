/**
 * ========================================
 * BURGER BUILDER COMPONENT
 * ========================================
 * This component allows users to customize their burger.
 * Demonstrates: Arrays, Higher Order Functions, ES6 features
 */

import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import {
  getIngredientsByCategory,
  getIngredientById,
  calculateTotalPrice
} from "@/constants/burgerData"
import { useCart } from "@/contexts/CartContext"
import { toast } from "sonner"

// Category labels for display
const categoryLabels = {
  bun: "🍞 Buns",
  protein: "🥩 Proteins",
  cheese: "🧀 Cheese",
  veggie: "🥬 Veggies",
  sauce: "🍅 Sauces"
}

const BurgerBuilder = () => {
  // State for selected ingredients - using useState (React Hook)
  const [selectedIngredients, setSelectedIngredients] = useState([
    "sesame-bun",
    "meat-patty",
    "cheddar",
    "lettuce"
  ])

  const { addToCart } = useCart()

  /**
   * Calculate total price using useMemo for performance
   * Uses calculateTotalPrice which internally uses reduce() - Higher Order Function
   */
  const totalPrice = useMemo(() => {
    return calculateTotalPrice(selectedIngredients)
  }, [selectedIngredients])

  /**
   * Add ingredient to burger
   * Using spread operator (ES6) for immutable state update
   */
  const addIngredient = ingredientId => {
    setSelectedIngredients(prev => [...prev, ingredientId])
  }

  /**
   * Remove ingredient from burger
   * Using findIndex and filter - Higher Order Functions
   */
  const removeIngredient = ingredientId => {
    setSelectedIngredients(prev => {
      const index = prev.findIndex(id => id === ingredientId)
      if (index > -1) {
        // Create new array without the ingredient at that index
        return [...prev.slice(0, index), ...prev.slice(index + 1)]
      }
      return prev
    })
  }

  /**
   * Count occurrences of an ingredient
   * Using filter() - Higher Order Function
   */
  const getIngredientCount = ingredientId => {
    return selectedIngredients.filter(id => id === ingredientId).length
  }

  /**
   * Add custom burger to cart
   */
  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      toast.error("Please add some ingredients to your burger!")
      return
    }

    // Generate unique ID using template literal (ES6)
    const customId = `custom-${Date.now()}`

    // Adapt to existing CartContext structure
    // CartContext expects: (product, ingredients, quantity)
    // We construct a mock 'product' for the custom burger
    const customProduct = {
      _id: customId,
      name: "Custom Burger",
      price: totalPrice,
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png", // Generic burger icon
      isCustom: true
    };

    // Map ingredient IDs to names for the cart context if expected, or pass full objects
    // The previous implementation utilized names. Let's pass objects or names based on context check.
    // Looking at CartContext: `addToCart(product, ingredients = [], quantity = 1)`
    // And `cartItems` are stored.

    // We will pass the ingredient objects
    const ingredientObjects = selectedIngredients.map(id => getIngredientById(id)).filter(Boolean);

    addToCart(customProduct, ingredientObjects, 1)

    toast.success("Custom burger added to cart!")
  }

  /**
   * Reset burger to default
   */
  const resetBurger = () => {
    setSelectedIngredients(["sesame-bun", "meat-patty", "cheddar", "lettuce"])
  }

  // Get ingredients grouped by category for display
  const categories = ["bun", "protein", "cheese", "veggie", "sauce"]

  return (
    <section id="builder" className="py-20 bg-secondary/30 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
            Build Your Own
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Create your perfect burger by selecting ingredients below
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Burger Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="sticky top-24"
          >
            <Card className="p-8 bg-card border-border shadow-xl">
              <h3 className="text-2xl font-display font-bold mb-6 text-center">
                Your Burger
              </h3>

              {/* Visual Burger Stack */}
              <div className="relative min-h-[400px] flex flex-col items-center justify-center py-8">
                {/* Top Bun */}
                <div className="w-48 h-12 bg-amber-500 rounded-t-full shadow-lg relative z-10 mx-auto">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2">
                    <div className="w-2 h-2 bg-amber-200 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-200 rounded-full"></div>
                    <div className="w-2 h-2 bg-amber-200 rounded-full"></div>
                  </div>
                </div>

                {/* Ingredients Stack - Using map() - Higher Order Function */}
                <div className="flex flex-col-reverse items-center -space-y-4">
                  <AnimatePresence mode="popLayout">
                    {selectedIngredients
                      .filter(id => !id.includes("bun"))
                      .map((ingredientId, index) => {
                        const ingredient = getIngredientById(ingredientId)
                        if (!ingredient) return null

                        return (
                          <motion.div
                            key={`${ingredientId}-${index}`}
                            layout
                            initial={{ opacity: 0, scale: 0.8, y: -50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.5, x: 100 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            className="w-44 h-5 rounded-md shadow-sm border-b border-black/10 relative z-0"
                            style={{
                              backgroundColor: ingredient.color,
                              zIndex: index
                            }}
                          />
                        )
                      })}
                  </AnimatePresence>
                </div>

                {/* Bottom Bun */}
                <div className="w-48 h-8 bg-amber-500 rounded-b-lg shadow-lg mt-1 mx-auto"></div>
              </div>

              {/* Selected Ingredients List */}
              <div className="mt-8 p-4 bg-secondary/50 rounded-lg">
                <h4 className="font-semibold mb-2">Ingredients:</h4>
                <div className="flex flex-wrap gap-2">
                  {/* Using map() to render ingredient badges - Higher Order Function */}
                  {selectedIngredients.length > 0 ? (
                    // Group and count ingredients
                    [...new Set(selectedIngredients)].map(id => {
                      const ingredient = getIngredientById(id)
                      const count = getIngredientCount(id)
                      return ingredient ? (
                        <span
                          key={id}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm border border-primary/20"
                        >
                          {ingredient.emoji} {ingredient.name}{" "}
                          {count > 1 ? `x${count}` : ""}
                        </span>
                      ) : null
                    })
                  ) : (
                    <span className="text-muted-foreground">
                      No ingredients selected
                    </span>
                  )}
                </div>
              </div>

              {/* Total Price */}
              <div className="mt-6 flex items-center justify-between border-t pt-4">
                <span className="text-3xl font-display font-bold text-primary">
                  ₹{totalPrice}
                </span>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={resetBurger}>
                    Reset
                  </Button>
                  <Button onClick={handleAddToCart} className="bg-orange-600 hover:bg-orange-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Ingredient Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 pb-20"
          >
            {/* Using map() to render category sections - Higher Order Function */}
            {categories.map(category => {
              // Using getIngredientsByCategory which uses filter() internally
              const categoryIngredients = getIngredientsByCategory(category)

              return (
                <Card key={category} className="p-6 bg-card border-border shadow-sm hover:shadow-md transition-shadow">
                  <h3 className="text-xl font-display font-bold mb-4 flex items-center gap-2">
                    {categoryLabels[category]}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Using map() to render ingredients - Higher Order Function */}
                    {categoryIngredients.map(ingredient => {
                      const count = getIngredientCount(ingredient.id)

                      return (
                        <div
                          key={ingredient.id}
                          className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg hover:bg-secondary transition-colors border border-transparent hover:border-gray-200"
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-2xl">{ingredient.emoji}</span>
                            <div>
                              <p className="font-medium">{ingredient.name}</p>
                              <p className="text-sm text-muted-foreground">
                                ₹{ingredient.price}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => removeIngredient(ingredient.id)}
                              disabled={count === 0}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center font-semibold text-lg">
                              {count}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => addIngredient(ingredient.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </Card>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BurgerBuilder