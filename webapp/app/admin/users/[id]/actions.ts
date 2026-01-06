'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function updateUser(formData: FormData) {
    const supabase = await createClient()

    const id = formData.get('id') as string
    const full_name = formData.get('full_name') as string
    const phone = formData.get('phone') as string
    const role = formData.get('role') as string

    const { error } = await supabase
        .from('profiles')
        .update({ full_name, phone, role })
        .eq('id', id)

    if (error) {
        redirect(`/admin/users/${id}?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/admin', 'page')
    redirect('/admin')
}
