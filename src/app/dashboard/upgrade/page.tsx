import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Dummy current plan for demonstration; replace with real user data in production
const currentPlan = "Individual";

const plans = [
  {
    name: "Individual",
    price: "$3.50",
    period: "per request",
    description: "Perfect for individuals looking to remove their data from specific companies.",
    features: [
      "Single data deletion request",
      "GDPR & CCPA compliant templates",
      "Email tracking & notifications",
      "30-day request history",
      "Basic support",
    ],
    cta: "Get Started",
    highlight: false,
    type: "individual",
  },
  {
    name: "Bulk Individual",
    price: "$16.99",
    period: "one-time",
    description: "Best value for individuals who need to send multiple deletion requests.",
    features: [
      "Up to 10 data deletion requests",
      "GDPR & CCPA compliant templates",
      "Email tracking & notifications",
      "90-day request history",
      "Priority support",
      "Bulk request management",
    ],
    cta: "Get Started",
    highlight: true,
    type: "bulk-individual",
  },
  {
    name: "Enterprise (Per Employee)",
    price: "$7",
    period: "per request",
    description: "For businesses that need to manage data deletion for multiple employees.",
    features: [
      "Single data deletion request per employee",
      "GDPR & CCPA compliant templates",
      "Email tracking & notifications",
      "90-day request history",
      "Priority support",
      "Employee management dashboard",
    ],
    cta: "Contact Sales",
    highlight: false,
    type: "enterprise-employee",
  },
  {
    name: "Enterprise Bulk",
    price: "$50",
    period: "one-time",
    description: "For businesses that need to send multiple deletion requests for up to 7 employees.",
    features: [
      "Up to 10 requests per employee (max 7 employees)",
      "GDPR & CCPA compliant templates",
      "Email tracking & notifications",
      "1-year request history",
      "Dedicated support",
      "Employee management dashboard",
      "Custom reporting",
    ],
    cta: "Contact Sales",
    highlight: false,
    type: "enterprise-bulk",
  },
];

export default function UpgradePage() {
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
            <Link href="/dashboard" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Dashboard
            </Link>
            <Link href="/dashboard/requests" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              My Requests
            </Link>
            <Link href="/dashboard/templates" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Templates
            </Link>
            <Link href="/dashboard/upgrade" className="flex items-center px-4 py-2 text-indigo-700 bg-indigo-100 rounded-lg font-semibold">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Upgrade Account
            </Link>
            <Link href="/dashboard/settings" className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </Link>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <h1 className="text-2xl font-semibold text-gray-900">Upgrade Account</h1>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>
        <main className="p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 p-6 bg-indigo-50 border border-indigo-200 rounded-lg flex items-center justify-between">
              <div className="text-lg font-medium text-indigo-900">
                Current Plan: <span className="font-bold">{currentPlan}</span>
              </div>
              <div className="text-sm text-indigo-700">To change your plan, select an option below.</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`rounded-xl border shadow-lg p-8 flex flex-col bg-gray-900 text-white relative ${plan.highlight ? 'border-blue-400 ring-2 ring-blue-300' : 'border-gray-800'} ${plan.name === currentPlan ? 'ring-2 ring-indigo-400 border-indigo-400' : ''}`}
                >
                  {plan.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-white text-xs font-bold px-4 py-1 rounded-t-xl shadow">Most Popular</div>
                  )}
                  <div className="text-xl font-bold mb-2">{plan.name}</div>
                  <div className="text-3xl font-extrabold mb-1">{plan.price} <span className="text-base font-medium">{plan.period}</span></div>
                  <div className="mb-4 text-gray-300">{plan.description}</div>
                  <ul className="mb-6 space-y-2">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <svg className="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button
                    className={`w-full py-2 rounded-md font-semibold transition ${plan.name === currentPlan ? 'bg-indigo-400 text-white cursor-not-allowed' : plan.highlight ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}
                    disabled={plan.name === currentPlan}
                  >
                    {plan.name === currentPlan ? 'Current Plan' : plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
} 