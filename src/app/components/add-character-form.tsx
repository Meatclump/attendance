'use client'
import { createCharacter } from "@/app/actions"
import { createRef, useEffect, useId, useState } from "react"
import { CustomToast } from "./custom-toast"

export const AddCharacterForm = () => {
	const id = useId()
	const [error, setError] = useState(false)
	const [inputValue, setInputValue] = useState("")
	const formRef = createRef<HTMLFormElement>()

	useEffect(() => {
		setError(false)
	}, [inputValue])

	return (
		<form
			ref={formRef}
			className="flex flex-col gap-4"
			action={async (formData: FormData) => {
				const name = formData.get("name") as string | null
				if (name) {
					const result = await createCharacter(name)

					if (result.error) {
						setError(true)
						CustomToast(result.error, "error")
					}
					if (result.success) {
						setError(false)
						CustomToast(result.success, "success")
						formRef.current?.reset()
					}
				}
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
						className="border rounded-e-lg px-2 hover:bg-slate-100/10"
					>
						Add
					</button>
				</div>
			</div>
		</form>
	)
}