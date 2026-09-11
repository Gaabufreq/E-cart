import React, { useEffect, useState } from 'react';
import { getAllProductsApi, createProductApi, updateProductApi, deleteProductApi } from '../../api/product.api';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { Modal } from '../../components/common/Modal';
import { Badge } from '../../components/common/Badge';
import { Loader } from '../../components/common/Loader';

export const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Gaming',
    stock: '',
  });
  const [selectedFiles, setSelectedFiles] = useState([]);

  const categories = ['Gaming', 'Audio', 'Accessories', 'Laptops', 'Wearables'];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await getAllProductsApi();
      setProducts(res.data || []);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        title: product.title || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || 'Gaming',
        stock: product.stock || '',
      });
    } else {
      setEditingProduct(null);
      setFormData({
        title: '',
        description: '',
        price: '',
        category: 'Gaming',
        stock: '',
      });
    }
    setSelectedFiles([]);
    setIsModalOpen(true);
  };

  const handleFileChange = (e) => {
    setSelectedFiles(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSubmitting(true);
      const data = new FormData();
      data.append('title', formData.title);
      data.append('description', formData.description);
      data.append('price', formData.price);
      data.append('category', formData.category);
      data.append('stock', formData.stock);

      selectedFiles.forEach((file) => {
        data.append('images', file);
      });

      if (editingProduct) {
        await updateProductApi(editingProduct._id, data);
      } else {
        await createProductApi(data);
      }

      setIsModalOpen(false);
      fetchProducts();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save product');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProductApi(id);
        fetchProducts();
      } catch (error) {
        alert('Failed to delete product');
      }
    }
  };

  return (
    <div className="p-4 sm:p-8 flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900">Product Management</h1>
          <p className="text-xs text-slate-500">Add, edit, or remove store inventory items</p>
        </div>
        <Button variant="buy" icon={Plus} onClick={() => handleOpenModal()}>
          Add New Product
        </Button>
      </div>

      {loading ? (
        <Loader text="Fetching Inventory..." />
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider">
                <tr>
                  <th className="p-4">Product</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price</th>
                  <th className="p-4">Stock</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-8 text-slate-400">
                      No products found. Click "Add New Product" to create one.
                    </td>
                  </tr>
                ) : (
                  products.map((p) => (
                    <tr key={p._id} className="hover:bg-slate-50/50 transition">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={p.images?.[0] || 'https://via.placeholder.com/40'}
                          alt={p.title}
                          className="w-10 h-10 object-contain rounded-lg bg-slate-100 p-1 border border-slate-200 shrink-0"
                        />
                        <span className="font-bold text-slate-800 line-clamp-1 max-w-xs">{p.title}</span>
                      </td>
                      <td className="p-4">
                        <span className="bg-slate-100 text-slate-700 font-semibold px-2.5 py-1 rounded-md">
                          {p.category}
                        </span>
                      </td>
                      <td className="p-4 font-bold text-slate-900">₹{p.price?.toLocaleString('en-IN')}</td>
                      <td className="p-4">
                        {p.stock > 0 ? (
                          <Badge variant="accent">{p.stock} in stock</Badge>
                        ) : (
                          <Badge variant="danger">Out of stock</Badge>
                        )}
                      </td>
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => handleOpenModal(p)}
                          className="p-1.5 text-slate-500 hover:text-brand-cart bg-slate-100 hover:bg-slate-200 rounded-lg transition"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(p._id)}
                          className="p-1.5 text-rose-500 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? 'Edit Product' : 'Add New Product'}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Product Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g. Wireless Gaming Mouse"
            required
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Description</label>
            <textarea
              rows="3"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed product features..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-cart"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Price (₹)"
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              placeholder="2999"
              required
            />
            <Input
              label="Stock Quantity"
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
              placeholder="50"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Category</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-none focus:border-brand-cart bg-white"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700">Upload Product Images</label>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileChange}
              className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-brand-cart file:text-white hover:file:bg-blue-600 cursor-pointer"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="ghost" type="button" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="buy" type="submit" loading={submitting}>
              {editingProduct ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};