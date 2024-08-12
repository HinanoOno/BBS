'use client';
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login, signup} from "../login/actions"
import { useState } from "react"


export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      await login(formData);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleSignup = async () => {
    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      await signup(formData);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <div className="w-screen flex justify-center items-center mt-24">
      <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)} />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleLogin}>Log in</Button>
        <Button className="w-full" onClick={handleSignup}>Sign up</Button>
      </CardFooter>
    </Card>
  </div>
  );
}
