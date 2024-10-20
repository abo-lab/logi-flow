"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const plans = [
  { id: 'plan_basic', name: 'Basic', price: '$9.99/month', features: ['Feature 1', 'Feature 2'] },
  { id: 'plan_pro', name: 'Pro', price: '$19.99/month', features: ['All Basic features', 'Feature 3', 'Feature 4'] },
  { id: 'plan_enterprise', name: 'Enterprise', price: '$49.99/month', features: ['All Pro features', 'Feature 5', 'Feature 6', 'Priority support'] },
];

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planId: string) => {
    if (!session?.user) {
      alert('Please log in to subscribe');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/subscription', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: session.user.id,
          planId: planId,
        }),
      });

      const { checkoutUrl } = await response.json();
      window.location.href = checkoutUrl;
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Failed to initiate subscription. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Choose Your Subscription Plan</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.price}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full"
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Subscribe'}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}