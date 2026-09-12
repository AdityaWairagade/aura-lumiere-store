import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import { PageSpinner } from '../../components/common/Spinner';

const EMPTY = {
  name: '', brand: '', description: '', shortDescription: '',
  category: 'for-her', concentration: 'Eau de Parfum',
  price: '', stock: '',
  isFeatured: false, isNewArrival: false, isBestseller: false,
  tags: '',
};

const AdminProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;

  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isNew) {
      api.get(`/products/id/${id}`)
        .then(({ data }) => {
          const p = data.data;
          setForm({
            ...EMPTY,
            name: p.name || '',
            brand: p.brand || '',
            description: p.description || '',
            shortDescription: p.shortDescription || '',
            category: p.category || 'for-her',
            concentration: p.concentration || 'Eau de Parfum',
            price: p.price || '',
            stock: p.stock || '',
            isFeatured: p.isFeatured || false,
            isNewArrival: p.isNewArrival || false,
            isBestseller: p.isBestseller || false,
            tags: p.tags?.join(', ') || '',
          });
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }
  }, [id, isNew]);

  const set = (key) => (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
        tags: form.tags ? form.tags.split(',').map((t) => t.trim()) : [],
      };
      if (isNew) {
        await api.post('/products', payload);
        toast.success('Product created');
      } else {
        await api.put(`/products/${id}`, payload);
        toast.success('Product updated');
      }
      navigate('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <PageSpinner />;

  const textFields = [
    { key: 'name', label: 'Product Name', type: 'text', required: true },
    { key: 'brand', label: 'Brand', type: 'text', required: true },
    { key: 'shortDescription', label: 'Short Description', type: 'text' },
    { key: 'price', label: 'Base Price (USD)', type: 'number', required: true },
    { key: 'stock', label: 'Stock', type: 'number' },
    { key: 'tags', label: 'Tags (comma separated)', type: 'text' },
  ];

  return (
    <div>
      <h1 className="font-serif text-3xl font-light text-noir mb-8">
        {isNew ? 'Add Product' : 'Edit Product'}
      </h1>

      <form onSubmit={handleSubmit} className="bg-white border border-gray-100 p-6 max-w-2xl space-y-5">
        {textFields.map((f) => (
          <div key={f.key}>
            <label htmlFor={f.key} className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
              {f.label}
            </label>
            <input
              id={f.key}
              type={f.type}
              value={form[f.key]}
              onChange={set(f.key)}
              required={f.required}
              className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500"
            />
          </div>
        ))}

        <div>
          <label htmlFor="description" className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
            Description
          </label>
          <textarea
            id="description"
            rows={5}
            value={form.description}
            onChange={set('description')}
            required
            className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
              Category
            </label>
            <select id="category" value={form.category} onChange={set('category')}
              className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500">
              {['for-her', 'for-him', 'unisex', 'limited-edition', 'gift-sets'].map((c) => (
                <option key={c} value={c}>{c.replace(/-/g, ' ')}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="concentration" className="block text-[10px] tracking-widest uppercase font-sans text-gray-500 mb-2">
              Concentration
            </label>
            <select id="concentration" value={form.concentration} onChange={set('concentration')}
              className="w-full px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-gold-500">
              {['Parfum', 'Eau de Parfum', 'Eau de Toilette', 'Eau de Cologne', 'Eau Fraîche'].map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-6">
          {[
            { key: 'isFeatured', label: 'Featured' },
            { key: 'isNewArrival', label: 'New Arrival' },
            { key: 'isBestseller', label: 'Bestseller' },
          ].map((f) => (
            <label key={f.key} className="flex items-center gap-2 text-sm font-sans cursor-pointer">
              <input type="checkbox" checked={form[f.key]} onChange={set(f.key)}
                className="w-4 h-4 accent-gold-500" />
              {f.label}
            </label>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          <button type="submit" disabled={saving} className="btn-primary">
            {saving ? 'Saving...' : isNew ? 'Create Product' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/products')}
            className="btn-outline"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProductEdit;
