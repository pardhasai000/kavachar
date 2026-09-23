import React, { useState, useEffect } from 'react';
import { Users, HardHat, ShieldCheck, UserCheck, Award, Box, FileText } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function ManageUsers() {
  const { token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsers() {
      try {
        const res = await fetch('/api/users', {
          headers: { Authorization: `Bearer ${token}` }
        });
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users || []);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadUsers();
  }, [token]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
              PERSONNEL REGISTRY
            </span>
          </div>
          <h1 className="text-2xl font-black text-white mt-1">Platform Operators & Trainees</h1>
          <p className="text-xs text-slate-400">
            Registered industrial workers, plant supervisors, safety auditors, and administrators.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400">
          <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p>Loading operator registry...</p>
        </div>
      ) : (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 uppercase font-bold tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Personnel Profile</th>
                <th className="p-4">Role & Credential ID</th>
                <th className="p-4">Department / Unit</th>
                <th className="p-4 text-center">3D Drills Run</th>
                <th className="p-4 text-center">Certified Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={u.avatar || `https://api.dicebear.com/7.x/bottts/svg?seed=${u.name}`}
                        alt={u.name}
                        className="w-10 h-10 rounded-full border border-slate-700 bg-slate-800 object-cover"
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{u.name}</div>
                        <div className="text-[11px] text-slate-400">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                      u.role === 'admin'
                        ? 'bg-purple-900/60 text-purple-300 border border-purple-700/50'
                        : u.role === 'worker'
                        ? 'bg-cyan-900/60 text-cyan-300 border border-cyan-700/50'
                        : 'bg-emerald-900/60 text-emerald-300 border border-emerald-700/50'
                    }`}>
                      {u.role}
                    </span>
                    <span className="block font-mono text-slate-400 text-[10px] mt-1">
                      {u.employee_id || 'ID: PENDING'}
                    </span>
                  </td>
                  <td className="p-4 text-slate-300">{u.department || 'General Facility'}</td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-cyan-400">{u.simCount || 0}</span>
                  </td>
                  <td className="p-4 text-center">
                    <span className="font-bold text-emerald-400">{u.certCount || 0}</span>
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

