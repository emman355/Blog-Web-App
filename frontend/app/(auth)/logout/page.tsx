'use client'

import Typography from '@/components/typography'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { useRouter } from 'next/navigation';
import { IoShieldCheckmark } from "react-icons/io5";

export default function Logout() {
  const router = useRouter()
  return (
      <Card className="w-full flex-col p-6 shadow-md rounded-xl bg-white dark:bg-zinc-900">
        <CardHeader className='justify-center'>
          <IoShieldCheckmark className='w-24 h-24' />
        </CardHeader>

        <CardContent>
          <Typography variant="h2">Successfully Logged out</Typography>
          <Typography variant="small" className="text-zinc-600 dark:text-zinc-400">
            Thank you for using our platform.
            You&apos;re session has ended securely.
            we hope to see you soon!
          </Typography>
        </CardContent>

        <CardFooter className="flex-col gap-4">
          <Button className="w-full" onClick={() => router.push('/')}>
            Return To Home
          </Button>
          <Button variant="outline" className="w-full" onClick={() => router.push('/sign-in')}>
            Login Again
          </Button>
        </CardFooter>
      </Card>
  )
}
