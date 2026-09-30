'use client';

import { useState } from 'react';
import Link from 'next/link';
import { notifications as initialNotifs, type Notification } from '@/lib/mockData';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState<Notification[]>(initialNotifs);

  const markAllAsRead = () => {
    setNotifs(notifs.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="animate-fade-in" style={{ paddingBottom: "var(--space-8)" }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 'var(--space-4)',
          marginBottom: 'var(--space-6)',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem' }}>Notifications & Alerts</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Timely updates on application stages, verification actions, and DBT disbursements
          </p>
        </div>

        <button onClick={markAllAsRead} className="btn btn-secondary btn-sm">
          ✓ Mark All as Read
        </button>
      </div>

      {/* Notifications List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', maxWidth: '850px' }}>
        {notifs.map((notif) => (
          <div
            key={notif.id}
            className={`notification-card ${!notif.isRead ? 'unread' : ''}`}
            style={{ padding: 'var(--space-4)' }}
          >
            <div
              className="notification-icon"
              style={{
                background:
                  notif.type === 'success' ? 'var(--success-bg)' :
                  notif.type === 'warning' ? 'var(--warning-bg)' :
                  notif.type === 'error' ? 'var(--error-bg)' : 'var(--info-bg)',
                color:
                  notif.type === 'success' ? 'var(--success)' :
                  notif.type === 'warning' ? 'var(--warning)' :
                  notif.type === 'error' ? 'var(--error)' : 'var(--info)',
                width: '40px',
                height: '40px',
                fontSize: '1.1rem',
              }}
            >
              {notif.type === 'success' ? '✓' : notif.type === 'warning' ? '⚠️' : notif.type === 'error' ? '✕' : 'ℹ️'}
            </div>

            <div className="notification-body">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h3 className="notification-title">{notif.title}</h3>
                <span className="notification-time">
                  {new Date(notif.timestamp).toLocaleDateString('en-IN', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <p className="notification-text" style={{ fontSize: '0.85rem', marginTop: '4px' }}>
                {notif.message}
              </p>

              {notif.actionUrl && (
                <div style={{ marginTop: 'var(--space-3)' }}>
                  <Link href={notif.actionUrl} className="btn btn-secondary btn-sm" style={{ fontSize: '0.78rem' }}>
                    Take Action →
                  </Link>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
