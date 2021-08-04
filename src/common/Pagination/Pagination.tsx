import classnames from "classnames"
import React, { useState } from "react"
import s from "./Pagination.module.css"

type PropsType = {
	page: number
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
	portionSize = 10,
}: PropsType) => {
	let pagesCount = Math.ceil(totalItemsCount / pageCount)
	const pages = []
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i)
	}

	const portionCount = Math.ceil(pageCount / portionSize)
	const [portionNumber, setPortionNumber] = useState<number>(1)
	const leftPortionPageNumber = (portionNumber - 1) * portionSize + 1
	const rightPortionPageNumber = portionNumber * portionSize + 1

	const prevPortionNumberHandler = () => {
		setPortionNumber(portionNumber - 1)
	}

	const nextPortionNumberHandler = () => setPortionNumber(portionNumber + 1)

	// const setPageHanler = (page: number) => {
	// 	onPageChanged(page)
	// }
	return (
		<div className={s.pagiator}>
			{/* {portionNumber > 1 && ( */}
				<button onClick={prevPortionNumberHandler}>PREV</button>
			{/* ) */}
         {/* } */}
			{pages
				.filter(
					(p) => p >= leftPortionPageNumber && p <= rightPortionPageNumber
				)
				.map((p) => {
					return (
						<span
							key={p}
							onClick={() => onPageChanged(p)}
							className={classnames(
								{
									[s.selected]: page === p,
								},
								s.pageNumber
							)}
						>
							{p + " "}
						</span>
					)
				})}
			{/* {portionCount > portionNumber && ( */}
				<button onClick={nextPortionNumberHandler}>NEXT</button>
			{/* )} */}
		</div>
	)
}
