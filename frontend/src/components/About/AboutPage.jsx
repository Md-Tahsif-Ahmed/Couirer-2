import React from 'react'
import Navbar from '../Navbar'
import AboutCover from './AboutCover'
import Footer from '../Footer'
import MissionVision from './MissionVision'
import Stats from './Stats'


function AboutPage() {
  return (
    <div className='bg-white'>
    <Navbar />
    <AboutCover />
    <MissionVision />
    <Stats />
    <Footer />
    </div>
  )
}

export default AboutPage