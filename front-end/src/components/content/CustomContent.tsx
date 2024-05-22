import { ReactNode } from 'react'
import { Content } from 'rsuite'
import styles from './CustomContent.module.css'

interface Props {
    title: string
}

const CustomContent = ({ title, children }: Props & { children: ReactNode }) => {
  return (
    <Content className={styles.container}>
        <div className={styles.content}>
            <h2>{title}</h2>
        </div>
        {children}
    </Content>
  )
}

export default CustomContent