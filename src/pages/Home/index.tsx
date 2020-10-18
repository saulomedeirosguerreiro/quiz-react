import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { Container, Categories, Title } from './styles';
import api from '../../services/api';

interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/api_category.php');
      const { trivia_categories } = response.data;
      setCategories(trivia_categories);
    }

    loadCategories();
  }, []);

  return (
    <Container>
      <Header title="Dev Mobile" />
      <Title>
        <h4>Categories</h4>
      </Title>
      <Categories>
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`${category.id}/${category.name}/question`}
          >
            {category.name}
          </Link>
        ))}
      </Categories>
    </Container>
  );
};

export default Home;
