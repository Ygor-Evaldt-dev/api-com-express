export type Output = {
    username: string,
    email: {
        complete: string,
        provider: string
    },
    password: string,
    phone: {
        value: string,
        ddd: string,
        withoutDDD: string
    }
}