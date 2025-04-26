'use client';

import { useState, useRef } from 'react';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { generateEmailTemplate } from '@/lib/deepseek';

// Utility to strip markdown formatting
function stripMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1') // bold
    .replace(/\*(.*?)\*/g, '$1') // italics
    .replace(/#+\s?(.*)/g, '$1') // headings
    .replace(/\[(.*?)\]\((.*?)\)/g, '$1') // links
    .replace(/^- /gm, '• ') // bullet points
    .replace(/\n{2,}/g, '\n\n') // collapse multiple newlines
    .replace(/\s+$/gm, '') // trim trailing spaces
    .trim();
}

export default function TemplatesPage() {
  const [loading, setLoading] = useState(false);
  const [editableTemplate, setEditableTemplate] = useState('');
  const [copied, setCopied] = useState(false);
  const templateRef = useRef<HTMLTextAreaElement>(null);
  const [formData, setFormData] = useState({
    jurisdiction: 'GDPR',
    userDetails: {
      name: '',
      address: '',
      email: '',
      phone: '',
    },
    companyDetails: {
      name: '',
      type: '',
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setCopied(false);
    try {
      const generatedTemplate = await generateEmailTemplate(
        formData.jurisdiction as 'GDPR' | 'CCPA',
        formData.userDetails,
        formData.companyDetails
      );
      const cleanTemplate = stripMarkdown(generatedTemplate);
      setEditableTemplate(cleanTemplate);
    } catch (error) {
      console.error('Error generating template:', error);
      alert('Failed to generate template. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => {
        const parentValue = prev[parent as keyof typeof prev];
        if (typeof parentValue === 'object' && parentValue !== null) {
          return {
            ...prev,
            [parent]: {
              ...parentValue,
              [child]: value
            }
          };
        }
        return prev;
      });
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleTemplateEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableTemplate(e.target.value);
  };

  const handleCopy = () => {
    if (templateRef.current) {
      templateRef.current.select();
      document.execCommand('copy');
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar - Same as dashboard */}
      <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-center h-16 border-b border-gray-200">
            <Link href="/" className="text-2xl font-bold text-primary">
              Wipe My Trace
            </Link>
          </div>
          <nav className="flex-1 px-4 py-4 space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              href="/dashboard/requests"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              My Requests
            </Link>
            <Link
              href="/dashboard/templates"
              className="flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Templates
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <h1 className="text-2xl font-semibold text-gray-900">Email Templates</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* Main Content - Two Column Layout */}
        <main className="p-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form Section */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow rounded-lg p-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Generate Email Template</h2>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="jurisdiction" className="block text-sm font-medium text-gray-700">
                    Jurisdiction
                  </label>
                  <select
                    id="jurisdiction"
                    name="jurisdiction"
                    value={formData.jurisdiction}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option value="GDPR">GDPR</option>
                    <option value="CCPA">CCPA</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="companyDetails.name" className="block text-sm font-medium text-gray-700">
                    Company Name
                  </label>
                  <input
                    type="text"
                    id="companyDetails.name"
                    name="companyDetails.name"
                    value={formData.companyDetails.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="companyDetails.type" className="block text-sm font-medium text-gray-700">
                    Company Type
                  </label>
                  <input
                    type="text"
                    id="companyDetails.type"
                    name="companyDetails.type"
                    value={formData.companyDetails.type}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userDetails.name" className="block text-sm font-medium text-gray-700">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userDetails.name"
                    name="userDetails.name"
                    value={formData.userDetails.name}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userDetails.address" className="block text-sm font-medium text-gray-700">
                    Your Address
                  </label>
                  <input
                    type="text"
                    id="userDetails.address"
                    name="userDetails.address"
                    value={formData.userDetails.address}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userDetails.email" className="block text-sm font-medium text-gray-700">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="userDetails.email"
                    name="userDetails.email"
                    value={formData.userDetails.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="userDetails.phone" className="block text-sm font-medium text-gray-700">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="userDetails.phone"
                    name="userDetails.phone"
                    value={formData.userDetails.phone}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    required
                  />
                </div>
              </div>
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-base font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Generating...' : 'Generate Template'}
                </button>
              </div>
            </form>

            {/* Template Section */}
            <div className="bg-white shadow rounded-lg p-8 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Generated Template</h2>
                {editableTemplate && (
                  <button
                    onClick={handleCopy}
                    className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-md border border-indigo-600 text-indigo-600 bg-white hover:bg-indigo-50 transition ${copied ? 'bg-indigo-100' : ''}`}
                    disabled={!editableTemplate}
                  >
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                )}
              </div>
              <textarea
                ref={templateRef}
                value={editableTemplate}
                onChange={handleTemplateEdit}
                rows={22}
                className="w-full resize-none rounded-md border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-inner min-h-[350px]"
                style={{ minHeight: 350 }}
                spellCheck={false}
                disabled={!editableTemplate}
              />
              {!editableTemplate && (
                <div className="text-gray-400 text-center mt-8">No template generated yet. Fill the form and click Generate.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 