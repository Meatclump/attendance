import toast from "react-hot-toast"
import { FaCircleCheck, FaTriangleExclamation } from "react-icons/fa6"

export const CustomToast = (
	text: string,
	type: "success" | "error" | "info"
) => {
	if (type === "error") {
		toast.custom(
			<div className="bg-red-400 text-slate-900 px-4 py-2 rounded-md flex gap-1 items-center">
				<FaTriangleExclamation /> {text}
			</div>
		)
	}
	if (type === "success") {
		toast.custom(
			<div className="bg-green-400 text-slate-900 px-2 py-1 rounded-md flex items-center gap-1">
				<FaCircleCheck /> {text}
			</div>
		)
	}
}