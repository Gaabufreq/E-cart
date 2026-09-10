import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Mail, Shield, Calendar, User as UserIcon } from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-6 pb-6 border-b border-slate-100">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-200"
            />
          ) : (
            <div className="w-20 h-20 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-bold text-2xl">
              {user.name ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-8 h-8" />}
            </div>
          )}
          <div>
            <h1 className="font-heading font-extrabold text-2xl text-slate-800">{user.name}</h1>
            <p className="text-xs text-slate-500 capitalize">{user.role || 'Customer'}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Mail className="w-5 h-5 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Email</span>
              <span className="text-sm font-semibold text-slate-700">{user.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Shield className="w-5 h-5 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Account Type</span>
              <span className="text-sm font-semibold text-slate-700 capitalize">{user.role || 'User'}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
            <Calendar className="w-5 h-5 text-slate-400" />
            <div>
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Joined Date</span>
              <span className="text-sm font-semibold text-slate-700">
                {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};