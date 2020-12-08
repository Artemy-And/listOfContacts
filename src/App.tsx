import './App.module.css';
import React from "react";
import styles from './App.module.css'

import {useDispatch, useSelector} from "react-redux";
import {TableBigListOfContacts} from "./Components/Table/TableBigListOfContacts";
const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};
function App() {
    const dispatch = useDispatch()
    const modalIsOpenForList = useSelector<any, boolean>(state => state.table.modalIsOpenForList)
    const listOfContacts = useSelector<any, any>(state => state.table.listOfContacts)
  return (
    <div className={styles.App}>

      <div className={styles.newContainer}>


           <TableBigListOfContacts/>


      </div>

    </div>
  );
}

export default App;
