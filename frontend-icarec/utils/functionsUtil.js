export function eliminarEspacios(cadena) {
    if (!cadena) {
        return undefined
    }
    return cadena.replace(/\s+/g, '');
}