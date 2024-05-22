import React from 'react'
import {formatDate} from '../../../utils/FormatDate'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCar, faMotorcycle, faTruck } from "@fortawesome/free-solid-svg-icons";
import stylesDarkMode from './CardVehicleDarkMode.module.css'
import stylesLightMode from './CardVehicleLightMode.module.css'
import { useTheme } from '../../hooks/useTheme';

interface Props {
    name: string
    plate: string
    color: string
    type: string
    created_at: Date | string
}

const CardVehicle = ({ name, plate, color, type, created_at }: Props) => {
  const { theme } = useTheme()

  return (
    <div className={ theme === 'light' ? stylesLightMode.container : stylesDarkMode.container }>
        <div className={stylesLightMode.logoContent} >
            {type === "Carro" && <FontAwesomeIcon icon={faCar} size="2x" className={stylesLightMode.logo} />}
            {type === "Moto" && <FontAwesomeIcon icon={faMotorcycle} size="2x" className={stylesLightMode.logo}/>}
            {type === "Caminhão" && <FontAwesomeIcon icon={faTruck} size="2x" className={stylesLightMode.logo}/>}
        </div>
        <div className={stylesLightMode.content}>
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