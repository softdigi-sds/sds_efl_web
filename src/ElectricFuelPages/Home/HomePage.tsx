import React from 'react'
import OurServices from './OurServices'
import HomeSliderImages from './HomeSliderImages'
import MobileAppContent from './MobileAppContent'

const HomePage = () => {
  return (
    <>
    <div>
      <div className="eletric-home-page-slider">
      <HomeSliderImages/>
      </div>
     
      <OurServices />
      <MobileAppContent/>
    </div>
    </>
  )
}

export default HomePage
