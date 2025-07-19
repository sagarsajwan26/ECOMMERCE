import React from 'react'
import HomeImageSlider from './HomeImageSlider'
import HomeCategory from './HomeCategory'
import HomeFeaturedProduct from './HomeFeaturedProduct'

import HomeAdvantages from './HomeAdvantages'
import HomeFooter from './HomeFooter'

function HomeMain() {
  return (
    <div>
      <HomeImageSlider/>
      <HomeCategory/>
      <HomeFeaturedProduct/>
      <HomeAdvantages/>
      <HomeFooter/>
    </div>
  )
}

export default HomeMain