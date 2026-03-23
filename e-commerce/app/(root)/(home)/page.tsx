
import { Separator } from "@/components/ui/separator"
import BrowseCategorySection from "./_components/BrowseCategorySection"
import CategoryWithSlider from "./_components/categoryWithSlider"
import BestSellingProductsSection from "./_components/BestSellingProductsSection"
import MusicBannerSection from "./_components/buyNowSection"
import ExploreProductsSection from "./_components/exploreProductsSection"
import NewArrivalSection from "./_components/newArrivalSection"
import FlashSalesSection from "./_components/flash-sales"
import { SearchParams } from "@/types"
import {FC} from 'react'

interface Props {
	searchParams: SearchParams
}

const HomePage: FC<Props> = async props => {
    const searchParams = props.searchParams
    
    return (
        <>
            <div className="mb-20">
                <CategoryWithSlider />
            </div>
                <FlashSalesSection searchParams={searchParams} />
                <Separator className="my-5" />
                <BrowseCategorySection />
                <Separator className="my-5" />
                <BestSellingProductsSection />
                <MusicBannerSection />
                <ExploreProductsSection />
                <NewArrivalSection />
        </>
    )
}

export default HomePage