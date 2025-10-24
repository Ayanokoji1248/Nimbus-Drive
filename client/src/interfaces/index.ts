export interface folderProp {
    _id: string,
    folderName: string,
    parentFolder: string,
    createdAt: string,
}

export interface fileProp {
    _id: string,
    fileName: string,
    fileSize: number,
    fileType: string,
    fileUrl: string,
    createdAt: string,
    parentFolder?: string,
    user: {
        _id: string,
        username: string,
        email: string,
    }
}

