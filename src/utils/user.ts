export const userForToken = (data: any) => {
    return {
        id: data._id,
        email: data.email,
        uploadFolder: data.uploadFolder,
        verifiedAccount: data.verifiedAccount,
        isFirstTime: data.isFirstTime,
        username: data.username
    }
}