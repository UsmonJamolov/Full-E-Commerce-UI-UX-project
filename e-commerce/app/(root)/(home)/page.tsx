import { Separator } from "@/components/ui/separator"
import BrowseCategorySection from "./_components/BrowseCategorySection"
import CategoryWithSlider from "./_components/categoryWithSlider"
import BestSellingProductsSection from "./_components/BestSellingProductsSection"
import MusicBannerSection from "./_components/buyNowSection"
import KidsFootwearProductsSection from "./_components/KidsFootwearProductsSection"
import ExploreProductsSection from "./_components/exploreProductsSection"
import NewArrivalSection from "./_components/newArrivalSection"
import FlashSalesSection from "./_components/flash-sales"
import { getPublicNewArrivalCards } from "@/lib/new-arrival-public"
import { cookies } from "next/headers"
import { getPublicHomeSliderSlides } from "@/lib/home-slider-public"
import { getDictionary, parseLocale } from "@/lib/i18n/dictionaries"

const HomePage = async () => {
    const store = await cookies()
    const locale = parseLocale(store.get('locale')?.value)
    const dict = getDictionary(locale)
    const newArrivalCards = await getPublicNewArrivalCards(locale)
    const sliderSlides = await getPublicHomeSliderSlides(locale)
    return (
        <>
            <div className="mb-20 w-full min-w-0">
                <CategoryWithSlider
                    locale={locale}
                    ctaLabel={dict.home.sliderCta}
                    sliderSlides={sliderSlides}
                    sidebarCategories={dict.home.sidebarCategories}
                    sidebarCategoryHrefs={dict.home.sidebarCategoryHrefs}
                />
            </div>
                <FlashSalesSection
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
                    locale={locale}
                    featuredLabel={dict.header.featured}
                    titleLabel={dict.header.newArrival}
                />
        </>
    )
}

export default HomePage