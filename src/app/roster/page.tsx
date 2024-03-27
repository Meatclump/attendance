import Link from "next/link"
import { AddCharacterForm } from "../components/add-character-form"
import { RosterTable } from "../components/roster-table"
import { Suspense } from "react"

interface RosterPageProps {
	searchParams: { [key: string]: string | string[] | undefined }
}

const RosterPage = ({
	searchParams
}: RosterPageProps) => {
	const params = searchParams
	const showInactive = params.tab === "inactive"
	console.log(params)
	return (
		<>
			<div className="flex items-center gap-4 p-4">
				<h2 className="flex-1">
					Character Roster
				</h2>
				<div className="flex gap-4 justify-end">
					<Link
						className={`${!showInactive && "bg-slate-100 text-slate-900"} border rounded-lg px-2 py-1`}
						href="?tab=active"
					>
						Active
					</Link>
					<Link
						className={`${showInactive && "bg-slate-100 text-slate-900"} border rounded-lg px-2 py-1`}
						href="?tab=inactive"
					>
						Inactive
					</Link>
				</div>
			</div>
			<div className="max-w-[500px] flex-1 border-t border-t-slate-100/20 pt-4 overflow-y-scroll">
				{
					showInactive
					? (
						<Suspense fallback="Loading...">
							<RosterTable inactive={showInactive} />
						</Suspense>
					) : (
						<Suspense fallback="Loading...">
							<RosterTable inactive={showInactive} />
						</Suspense>
					)
				}
			</div>
			<div className="p-4 border-t border-t-slate-100/20">
				<AddCharacterForm />
			</div>
		</>
	)
}

export default RosterPage