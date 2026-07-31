'use client';

import { useEffect, useState } from 'react';

interface SystemStatus {
  backendHealthy: boolean;
  environment: 'local' | 'remote' | 'production';
  backendUrl: string;
  lastCheck: string;
  message: string;
}

export function SystemStatus() {
  const [status, setStatus] = useState<SystemStatus | null>(null);

  useEffect(() => {
    checkSystemHealth();
    const interval = setInterval(checkSystemHealth, 60000); // Check every 60s
    return () => clearInterval(interval);
  }, []);

  const checkSystemHealth = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
    const baseUrl = apiUrl.replace('/api', '');
    const isLocal = baseUrl.includes('localhost');
    const isRemote = baseUrl.includes('100.78.103.96');
    
    try {
      const response = await fetch(`${baseUrl}/health`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (response.ok) {
        setStatus({
          backendHealthy: true,
          environment: isLocal ? 'local' : isRemote ? 'remote' : 'production',
          backendUrl: baseUrl,
          lastCheck: new Date().toLocaleTimeString(),
          message: `✅ Backend online (${isLocal ? 'localhost' : isRemote ? 'Tailscale' : 'production'})`,
        });
      } else {
        throw new Error('Backend returned non-200 status');
      }
    } catch (error) {
      setStatus({
        backendHealthy: false,
        environment: isLocal ? 'local' : isRemote ? 'remote' : 'production',
        backendUrl: baseUrl,
        lastCheck: new Date().toLocaleTimeString(),
        message: `🔴 Backend offline — ${baseUrl}`,
      });
    }
  };

  if (!status) return null;

  const bgColor = status.backendHealthy
    ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/50'
    : 'bg-gradient-to-r from-red-900/30 to-rose-900/30 border-red-500/50';

  const textColor = status.backendHealthy ? 'text-green-200' : 'text-red-200';

  return (
    <div className={`${bgColor} border ${textColor} px-4 py-2 rounded-lg text-sm font-mono mb-4 flex justify-between items-center`}>
      <div>{status.message}</div>
      <div className="text-xs opacity-75">{status.lastCheck}</div>
    </div>
  );
}
