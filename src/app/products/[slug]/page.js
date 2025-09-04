'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { addConfigured } from '../../../../lib/cart';

const shapeSvgs = {
  rectangle: ({ fill, stroke }) => (
    <rect x="10" y="10" width="280" height="180" rx="18" fill={fill} stroke={stroke} strokeWidth="6" />
  ),
  oval: ({ fill, stroke }) => (
    <ellipse cx="150" cy="100" rx="140" ry="80" fill={fill} stroke={stroke} strokeWidth="6" />
  ),
  scallop: ({ fill, stroke }) => (
    // simple cloud-like scallop path
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
  Script: 'cursive',
};

export default function ProductConfigurator({ params }) {
  const { slug } = params;

  const [product, setProduct] = useState(null);
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(true);

  const [shape, setShape] = useState('rectangle');
  const [materialId, setMaterialId] = useState('');
  const [colorId, setColorId] = useState('');
  const [borderId, setBorderId] = useState('');
  const [monogramOn, setMonogramOn] = useState(false);
  const [monogramText, setMonogramText] = useState('');
  const [monogramFont, setMonogramFont] = useState('Serif');

  useEffect(() => {
    const load = async () => {
      try {
        const [prodRes, colorRes] = await Promise.all([
          fetch('/data/products.json'),
          fetch('/data/colors.json'),
        ]);
        const [prodData, colorData] = await Promise.all([
          prodRes.json(),
          colorRes.json(),
        ]);
        const p = prodData.find((x) => x.slug === slug);
        setProduct(p || null);
        setPalette(colorData || []);
        if (p) {
          setShape(p.shapes?.[0] || 'rectangle');
          setMaterialId(p.materials?.[0]?.id || '');
          setColorId(p.defaultColor || colorData?.[0]?.id || '');
          setBorderId(p.defaultBorder || colorData?.[0]?.id || '');
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  const colorById = useMemo(() => {
    const map = {};
    palette.forEach((c) => {
      map[c.id] = c;
    });
    return map;
  }, [palette]);

  const material = useMemo(() => product?.materials?.find((m) => m.id === materialId), [product, materialId]);

  const price = useMemo(() => {
    if (!product) return 0;
    const base = product.basePrice || 0;
    const addMat = material?.add || 0;
    const mono = monogramOn ? (product.monogramPrice || 0) : 0;
    const borderDiff = colorId && borderId && colorId !== borderId ? (product.borderDiffPrice || 0) : 0;
    return base + addMat + mono + borderDiff;
  }, [product, material, monogramOn, colorId, borderId]);

  const handleMonogramTextChange = (e) => {
    const v = (e.target.value || '').toUpperCase().slice(0, 3).replace(/[^A-Z]/g, '');
    setMonogramText(v);
  };

  const handleAddToCart = () => {
    if (!product) return;
    const cfg = {
      shape,
      materialId,
      materialName: product.materials.find(m=>m.id===materialId)?.name || materialId,
      colorId,
      colorName: colorById[colorId]?.name || colorId,
      borderId,
      borderName: colorById[borderId]?.name || borderId,
      monogramOn,
      monogramText: monogramOn ? monogramText : '',
      monogramFont,
      price,
    };
    addConfigured(product, cfg);
    alert('Added to cart');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-zinc-600">Loading…</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-zinc-600">Product not found.</div>
      </div>
    );
  }

  const placematColor = colorById[colorId]?.hex || '#ffffff';
  const borderColor = colorById[borderId]?.hex || '#000000';
  const ShapeEl = shapeSvgs[shape] || shapeSvgs.rectangle;

  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-8">
          <Link href="/products" className="text-zinc-600 hover:text-zinc-900">← Back to Products</Link>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="bg-white ring-1 ring-zinc-200/60 rounded-xl p-6 lg:p-8">
            <div className="aspect-[4/3] w-full flex items-center justify-center">
              <svg viewBox="0 0 300 200" className="w-full h-auto">
                <ShapeEl fill={placematColor} stroke={borderColor} />
                {monogramOn && monogramText ? (
                  <text
                    x="150"
                    y="110"
                    textAnchor="middle"
                    fontFamily={fontFamilies[monogramFont]}
                    fontSize="24"
                    fill="#111827"
                  >
                    {monogramText}
                  </text>
                ) : null}
              </svg>
            </div>
          </div>

          <div>
            <h1 className="text-3xl lg:text-4xl font-serif font-bold text-zinc-900 mb-6">{product.name}</h1>

            <div className="space-y-8">
              <div>
                <h2 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Shape</h2>
                <div className="flex flex-wrap gap-3">
                  {product.shapes.map((s) => (
                    <label key={s} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="shape"
                        value={s}
                        checked={shape === s}
                        onChange={() => setShape(s)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setShape(s)}
                        aria-pressed={shape === s}
                        className={`px-4 py-2 rounded-xl border ${shape === s ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'}`}
                        title={s}
                        aria-label={s}
                      >
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Material</h2>
                <div className="flex flex-wrap gap-3">
                  {product.materials.map((m) => (
                    <label key={m.id} className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="material"
                        value={m.id}
                        checked={materialId === m.id}
                        onChange={() => setMaterialId(m.id)}
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => setMaterialId(m.id)}
                        aria-pressed={materialId === m.id}
                        className={`px-4 py-2 rounded-xl border ${materialId === m.id ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'}`}
                        title={m.name}
                        aria-label={m.name}
                      >
                        {m.name}{m.add !== 0 ? ` (${m.add > 0 ? '+' : ''}€${(m.add/100).toFixed(2)})` : ''}
                      </button>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Placemat Color</h2>
                <div className="grid grid-cols-6 gap-3">
                  {palette.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setColorId(c.id)}
                      aria-pressed={colorId === c.id}
                      title={c.name}
                      aria-label={c.name}
                      className={`h-10 w-10 rounded-full border ${colorId === c.id ? 'ring-2 ring-zinc-900 border-zinc-900' : 'border-zinc-300'}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Border Color</h2>
                <div className="grid grid-cols-6 gap-3">
                  {palette.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setBorderId(c.id)}
                      aria-pressed={borderId === c.id}
                      title={c.name}
                      aria-label={`Border ${c.name}`}
                      className={`h-10 w-10 rounded-full border ${borderId === c.id ? 'ring-2 ring-zinc-900 border-zinc-900' : 'border-zinc-300'}`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-sm uppercase tracking-wide text-zinc-600 mb-3">Monogram</h2>
                <div className="flex items-center gap-4 mb-3">
                  <button
                    type="button"
                    onClick={() => setMonogramOn((v) => !v)}
                    aria-pressed={monogramOn}
                    className={`px-4 py-2 rounded-xl border ${monogramOn ? 'bg-zinc-900 text-white border-zinc-900' : 'border-zinc-300 text-zinc-900 hover:bg-zinc-100'}`}
                    aria-label="Toggle monogram"
                  >
                    {monogramOn ? 'ON' : 'OFF'}
                  </button>
                  {monogramOn ? (
                    <span className="text-sm text-zinc-600">+ €{((product.monogramPrice||0)/100).toFixed(2)}</span>
                  ) : null}
                </div>
                {monogramOn ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      value={monogramText}
                      onChange={handleMonogramTextChange}
                      maxLength={3}
                      pattern="[A-Z]{1,3}"
                      placeholder="ABC"
                      aria-label="Monogram text"
                      className="w-full sm:w-40 px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    />
                    <select
                      value={monogramFont}
                      onChange={(e) => setMonogramFont(e.target.value)}
                      aria-label="Monogram font"
                      className="w-full sm:w-56 px-3 py-2 rounded-xl border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                    >
                      {Object.keys(fontFamilies).map((f) => (
                        <option key={f} value={f}>{f}</option>
                      ))}
                    </select>
                  </div>
                ) : null}
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-2xl font-serif font-bold text-zinc-900">€{(price/100).toFixed(2)}</div>
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
    </div>
  );
}


