import React from "react";
import styles from './DashboardContent.module.css';

function DashboardContent() {
  return (
    <div>
      <div className={styles.pageTitle}>
        <h1>Dashboard</h1>
        <p className={styles.subtitle}>Welcome back! Here's what's happening with your business today.</p>
      </div>

      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div className={styles.statCardContent}>
              <h3>12,361</h3>
              <p>Total Users</p>
            </div>
            <div className={`${styles.statCardIcon} ${styles.users}`}>
              <i className="fas fa-users"></i>
            </div>
          </div>
          <div className={styles.statCardFooter}>
            <span className={`${styles.statChange} ${styles.positive}`}>+12.5%</span>
            <span className={styles.statChangePeriod}>vs last month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div className={styles.statCardContent}>
              <h3>$24,569</h3>
              <p>Revenue</p>
            </div>
            <div className={`${styles.statCardIcon} ${styles.revenue}`}>
              <i className="fas fa-dollar-sign"></i>
            </div>
          </div>
          <div className={styles.statCardFooter}>
            <span className={`${styles.statChange} ${styles.positive}`}>+8.2%</span>
            <span className={styles.statChangePeriod}>vs last month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div className={styles.statCardContent}>
              <h3>1,258</h3>
              <p>New Orders</p>
            </div>
            <div className={`${styles.statCardIcon} ${styles.orders}`}>
              <i className="fas fa-shopping-cart"></i>
            </div>
          </div>
          <div className={styles.statCardFooter}>
            <span className={`${styles.statChange} ${styles.positive}`}>+23.1%</span>
            <span className={styles.statChangePeriod}>vs last month</span>
          </div>
        </div>

        <div className={styles.statCard}>
          <div className={styles.statCardHeader}>
            <div className={styles.statCardContent}>
              <h3>89.2%</h3>
              <p>Performance</p>
            </div>
            <div className={`${styles.statCardIcon} ${styles.performance}`}>
              <i className="fas fa-tachometer-alt"></i>
            </div>
          </div>
          <div className={styles.statCardFooter}>
            <span className={`${styles.statChange} ${styles.positive}`}>+4.7%</span>
            <span className={styles.statChangePeriod}>vs last month</span>
          </div>
        </div>
      </div>

      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>Revenue Overview</h3>
            <div className={styles.chartControls}>
              <select id="revenuePeriod">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
                <option>Last 6 months</option>
              </select>
            </div>
          </div>
          <div className={styles.chartPlaceholder}>
            <i className="fas fa-chart-area"></i>
            <p>Interactive Revenue Chart</p>
            <small>Line chart showing revenue trends over time</small>
          </div>
        </div>

        <div className={styles.chartCard}>
          <div className={styles.chartHeader}>
            <h3>User Distribution</h3>
          </div>
          <div className={styles.chartPlaceholder}>
            <i className="fas fa-chart-pie"></i>
            <p>User Demographics</p>
            <small>Pie chart showing user distribution by region</small>
          </div>
        </div>
      </div>

      <div className={styles.activityCard}>
        <h3>Recent Activity</h3>
        <div className={styles.activityList}>
          <div className={styles.activityItem}>
            <div className={`${styles.activityIcon} ${styles.user}`}>
              <i className="fas fa-user-plus"></i>
            </div>
            <div className={styles.activityContent}>
              <h4>New user registered</h4>
              <p>Sarah Johnson joined from New York, activated premium plan</p>
            </div>
            <div className={styles.activityTime}>2 min ago</div>
          </div>
          <div className={styles.activityItem}>
            <div className={`${styles.activityIcon} ${styles.order}`}>
              <i className="fas fa-shopping-cart"></i>
            </div>
            <div className={styles.activityContent}>
              <h4>New order received</h4>
              <p>Order #ORD-2024-12345 for $299.99 - Premium Package</p>
            </div>
            <div className={styles.activityTime}>15 min ago</div>
          </div>
          <div className={styles.activityItem}>
            <div className={`${styles.activityIcon} ${styles.alert}`}>
              <i className="fas fa-exclamation-triangle"></i>
            </div>
            <div className={styles.activityContent}>
              <h4>System alert</h4>
              <p>Server load increased by 45% on primary database</p>
            </div>
            <div className={styles.activityTime}>1 hour ago</div>
          </div>
          <div className={styles.activityItem}>
            <div className={`${styles.activityIcon} ${styles.user}`}>
              <i className="fas fa-user-check"></i>
            </div>
            <div className={styles.activityContent}>
              <h4>User verification completed</h4>
              <p>Michael Chen's KYC verification approved</p>
            </div>
            <div className={styles.activityTime}>3 hours ago</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardContent;