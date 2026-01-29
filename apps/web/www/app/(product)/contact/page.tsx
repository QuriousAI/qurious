"use client";

import { Button } from "@workspace/design-system/components/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@workspace/design-system/components/card";
import { Input } from "@workspace/design-system/components/input";
import { Textarea } from "@workspace/design-system/components/textarea";
import { MessageSquare, Discord } from "@workspace/design-system/icons";
import { env } from "@/env";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-8 py-12">
      <div className="flex flex-col items-center gap-2">
        <div className="text-5xl font-bold">Contact Us</div>
        <div className="text-xl text-neutral-500">
          We'd love to hear from you. Get in touch with our team.
        </div>
      </div>

      <div className="flex w-full max-w-3xl flex-col gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Send us a message</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="name"
                    placeholder="Your name"
                    className="bg-neutral-800/50"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="bg-neutral-800/50"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="How can we help you?"
                  rows={5}
                  className="bg-neutral-800/50"
                />
              </div>
              <Button type="submit" className="mt-2">
                Send Message
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Info */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <MessageSquare className="size-6 text-neutral-400" />
                <CardTitle className="text-xl">Email Us</CardTitle>
              </div>
              <CardDescription>
                For general inquiries and support
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:admin@quriousai.xyz"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                admin@quriousai.xyz
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <Discord className="size-6 text-neutral-400" />
                <CardTitle className="text-xl">Join Our Community</CardTitle>
              </div>
              <CardDescription>
                Connect with other users and get help from the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link
                href={env.NEXT_PUBLIC_DISCORD_URL ?? "#"}
                target="_blank"
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Join our Discord
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
