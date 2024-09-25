import React from 'react'
import OurServices from './OurServices'
import HomeSliderImages from './HomeSliderImages'
import MobileAppContent from './MobileAppContent'
import CmsPlateForm from './CmsPlateForm'
import OurMissions from './OurMissions'
import ElectricVichele from './ElectricVichele'

const HomePage = () => {
  return (
    <>
    <div>
      <div className="eletric-home-page-slider">
      <HomeSliderImages/>
      </div>
     
      <OurServices />
      <MobileAppContent/>
      <OurMissions/>
      <CmsPlateForm/>
      <ElectricVichele/>
    </div>
    </>
  )
}

export default HomePage
