export const userForToken = (data: any) => {
    return {
        id: data._id,
        email: data.email,
        verifiedAccount: data.verifiedAccount,
        isFirstTime: data.isFirstTime,
        username: data.username
    }
}