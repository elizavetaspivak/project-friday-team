import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { CardType } from "../dal/api"
import { getCardsTC, initialStateType } from "../state/cards-reducer";
import { AppRootStateType } from "../state/store";

const grades = ['не знал', 'забыл', 'долго думал', 'перепутал', 'знал'];

const getCard = (cards: CardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number}, card, i) => {
            const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
            return {sum: newSum, id: newSum < rand ? i : acc.id}
        }
        , {sum: 0, id: -1});
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

export const LearnCards = () => {
   const cards = useSelector<AppRootStateType, Array<CardType>>(state => state.cards.cards)
   const [isChecked, setIsChecked] = useState<boolean>(false);
   const [first, setFirst] = useState<boolean>(true);
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
		// more_id: "",

		created: "",
		updated: "",
	})

   const {id} = useParams<{ id: string }>();
   const dispatch = useDispatch();

   useEffect(() => {
       if (first) {
           dispatch(getCardsTC({cardsPack_id : id}));
           setFirst(false);
       }

       if (cards.length > 0) setCard(getCard(cards));

       return () => {
       };
   }, [dispatch, id, cards, first]);


   const onNext = () => {
      setIsChecked(false);

      if (cards.length > 0) {
          // dispatch
          setCard(getCard(cards));
      } else {
      }
  };
	return (
		<div>
			<div>
				<span>Learn Cards </span>

				<div>Question:{card.question} </div>
				<div>
					<button onClick={() => setIsChecked(true)}>check</button>
				</div>

				 {isChecked && (
                <div>
                    <div>{card.answer}</div>

                    {grades.map((g, i) => (
                        <button key={'grade-' + i} onClick={() => {
                        }}>{g}</button>
                    ))} 

				 <div><button onClick={onNext} >next</button></div>
                </div>
            )} 
			</div>
		</div>
	)
}
