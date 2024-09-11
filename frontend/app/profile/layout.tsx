'use client'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const queryClient = new QueryClient()
export default function ProfileLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
return(
        <div className='bg-[#121212]'>
            <QueryClientProvider client={queryClient}>
              {children}
            </QueryClientProvider>
        </div>
            
    )
}
  