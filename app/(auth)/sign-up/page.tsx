/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import * as React from "react"
import Link from "next/link"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import Image from "next/image"
import Logo from "@/components/logo/Logo"
import ROUTES, { DEFAULT_LOGIN_REDIRECT } from "@/constants/routes"
import { RegisterSchema } from "@/schemas"
import { useTransition } from "react"
import { FormError } from "@/components/form-error"
import { FormSuccess } from "@/components/form-success"
import { register } from "@/actions/register"

export default function RegisterPage() {
    const [error, setError] = React.useState<string | undefined>();
    const [success, setSuccess] = React.useState<string | undefined>();
    const [isLoading, setIsLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false)
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        },
    })

    const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
        setError("");
        setSuccess("");
        startTransition(() => {
            register(values)
                .then((data) => {
                    setError(data.error);
                    setSuccess(data.success);
                })
        });
    }
    return (
        <div className="flex min-h-screen flex-col md:flex-row">
            {/* Left side - Image */}
            <div className="relative hidden w-full md:block md:w-1/2">
                <div className="absolute inset-0"></div>
                <Image
                    src="/images/large-triangles.svg"
                    alt="Background"
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Right side - Form */}
            <div className="flex w-full items-center justify-center bg-white dark:bg-gray-950 p-8 md:w-1/2">
                <div className="mx-auto w-full max-w-md">
                    <div className="space-y-6">
                        <div className="flex justify-start mb-4">
                            <Logo />
                        </div>
                        <div className="space-y-2 mb-4">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">Create Account</h1>
                        </div>
                        <div className="justify-start mb-4">
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Already have an account?{" "}
                                <Link
                                    href={ROUTES.SIGN_IN}
                                    className="text-primary hover:text-primary/80 font-medium transition-colors"
                                >
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>

                    <Card className="border-gray-200 dark:border-gray-800 shadow-sm">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <CardContent className="space-y-4 pt-6">

                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-900 dark:text-gray-100">Full Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="John Doe"
                                                        className="border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="email"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-900 dark:text-gray-100">Email</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="email"
                                                        placeholder="name@example.com"
                                                        className="border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                                                        {...field}
                                                    />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="password"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel className="text-gray-900 dark:text-gray-100">Password</FormLabel>
                                                <FormControl>
                                                    <div className="relative">
                                                        <Input
                                                            type={showPassword ? "text" : "password"}
                                                            placeholder="••••••••"
                                                            className="border-gray-300 dark:border-gray-700 focus:border-blue-500 focus:ring-blue-500"
                                                            {...field}
                                                        />
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                                            onClick={() => setShowPassword(!showPassword)}
                                                        >
                                                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
                                                        </Button>
                                                    </div>
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="terms"
                                        render={({ field }) => (
                                            <FormItem className="flex flex-row items-start space-x-2 space-y-0">
                                                <FormControl>
                                                    <Checkbox
                                                        checked={field.value}
                                                        onCheckedChange={field.onChange}
                                                        className="border-gray-300 dark:border-gray-700 text-blue-600 mt-1"
                                                    />
                                                </FormControl>
                                                <div className="leading-normal">
                                                    <span className="text-sm text-gray-600 dark:text-gray-400">
                                                        By checking this box, you agree to our <Link href="/terms" className="text-primary hover:text-primary/80 transition-colors underline" target="_blank">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:text-primary/80 transition-colors underline" target="_blank">Privacy Policy</Link>
                                                    </span>
                                                </div>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </CardContent>

                                <CardFooter className="flex flex-col pt-6">
                                    <FormError message={error} />
                                    <FormSuccess message={success} />
                                    <Button
                                        type="submit"
                                        className="w-full bg-[#00cc66] hover:bg-[#00cc66]/90 text-white font-semibold shadow-sm transition-colors py-6"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Creating account...
                                            </>
                                        ) : (
                                            "Create Account"
                                        )}
                                    </Button>

                                    {/* Divider */}
                                    <div className="relative my-6">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="bg-white dark:bg-gray-950 px-2 text-gray-500 dark:text-gray-400">OR</span>
                                        </div>
                                    </div>

                                    {/* Google Button */}
                                    <Button
                                        variant="outline"
                                        className="w-full border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-900 font-semibold py-6"
                                        type="button"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Duke u kyçur...
                                            </>
                                        ) : (
                                            <>
                                                <Image
                                                    src="/images/google.svg"
                                                    alt="Google"
                                                    width={20}
                                                    height={20}
                                                    className="mr-2"
                                                />
                                                Continue with Google
                                            </>
                                        )}
                                    </Button>
                                </CardFooter>
                            </form>
                        </Form>
                    </Card>
                </div>
            </div>
        </div>
    )
}

