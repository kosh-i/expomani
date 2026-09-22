import React, { useState } from 'react';
import { useAppStore } from '../store/useAppStore';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell } from 'recharts';
import { ShieldAlert, CheckCircle2, XCircle, Building2, DollarSign, Users, Award, FileText } from 'lucide-react';
import VerifiedBadge from '../components/common/VerifiedBadge';

export default function AdminDashboardPage() {
  const { agencies, toggleAgencyVerification, packages, bookings } = useAppStore();

  const [activeTab, setActiveTab] = useState('overview');

  const monthlyData = [
    { month: 'May', bookings: 45, revenue: 670000 },
    { month: 'Jun', bookings: 62, revenue: 890000 },
    { month: 'Jul', bookings: 78, revenue: 1120000 },
    { month: 'Aug', bookings: 95, revenue: 1450000 },
    { month: 'Sep', bookings: 130, revenue: 1890000 },
  ];

  const categoryData = [
    { name: 'Eco-Tourism & Wildlife', value: 45, color: '#059669' },
    { name: 'Heritage & Culture', value: 30, color: '#0d9488' },
    { name: 'Sangai & Festivals', value: 15, color: '#d97706' },
    { name: 'Highland Treks', value: 10, color: '#2563eb' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-20 pt-4 text-left">
      {/* Admin Header Banner */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-3 rounded-2xl bg-amber-50 text-amber-700 border border-amber-200">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-900">Manipur Tourism Admin Control Center</h1>
            <p className="text-xs text-amber-800 font-semibold">State Tourism Board Platform Governance & Agency Audit</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-slate-100 border border-slate-200 px-3.5 py-2 rounded-2xl">
          <span>Super Admin Access</span>
        </div>
      </div>

      {/* Platform KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Total Platform Revenue</span>
          <h3 className="text-xl font-extrabold text-amber-700">₹60,20,000</h3>
          <span className="text-[10px] text-emerald-700 font-bold">100% Verified Transfers</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Registered Agencies</span>
          <h3 className="text-xl font-extrabold text-slate-900">{agencies.length} Operators</h3>
          <span className="text-[10px] text-emerald-700 font-bold">{agencies.filter(a => a.verified).length} Verified</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Active Tour Packages</span>
          <h3 className="text-xl font-extrabold text-emerald-700">{packages.length}</h3>
          <span className="text-[10px] text-slate-500 font-medium">Average Eco Score 93/100</span>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200 space-y-1 shadow-sm">
          <span className="text-[10px] text-slate-500 uppercase font-bold">Total Bookings</span>
          <h3 className="text-xl font-extrabold text-teal-700">410 Completed</h3>
          <span className="text-[10px] text-slate-500 font-medium">0 Fraud Flags</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'overview' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Analytics & Recharts Overview
        </button>
        <button
          onClick={() => setActiveTab('verifications')}
          className={`px-4 py-2 rounded-xl text-xs font-bold ${activeTab === 'verifications' ? 'bg-amber-500 text-slate-950 shadow-sm' : 'bg-white text-slate-600 border border-slate-200'}`}
        >
          Agency Verification Queue ({agencies.filter(a => !a.verified).length} Pending)
        </button>
      </div>

      {/* RECHARTS ANALYTICS OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {/* Monthly Bookings Growth Bar Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Monthly Bookings Growth</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
                  <YAxis stroke="#64748b" fontSize={12} />
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }} />
                  <Bar dataKey="bookings" fill="#059669" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Tourism Category Pie Chart */}
          <div className="bg-white p-6 rounded-3xl border border-slate-200 space-y-4 shadow-sm">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Revenue Distribution by Theme</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', color: '#0f172a', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.08)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* AGENCY VERIFICATION QUEUE */}
      {activeTab === 'verifications' && (
        <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-xs text-slate-700">
            <thead className="bg-slate-100 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-4">Agency Name</th>
                <th className="p-4">License Number</th>
                <th className="p-4">Contact Phone & Email</th>
                <th className="p-4">Verification Status</th>
                <th className="p-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {agencies.map((ag) => (
                <tr key={ag.id} className="hover:bg-slate-50">
                  <td className="p-4 font-bold text-slate-900">{ag.name}</td>
                  <td className="p-4 font-mono">{ag.license}</td>
                  <td className="p-4">{ag.email}</td>
                  <td className="p-4">
                    {ag.verified ? (
                      <span className="px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold border border-blue-200">
                        Verified Operator ✓
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold border border-amber-200">
                        Pending Audit ⌛
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => toggleAgencyVerification(ag.id)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-[11px] transition-colors ${
                        ag.verified
                          ? 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          : 'bg-emerald-600 text-white shadow-sm'
                      }`}
                    >
                      {ag.verified ? 'Revoke Seal' : 'Approve & Issue Seal'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
