// src/app/customize/page.js
"use client";

import { useEffect, useMemo, useState } from "react";
import { addConfigured } from "../../../lib/cart";
import { useCart } from "../../../lib/CartContext";
import products from "../../../data/products.json";
import colors from "../../../data/colors.json";

// SVG shape components for the configurator
const shapeSvgs = {
  rectangle: ({ fill, stroke }) => (
    <rect
      x="10"
      y="10"
      width="280"
      height="180"
      rx="18"
      fill={fill}
      stroke={stroke}
      strokeWidth="6"
    />
  ),
  oval: ({ fill, stroke }) => (
    <ellipse cx="150" cy="100" rx="140" ry="80" fill={fill} stroke={stroke} strokeWidth="6" />
  ),
  scallop: ({ fill, stroke }) => (
    <path
      d="M60,60
         C40,40 40,20 60,20
         C80,20 80,40 100,40
         C120,40 120,20 140,20
         C160,20 160,40 180,40
         C200,40 200,20 220,20
         C240,20 240,40 220,60
         C240,80 240,100 220,120
         C240,140 240,160 220,180
         C200,200 200,180 180,180
         C160,180 160,200 140,200
         C120,200 120,180 100,180
         C80,180 80,200 60,180
         C40,160 40,140 60,120
         C40,100 40,80 60,60 Z"
      fill={fill}
      stroke={stroke}
      strokeWidth="6"
    />
  ),
};

const fontFamilies = {
  Serif: 'ui-serif, Georgia, Cambria, "Times New Roman", Times, serif',
  Sans: 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif',
  Script: "cursive",
};

export default function Customize() {
  // Configuration state
  const [selectedProduct, setSelectedProduct] = useState(products[0] || null);
  const [shape, setShape] = useState("rectangle");
  const [materialId, setMaterialId] = useState("");
  const [colorId, setColorId] = useState("");
  const [borderId, setBorderId] = useState("");
  const [monogramOn, setMonogramOn] = useState(false);
  const [monogramText, setMonogramText] = useState("");
  const [monogramFont, setMonogramFont] = useState("Serif");

  // Initialize with default product data
  useEffect(() => {
    if (products.length > 0 && !selectedProduct) {
      const defaultProduct = products[0];
      setSelectedProduct(defaultProduct);
      setShape(defaultProduct.shapes?.[0] || "rectangle");
      setMaterialId(defaultProduct.materials?.[0]?.id || "");
      setColorId(defaultProduct.defaultColor || colors?.[0]?.id || "");
      setBorderId(defaultProduct.defaultBorder || colors?.[0]?.id || "");
    }
  }, [selectedProduct]);

  const colorById = useMemo(() => {
    const map = {};
    colors.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, []);

  const material = useMemo(
    () => selectedProduct?.materials?.find((m) => m.id === materialId),
    [selectedProduct, materialId]
  );

  const price = useMemo(() => {
    if (!selectedProduct) return 0;
    const base = selectedProduct.basePrice || 0;
    const addMat = material?.add || 0;
    const mono = monogramOn ? selectedProduct.monogramPrice || 0 : 0;
    const borderDiff =
      colorId && borderId && colorId !== borderId ? selectedProduct.borderDiffPrice || 0 : 0;
    return base + addMat + mono + borderDiff;
  }, [selectedProduct, material, monogramOn, colorId, borderId]);

  const handleMonogramTextChange = (e) => {
    const v = (e.target.value || "").toUpperCase().slice(0, 3).replace(/[^A-Z]/g, "");
    setMonogramText(v);
  };

  const { updateCart } = useCart();

  const handleAddToCart = () => {
    if (!selectedProduct) return;
    const cfg = {
      shape,
      materialId,
      materialName:
        selectedProduct.materials.find((m) => m.id === materialId)?.name || materialId,
      colorId,
      colorName: colorById[colorId]?.name || colorId,
      borderId,
      borderName: colorById[borderId]?.name || borderId,
      monogramOn,
      monogramText: monogramOn ? monogramText : "",
      monogramFont,
      price,
    };
    const newCart = addConfigured(selectedProduct, cfg);
    updateCart(newCart);
    alert("Added to cart");
  };

  if (!selectedProduct || products.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-zinc-600">No products available.</div>
      </div>
    );
  }

  const placematColor = colorById[colorId]?.hex || "#ffffff";
  const borderColor = colorById[borderId]?.hex || "#000000";
  const ShapeEl = shapeSvgs[shape] || shapeSvgs.rectangle;

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-zinc-900 mb-4">
            Customize Your Placemats
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
            Craftsmanship is our strength: MB Maison offers products tailored to each customer&apos;s
            specific needs.
          </p>
        </div>

        {/* 3-column grid: preview (2 cols) + panel (1 col) */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Preview (left 2 columns) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 flex items-center justify-center">
              <div className="w-full max-w-xl">
                <div className="relative">
                  <svg viewBox="0 0 300 200" className="w-full h-auto">
                    <ShapeEl fill={placematColor} stroke={borderColor} />
                    {monogramOn && monogramText && (
                      <text
                        x="150"
                        y="110"
                        textAnchor="middle"
                        fontSize="28"
                        fill={borderColor}
                        style={{ fontFamily: fontFamilies[monogramFont] }}
                      >
                        {monogramText}
                      </text>
                    )}
                  </svg>
                </div>
                <div className="mt-4 text-center text-sm text-zinc-600">
                  Preview — colors and proportions are indicative.
                </div>
              </div>
            </div>
          </div>

          {/* Configuration Panel (right 1 column) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-zinc-200 p-6 sticky top-8">
              <h2 className="text-xl font-serif font-semibold text-zinc-900 mb-6">Configuration</h2>

              <div className="space-y-6">
                {/* Product Selection */}
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Product</h3>
                  <div className="flex flex-wrap gap-3">
                    {products.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setSelectedProduct(product);
                          setShape(product.shapes?.[0] || "rectangle");
                          setMaterialId(product.materials?.[0]?.id || "");
                          setColorId(product.defaultColor || colors?.[0]?.id || "");
                          setBorderId(product.defaultBorder || colors?.[0]?.id || "");
                        }}
                        className={`px-4 py-2 rounded-xl border ${
                          selectedProduct?.id === product.id
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                        }`}
                      >
                        {product.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Shape Selection */}
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Shape</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct?.shapes?.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setShape(s)}
                        className={`px-4 py-2 rounded-xl border ${
                          shape === s
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                        }`}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Material Selection */}
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Material</h3>
                  <div className="flex flex-wrap gap-3">
                    {selectedProduct?.materials?.map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setMaterialId(m.id)}
                        className={`px-4 py-2 rounded-xl border ${
                          materialId === m.id
                            ? "bg-zinc-900 text-white border-zinc-900"
                            : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                        }`}
                      >
                        {m.name}
                        {m.add !== 0 ? ` (${m.add > 0 ? "+" : ""}€${(m.add / 100).toFixed(2)})` : ""}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Placemat Color */}
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">
                    Placemat Color
                  </h3>
                  <div className="grid grid-cols-6 gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setColorId(c.id)}
                        className={`h-10 w-10 rounded-full border ${
                          colorId === c.id ? "ring-2 ring-zinc-900 border-zinc-900" : "border-zinc-300"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Border Color */}
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">
                    Border Color
                  </h3>
                  <div className="grid grid-cols-6 gap-3">
                    {colors.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setBorderId(c.id)}
                        className={`h-10 w-10 rounded-full border ${
                          borderId === c.id ? "ring-2 ring-zinc-900 border-zinc-900" : "border-zinc-300"
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Monogram */}
                <div>
                  <h3 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Monogram</h3>
                  <div className="flex items-center gap-4 mb-3">
                    <button
                      type="button"
                      onClick={() => setMonogramOn((v) => !v)}
                      className={`px-4 py-2 rounded-xl border ${
                        monogramOn
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "border-zinc-300 text-zinc-900 hover:bg-zinc-100"
                      }`}
                    >
                      {monogramOn ? "ON" : "OFF"}
                    </button>
                    {monogramOn && (
                      <span className="text-sm text-zinc-600">
                        + €{((selectedProduct.monogramPrice || 0) / 100).toFixed(2)}
                      </span>
                    )}
                  </div>

                  {monogramOn && (
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="text"
                        value={monogramText}
                        onChange={handleMonogramTextChange}
                        maxLength={3}
                        placeholder="ABC"
                        className="w-full sm:w-40 px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      />
                      <select
                        value={monogramFont}
                        onChange={(e) => setMonogramFont(e.target.value)}
                        className="w-full sm:w-56 px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                      >
                        {Object.keys(fontFamilies).map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                {/* Price + Add to Cart */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-2xl font-serif font-bold text-zinc-900">
                    €{(price / 100).toFixed(2)}
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="bg-zinc-900 text-white py-3 px-6 rounded-xl hover:bg-zinc-800 transition-all font-medium"
                  >
                    Add to Cart
                  </button>
                </div>
                <p className="text-sm text-zinc-500">Ships made-to-order. Crafted in Italy.</p>
              </div>
            </div>
          </div>
        </div>
        {/* END grid */}
      </div>
      {/* END container */}
    </div>
    /* END page wrapper */
  );
}
