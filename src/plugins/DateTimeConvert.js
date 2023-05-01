

export const DateTimeConvert = (date) => {
    return new Date(date).toLocaleDateString("pt-BR") + " às " + new Date(date).toLocaleTimeString("pt-BR")
}
