'use client'
import { createCharacter } from "@/app/actions"
import { useEffect, useId, useState, useTransition } from "react"
import { CustomToast } from "@/app/custom-toast"
import { Spinner } from "@/app/components/spinner"

export const AddCharacterForm = () => {
	const id = useId()
	const [error, setError] = useState(false)
	const [inputValue, setInputValue] = useState("")
	const [isPending, startTransition] = useTransition()

	useEffect(() => {
		setError(false)
	}, [inputValue])

	return (
		<form
			className="flex flex-col gap-4"
			action={async (formData: FormData) => {
				startTransition(async () => {
					const name = formData.get("name") as string | null
					if (name) {
						const result = await createCharacter(name)
	
						if (result.error) {
							setError(true)
							CustomToast(result.error, "error")
						}
						if (result.success) {
							setError(false)
							setInputValue("")
							CustomToast(result.success, "success")
						}
					}
				})
			}}
		>
			<div className="flex flex-col">
				<label htmlFor={id}>
					Add a New Character
				</label>
				<div className="flex">
					<input
						id={id}
						className={`${error ? "bg-red-400" : ""} border rounded-s-lg py-1 px-2 dark:text-zinc-900 flex-1`}
						name="name"
						placeholder="Character Name"
						value={inputValue}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button
						className="border rounded-e-lg px-2 hover:bg-slate-100/10 disabled:text-slate-100/35 w-[50px]"
						disabled={isPending}
					>
						{
							isPending
							? <Spinner ariaLabel="Loading character addition" />
							: "Add"
						}
					</button>
				</div>
			</div>
		</form>
	)
}