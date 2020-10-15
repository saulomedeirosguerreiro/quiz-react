import React, { useCallback,useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {FaStar, FaArrowRight} from 'react-icons/fa';
import { Container,Footer, QuestionHeader,ResponseOptions,Response,Content,Question} from './styles';
import {Link} from 'react-router-dom';
import {useToast} from '../../context/ToastContext';
import api from '../../services/api';

interface Question{
    category:string;
    difficulty: 'hard' | 'medium' | 'easy';
    question:string;
    correct_answer: string;
    incorrect_answers: Array<string>;
    answers: Array<string>;
}

const stars = {
    hard: <>
            <FaStar color="#353c58"/>
            <FaStar color="#353c58"/>
            <FaStar color="#353c58" />
           </>,
    medium: <>
             <FaStar color="#353c58"/>
             <FaStar color="#353c58"/>
             <FaStar color="#d3d3d3" />
            </>,

    easy: <>
            <FaStar color="#353c58"/>
            <FaStar color="#d3d3d3"/>
            <FaStar color="#d3d3d3" />
          </>
  };

const Inquiry: React.FC = () => {
    const [question, setQuestion] = useState<Question>({} as Question);
    const [isFocused, setFocused] = useState(false);
   const [isQuestionAnswered, setQuestionAnswered] = useState(false);
   const {categoryId, questionId} = useParams();

  const {addToast, removeAllToast} = useToast();

  useEffect(() => {
        async function loadQuestion(){
            const response =  await api.get('/api.php', {
                params: {
                    amount:1,
                    category: categoryId,
                    difficulty:'medium',
                    type:'multiple'
                }
            });

            const {results} = response.data;
            const {category, difficulty, question, incorrect_answers,correct_answer} = results[0] as Omit<Question, 'answers'>;
            const answers = [...incorrect_answers,correct_answer ];
            setQuestion({category, difficulty, question, incorrect_answers,correct_answer,answers });
        }

        loadQuestion();

  },[categoryId]);

  const handleResponse = useCallback(() => {
    addToast({title: 'Você errou!', type: 'error'});
    setQuestionAnswered(true);
  },[addToast]);

  const handleNextQuestion = useCallback(() => {
    removeAllToast();
  },[removeAllToast]);

  return (
      <Container>
          <Header title={question.category}/>
          <Content>
            <QuestionHeader>
                <strong>Questão {questionId}</strong>
                <span>
                        {stars[question.difficulty]}
                        <span>{question.difficulty}</span>
                </span>
            </QuestionHeader>

            <Question>
               {question.question}
            </Question>
            <ResponseOptions>
                {question.answers?.map(answer => (
                    <Response key={answer} onClick={() => setFocused(true)}>
                    {answer}
                </Response>
                ))}
            </ResponseOptions>
          </Content>
         {isFocused &&
             <Footer>
                {!isQuestionAnswered? <Link to="/categoria/question" onClick={handleResponse}>Responder</Link>
                :<Link to="/" onClick={handleNextQuestion}>
                Avançar
                <FaArrowRight/>
                </Link>}
            </Footer>
         }
      </Container>
  );
}

export default Inquiry;
