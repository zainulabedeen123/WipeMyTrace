import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
        <div className="container-custom py-4 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Wipe My Trace
              </span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/#features" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
              Features
            </Link>
            <Link href="/#how-it-works" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
              How It Works
            </Link>
            <Link href="/pricing" className="text-primary font-medium">
              Pricing
            </Link>
            <Link href="/#faq" className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors">
              FAQ
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <Link href="/sign-in" className="btn-outline hidden sm:block">
              Log In
            </Link>
            <Link href="/sign-up" className="btn-primary">
              Get Started
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="py-20">
          <div className="container-custom">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Choose Your <span className="text-primary">Privacy Plan</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Select the perfect plan to protect your digital privacy. All plans include our core features.
              </p>
            </div>

            {/* Pricing Toggle */}
            <div className="flex justify-center mb-12">
              <div className="bg-gray-100 dark:bg-gray-800 p-1 rounded-lg inline-flex">
                <button className="px-6 py-2 rounded-md bg-white dark:bg-gray-700 shadow-sm font-medium">
                  Monthly
                </button>
                <button className="px-6 py-2 rounded-md text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white font-medium">
                  Annual
                </button>
              </div>
            </div>

            {/* Pricing Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {[
                {
                  title: "Individual",
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
                  popular: false,
                },
                {
                  title: "Bulk Individual",
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
                  popular: true,
                },
                {
                  title: "Enterprise (Per Employee)",
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
                  popular: false,
                },
                {
                  title: "Enterprise Bulk",
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
                  popular: false,
                },
              ].map((plan, index) => (
                <div 
                  key={index} 
                  className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                    plan.popular ? 'ring-2 ring-primary relative' : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                      Most Popular
                    </div>
                  )}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{plan.title}</h3>
                    <div className="flex items-baseline mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 dark:text-gray-400 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">{plan.description}</p>
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link 
                      href="/account" 
                      className={`w-full py-3 px-4 rounded-lg font-medium inline-block text-center transition-colors ${
                        plan.popular 
                          ? 'bg-primary text-white hover:bg-primary/90' 
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Section */}
            <div className="max-w-3xl mx-auto mt-20">
              <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {[
                  {
                    question: "Can I switch plans later?",
                    answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                  },
                  {
                    question: "What payment methods do you accept?",
                    answer: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers."
                  },
                  {
                    question: "Is there a refund policy?",
                    answer: "Yes, we offer a 14-day money-back guarantee for all plans. If you're not satisfied, we'll refund your payment."
                  },
                  {
                    question: "Do you offer custom enterprise plans?",
                    answer: "Yes, we can create custom plans for larger organizations with specific needs. Contact our sales team for more information."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
                    <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center mt-20">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Join thousands of users who trust Wipe My Trace to protect their privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/sign-up" className="btn-primary">
                  Start Free Trial
                </Link>
                <Link href="/contact" className="btn-outline">
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
} 