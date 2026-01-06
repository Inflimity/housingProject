import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { updateUser } from './actions'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

// Correcting PageProps definition for Next.js 15
export default async function EditUserPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>;
    searchParams: Promise<{ error: string }>;
}) {
    // Await params and searchParams as per Next.js 15
    const { id } = await params;
    const { error } = await searchParams;

    const supabase = await createClient()

    // Retrieve the user profile
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', id)
        .single()

    if (!profile) {
        return (
            <div className="p-10 text-center">
                User not found. <Link href="/admin" className="text-blue-500">Go back</Link>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#f8f9fa] p-6 flex justify-center items-center">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-8">
                <div className="flex items-center mb-8">
                    <Link href="/admin" className="mr-4 p-2 rounded-full hover:bg-gray-100 transition-colors">
                        <ArrowLeft className="h-6 w-6 text-gray-500" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-[#1e1e1e]">Edit User</h1>
                        <p className="text-gray-500 text-sm">Update profile details for {profile.email}</p>
                    </div>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm border border-red-100">
                        {error}
                    </div>
                )}

                <form action={updateUser} className="space-y-6">
                    <input type="hidden" name="id" value={profile.id} />

                    <div>
                        <label className="block text-sm font-semibold text-[#1e1e1e] mb-2" htmlFor="full_name">
                            Full Name
                        </label>
                        <input
                            defaultValue={profile.full_name || ''}
                            className="w-full px-5 py-3 rounded-xl bg-[#f6f6f6] border border-transparent focus:bg-white focus:border-[#f35525] focus:ring-0 transition-all outline-none"
                            id="full_name"
                            name="full_name"
                            type="text"
                            placeholder="e.g. John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#1e1e1e] mb-2" htmlFor="phone">
                            Phone Number
                        </label>
                        <input
                            defaultValue={profile.phone || ''}
                            className="w-full px-5 py-3 rounded-xl bg-[#f6f6f6] border border-transparent focus:bg-white focus:border-[#f35525] focus:ring-0 transition-all outline-none"
                            id="phone"
                            name="phone"
                            type="text"
                            placeholder="e.g. +1 555 000 0000"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-[#1e1e1e] mb-2" htmlFor="role">
                            Role
                        </label>
                        <select
                            defaultValue={profile.role || 'user'}
                            className="w-full px-5 py-3 rounded-xl bg-[#f6f6f6] border border-transparent focus:bg-white focus:border-[#f35525] focus:ring-0 transition-all outline-none appearance-none"
                            id="role"
                            name="role"
                        >
                            <option value="user">User - Standard Access</option>
                            <option value="admin">Admin - Full Access</option>
                        </select>
                    </div>

                    <div className="pt-4 flex items-center justify-end space-x-4">
                        <Link href="/admin" className="px-6 py-3 rounded-full text-gray-500 font-medium hover:bg-gray-100 transition-colors">
                            Cancel
                        </Link>
                        <button className="px-8 py-3 bg-[#1e1e1e] text-white font-semibold rounded-full hover:bg-[#f35525] transition-colors shadow-lg">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
