import DashboardBarChart from './DashboardBarChart'
import DashBoardCard from './DashBoardCard'
import DashboardChart from './DashboardChart'
import DashBoardTable from './DashBoardTable'

const Dashboard = () => {
  return (
    <>
    <div className=""><DashBoardCard/></div>
      <div className="columns">  
      {/* <div className="column is-6 "> <DashboardChart/></div> */}
      <div className="column is-12 "> <DashboardBarChart/></div>
       
       </div>
<div className=""><DashBoardTable/></div>
    </>
  )
}

export default Dashboard
