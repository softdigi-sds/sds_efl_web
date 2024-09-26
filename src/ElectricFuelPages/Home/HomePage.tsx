import CmsPlateForm from './CmsPlateForm'
import ElectricVichele from './ElectricVichele'
import HomeSliderImages from './HomeSliderImages'
import MobileAppContent from './MobileAppContent'
import OurMissions from './OurMissions'
import OurServices from './OurServices'

const HomePage = () => {
  return (
    <>
      <div>
        <div className="eletric-home-page-slider">
          <HomeSliderImages />
        </div>

        <OurServices />
        <MobileAppContent />
        <OurMissions />
        <CmsPlateForm />
        <ElectricVichele />
      </div>
    </>
  )
}

export default HomePage
