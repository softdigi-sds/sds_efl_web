
import DashboardBarChart from './DashboardBarChart'
import DashBoardCard from './DashBoardCard'
import DashboardChart from './DashboardChart'
import DashboardMapView from './DashboardMapView'
import DashBoardTable from './DashBoardTable'
import MarketSlots from './MarketSlots'

const Dashboard = () => {
  return (
    <>
    <p className='is-size-4 has-text-weight-bold mb-1'>Dashboard</p>
    <div className=""><DashBoardCard/></div>
      <div className="columns is-multiline">  
      <div className="column is-6 "> < DashboardMapView /></div>
      {/* <div className="column is-6 "> <DashboardBarChart/></div> */}
      <div className="column is-6 "> <MarketSlots/></div>
       {/* <div className='column is-12'>
       <DashboardChart/>
       </div> */}
       </div>
{/* <div className=""><DashBoardTable/></div> */}
    </>
  )
}

export default Dashboard
