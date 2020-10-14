import React, { useCallback,useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Header';
import {FaStar, FaArrowRight} from 'react-icons/fa';
import { Container,Footer, QuestionHeader,ResponseOptions,Response,Content,Question,StarRating} from './styles';
import {Link} from 'react-router-dom';
import {useToast} from '../../context/ToastContext';
const Inquiry: React.FC = () => {
    const [isFocused, setFocused] = useState(false);
   const [isQuestionAnswered, setQuestionAnswered] = useState(false);
   const {category} = useParams();

   const {addToast, removeAllToast} = useToast();

  const handleResponse = useCallback(() => {
    addToast({title: 'Você errou!', type: 'error'});
    setQuestionAnswered(true);
  },[addToast]);

  const handleNextQuestion = useCallback(() => {
    removeAllToast();
  },[removeAllToast]);

  return (
      <Container>
          <Header title={category}/>
          <Content>
            <QuestionHeader>
                <strong>Questão 1</strong>
                <StarRating >
                        <FaStar color="#353c58"/>
                        <FaStar color="#353c58"/>
                        <FaStar color="#d3d3d3" />
                        <span>Médio</span>
                </StarRating>
            </QuestionHeader>
            <Question>
                Sobre a conhecida Idade dos Metais,
                na transição entre a Pré-História e a História,
                é possível afirmar que
            </Question>
            <ResponseOptions>
                    <Response onClick={() => setFocused(true)} >
                        Não existe ligação entre o uso dos metais e a formação de grande impérios
                    </Response>
                    <Response onClick={() => setFocused(true)} >
                        Apenas o bronze pode efetivamente ser apresentado como o primeiro metal utilizado
                    </Response>
                    <Response onClick={() => setFocused(true)}>
                        Foi marcada pela utilização do cobre, bronze e ferro, na produção de armas, instrumentos agrícola
                    </Response>
                    <Response onClick={() => setFocused(true)}>
                        A vida nômade dos primeiros grupos humanos foi um estímulo para o uso dos metais
                    </Response>
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
