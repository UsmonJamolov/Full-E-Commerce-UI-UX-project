import CategoryWithSlider from "./_components/categoryWithSlider"
import FlashSalesSection from "./_components/flash-sales"

const HomePage = () => {
    return (
        <>
            <div className="mb-20">
                <CategoryWithSlider />
            </div>
                <FlashSalesSection />
        </>
    )
}

export default HomePage