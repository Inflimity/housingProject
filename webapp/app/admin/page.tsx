import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signout } from '../login/actions'
import Link from 'next/link'
import { LogOut, Plus, Home, MapPin, DollarSign } from 'lucide-react'

export default async function AdminPage() {
    const supabase = await createClient()

    const {
        data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
        return redirect('/login')
    }

    // Fetch profiles
    const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('role', { ascending: true })

    // Fetch properties
    const { data: properties, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

    return (
        <div className="min-h-screen bg-[#f8f9fa]">
            {/* Navbar */}
            <nav className="bg-white shadow-sm border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-[#1e1e1e] uppercase tracking-wider">
                                Villa Admin
                            </h1>
                        </div>
                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-3 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-sm text-gray-600 font-medium truncate max-w-[150px]">
                                    {user.email}
                                </span>
                            </div>

                            <form action={signout}>
                                <button className="p-2 text-gray-400 hover:text-[#primary] transition-colors rounded-full hover:bg-red-50" title="Sign Out">
                                    <LogOut className="h-5 w-5" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8 space-y-12">

                {/* User Management Section */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1e1e1e] mb-1">Users</h2>
                            <p className="text-gray-500 text-sm">Manage registered accounts and roles</p>
                        </div>
                    </div>

                    <div className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-100">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email / Name</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {profiles?.map((profile) => (
                                        <tr key={profile.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#f1f0fe] flex items-center justify-center text-[#f35525] font-bold text-lg">
                                                        {profile.email?.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div className="ml-4">
                                                        <div className="text-sm font-medium text-gray-900">{profile.full_name || 'No Name'}</div>
                                                        <div className="text-sm text-gray-500">{profile.email}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${profile.role === 'admin'
                                                    ? 'bg-purple-100 text-purple-800'
                                                    : 'bg-green-100 text-green-800'
                                                    }`}>
                                                    {profile.role?.toUpperCase() || 'USER'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                {profile.phone || '-'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <Link href={`/admin/users/${profile.id}`} className="text-[#f35525] hover:text-[#1e1e1e] font-semibold">
                                                    Edit
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>

                <hr className="border-gray-200" />

                {/* Properties Section */}
                <section>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-[#1e1e1e] mb-1">Properties</h2>
                            <p className="text-gray-500 text-sm">Manage your real estate listings</p>
                        </div>
                        <button className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-[#1e1e1e] hover:bg-[#f35525] transition-all duration-300">
                            <Plus className="-ml-1 mr-2 h-5 w-5" />
                            Add Property
                        </button>
                    </div>

                    {/* Info Alert if no table */}
                    {error && (
                        <div className="rounded-xl bg-amber-50 p-6 mb-8 border border-amber-100">
                            <div className="flex">
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-amber-800">Database Connection Issue</h3>
                                    <div className="mt-2 text-sm text-amber-700">
                                        <p>{error.message}. You likely need to create the 'properties' table in Supabase.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Properties Grid/Table */}
                    <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                        {!properties || properties.length === 0 ? (
                            <div className="text-center py-24">
                                <div className="mx-auto h-12 w-12 text-gray-300 mb-4">
                                    <Home className="h-full w-full" />
                                </div>
                                <h3 className="mt-2 text-sm font-medium text-gray-900">No properties</h3>
                                <p className="mt-1 text-sm text-gray-500">Get started by creating a new property listing.</p>
                                <div className="mt-6">
                                    <button className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#f35525] hover:bg-[#e04415]">
                                        <Plus className="-ml-1 mr-2 h-5 w-5" />
                                        New Property
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <ul role="list" className="divide-y divide-gray-100">
                                {properties.map((property) => (
                                    <li key={property.id} className="p-6 hover:bg-gray-50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center min-w-0 gap-x-6">
                                                <div className="h-16 w-16 flex-none rounded-lg bg-gray-100 object-cover">
                                                    {/* Mock Image Placeholder */}
                                                    <Home className="h-full w-full p-4 text-gray-300" />
                                                </div>
                                                <div className="min-w-0 flex-auto">
                                                    <p className="text-sm font-semibold leading-6 text-gray-900">
                                                        {property.title || 'Untitled Property'}
                                                    </p>
                                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                                        <MapPin className="h-3 w-3" />
                                                        <p className="truncate">{property.address || 'No address'}</p>
                                                    </div>
                                                    <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                                        <DollarSign className="h-3 w-3" />
                                                        <p className="truncate font-medium text-[#f35525]">{property.price || 'Price on request'}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-none items-center gap-x-4">
                                                <a
                                                    href="#"
                                                    className="hidden rounded-full bg-white px-3 py-1.5 text-sm font-medium text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                                >
                                                    Edit
                                                </a>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </section>
            </main>
        </div>
    )
}
