import React, { useEffect, useState } from 'react';
import AnalyticsService from '../../services/AnalyticsService';
import './analytics.css';

function Analytics() {
  const [analytics, setAnalytics] = useState([]);
  // Directly use your QuickSight embed URL here
  const [embedUrl, setEmbedUrl] = useState('https://eu-west-3.quicksight.aws.amazon.com/sn/embed/share/accounts/637423166046/dashboards/fce31f6e-78d3-441b-bf74-f290fd3901af?directory_alias=davis');

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

    fetchAnalyticsData();
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

