import DashboardBarChart from './DashboardBarChart'
import DashBoardCard from './DashBoardCard'
import DashboardChart from './DashboardChart'
import DashBoardTable from './DashBoardTable'

const Dashboard = () => {
  return (
    <>
    <p className='is-size-4 has-text-weight-bold mb-1'>Dashboard</p>
    <div className=""><DashBoardCard/></div>
      <div className="columns">  
      <div className="column is-6 "> <DashboardChart/></div>
      <div className="column is-6 "> <DashboardBarChart/></div>
       
       </div>
{/* <div className=""><DashBoardTable/></div> */}
    </>
  )
}

export default Dashboard
