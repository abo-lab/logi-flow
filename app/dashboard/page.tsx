"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { useTranslation } from 'react-i18next'

const data = [
  { name: 'Mon', deliveries: 12 },
  { name: 'Tue', deliveries: 19 },
  { name: 'Wed', deliveries: 3 },
  { name: 'Thu', deliveries: 5 },
  { name: 'Fri', deliveries: 2 },
  { name: 'Sat', deliveries: 3 },
  { name: 'Sun', deliveries: 9 },
]

export default function Dashboard() {
  const { data: session, status } = useSession()
  const [ongoingDeliveries, setOngoingDeliveries] = useState(0)
  const { t } = useTranslation('common')

  useEffect(() => {
    // Fetch ongoing deliveries from API
    // This is a placeholder, replace with actual API call
    setOngoingDeliveries(7)
  }, [])

  if (status === "loading") {
    return <p>Loading...</p>
  }

  if (status === "unauthenticated") {
    return <p>Access Denied</p>
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome, {session?.user?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('ongoingDeliveries')}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{ongoingDeliveries}</p>
          </CardContent>
        </Card>
        {/* Add more summary cards here */}
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>{t('deliveriesThisWeek')}</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="deliveries" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      <div className="flex space-x-4">
        <Button>{t('manageDeliveries')}</Button>
        <Button variant="outline">{t('viewEmployees')}</Button>
      </div>
    </div>
  )
}