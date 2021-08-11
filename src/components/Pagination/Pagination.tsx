import classnames from "classnames"
import React, { useState } from "react"
import s from "./Pagination.module.css"
import { Button } from "@material-ui/core"
import Pagination from "@material-ui/lab/Pagination/Pagination"

type PropsType = {
	page: number | undefined
	onPageChanged: (page: number) => void
	pageCount: number
	totalItemsCount: number
	portionSize?: number
}

export const Paginator = ({
	page,
	onPageChanged,
	pageCount,
	totalItemsCount,
	// portionSize = 10,
}: PropsType) => {
	let pagesCount = Math.ceil(totalItemsCount / pageCount)
	const handleChange = (e: React.ChangeEvent<unknown>, value: number) => {
		onPageChanged && onPageChanged(value)
	}
	// const pages = []
	// for (let i = 1; i <= pagesCount; i++) {
	// 	pages.push(i)
	// }

	// const portionCount = Math.ceil(pagesCount / portionSize)


	// const [portionNumber, setPortionNumber] = useState<number>(1)
	// const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	// const rightPortionPageNumber = portionNumber * portionSize

	// const prevPortionNumberHandler = () => {
	// 	setPortionNumber(portionNumber - 1)
	// }

	// const nextPortionNumberHandler = () => setPortionNumber(portionNumber + 1)

	// const setPageHanler = (page: number) => {
	// 	onPageChanged(page)
	// }
	return ( 
	<div className={s.pagiator}>
		<Pagination count={pagesCount}
			page={page}
			onChange={handleChange} showFirstButton showLastButton
			variant='outlined'
				color='primary'
			/>
			</div>
			
		// <div className={s.pagiator}>
		// 	{portionNumber > 1 && (
		// 		<Button onClick={prevPortionNumberHandler}>PREV</Button>
		// 	)}
		// 	{pages
		// 		.filter(
		// 			(p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
		// 		)
		// 		.map((p) => {
		// 			return (
		// 				<span
		// 					key={p}
		// 					onClick={() => setPageHanler(p)}
		// 					className={classnames(
		// 						{
		// 							[s.selected]: page === p,
		// 						},
		// 						s.pageNumber
		// 					)}
		// 				>
		// 					{p}
		// 				</span>
		// 			)
		// 		})}
		// 	{portionCount > portionNumber && (
		// 		<Button onClick={nextPortionNumberHandler}>NEXT</Button>
		// 	)}
		// </div>
	)
}
