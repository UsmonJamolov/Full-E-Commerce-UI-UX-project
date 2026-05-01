import { Separator } from "@/components/ui/separator"
import BrowseCategorySection from "./_components/BrowseCategorySection"
import CategoryWithSlider from "./_components/categoryWithSlider"
import BestSellingProductsSection from "./_components/BestSellingProductsSection"
import MusicBannerSection from "./_components/buyNowSection"
import KidsFootwearProductsSection from "./_components/KidsFootwearProductsSection"
import ExploreProductsSection from "./_components/exploreProductsSection"
import NewArrivalSection from "./_components/newArrivalSection"
import FlashSalesSection from "./_components/flash-sales"
import { SearchParams } from "@/types"
import {FC} from 'react'
import { getProducts } from "@/actions/user.action"
import { getPublicNewArrivalCards } from "@/lib/new-arrival-public"
import { cookies } from "next/headers"
import { getDictionary, parseLocale } from "@/lib/i18n/dictionaries"

interface Props {
	searchParams: Promise<SearchParams>
}

const HomePage: FC<Props> = async props => {
    const store = await cookies()
    const locale = parseLocale(store.get('locale')?.value)
    const dict = getDictionary(locale)
    const searchParams = await props.searchParams
	const res = await getProducts({
		searchQuery: `${searchParams.q || ''}`,
		filter: `${searchParams.filter || 'newest'}`,
		category: '',
		targetGroup: '',
		page: `${searchParams.page || '1'}`,
        pageSize: '10'
	})

    let products = res?.data?.products || []
    if (products.length === 0) {
        const fallbackRes = await getProducts({
            searchQuery: `${searchParams.q || ''}`,
            filter: `${searchParams.filter || 'newest'}`,
            category: '',
            targetGroup: '',
            page: '1',
            pageSize: '10',
        })
        products = fallbackRes?.data?.products || []
    }
    const newArrivalCards = await getPublicNewArrivalCards()
    return (
        <>
            <div className="mb-20 w-full min-w-0">
                <CategoryWithSlider
                    locale={locale}
                    ctaLabel={dict.home.sliderCta}
                    sliderSlides={dict.home.sliderSlides}
                    sidebarCategories={dict.home.sidebarCategories}
                />
            </div>
                <FlashSalesSection
                    searchParams={searchParams}
                    products={products}
                    title={dict.home.flashSalesTitle}
                    noProducts={dict.home.noProducts}
                    viewAllLabel={dict.home.viewAllProducts}
                />
                <Separator className="my-5" />
                <BrowseCategorySection
                    categoriesLabel={dict.home.categoriesLabel}
                    title={dict.home.browseByCategory}
                />
                <Separator className="my-5" />
                <BestSellingProductsSection
                    title={dict.home.bestSellingTitle}
                    noProducts={dict.home.noProducts}
                    viewAllLabel={dict.home.viewAllProducts}
                />
                <MusicBannerSection
                    tag={dict.home.buyNowTag}
                    title={dict.home.buyNowTitle}
                    ctaLabel={dict.home.buyNowCta}
                    timerLabels={{
                        days: dict.home.days,
                        hours: dict.home.hours,
                        minutes: dict.home.minutes,
                        seconds: dict.home.seconds,
                    }}
                />
                <KidsFootwearProductsSection
                    title={dict.home.kidsFootwearTitle}
                    noProducts={dict.home.noProducts}
                    viewAllLabel={dict.home.viewAllProducts}
                />
                <ExploreProductsSection
                    badge={dict.home.ourProducts}
                    title={dict.home.exploreProductsTitle}
                    noProducts={dict.home.noProducts}
                    viewAllLabel={dict.home.viewAllProducts}
                />
                <NewArrivalSection
                    initialCards={newArrivalCards}
                    shopNowLabel={dict.home.shopNow}
                    featuredLabel={dict.header.featured}
                    titleLabel={dict.header.newArrival}
                />
        </>
    )
}

export default HomePage