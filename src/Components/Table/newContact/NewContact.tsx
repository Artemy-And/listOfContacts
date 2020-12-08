import React from "react";
import Modal from "react-modal";
import style from "../Table.module.css";
import Grid from "@material-ui/core/Grid/Grid";
import {Button, Checkbox, FormControl, FormGroup, TextField} from "@material-ui/core";
import {statusTypeForContact, setAddNewContactAC, setModalForNewContactAC} from "../../Redux/table-reducer";
import {useDispatch} from "react-redux";
import {ContType} from "../TableBigListOfContacts";

type NewContactPropsType = {
    modalForNewContact: boolean
    customStyles: any
    cont: ContType
    setCont: ({}:ContType)=>void
    saveState1: ()=>void
    checkNew: statusTypeForContact
}

export const NewContact = (props: NewContactPropsType) => {
    const dispatch = useDispatch()
    return (
        <Modal
            isOpen={props.modalForNewContact}
            style={props.customStyles}
            contentLabel="Example Modal"
        >
            <div className={style.info}>
                <Grid container justify="center">
                    <Grid item xs={10}>
                        <FormControl>
                            <FormGroup>
                                <TextField type={'text'}
                                           variant="outlined"
                                           margin="normal"
                                           placeholder={"Name"}
                                           value={props.cont.name}
                                           onChange={(e) => {
                                               props.setCont({
                                                   ...props.cont,
                                                   name: e.target.value
                                               })
                                           }}/>
                                <TextField type={'text'}
                                           variant="outlined"
                                           margin="normal"
                                           placeholder={"Email"}
                                           value={props.cont.email}
                                           onChange={(e) => {
                                               props.setCont({
                                                   ...props.cont,
                                                   email: e.target.value
                                               })
                                           }}/>
                                <TextField type={'text'}
                                           variant="outlined"
                                           margin="normal"
                                           value={props.cont.tel}
                                           placeholder={"Phone"}
                                           onChange={(e) => {
                                               props.setCont({
                                                   ...props.cont,
                                                   tel: e.target.value
                                               })
                                           }}/>


                                <span>
                                        <Checkbox
                                            disabled={props.cont.status.length > 1 ? true : false}
                                            value={props.cont.status}
                                            onChange={(e) => {
                                                props.setCont({
                                                    ...props.cont,
                                                    status: 'client'
                                                })
                                            }}/>Client</span>
                                <span> <Checkbox value={props.checkNew}
                                                 disabled={props.cont.status.length > 1 ? true : false}
                                                 onChange={(e) => {
                                                     props.setCont({
                                                         ...props.cont,
                                                         status: 'admin'
                                                     })
                                                 }}/>Admin</span>
                                <span><Checkbox value={props.checkNew}
                                                disabled={props.cont.status.length > 1 ? true : false}
                                                onChange={(e) => {
                                                    props.saveState1()
                                                    props.setCont({
                                                        ...props.cont,
                                                        status: 'partner'
                                                    })

                                                }}
                                />Partner</span>
                                <Button variant="contained"
                                        color="primary"
                                        disabled={(props.cont.name.length > 0) && props.cont.email.length > 0 && props.cont.tel.length > 0 ? false : true}
                                        onClick={() => {
                                            dispatch(setAddNewContactAC(props.cont))
                                            // props.saveState1()
                                            dispatch(setModalForNewContactAC(false))
                                        }}>
                                    ADD
                                </Button>
                                <Button variant="contained" color="secondary" onClick={() => {
                                    dispatch(setModalForNewContactAC(false))
                                }}>Close</Button>
                            </FormGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </div>
        </Modal>
    )
}