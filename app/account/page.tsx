import { UserProfile } from '@clerk/nextjs';
import React from 'react';

export default function AccountPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Account Settings</h1>
      <UserProfile />
    </div>
  );
} 