import React, { useEffect, useState } from 'react';
import AnalyticsService from '../../services/AnalyticsService'; // Ensure this is correctly imported
import './analytics.css';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);

  useEffect(() => {
    async function fetchAnalyticsData() {
      try {
        // Update to use the method that fetches all analytics data
        const data = await AnalyticsService.fetchAllAnalytics();
        setAnalytics(data); // Assuming 'data' is the array of analytics records
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    }

    fetchAnalyticsData();
  }, []); // No dependency array, it will run once on component mount

  return (
    <div className="analytics">
      <h1>Analytics</h1>
      {analytics.length > 0 ? (
        <ul>
          {analytics.map((record, index) => (
            <li key={index}>
              {/* Adjust display according to your actual data structure */}
              Action: {record.eventData.action}, Content Length: {record.eventData.contentLength}
            </li>
          ))}
        </ul>
      ) : (
        <p>No analytics data available.</p>
      )}
    </div>
  );
}

export default Analytics;

