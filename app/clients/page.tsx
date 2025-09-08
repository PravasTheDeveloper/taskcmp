"use client"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import AppSidebar from "@/components/global/AppSidebar"
import AppHeader from "@/components/global/AppHeader"
import AppFooter from "@/components/global/AppFooter"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ClientsPage() {
  return (
    <SidebarProvider>
      <AppSidebar activeItem="clients" />
      <SidebarInset>
        <AppHeader searchPlaceholder="Search clients..." />

        <div className="px-4 md:px-6 py-6 space-y-6">
          <h1 className="text-2xl font-bold tracking-tight">Clients</h1>
          <Card>
            <CardHeader>
              <CardTitle>Client Profile Directory</CardTitle>
            </CardHeader>
            <CardContent>
              Coming soon. We can list clients with profiles, contacts, and linked projects here.
            </CardContent>
          </Card>
          <AppFooter />
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}



