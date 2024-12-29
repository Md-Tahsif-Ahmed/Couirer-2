import React from 'react'
import Navbar from './Navbar'
import Banner from './Banner'
import Footer from './Footer'
import FeaturesCard from './FeaturesCard'
import CustomerFeedback from './CustomerFeedback'
import CourierAnimation from './CourierAnimation'

function HomeCover() {
  return (
    <div>
        <Navbar />
        <Banner />
        <CourierAnimation />
        <CustomerFeedback />
        <FeaturesCard />

        <Footer />
    </div>
  )
}

export default HomeCover