import {defArr} from "../Array";



export type statusTypeForContact = 'client' | 'admin' | "partner" | ''
let initialState = {
    input: "",
    array: defArr as Array<defArrType>,
    modalIsOpenForList: true,
    modalIsOpenForError: false,
    modalForNewContact: false,
    // contact: {} as defArrType,
    status: '' as statusTypeForContact,



}


export function tableReducer(state: InitialStateType = initialState, action: AllACTypes):InitialStateType {
    switch (action.type) {
        case SET_NEW_ARR:
            return {...state, array: action.array}
        case SET_INPUT:
            return {...state, input: action.value}
        case SET_MODAL_IS_OPEN:
            return {...state, modalIsOpenForError: action.value}
        case SET_ADD_NEW_CONTACT:

            const newContact = {
                id: Math.floor(Math.random() * 1000),
                name: action.newContact.name,
                email: action.newContact.email,
                tel: action.newContact.tel,
                status: action.newContact.status,
                dataCreated: 'test',
                dataChanged: "test",
                password: 'test'
            }

            return {
                ...state,
                array: [newContact, ...state.array]
            }
        case SET_STATUS:
            return {...state, status: action.value}


        case SET_MODAL_FOR_NEW_CONTACT: {
            return {...state, modalForNewContact: action.value}
        }
        case SET_DELETE_CONTACT:
            return {...state, array: state.array.filter(tl => tl.id !== action.contactId)}
        case CHANGE_NAME_AC:
            return {...state, array: state.array.map(a => a.id === action.id ? {...a, name: action.name} : a)}
        case "CHANGE_EMAIL_AC":

            return {...state, array: state.array.map(a => a.id === action.id ? {...a, email: action.email} : a)}

        case "CHANGE_PHONE_AC":

            return {...state, array: state.array.map(a => a.id === action.id ? {...a, tel: action.phone} : a)}

        case "CHANGE_STATUS_AC":

            return {...state, array: state.array.map(a => a.id === action.id ? {...a, status: action.status} : a)}

        default:
            return state
    }
}


export const setNewArrAC = (array:  Array<defArrType>): setNewArrACType => ({type: SET_NEW_ARR, array})
export const setInputAC = (value: string): setInputACType => ({type: SET_INPUT, value})
export const setModalIsOpenAC = (value: boolean): setModalIsOpenACType => ({type: SET_MODAL_IS_OPEN, value})
export const setAddNewContactAC = (newContact: newContactType): SetAddNewContactACType => ({
    type: SET_ADD_NEW_CONTACT,
    newContact
})
export const setModalForNewContactAC = (value: boolean): SetModalForNewContactACType => ({
    type: SET_MODAL_FOR_NEW_CONTACT,
    value
})
export const setStatus = (value: statusTypeForContact): setStatusType => ({
    type: SET_STATUS,
    value
})
export const setDeleteContactAC = (contactId: number): setDeleteContactACType => ({
    type: SET_DELETE_CONTACT,
    contactId
})
export const changeNameAC = (name: string, id: number): ChangeNameActionType => {
    return {type: CHANGE_NAME_AC, id, name}
}
export const changeEmailAC = (email: string, id: number): ChangeEmailACType => {
    return {type: CHANGE_EMAIL_AC, id, email}
}
export const changePhoneAC = (phone: string, id: number): ChangePhoneACType => {
    return {type: CHANGE_PHONE_AC, id, phone}
}
export const changeStatusAC = (status: string, id: number): ChangeStatusACType => {
    return {type: CHANGE_STATUS_AC, id, status}
}

type ChangeStatusACType = {
    type: typeof CHANGE_STATUS_AC
    id: number
    status: string
}
type ChangePhoneACType = {
    type: typeof CHANGE_PHONE_AC
    id: number
    phone: string
}
type ChangeEmailACType = {
    type: typeof CHANGE_EMAIL_AC
    id: number
    email: string
}
type ChangeNameActionType = {
    type: typeof CHANGE_NAME_AC
    id: number
    name: string
}

type SetModalForNewContactACType = {
    type: typeof SET_MODAL_FOR_NEW_CONTACT
    value: boolean
}
type setDeleteContactACType = {
    type: typeof SET_DELETE_CONTACT
    contactId: number
}
type setStatusType = {
    type: typeof SET_STATUS
    value: statusTypeForContact
}
type SetAddNewContactACType = {
    type: typeof SET_ADD_NEW_CONTACT
    newContact: newContactType

}
type newContactType = {
    name: string
    email: string,
    tel: string,
    status: statusTypeForContact
}


type setNewArrACType = {
    type: typeof SET_NEW_ARR
    array: Array<defArrType>
}

type setInputACType = {
    type: typeof SET_INPUT
    value: string
}
type setModalIsOpenACType = {
    type: typeof SET_MODAL_IS_OPEN
    value: boolean
}
type AllACTypes =
    | setNewArrACType
    | setInputACType
    | setModalIsOpenACType
    | SetAddNewContactACType
    | SetModalForNewContactACType
    | setStatusType
    | setDeleteContactACType
    | ChangeStatusACType
    | ChangePhoneACType
    | ChangeEmailACType
    | ChangeNameActionType


export const SET_NEW_ARR = "SET_NEW_ARR"
export const SET_INPUT = "SET_INPUT"
export const SET_MODAL_IS_OPEN = "SET_MODAL_IS_OPEN"
export const SET_ADD_NEW_CONTACT = "SET_ADD_NEW_CONTACT"
export const SET_MODAL_FOR_NEW_CONTACT = "SET_MODAL_FOR_NEW_CONTACT"
export const SET_STATUS = " SET_STATUS"
export const SET_DELETE_CONTACT = " SET_DELETE_CONTACT"
export const CHANGE_NAME_AC = "CHANGE-CHANGE_NAME_AC-TITLE"
export const CHANGE_EMAIL_AC = "CHANGE_EMAIL_AC"
export const CHANGE_PHONE_AC = "CHANGE_PHONE_AC"
export const CHANGE_STATUS_AC = "CHANGE_STATUS_AC"


export type InitialStateType = {
    array: Array<defArrType>
    modalIsOpenForList: boolean,
    modalIsOpenForError: boolean,
    input: string,
    modalForNewContact: boolean
    // contact: defArrType,
    status:  statusTypeForContact

}
export type defArrType = {
    "id": number,
    "name": string,
    "email": string,
    "status": string
    "tel": string
    "dataCreated": string
    "dataChanged": string,
    "password": string
}







