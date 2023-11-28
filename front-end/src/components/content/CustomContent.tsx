import { ReactNode } from 'react'
import { Content } from 'rsuite'

interface Props {
    title: string
}

const CustomContent = ({ title, children }: Props & { children: ReactNode }) => {
  return (
    <Content style={{ backgroundColor: "#fff", padding: "2.5%" }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: "2.5%"}}>
            <h2>{title}</h2>
        </div>
        {children}
    </Content>
  )
}

export default CustomContent