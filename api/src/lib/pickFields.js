// Copies only the listed fields that were actually sent, so a client can't set
// fields like _id or userId, and an unsent field keeps its default or current value.
export function pickFields(body, fields) {
    const picked = {};
    for (const field of fields) {
        if (body?.[field] !== undefined) {
            picked[field] = body[field];
        }
    }
    return picked;
}
