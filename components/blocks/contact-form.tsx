'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { submitContactForm } from '@/app/actions/contact'
import { cn } from '@/lib/utils'
import { contactSchema, type ContactFormData } from '@/lib/validation/contact'

interface ContactFormProps {
	settings?: {
		nameLabel?: string
		namePlaceholder?: string
		emailLabel?: string
		emailPlaceholder?: string
		messageLabel?: string
		messagePlaceholder?: string
		submitButtonLabel?: string
		successMessage?: string
		errorMessage?: string
	}
}

export function ContactForm({ settings }: ContactFormProps) {
	const [status, setStatus] = useState<{
		type: 'success' | 'error' | null
		message: string | null
	}>({ type: null, message: null })

	const {
		nameLabel = 'Name',
		namePlaceholder = 'Your name',
		emailLabel = 'Email',
		emailPlaceholder = 'Your email',
		messageLabel = 'Message',
		messagePlaceholder = 'Tell us more...',
		submitButtonLabel = 'Send Message',
		successMessage = 'Thank you! Your message has been sent.',
		errorMessage = 'Something went wrong. Please try again.',
	} = settings || {}

	const form = useForm<ContactFormData>({
		resolver: zodResolver(contactSchema),
		defaultValues: {
			name: '',
			email: '',
			message: '',
		},
	})

	async function onSubmit(data: ContactFormData) {
		setStatus({ type: null, message: null })

		try {
			const result = await submitContactForm(data)
			if (result.success) {
				setStatus({ type: 'success', message: successMessage })
				form.reset()
			} else {
				setStatus({ type: 'error', message: result.message || errorMessage })
			}
		} catch (error) {
			setStatus({ type: 'error', message: errorMessage })
		}
	}

	return (
		<Card className='w-full'>
			<CardHeader>
				<CardTitle>{submitButtonLabel}</CardTitle>
			</CardHeader>
			<CardContent>
				<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
					{' '}
					{/* Zwiększony odstęp między całymi sekcjami */}
					{/* Pole: Imię */}
					<div className='flex flex-col gap-3'>
						{' '}
						{/* gap-3 zamiast space-y-4 dla precyzyjnej kontroli */}
						<label htmlFor='name' className='text-sm font-semibold ml-1'>
							{nameLabel}
						</label>
						<Input
							id='name'
							placeholder={namePlaceholder}
							{...form.register('name')}
							className='h-12' // Opcjonalnie: wyższy input dla lepszego balansu
							aria-invalid={!!form.formState.errors.name}
						/>
						{form.formState.errors.name && (
							<p className='text-sm text-destructive mt-1'>{form.formState.errors.name.message}</p>
						)}
					</div>
					{/* Pole: Email */}
					<div className='flex flex-col gap-3'>
						<label htmlFor='email' className='text-sm font-semibold ml-1'>
							{emailLabel}
						</label>
						<Input
							id='email'
							type='email'
							placeholder={emailPlaceholder}
							{...form.register('email')}
							className='h-12'
							aria-invalid={!!form.formState.errors.email}
						/>
						{form.formState.errors.email && (
							<p className='text-sm text-destructive mt-1'>{form.formState.errors.email.message}</p>
						)}
					</div>
					{/* Pole: Wiadomość */}
					<div className='flex flex-col gap-3'>
						<label htmlFor='message' className='text-sm font-semibold ml-1'>
							{messageLabel}
						</label>
						<Textarea
							id='message'
							placeholder={messagePlaceholder}
							{...form.register('message')}
							className='min-h-30'
							aria-invalid={!!form.formState.errors.message}
						/>
						{form.formState.errors.message && (
							<p className='text-sm text-destructive mt-1'>{form.formState.errors.message.message}</p>
						)}
					</div>
					<Button type='submit' className='w-full h-12 text-base font-bold' disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? '...' : submitButtonLabel}
					</Button>
					{/* ... status message ... */}
				</form>
			</CardContent>
		</Card>
	)
}
