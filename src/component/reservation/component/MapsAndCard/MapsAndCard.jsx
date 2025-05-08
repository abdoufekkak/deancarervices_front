import React from 'react'
import GoogleMaps from '../GoogleMaps/googleMapPage'
import TransferCard from '../../component/Tomobiles/Card'
import Steps from '../../../../Steps/Steps'

export default function MapsAndCard() {
 
  return (
    <>
    <Steps/>
    <GoogleMaps />
    <TransferCard/>
    </>
  )
}
