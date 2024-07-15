
export const IdPage = {
    customer : "cuspage",
    profile : 'filepage',
    examination : "examipage"
}

export const ProfilePageLink = (id :string) => {
    return `/media/${id}/${IdPage.profile}`
}

export const ExamipagePageLink = (id : string) => {
    return `/media/${id}/${IdPage.examination}`
}

export const UserPageLink = (id : string) => {
    return `/media/${id}/${IdPage.customer}`
}