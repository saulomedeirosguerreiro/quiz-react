import React, {useState,useEffect} from 'react';
import Header from '../../components/Header';
import { Container,Categories,Title } from './styles';
import api from '../../services/api';
import {Link} from 'react-router-dom';

interface Category{
    id: number;
    name: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
      async function loadCategories(){
        const response = await api.get('/api_category.php');
        const {trivia_categories} = response.data;
        setCategories(trivia_categories);
      }

      loadCategories();
  },[])

  return (
    <Container>
        <Header title="Dev Mobile"/>
        <Title>
            <h4>Categorias</h4>
        </Title>
        <Categories>
            {categories.map(category => (
                <Link key={category.id} to={`${category.id}/question/1`}>{category.name}</Link>
            ))}
        </Categories>

    </Container>
  );
}

export default Home;
