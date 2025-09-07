"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { authClient } from "@/lib/auth-client";

/**
 * Renders a sign-up form and handles creating a user via the auth client.
 *
 * The component maintains controlled inputs for name, email, and password, and
 * submits those values to `authClient.signUp.email` when the "Create User"
 * button is clicked. On success or error it uses simple alert UX (placeholder
 * for real navigation or error display).
 *
 * @returns A React element containing the sign-up form (name, email, password)
 * and a submit button.
 */
export default function Home() {

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = () => {
    authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
      },
      {
        onRequest: () => {
          //show loading
        },
        onSuccess: () => {
          //redirect to the dashboard or sign in page
          window.alert("User created successfully!");
        },
        onError: () => {
          // display the error message
          window.alert("Something went wrong!");
        },
      }
    );
  };

  return (
    <div className="p-4 flex flex-col gap-y-4">
      <Input
        placeholder="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <Button onClick={onSubmit}>Create User</Button>
    </div>
  );
}
