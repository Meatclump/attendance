import { Suspense } from "react"
import { AddCharacterForm } from "@/app/components/manage/characters/add-character-form"
import { RosterTable } from "@/app/components/manage/characters/roster-table"
import { CardWrapper } from "@/app/components/card/card-wrapper"
import { CardHeader } from "@/app/components/card/card-header"
import { CardContent } from "@/app/components/card/card-content"
import { CardFooter } from "@/app/components/card/card-footer"
import { RosterTab } from "./rosterTab"

interface RosterPageProps {
	showInactive: boolean
}

export const CharacterRosterPanel = ({
	showInactive
}: RosterPageProps) => {
	return (
		<div className="flex">
			<CardWrapper>
				<CardHeader>
					<h2 className="flex-1 py-1">
						Character Roster
					</h2>
					<RosterTab />
				</CardHeader>
				<CardContent>
					<Suspense fallback="Loading...">
						<RosterTable inactive={showInactive} />
					</Suspense>
				</CardContent>
				<CardFooter>
					<AddCharacterForm />
				</CardFooter>
			</CardWrapper>
		</div>
	)
}