import React, { useState } from "react"
import SuperInputText from "../../Test/h4/common/c1-SuperInputText/SuperInputText"
import s from "./SearchBox.module.css"

type SearchBoxProps = {
	searchCallback: (searchText: string) => void
	searchTextRequest?: string
	placeholder?: string
}

export const SearchBox= ({
	searchCallback,
	searchTextRequest = "",
	placeholder = "Search...",
}: SearchBoxProps) => {

	const [searchText, setSearchText] = useState(searchTextRequest)

	const onEnterCB = () => {
	
	}

	return (
		<div className={s.SearchBoxProps}>
			<SuperInputText
				className={s.searchBoxInput}
				placeholder={placeholder}
				onChangeText={setSearchText}
				value={searchText}
				onEnter={onEnterCB}
			/>
			<button
				className={s.searchBoxBtn}
				onClick={() => searchCallback(searchText)}
			> search</button>
		</div>
	)
}
