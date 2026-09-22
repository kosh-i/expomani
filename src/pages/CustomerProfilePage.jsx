import React from 'react';
import { useAppStore } from '../store/useAppStore';

export default function CustomerProfilePage() {
  const { user, logout } = useAppStore();

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-extrabold text-slate-900">My Profile</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-rose-100 text-rose-700 font-bold rounded-lg hover:bg-rose-200 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-slate-800">
        <h2 className="text-xl font-bold border-b pb-2">Account Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-slate-500 font-semibold">Name</p>
            <p className="font-medium">{user?.name}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-semibold">Email</p>
            <p className="font-medium">{user?.email}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 font-semibold">Role</p>
            <p className="font-medium capitalize">{user?.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
