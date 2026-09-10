import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PackagePlus, ShoppingCart, ArrowLeft } from 'lucide-react';

export const AdminSidebar = () => {
  const links = [
    { name: 'Overview', path: '/admin/dashboard', icon: LayoutDashboard },
    { name: 'Manage Products', path: '/admin/products', icon: PackagePlus },
    { name: 'Manage Orders', path: '/admin/orders', icon: ShoppingCart },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-5 flex flex-col justify-between border-r border-slate-800">
      <div>
        <div className="mb-8">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Admin Control Panel</h2>
          <p className="text-lg font-heading font-extrabold text-brand-buy">VibrantTech</p>
        </div>

        <nav className="space-y-2">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                    isActive
                      ? 'bg-brand-buy text-white shadow-lg'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>
      </div>

      <NavLink
        to="/"
        className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition pt-4 border-t border-slate-800"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Customer Store
      </NavLink>
    </aside>
  );
};