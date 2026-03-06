import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { Form } from "../ui/form"

const RightSectionPage = () => {
    return (
        <div className="flex justify-between gap-1">
            <Form>
                <form>
                    <Input placeholder="What are looking for?" />
                </form>
            </Form>
            <div className="flex justify-between gap-1">
                <Button variant={'link'}>Favorite</Button>
                <Button variant={'link'}>Korzina</Button>
            </div>
        </div>
    )
}

export default RightSectionPage