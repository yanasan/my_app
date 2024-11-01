"use client"
 
import { useState } from "react";
import { supabase } from "../../utils/supabase";
import { Label } from "@radix-ui/react-label";
import { Button } from "../button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "../card";
import { Input } from "../input";
import { useRouter } from "next/navigation";
 
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージの状態
  const router = useRouter();
 
  const handleLogin = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(""); // エラーメッセージをリセット
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      alert("Login successful!");
      router.push('/home');
    } catch (error) {
      if(error instanceof Error){
        setErrorMessage(error.message || "An error occurred. Please try again."); 
      }else{
        setErrorMessage("エラー");
      }
    } finally {
      setIsLoading(false);
    }
  };
 
  return (
    <div className="flex justify-center w-full">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {errorMessage && ( // エラーメッセージの表示
            <div className="text-red-500 bg-red-100 p-2 rounded">
              {errorMessage}
            </div>
          )}
          <div className="space-y-1">
            <Label htmlFor="name">email</Label>
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e)=> setEmail(e.target.value)}
              />
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">password</Label>
            <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
              />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin} disabled={isLoading}>
            {isLoading ? "Loading..." : "Login"}
          </Button>
        </CardFooter>
      </Card>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader border-t-transparent border-4 border-blue-500 rounded-full w-8 h-8 animate-spin"></div>
        </div>
      )}
    </div>
  );
};
 
export default Auth;
