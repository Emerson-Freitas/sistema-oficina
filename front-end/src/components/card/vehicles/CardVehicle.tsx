import React from 'react'
import {formatDate} from '../../../utils/FormatDate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faMotorcycle, faTruck } from "@fortawesome/free-solid-svg-icons";

interface Props {
    name: string
    plate: string
    color: string
    type: string
    created_at: Date | string
}

const CardVehicle = ({ name, plate, color, type, created_at }: Props) => {
  return (
    <div style={{ margin: "2% 0 1% 0", display: 'flex', backgroundColor: "whitesmoke", borderRadius: 10 }}>
        <div style={{ width: "30%", padding: "1% 2%"}}>
            {type === "Carro" && <FontAwesomeIcon icon={faCar} size="2x" style={{ width: "100%", height: "100%"}}/>}
            {type === "Moto" && <FontAwesomeIcon icon={faMotorcycle} size="2x" style={{ width: "100%", height: "100%"}}/>}
            {type === "Caminhão" && <FontAwesomeIcon icon={faTruck} size="2x" style={{ width: "100%", height: "100%"}}/>}
        </div>
        <div style={{ padding: "5% 2%", width: "100%"}}>
            <p>Nome: <strong>{name}</strong></p>
            <p>Placa: <strong>{plate}</strong></p>
            <p>Cor: <strong>{color}</strong></p>
            <p>Tipo: <strong>{type}</strong></p>
            <p>Data de Criação: <strong>{formatDate(created_at)}</strong></p>
        </div>
    </div>
  )
}

export default CardVehicle