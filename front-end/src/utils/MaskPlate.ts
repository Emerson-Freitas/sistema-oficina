export const MaskPlate = (plate: string) => {
    const regex = '[A-Z]{3}[0-9][0-9A-Z][0-9]{2}';
    if (plate.match(regex)) {
        return plate
    }
}