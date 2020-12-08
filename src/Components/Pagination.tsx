import React, {useState} from "react";
import style from './Pagination.module.css'

type PaginatorPropsType = {
    postsPerPage: number
    totalPosts: number
    paginate: (pageNumber:number)=>void
}

export const Paginator = (props: PaginatorPropsType) => {
    const [portionNumber, setPortionNumber] = useState(1)
    const portionCount = props.totalPosts / props.postsPerPage
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(props.totalPosts / props.postsPerPage); i++) {
        pageNumbers.push(i)
    }
    let leftPortionPageNumber = (portionNumber - 1) * props.postsPerPage + 1
    let rightPortionPageNumber = portionNumber * props.postsPerPage
    return (
        <nav>
            <ul className='pagination'>
                {portionNumber > 1 && <button onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>Prev</button>}
                {pageNumbers.filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(number => (
                        <span key={number} className="page-item">
            <a onClick={() => props.paginate(number)} href="!#" className={style.page}>
                {number}
            </a>
        </span>
                    ))}
                {portionCount > portionNumber &&
                <button onClick={() => {
                    setPortionNumber(portionNumber + 1)
                }}>Next</button>
                }

            </ul>
        </nav>
    )
}