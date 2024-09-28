import React from 'react'
import DashboardChart from './DashboardChart'
import DashboardBarChart from './DashboardBarChart'
import DashBoardCard from './DashBoardCard'
import DashBoardTable from './DashBoardTable'
import '../../ElectricFuelPages/ElectricFuel.css'

const Dashboard = () => {
  return (
    <>
    <div className=""><DashBoardCard/></div>
      <div className="columns">  
      <div className="column is-6"> <DashboardChart/></div>
      <div className="column is-6"> <DashboardBarChart/></div>
       
       </div>
<div className=""><DashBoardTable/></div>
    </>
  )
}

export default Dashboard
