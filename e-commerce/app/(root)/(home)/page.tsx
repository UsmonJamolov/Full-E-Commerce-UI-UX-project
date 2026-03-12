import { Separator } from "@/components/ui/separator"
import BrowseCategorySection from "./_components/BrowseCategorySection"
import CategoryWithSlider from "./_components/categoryWithSlider"
import FlashSalesSection from "./_components/flash-sales"

const HomePage = () => {
    return (
        <>
            <div className="mb-20">
                <CategoryWithSlider />
            </div>
                <FlashSalesSection />
                <Separator className="my-5" />
                {/* <div className="flex justify-center items-center">
                </div> */}
                <BrowseCategorySection />
                <Separator className="my-5" />
        </>
    )
}

export default HomePage