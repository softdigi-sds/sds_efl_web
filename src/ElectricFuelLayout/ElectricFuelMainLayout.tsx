import React from 'react'
import ElectricFuelHeader from './ElectricFuelHeader'
import ElectricDuelFooter from './ElectricDuelFooter'
interface   childrenProps {
    children:any
  }
const ElectricFuelMainLayout:React.FC<childrenProps> = (props) => {
    const { children } = props
  return (
    <div>
      <ElectricFuelHeader />
      <div>
        {children}
      </div>
      <ElectricDuelFooter/>
    </div>
  )
}

export default ElectricFuelMainLayout
