import React, {ChangeEvent} from "react";
import styles from './Header.module.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {setInputAC, setNewArrAC} from "../Redux/table-reducer";
import {useDispatch} from "react-redux";
import {Button} from "@material-ui/core";


type HeaderPropsType = {
    input: string
    setValue: (value:string)=>void
    newInput:string
    setNewInput:any

}



export const Header = (props: HeaderPropsType) => {
    const dispatch = useDispatch()

    const onChangeInputFind=(e:ChangeEvent<HTMLInputElement>)=>{
            e.preventDefault()
            // props.setValue(e.target.value)
        dispatch(setInputAC(e.target.value))
        }
    console.log(props.input)

// const clicked = (e:any)=>{
//     props.setValue(e.target.value)
// }

    return <div className={styles.searcContainer}>

            <input value={props.newInput}
                   onChange={(e)=>{
                       props.setNewInput(e.target.value)}}/>
        <FontAwesomeIcon
            icon={faSearch} className={styles.faSearch}/>


    </div>
}