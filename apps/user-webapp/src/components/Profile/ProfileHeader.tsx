"use client"

import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@user-webapp/components/ui/avatar"
import { Badge } from "@user-webapp/components/ui/badge"
import {Skeleton } from "@user-webapp/components/ui/skeleton"
import { Star } from "lucide-react"


export function ProfileHeader() {
  const { user, isLoading } = useKindeBrowserClient()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 w-full">
        <Skeleton className="h-24 w-24 rounded-full" />
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-4 w-64" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8">
      <Avatar className="h-24 w-24 border-4 border-primary/10">
        <AvatarImage src={user?.picture || undefined} />
        <AvatarFallback className="bg-primary/10 text-2xl font-medium">
          {user?.given_name?.[0]}
          {user?.family_name?.[0]}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-3xl font-bold">
          {user?.given_name} {user?.family_name}
        </h1>
        <p className="text-muted-foreground mb-4">{user?.email}</p>
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          <Badge variant="secondary" className="gap-1">
            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
            Premium Member
          </Badge>
          <Badge variant="outline">Joined {new Date().toLocaleDateString()}</Badge>
        </div>
      </div>
    </div>
  );
}
