import dayjs from 'dayjs'

interface Props {
    value: string | number
    description: string
    vehicle: string
    created_at: Date | undefined
}

const CardBudget = ({ value, description, vehicle, created_at }: Props) => {

    const formatDate = (date: Date) => {
        return dayjs(date).format("DD/MM/YYYY HH:mm")
    }

  return (
    <div style={{ borderRadius: 12, backgroundColor: "whitesmoke", display: 'flex', flexWrap: "nowrap", alignItems: "center", padding: 20, height: 180, width: "30%"}}>
       <div style={{ flex: 1 }}>
            <img
                src={"https://avatars.githubusercontent.com/u/108194763?v=4"}
                width="120"
                height="120"
                style={{
                    borderRadius: "50%",
                    marginBottom: 20,
                    border: "4px solid #fff",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                }}
            />
        </div>
        <div style={{ flex: 1,textOverflow: ""}}>
            <div style={{ padding: "2.5px 0"}}>
                <span style={{ fontWeight: 'bold' }}>Veículo: {vehicle}</span>
            </div>
            <div style={{ padding: "2.5px 0"}}>
                <span style={{ fontWeight: 'bold' }}>Descrição: </span>{description}  
            </div>
            <div style={{ padding: "2.5px 0"}}>
                <span style={{ fontWeight: 'bold' }}>Valor: </span>R${value}
            </div>
            { created_at && (
                <div style={{ padding: "2.5px 0"}}>
                    <span style={{ fontWeight: 'bold' }}>Criado em: </span>{formatDate(created_at)}    
                </div>
            )}
        </div>
    </div>
  )
}

export default CardBudget