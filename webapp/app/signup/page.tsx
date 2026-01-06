import Link from "next/link";
import Image from "next/image";
import { signup } from "../login/actions";

export default function SignupPage() {
    return (
        <div className="min-h-screen flex flex-row-reverse">
            {/* RIGHT SIDE: Decorative Image (Different Villa) */}
            <div className="hidden lg:block w-1/2 relative bg-gray-900">
                <Image
                    src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop"
                    alt="Luxury Interior"
                    fill
                    className="object-cover opacity-80"
                    priority
                />
                <div className="absolute bottom-20 right-12 text-right text-white z-10">
                    <h1 className="text-4xl font-bold mb-4">Start Your Journey.</h1>
                    <p className="text-lg text-gray-200">
                        Join us to find and design your dream property today.
                    </p>
                </div>
            </div>

            {/* LEFT SIDE: Signup Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center bg-white px-8">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
                        <p className="mt-2 text-gray-600">
                            Get started with your property dashboard
                        </p>
                    </div>

                    <form className="mt-8 space-y-6">
                        <div className="space-y-4">

                            {/* Full Name Field */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full Name
                                </label>
                                <input
                                    id="name"
                                    name="full_name"
                                    type="text"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Musibau Samson"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="name@example.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    minLength={6}
                                    className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                    placeholder="Min 6 characters"
                                />
                            </div>
                        </div>

                        <button
                            formAction={signup}
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                        >
                            Sign Up
                        </button>
                    </form>

                    <div className="text-center text-sm">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Log in instead
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}