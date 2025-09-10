"use client";

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

import { User } from "lucide-react";
import { AtSign } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface ProfileCardProps {
  name: string;
  email: string;
  picture: string;
}

export default function ProfileCard({
  name,
  email,
  picture,
}: ProfileCardProps) {
  return (
    <Card dir="ltr">
      <CardContent className="space-y-3 text-sm">
        {picture ? (
          <Image
            src={picture}
            alt={name ? `Profile picture of ${name}` : "Profile Picture"}
            width={334}
            height={334}
            className="object-cover rounded-md"
          />
        ) : (
          <Skeleton className="size-[334px] rounded-md" />
        )}
        <div className="flex items-center gap-2 px-1">
          <User size={18} className="text-card-foreground" aria-hidden="true" />
          {name ? (
            <span>{name}</span>
          ) : (
            <Skeleton className="h-5 w-28 rounded-md" />
          )}
        </div>
        <div className="flex items-center gap-2 px-1">
          <AtSign
            size={18}
            className="text-card-foreground"
            aria-hidden="true"
          />
          {email ? (
            <span>{email}</span>
          ) : (
            <Skeleton className="h-5 w-32 rounded-md" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
