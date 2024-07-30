"use client";

import { handleProfileSave } from "@/app/profile/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { UserContext } from "@/context/UserContext";
import { cn } from "@/lib/utils";
import { redirect } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { Avatar } from "./ui/avatar";
import { User2 } from "lucide-react";
import { getProfile } from "@/app/dashboard/actions";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";

export default function Profile() {
  const { token, setCookie } = useContext(UserContext);
  const [name, setName] = useState("");
  // const [bio, setBio] = useState(user.bio);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { toast } = useToast();
  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      toast({
        variant: "error",
        title: "Error",
        description: "New password and confirm password do not match",
      });
      return;
    }
    handleProfileSave(token, setCookie, toast, {
      name,
      // bio,
      oldPassword,
      newPassword,
    });
  };

  const { data: user, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return await getProfile(token);
    },
  });

  useEffect(() => {
    if (!token) {
      redirect("/login");
    }
    refetch();
    console.log("user: ", user);
  }, [token]);

  return (
    <div>
      <div className="px-4 space-y-6 sm:px-6">
        <header className="space-y-2">
          <div className="flex items-center space-x-3">
            <Avatar className="h-[50px] w-[50px]">
              <span className="sr-only">User Profile Icon</span>
              <div className="relative flex aspect-square h-full w-full">
                <User2 className="relative h-[50px] w-[50px]" />
              </div>
            </Avatar>
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{user ? user.name : ""}</h1>
              <Button size="sm">Change photo</Button>
            </div>
          </div>
        </header>
        <div className="space-y-8">
          <Card>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="E.g. Jane Doe"
                  defaultValue={user ? `${user.name}` : ""}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder={user ? user.email : ""}
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label>Biography</Label>
                <Textarea
                  id="bio"
                  placeholder="Enter your bio"
                  className="mt-1"
                  style={{ minHeight: "100px" }}
                  // onChange={(e) => {
                  //   setBio(e.target.value);
                  // }}
                />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>Language</div>
              <div>Choose your preferred language</div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <RadioGroup defaultValue="en">
                  <div>
                    {
                      <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="mr-2" />
                        English
                      </div>
                    }
                  </div>
                  <div>
                    {/* {({ active }) => ( */}
                    <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="mr-2" />
                      Vietnamese
                    </div>
                    {/* )} */}
                  </div>
                  <div>
                    {/* {({ active }) => ( */}
                    <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                      <div className="mr-2" />
                      Japanese
                    </div>
                    {/* )} */}
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <div>Change Password</div>
              <div>
                For your security, please do not share your password with
                others.
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input
                  type="password"
                  id="current-password"
                  onChange={(e) => {
                    setOldPassword(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  type="password"
                  id="new-password"
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  type="password"
                  id="confirm-password"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="pt-6">
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </div>
    </div>
  );
}
