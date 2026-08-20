import React, { useState, useEffect } from 'react';
import { User } from '../types.js';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

export default function AttendanceDashboard({ user }: { user: User }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, this would be a separate API endpoint for fetching dashboard data
    // For this prototype, we'll simulate it based on role
    setTimeout(() => {
      if (user.role === 'principal') {
        setData({
          overallPercentage: 89.7,
          totalStudents: 1250,
          presentToday: 1121,
          absentToday: 129,
          classBreakdown: [
            { className: 'Class 8A', percentage: 92 },
            { className: 'Class 8B', percentage: 88 },
            { className: 'Class 9A', percentage: 95 },
            { className: 'Class 10A', percentage: 85 }
          ],
          trend: [
            { date: 'Mon', percentage: 90 },
            { date: 'Tue', percentage: 89 },
            { date: 'Wed', percentage: 91 },
            { date: 'Thu', percentage: 88 },
            { date: 'Fri', percentage: 89 }
          ]
        });
      } else {
        setData({
          studentName: user.role === 'student' ? user.name : 'Rahul Sharma',
          attendancePercentage: 91.2,
          presentDays: 114,
          absentDays: 11,
          recent: [
            { date: 'Mon', status: 'present' },
            { date: 'Tue', status: 'present' },
            { date: 'Wed', status: 'absent' },
            { date: 'Thu', status: 'present' },
            { date: 'Fri', status: 'present' }
          ],
          trend: [
            { month: 'Jan', percentage: 95 },
            { month: 'Feb', percentage: 90 },
            { month: 'Mar', percentage: 92 },
            { month: 'Apr', percentage: 88 },
            { month: 'May', percentage: 91 }
          ]
        });
      }
      setLoading(false);
    }, 1000);
  }, [user]);

  if (loading) {
    return <div className="p-8 flex justify-center items-center h-full">Loading data...</div>;
  }

  if (user.role === 'principal') {
    return (
      <div className="p-8 overflow-y-auto h-full">
        <h2 className="text-2xl font-bold mb-6">School Attendance Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatCard title="Overall Attendance" value={`${data.overallPercentage}%`} />
          <StatCard title="Total Students" value={data.totalStudents} />
          <StatCard title="Present Today" value={data.presentToday} className="text-green-600" />
          <StatCard title="Absent Today" value={data.absentToday} className="text-red-600" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Class Breakdown</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.classBreakdown}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="className" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                  <Bar dataKey="percentage" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="font-bold text-lg mb-4">Weekly Trend</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.trend}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="date" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="percentage" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-y-auto h-full">
      <h2 className="text-2xl font-bold mb-6">Attendance: {data.studentName}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard title="Overall Attendance" value={`${data.attendancePercentage}%`} />
        <StatCard title="Days Present" value={data.presentDays} className="text-green-600" />
        <StatCard title="Days Absent" value={data.absentDays} className="text-red-600" />
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
        <h3 className="font-bold text-lg mb-4">Monthly Trend</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.trend}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis domain={[0, 100]} />
              <Tooltip />
              <Line type="monotone" dataKey="percentage" stroke="#2563eb" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, className = 'text-gray-900' }: { title: string, value: string | number, className?: string }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
      <p className={`text-3xl font-bold ${className}`}>{value}</p>
    </div>
  );
}
