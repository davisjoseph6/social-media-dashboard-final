import React, { useEffect, useState } from 'react';
import AnalyticsService from '../../services/AnalyticsService'; // Adjust the import path as needed
import './analytics.css';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  // Example user ID, replace with actual logic to retrieve the current user's ID
  const userId = 'yourUserIdHere';

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        // Assuming the fetchUserAnalytics function takes a userId and returns analytics data
        const data = await AnalyticsService.fetchUserAnalytics(userId);
        setAnalytics(data); // Assuming 'data' is the array of analytics records
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    }

    fetchAnalyticsData();
  }, [userId]); // This effect depends on userId, it will re-run if userId changes

  return (
    <div className="analytics">
      <h1>Analytics</h1>
      <ul>
        {analytics.length > 0 ? (
          analytics.map((record, index) => (
            <li key={index}>
              {/* Displaying some aspects of the analytics record, adjust according to your data structure */}
              Action: {record.eventData.action}, Content Length: {record.eventData.contentLength}
            </li>
          ))
        ) : (
          <p>No analytics data available.</p>
        )}
      </ul>
    </div>
  );
}

export default Analytics;

