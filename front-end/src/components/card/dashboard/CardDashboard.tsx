import { useState } from 'react'
import EyeIcon from '@rsuite/icons/legacy/Eye';
import EyeSlashIcon from '@rsuite/icons/legacy/EyeSlash';
import { Panel, Placeholder } from 'rsuite';
import styles from '../dashboard/CardDashboard.module.css' 

interface Props {
    title: string
    color: string
    count: number
}

const CardDashboard = ({ title, color, count }: Props) => {
  const [visible, setVisible] = useState<boolean>(false)
  
  const handleVisible = () => {
    setVisible(!visible)
  }

  return (
    <Panel bordered className={styles.panel} style={{ backgroundColor: `${color}` }}>
        <div className={styles.box}>
        {/* #3e3e42 */}
            <h4 className={styles.title}>{title}</h4>
            <div onClick={handleVisible} className={styles.boxIcon}>
                {visible ? <EyeIcon className={styles.icon} /> : <EyeSlashIcon className={styles.icon}/>}
            </div>
        </div>
        {visible ? (
            <div className={styles.boxCount}>
                <h1>{count}</h1>
            </div>
        ) : (
            <Placeholder.Paragraph rows={3} className={styles.placeholder} />
        )}
    </Panel>
  )
}

export default CardDashboard