import React, {useEffect, useState} from "react";
import style from './Table.module.css'
import {Header} from "../Header/Header";
import {useDispatch, useSelector} from "react-redux";
import {RootStateType} from "../Redux/Store";
import {
    statusTypeForContact,
    defArrType,
    setDeleteContactAC,
    setInputAC, setModalForNewContactAC,
    setModalIsOpenAC,
    setNewArrAC, setStatus
} from "../Redux/table-reducer";
import {Button, Checkbox} from "@material-ui/core";
import {AdditionalInfo} from "./additionalInfo/AdditionalInfo";
import {restoreState, saveState} from "../LocalStorageForTable";
import {NewContact} from "./newContact/NewContact";


const customStyles = {
    content: {
        width: '450px',
        height: '550px',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


export const TableBigListOfContacts = () => {
    const dispatch = useDispatch()
    const [showAdditionalInfo, setShowAdditionalInfo] = useState(false)
    const [additionalInfoObj, setAdditionalInfoObj] = useState<defArrType>({
        id: 1,
        name: '',
        email: '',
        status: '',
        tel: '',
        dataCreated: '',
        dataChanged: '',
        password: ''
    })

    const input = useSelector<RootStateType, string>(state => state.table.input)
    const status = useSelector<RootStateType, statusTypeForContact>(state => state.table.status)
    const [checkNew] = useState<statusTypeForContact>('client')
    const [cont, setCont] = useState<ContType>({
        name: '',
        email: '',
        tel: '',
        status: '' as statusTypeForContact,
    })
    const modalIsOpenForError = useSelector<RootStateType, boolean>(state => state.table.modalIsOpenForError)
    const modalForNewContact = useSelector<RootStateType, boolean>(state => state.table.modalForNewContact)
    const array = useSelector<RootStateType, Array<defArrType>>(state => state.table.array)
    const [newInput, setNewInput] = useState<string>('')

    useEffect(() => {
        restoreState1()
    }, [])
    let filteredNames = array

    let setValue = (value: string) => {
        if (input.length > 0) {
            dispatch(setNewArrAC(array.filter((i: any) => {
                let matchNames = i.firstName.toLowerCase()
                return matchNames.match(value)
            })))
        }
        dispatch(setInputAC(value))

        if (array.length === 0 && !modalIsOpenForError) {
            dispatch(setModalIsOpenAC(true))
            setTimeout(() => {
                dispatch(setModalIsOpenAC(false))
            }, 2000)
        }
    }
    const onHandleClickASC = () => {

        dispatch(setNewArrAC([...array].sort((a, b) => {
            saveState1()
            return a.name === b.name ? 0 :
                a.name > b.name ? 1 : -1
        })))

    }
    const onHandleClickDESC = () => {

        dispatch(setNewArrAC([...array].sort((a, b) => {
            saveState1()
            return a.name === b.name ? 0 :
                a.name < b.name ? 1 : -1
        })))

    }

    filteredNames = array.filter((c: any) =>
        c.tel.toLowerCase().indexOf(newInput.toLowerCase()) !== -1 || c.name.toLowerCase().indexOf(newInput.toLowerCase()) !== -1
    )


    if (status === 'admin') {
        filteredNames = filteredNames.filter((c: any) => c.status === 'admin')
    }
    if (status === 'partner') {
        filteredNames = filteredNames.filter((c: any) => c.status === 'partner')
    }
    if (status === 'client') {
        filteredNames = filteredNames.filter((c: any) => c.status === 'client')
    }

    ///////////*********LOCAL STARAGE***********/////////////
    useEffect(()=>{
        saveState1()
    },[filteredNames])
    const saveState1 = () => {
        saveState('filteresStatusContacts', array)
    }

    function restoreState1() {
        let stateFromLocalStorage1 = restoreState("filteresStatusContacts", array);
        dispatch(setNewArrAC(stateFromLocalStorage1))
    }

    return (
        <div>
            <Button color="primary" onClick={() => {
                dispatch(setModalForNewContactAC(true))
            }}>Добавить Контакт
            </Button>
            <NewContact
                modalForNewContact={modalForNewContact}
                customStyles={customStyles}
                cont={cont}
                setCont={setCont}
                saveState1={saveState1}
                checkNew={checkNew}
            />
            <div className={style.filterContacts}>
               <span>
                   <Checkbox color="primary" onClick={() => {
                       dispatch(setStatus('client'))
                   }}
                   />Client
               </span>
                <span><Checkbox color="primary" onClick={() => {
                    dispatch(setStatus('partner'))
                }}/>Partner</span>
                <span><Checkbox color="primary" onClick={() => {
                    dispatch(setStatus('admin'))
                }}/>Admin</span>
                <span><Checkbox color="primary" onClick={() => {
                    dispatch(setStatus(''))
                }}/>All</span>
            </div>

            <Header newInput={newInput} setNewInput={setNewInput} input={input} setValue={setValue}/>

            {modalIsOpenForError ? <div className={style.error}>Ничего не найдено</div> : ''}
            <div className={style.newClassName}>
                <div className={style.tableForHover}>
                    <div className={style.myTableHeader}>
                        <div className={style.box1}>
                            <p className={style.headerName}>
                                Id
                                <span onClick={onHandleClickASC}>▲</span><span onClick={onHandleClickDESC}>▼</span></p>
                        </div>
                        <div className={style.box2}>
                            <p className={style.headerName}>Name</p>
                        </div>
                        <div className={style.box3}>
                            <p className={style.headerName}>Email</p>
                        </div>
                        <div className={style.box4}>
                            <p className={style.headerName}>Phone</p>
                        </div>
                        <div className={style.box5}>
                            <p className={style.headerName}>Status</p>
                        </div>
                        <div className={style.box6}>
                            <p className={style.headerName}>Del</p>
                        </div>
                    </div>

                    {filteredNames.map((el: any, index: any) => {
                        return (
                            <div onClick={() => {
                                setAdditionalInfoObj({
                                    id: el.id,
                                    name: el.name,
                                    email: el.email,
                                    status: el.status,
                                    tel: el.tel,
                                    dataCreated: el.dataCreated,
                                    dataChanged: el.dataChanged,
                                    password: el.password
                                })
                                setShowAdditionalInfo(true)
                            }}
                                 className={style.myTable} key={el.id}>
                                <div className={style.box1}>
                                    <p>{el.id}</p>
                                </div>
                                <div className={style.box2}>
                                    <p>{el.name}</p>
                                </div>
                                <div className={style.box3}>
                                    <p>{el.email}</p>
                                </div>
                                <div className={style.box4}>
                                    <p>{el.tel}</p>

                                </div>
                                <div className={style.box5}>
                                    <p>{el.status}</p>
                                </div>
                                <div className={style.box6}>
                                    <Button onClick={() => {
                                        dispatch(setDeleteContactAC(el.id))
                                        saveState1()
                                    }}>X</Button>
                                </div>
                            </div>
                        )
                    })}
                </div>
                {showAdditionalInfo && <AdditionalInfo setShowAdditionalInfo={setShowAdditionalInfo}
                                                       additionalInfoObj={additionalInfoObj}/>}
            </div>
        </div>)
}

export type ContType ={
    name: string,
    email: string,
    tel: string,
    status:  statusTypeForContact,
}
