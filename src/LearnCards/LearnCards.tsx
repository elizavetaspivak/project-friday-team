import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Redirect, useParams } from "react-router-dom"
import { CardType } from "../dal/api"
import {
	getCardsTC,
	initialStateCardsType,
	sendUpdatedGradeTC,
} from "../state/cards-reducer"
import { AppRootStateType } from "../state/store"
import s from "./LearnCards.module.css"

const grades = ["не знал", "забыл", "долго думал", "перепутал", "знал"]

const getCard = (cards: CardType[]) => {
	const sum = cards.reduce(
		(acc, card) => acc + (6 - card.grade) * (6 - card.grade),
		0
	)
	const rand = Math.random() * sum
	const res = cards.reduce(
		(acc: { sum: number; id: number }, card, i) => {
			const newSum = acc.sum + (6 - card.grade) * (6 - card.grade)
			return { sum: newSum, id: newSum < rand ? i : acc.id }
		},
		{ sum: 0, id: -1 }
	)
	console.log("test: ", sum, rand, res)

	return cards[res.id + 1]
}

export const LearnCards = () => {
   const isLoginIn = useSelector<AppRootStateType, boolean>(
      (state) => state.login.isLoggedIn
  );
 
	const cards = useSelector<AppRootStateType, Array<CardType>>(
		(state) => state.cards.cards
	)
	const [isChecked, setIsChecked] = useState<boolean>(false)
	const [first, setFirst] = useState<boolean>(true)
	const [card, setCard] = useState<CardType>({
		__v: 0,
		_id: "fake",
		cardsPack_id: "",
		user_id: "",

		answer: " no answer",
		question: " no question",
		grade: 0,
		shots: 0,

		type: "",
		rating: 0,

		created: "",
		updated: "",
	})

	const { id } = useParams<{ id: string }>()
	const dispatch = useDispatch()

	useEffect(() => {
		if (first) {
			dispatch(getCardsTC({ cardsPack_id: id }))
			setFirst(false)
		}

		if (cards.length > 0) setCard(getCard(cards))

		return () => {}
	}, [dispatch, id, cards, first])

	const onNext = () => {
		setIsChecked(false)

		if (cards.length > 0) {
			// dispatch
			setCard(getCard(cards))
		} else {
		}
	}

	const sendGrade = (grade: number) => {
		dispatch(sendUpdatedGradeTC(grade, card._id))
	}
   if (!isLoginIn) {
      return <Redirect to={'/login'}/>;
  }
	return (
		<div className={s.learnCards}>
			<div className={s.learnCardsBlock}>
				<h2>Learn Cards </h2>

				<div className={s.question}><h4>Question:</h4>"{card.question}" </div>
				<div className={s.learnCheckButton}>
					<button onClick={() => setIsChecked(true)}>Check</button>
				</div>

				{isChecked && (
					<div className={s.answerBlock}>
						<div className={s.answer} ><h4>Answer:</h4> "{card.answer}"</div>
						<div className={s.rating}>
                  <h4>Rate yourself:</h4>
							{grades.map((g, i) => (
								<button
									key={"grade-" + i}
									onClick={() => {
										sendGrade(i + 1)
									}}
								>
									{g}
								</button>
							))}
						</div>
						<div className={s.learnNextButton}>
							<button  onClick={onNext}>Next</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
