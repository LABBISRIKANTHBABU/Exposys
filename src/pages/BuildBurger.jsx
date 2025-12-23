import React, { useState, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import {
  getIngredientsByCategory,
  getIngredientById,
  calculateTotalPrice
} from "../constants/burgerData"
import { useCart } from "../contexts/CartContext"
import { toast } from "sonner"
import "./BuildBurger.css"

// Category labels for display
const categoryLabels = {
  bun: "🍞 Buns",
  protein: "🥩 Proteins",
  cheese: "🧀 Cheese",
  veggie: "🥬 Veggies",
  sauce: "🍅 Sauces"
}

const BurgerBuilder = () => {
  // State for selected ingredients
  const [selectedIngredients, setSelectedIngredients] = useState([
    "sesame-bun",
    "aloo-tikki",
    "cheddar",
    "lettuce"
  ])

  const { addToCart } = useCart()

  const totalPrice = useMemo(() => {
    return calculateTotalPrice(selectedIngredients)
  }, [selectedIngredients])

  const addIngredient = ingredientId => {
    setSelectedIngredients(prev => [...prev, ingredientId])
  }

  const removeIngredient = ingredientId => {
    setSelectedIngredients(prev => {
      const index = prev.findIndex(id => id === ingredientId)
      if (index > -1) {
        return [...prev.slice(0, index), ...prev.slice(index + 1)]
      }
      return prev
    })
  }

  const getIngredientCount = ingredientId => {
    return selectedIngredients.filter(id => id === ingredientId).length
  }

  const handleAddToCart = () => {
    if (selectedIngredients.length === 0) {
      toast.error("Please add some ingredients to your burger!")
      return
    }

    const customId = `custom-${Date.now()}`

    const customProduct = {
      _id: customId,
      name: "Custom Burger",
      price: totalPrice,
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
      isCustom: true
    };

    const ingredientObjects = selectedIngredients.map(id => getIngredientById(id)).filter(Boolean);

    addToCart(customProduct, ingredientObjects, 1)

    toast.success("Custom burger added to cart!")
  }

  const resetBurger = () => {
    setSelectedIngredients(["sesame-bun", "aloo-tikki", "cheddar", "lettuce"])
  }

  const categories = ["bun", "protein", "cheese", "veggie", "sauce"]

  return (
    <section id="builder" className="burger-builder-section">
      <div className="container">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="builder-header"
        >
          <h2 className="builder-title">Build Your Own</h2>
          <p className="builder-subtitle">
            Create your perfect burger by selecting ingredients below
          </p>
        </motion.div>

        <div className="builder-grid">
          {/* Burger Preview */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="preview-container"
          >
            <div className="card preview-card">
              <h3 className="preview-title">Your Burger</h3>

              {/* Visual Burger Stack */}
              <div className="visual-stack">
                {/* Top Bun */}
                <div className="bun-top">
                  <div className="seeds">
                    <div className="seed"></div>
                    <div className="seed"></div>
                    <div className="seed"></div>
                  </div>
                </div>

                {/* Ingredients Stack */}
                <div className="ingredients-stack">
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
                            className="ingredient-layer"
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
                <div className="bun-bottom"></div>
              </div>

              {/* Selected Ingredients List */}
              <div className="selected-list">
                <h4 className="selected-title">Ingredients:</h4>
                <div className="tags-container">
                  {selectedIngredients.length > 0 ? (
                    [...new Set(selectedIngredients)].map(id => {
                      const ingredient = getIngredientById(id)
                      const count = getIngredientCount(id)
                      return ingredient ? (
                        <span key={id} className="ingredient-tag">
                          {ingredient.emoji} {ingredient.name} {count > 1 ? `x${count}` : ""}
                        </span>
                      ) : null
                    })
                  ) : (
                    <span className="text-gray-500 text-sm">No ingredients selected</span>
                  )}
                </div>
              </div>

              {/* Total Price */}
              <div className="total-section">
                <span className="total-price">₹{totalPrice}</span>
                <div className="action-buttons">
                  <button className="btn btn-secondary" onClick={resetBurger}>
                    Reset
                  </button>
                  <button className="btn btn-primary" onClick={handleAddToCart}>
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Ingredient Selection */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="selection-container"
          >
            {categories.map(category => {
              const categoryIngredients = getIngredientsByCategory(category)

              return (
                <div key={category} className="card category-card">
                  <h3 className="category-title">
                    {categoryLabels[category]}
                  </h3>
                  <div className="ingredients-grid">
                    {categoryIngredients.map(ingredient => {
                      const count = getIngredientCount(ingredient.id)

                      return (
                        <div key={ingredient.id} className="ingredient-item">
                          <div className="item-info">
                            <span className="item-emoji">{ingredient.emoji}</span>
                            <div>
                              <p className="item-name">{ingredient.name}</p>
                              <p className="item-price">₹{ingredient.price}</p>
                            </div>
                          </div>
                          <div className="item-controls">
                            <button
                              className="ctrl-btn"
                              onClick={() => removeIngredient(ingredient.id)}
                              disabled={count === 0}
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="count-display">{count}</span>
                            <button
                              className="ctrl-btn"
                              onClick={() => addIngredient(ingredient.id)}
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default BurgerBuilder