'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { MouseEvent, useCallback } from "react"

export const EventTab = () => {
	const router = useRouter()
	const pathname = usePathname()
	const searchParams = useSearchParams()

	const createQueryString = useCallback((name: string, value: string) => {
		const params = new URLSearchParams(searchParams.toString())
		params.set(name, value)
		return params.toString()
	}, [searchParams])

	const handleClick = (e: MouseEvent<HTMLButtonElement>, active: boolean) => {
		router.push(pathname + '?' + createQueryString('eventTab',active ? 'active' : 'inactive'))
	}

	const showInactive = searchParams.get('eventTab') === 'active'

	return (
		<div className="flex gap-4 justify-end">
			<button
				className={`${showInactive && "bg-slate-100 text-slate-900"} border rounded-lg px-2 py-1`}
				onClick={(e) => {handleClick(e, true)}}
			>
				Active
			</button>
			<button
				className={`${!showInactive && "bg-slate-100 text-slate-900"} border rounded-lg px-2 py-1`}
				onClick={(e) => {handleClick(e, false)}}
			>
				Inactive
			</button>
		</div>
	)
}