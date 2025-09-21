import React, { useState, useEffect } from 'react'

const Dashboard = ({ user }) => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalPosts: 0,
    totalViews: 0
  })

  useEffect(() => {
    // Simulate API call for dashboard stats
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/dashboard/stats', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="dashboard">
      <h2>📊 Dashboard</h2>
      <p>Welcome to your dashboard, <strong>{user.name}</strong>!</p>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>👥 Total Users</h3>
          <p className="stat-number">{stats.totalUsers}</p>
        </div>
        
        <div className="stat-card">
          <h3>📝 Total Posts</h3>
          <p className="stat-number">{stats.totalPosts}</p>
        </div>
        
        <div className="stat-card">
          <h3>👀 Total Views</h3>
          <p className="stat-number">{stats.totalViews}</p>
        </div>
      </div>

      <div className="user-details">
        <h3>User Information</h3>
        <p><strong>Role:</strong> {user.role}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Last Login:</strong> {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  )
}

export default Dashboard
