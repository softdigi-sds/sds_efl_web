import React from 'react'
import OurServices from './OurServices'
import HomeSliderImages from './HomeSliderImages'
import MobileAppContent from './MobileAppContent'
import CmsPlateForm from './CmsPlateForm'
import OurMissions from './OurMissions'

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
    </div>
    </>
  )
}

export default HomePage
