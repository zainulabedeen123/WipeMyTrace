import { auth } from '@clerk/nextjs/server';
import React from 'react';

export default async function DashboardPage() {
  const { has } = await auth();
  const hasProPlan = has({ plan: 'pro' });

  if (!hasProPlan) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Upgrade Required</h1>
        <p className="text-lg mb-4">You need to subscribe to the Pro plan to access this feature.</p>
        <a 
          href="/subscribe" 
          className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          View Plans
        </a>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Pro Dashboard</h1>
      <p className="text-lg">Welcome to your Pro dashboard!</p>
    </div>
  );
} 