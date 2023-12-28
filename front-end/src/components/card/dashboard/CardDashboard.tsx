import React, { useState } from 'react'
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { Panel, Placeholder } from 'rsuite';

interface Props {
    title: string
    color: string
}

const CardDashboard = ({ title, color }: Props) => {

  const [visible, setVisible] = useState<boolean>(false)
  
  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <Panel bordered style={{
        height: 180,
        width: "33%",
        backgroundColor: `${color}`,
        borderRadius: 10,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.175)',
        overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', alignItems: 'center'}}>
            <h4 style={{ color: 'white', fontWeight: 'bold' }}>{title}</h4>
            <div onClick={handleVisible} style={{ cursor: "pointer", marginLeft: "25%", color: 'white' }}>
                {visible ? <EyeIcon style={{ width: 25, height: 25 }}/> : <EyeSlashIcon style={{ width: 25, height: 25 }}/>}
            </div>
        </div>
        {visible ? (
            <div style={{ margin: "16px 0px", color: 'white'}}>
                <h1>Batata</h1>
            </div>
        ) : (
            <Placeholder.Paragraph rows={3} style={{ marginLeft: "1%", marginTop: "5%", marginBottom: "5%" }} />
        )}
    </Panel>
  )
}

export default CardDashboard