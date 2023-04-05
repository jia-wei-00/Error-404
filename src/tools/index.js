export function log(obs) {
    if (Array.isArray(obs)) {
        console.log(obs.map(el => {
            return {
                ...el
            }
        }))
    } else if (typeof obs === "object") {
        return {
            ...obs
        }
    }
}