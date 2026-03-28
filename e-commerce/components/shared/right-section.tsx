import { Button } from "../ui/button"
import Filter from "./filter"

const RightSectionPage = () => {
    return (
        <div className="flex justify-between gap-1">
            <Filter />
            <div className="flex justify-between gap-1">
                <Button variant={'link'}>Favorite</Button>
                <Button variant={'link'}>Korzina</Button>
            </div>
        </div>
    )
}

export default RightSectionPage