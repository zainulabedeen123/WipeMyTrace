import { PricingTable } from '@clerk/nextjs';
import React from 'react';

export default function SubscribePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Plan</h1>
      <PricingTable />
    </div>
  );
} 