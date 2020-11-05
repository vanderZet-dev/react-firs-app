import React from "react";
import styles from './Paginator.module.css';

type PropsType = {
    totalElements: number
    pageSize: number 
    currentPage: number 
    onCurrentPageChanged: (newPageNumber: number) => void,
    portionSize?: number
}

export let Paginator:React.FC<PropsType> = ({ totalElements, pageSize, currentPage, onCurrentPageChanged }) => {

    let pagesCount = Math.ceil(totalElements / pageSize);
    let pages: Array<number> = [];

    let showPagesLimit = 20;

    let firsPageToShow = currentPage;
    let lastPageToShow = currentPage + showPagesLimit - 1;

    for (let i = firsPageToShow; i <= lastPageToShow; i++) {
        pages.push(i);
    }

    const onNextPageSelect = () => {
        if (currentPage < pagesCount) {
            let newPageNumber = currentPage + 1;
            onCurrentPageChanged(newPageNumber);
        }
    }

    const onPreviousPageSelect = () => {

        if (currentPage > 1) {
            let newPageNumber = currentPage - 1;
            onCurrentPageChanged(newPageNumber);
        }
    }

    return (
        <div className={styles.users}>
            <div>Total elements: {totalElements}</div>
            <div>Current page: {currentPage}</div>
            <div>
                <button onClick={onPreviousPageSelect}>Previous</button>
                {
                    pages.map(p => (
                        <span className={currentPage === p ? styles.selectedPage : ""}
                            onClick={() => { onCurrentPageChanged(p) }} >
                            {p}
                        </span>)
                    )
                }
                <button onClick={onNextPageSelect}>Next</button>
            </div>
        </div>
    );
}