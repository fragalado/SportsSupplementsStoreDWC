import { Suplemento } from "./suplemento"

export interface Carrito {
    id?: string,
    idUsuario: string,
    idSuplemento: string,
    cantidad: number,
    estaComprado: boolean
}

export interface CarritoSuplemento {
    suplemento: Suplemento,
    carrito: Carrito
}
