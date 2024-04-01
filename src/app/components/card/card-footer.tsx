interface CardFooterProps {
	children: React.ReactNode
}

export const CardFooter = ({
	children
}: CardFooterProps) => {
	return (
		<div className="p-4 border-t border-t-slate-100/20">
			{children}
		</div>
	)
}