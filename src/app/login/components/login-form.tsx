"use client";

import { useLayoutEffect, useState } from "react";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/shared/spinner";
import { User } from "@/types/types";
import { toast } from "sonner";

const formSchema = z.object({
  phone_number: z
    .string()
    .min(1, {
      message: "این فیلد الزامی است!",
    })
    .refine(
      (data) => {
        const phoneNumberPattern = /^(\+98|0|0098)9\d{9}$/;
        return phoneNumberPattern.test(data);
      },
      {
        error: "شماره همراه نامعتبر است!",
      }
    ),
});

export function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone_number: "",
    },
  });

  useLayoutEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const userObject = JSON.parse(userData);
      if (
        "name" in userObject &&
        "email" in userObject &&
        "picture" in userObject
      ) {
        router.replace("/");
      }
    }
  }, []);

  const onSubmit = (_values: z.infer<typeof formSchema>) => {
    setIsPending(true);
    fetch("https://randomuser.me/api/?results=1&nat=us")
      .then((response) => response.json())
      .then((data: { results: User[] }) => {
        const user = data.results[0];
        const { first, last, title } = user.name;
        const user_object = {
          name: `${title} ${first} ${last}`,
          picture: user.picture.large,
          email: user.email,
        };
        localStorage.setItem("user", JSON.stringify(user_object));
        router.push("/");
        toast.success("وارد شدید");
      })
      .catch(() => {
        toast.error("مشکلی پیش آمده است!");
      })
      .finally(() => {
        setIsPending(false);
      });
  };

  return (
    <div className="flex flex-col gap-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex flex-col gap-4">
            <FormField
              control={form.control}
              name="phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone_number_input">
                    شماره همراه
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phone_number_input"
                      placeholder="شماره همراه خود را وارد کنید"
                      {...field}
                    />
                  </FormControl>
                  <div aria-live="polite">
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={isPending}
              aria-busy={isPending}
            >
              {isPending && <Spinner className="w-5 h-5" />}
              ورود
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
