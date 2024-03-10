import React, { useEffect, useState } from 'react';
import AnalyticsService from '../../services/AnalyticsService';
import './analytics.css';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  const [embedUrl, setEmbedUrl] = useState('');

  useEffect(() => {
    // Fetch analytics data
    async function fetchAnalyticsData() {
      try {
        const data = await AnalyticsService.fetchAllAnalytics();
        setAnalytics(data); // Assuming 'data' is the array of analytics records
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    }

    // Fetch QuickSight dashboard embed URL
    async function fetchQuickSightEmbedUrl() {
      try {
        const url = await AnalyticsService.fetchQuickSightEmbedUrl();
        setEmbedUrl(url);
      } catch (error) {
        console.error('Error fetching QuickSight embed URL:', error);
      }
    }

    fetchAnalyticsData();
    fetchQuickSightEmbedUrl();
  }, []); // Dependency array is empty, these will run once on component mount

  return (
    <div className="analytics">
      <h1>Analytics Dashboard</h1>
      {embedUrl ? (
        <iframe
          title="QuickSight Dashboard"
          src={embedUrl}
          style={{ width: '100%', height: '600px', border: 'none' }}
          allowFullScreen
        />
      ) : (
        <p>Loading dashboard...</p>
      )}
      <h2>Analytics Data</h2>
      {analytics.length > 0 ? (
        <ul>
          {analytics.map((record, index) => (
            <li key={index}>
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

