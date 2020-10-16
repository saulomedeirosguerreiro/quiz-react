import React, { useCallback,useState, useEffect, useMemo, MouseEvent } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {FaArrowRight} from 'react-icons/fa';
import { Container,Footer, QuestionHeader,ResponseOptions,Response,Content,Question} from './styles';
import {Link} from 'react-router-dom';
import {useToast} from '../../context/ToastContext';
import api from '../../services/api';
import { useDispatch, useSelector } from 'react-redux';
import { addCategoryToQuiz,addQuestionToQuiz } from '../../store/modules/quiz/actions';
import { IState } from '../../store';
import { ICategory } from '../../store/modules/quiz/types';
import StarsRating from '../../components/StarsRating';

interface InquiryParams{
    categoryId:string;
}

interface Question{
    category:string;
    difficulty: 'hard' | 'medium' | 'easy';
    question:string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    answers: Array<string>;
}

const Inquiry: React.FC = () => {
   const [question, setQuestion] = useState<Question>({} as Question);
   const [isFocused, setFocused] = useState(false);
   const [isQuestionAnswered, setQuestionAnswered] = useState(false);
   const [chosenAnswer, setChosenAnswer] = useState('');
   const {categoryId} = useParams<InquiryParams>();
   const currentCategory = useSelector<IState, ICategory | undefined>(state => {
    return state.quiz.categories.find(category => category.id === Number(categoryId));
   });

   const level = useSelector<IState, 'hard' |'easy'| 'medium'>(state => {
    const category = state.quiz.categories.find(category => category.id === Number(categoryId));
        if(category && category.lastLevel)
            return category.lastLevel;
        return 'medium';
   });

  const history = useHistory();
  const {addToast, removeAllToast} = useToast();

  const dispatch = useDispatch();

  const  numberOfQuestion = useMemo(() => {
    if(!currentCategory)
        return 1;
    return  currentCategory.questions.length + 1;
  },[currentCategory]);



  useEffect(() => {

        if(numberOfQuestion === 11){
            history.push(`/${categoryId}/performance`);
            return;
        }

        async function loadQuestion(){
            const response =  await api.get('/api.php', {
                params: {
                    amount:1,
                    category: categoryId,
                    difficulty:level,
                    type:'multiple'
                }
            });

            const {results} = response.data;
            const {category, difficulty, question, incorrect_answers,correct_answer} = results[0] as Omit<Question, 'answers'>;
            const answers = [...incorrect_answers,correct_answer ];
            setQuestion({category, difficulty, question, incorrect_answers,correct_answer,answers });
            dispatch(addCategoryToQuiz({id: Number(categoryId), name: category}));
        }


        loadQuestion();

        return () => {
            removeAllToast();
        }

  },[categoryId,removeAllToast, dispatch,numberOfQuestion,history,level]);



  const handleResponse= useCallback((event: MouseEvent<HTMLButtonElement>) => {
        setFocused(true)
        setChosenAnswer(event.currentTarget.innerHTML);
  },[]);

  const handleResponseAction = useCallback(() => {
    const isHit = chosenAnswer === question.correct_answer;

    if(isHit)
        addToast({title: 'Você acertou!', type: 'success'});
    else
        addToast({title: 'Você errou!', type: 'error'});

   setQuestionAnswered(true);
  },[addToast,question,chosenAnswer]);

  const handleNextQuestion = useCallback(() => {

    const isHit = chosenAnswer === question.correct_answer;
    dispatch(addQuestionToQuiz({difficulty: question.difficulty,chosen_answer:chosenAnswer,correct_answer:question.correct_answer,isHit}, Number(categoryId)));
    removeAllToast();
    setFocused(false);
    setQuestionAnswered(false)
  },[removeAllToast,question,chosenAnswer, dispatch,categoryId]);

  return (
      <Container>
          <Header title={question.category}/>
          <Content>
            <QuestionHeader>
                <strong>Questão {numberOfQuestion}</strong>
                <StarsRating categoryId={Number(categoryId)}/>
            </QuestionHeader>

            <Question>
               {question.question}
            </Question>
            <ResponseOptions>
                {question.answers?.map(answer => (
                    <Response key={answer} onClick={(event: MouseEvent<HTMLButtonElement>) => handleResponse(event)}>
                    {answer}
                </Response>
                ))}
            </ResponseOptions>
          </Content>
         {isFocused &&
             <Footer>
                {!isQuestionAnswered? <button type="button" onClick={handleResponseAction}>Responder</button>
                :<Link to={numberOfQuestion < 10? `/${categoryId}/question` : `/${categoryId}/performance` } onClick={handleNextQuestion}>
                {numberOfQuestion < 10? 'Avançar' : 'Finalizar'}
                {numberOfQuestion < 10 && <FaArrowRight/>}
                </Link>}
            </Footer>
         }
      </Container>
  );
}

export default Inquiry;
