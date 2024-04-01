import { Suspense } from "react"
import { AddCharacterForm } from "@/app/components/manage/characters/add-character-form"
import { RosterTable } from "@/app/components/manage/characters/roster-table"
import { CardWrapper } from "@/app/components/card/card-wrapper"
import { CardHeader } from "@/app/components/card/card-header"
import { CardContent } from "@/app/components/card/card-content"
import { CardFooter } from "@/app/components/card/card-footer"
import Link from "next/link"

interface RosterPageProps {
	showInactive: boolean
}

export const CharacterRosterPanel = ({
	showInactive
}: RosterPageProps) => {
	return (
		<CardWrapper>
				<CardHeader>
					<h2 className="flex-1 py-1">
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
				</CardHeader>
				<CardContent>
					<div className="flex-1 border-t border-t-slate-100/20 pt-4 overflow-y-scroll">
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
				</CardContent>
				<CardFooter>
					<AddCharacterForm />
				</CardFooter>
			</CardWrapper>
	)
}