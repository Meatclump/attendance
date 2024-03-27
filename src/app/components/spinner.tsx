import { ClipLoader } from "react-spinners"

interface SpinnerProps {
	ariaLabel: string
}

export const Spinner = ({
	ariaLabel
}: SpinnerProps) => {
	return (
		<ClipLoader
			loading={true}
			color="#fff"
			size={16}
			aria-label={ariaLabel}
		/>
	)
}