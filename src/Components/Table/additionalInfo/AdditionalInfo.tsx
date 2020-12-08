import React, {ChangeEvent, useState} from 'react'
import style from './AdditionalInfo.module.css'
import {Button, TextField} from "@material-ui/core";
import {changeEmailAC, changeNameAC, changePhoneAC, changeStatusAC, defArrType} from "../../Redux/table-reducer";
import {useDispatch} from "react-redux";

type AdditionalInfoPropsType = {
    additionalInfoObj: defArrType
    setShowAdditionalInfo: (value: boolean) => void
}

export const AdditionalInfo = (props: AdditionalInfoPropsType) => {
    const dispatch = useDispatch()
    let [editModeForName, setEditModeForName] = useState<boolean>(false);
    let [editModeForEmail, setEditModeEmail] = useState<boolean>(false);
    let [editModeForPhone, setEditModePhone] = useState<boolean>(false);
    let [editModeForStatus, setEditModeStatus] = useState<boolean>(false);
    let [changeName, setChangeName] = useState(props.additionalInfoObj.name)
    let [changeEmail, setChangeEmail] = useState(props.additionalInfoObj.email)
    let [changePhone, setChangePhone] = useState(props.additionalInfoObj.tel)
    let [changeStatus, setChangeStatus] = useState(props.additionalInfoObj.status)

    const activatedEditModeName = () => {
        setEditModeForName(true);
    }
    const activatedEditModeEmail = () => {
        setEditModeEmail(true);
    }
    const activatedEditModePhone = () => {
        setEditModePhone(true);
    }
    const activatedEditModeStatus = () => {
        setEditModeStatus(true);
    }


    const disActivatedEditMode1 = () => {
        setEditModeForName(false);
        dispatch(changeNameAC(changeName, props.additionalInfoObj.id))

    }
    const disActivatedEditMode2 = () => {
        setEditModeEmail(false);
        dispatch(changeEmailAC(changeEmail, props.additionalInfoObj.id))

    }
    const disActivatedEditMode3 = () => {
        setEditModePhone(false);
        dispatch(changePhoneAC(changePhone, props.additionalInfoObj.id))

    }
    const disActivatedEditMode4 = () => {
        setEditModeStatus(false);
        dispatch(changeStatusAC(changeStatus, props.additionalInfoObj.id))

    }

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeName(e.currentTarget.value)
    }
    const changeTitleEmail = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeEmail(e.currentTarget.value)
    }
    const changeTitlePhone = (e: ChangeEvent<HTMLInputElement>) => {
        setChangePhone(e.currentTarget.value)
    }
    const changeTitleStatus = (e: ChangeEvent<HTMLInputElement>) => {
        setChangeStatus(e.currentTarget.value)
    }


    return (
        <div className={style.container}>

            <div>
                Выбран пользователь:
                {
                    editModeForName
                        ?
                        <TextField
                            size={"small"}
                            variant="outlined"
                            value={changeName}
                            onChange={changeTitle}
                            autoFocus={true}
                            onBlur={disActivatedEditMode1}/>

                        : <span onDoubleClick={activatedEditModeName}>{changeName}</span>

                }
            </div>
            <div>
                Email :
                {
                    editModeForEmail
                        ?
                        <TextField
                            size={"small"}
                            variant="outlined"
                            value={changeEmail}
                            onChange={changeTitleEmail}
                            autoFocus={true}
                            onBlur={disActivatedEditMode2}/>
                        : <span onDoubleClick={activatedEditModeEmail}>{changeEmail}</span>

                }
            </div>
            <div>
                Phone : {
                editModeForPhone
                    ?
                    <TextField
                        size={"small"}
                        variant="outlined"
                        value={changePhone}
                        onChange={changeTitlePhone}
                        autoFocus={true}
                        onBlur={disActivatedEditMode3}/>
                    : <span onDoubleClick={activatedEditModePhone}>{changePhone}</span>

            }
            </div>
            <div>
                Status : {
                editModeForStatus
                    ?
                    <TextField
                        size={"small"}
                        variant="outlined"
                        value={changeStatus}
                        onChange={changeTitleStatus}
                        autoFocus={true}
                        onBlur={disActivatedEditMode4}/>
                    : <span onDoubleClick={activatedEditModeStatus}>{changeStatus}</span>
            }
            </div>

            <Button className={style.btn} color="secondary" onClick={() => {
                props.setShowAdditionalInfo(false)
            }}>Close</Button>


        </div>
    )
}