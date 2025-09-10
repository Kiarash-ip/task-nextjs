"use client";

import { useLayoutEffect, useState } from "react";
import ProfileCard from "@/components/shared/profile-card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function UserInfo() {
  const [data, setData] = useState({
    name: "",
    email: "",
    picture: "",
  });
  const router = useRouter();

  useLayoutEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObject = JSON.parse(userData);
      if (
        "name" in userObject &&
        "email" in userObject &&
        "picture" in userObject
      ) {
        setData(userObject);
        return;
      }
    }

    logout();
  }, []);

  const logout = () => {
    router.replace("/login");
    setData({
      name: "",
      email: "",
      picture: "",
    });
    localStorage.removeItem("user");
  };

  return (
    <section aria-label="User Profile">
      <ProfileCard name={data.name} email={data.email} picture={data.picture} />
      <Button
        onClick={logout}
        variant="destructive"
        className="mt-4 cursor-pointer"
        aria-label="خروج از حساب کاربری"
      >
        خروج
      </Button>
    </section>
  );
}
