import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import { Container, Categories, Title } from './styles';
import api from '../../services/api';
import Spinner from '../../components/Spinner';

interface Category {
  id: number;
  name: string;
}

const Home: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories(): Promise<void> {
      const response = await api.get('/api_category.php');
      const { trivia_categories } = response.data;
      setCategories(trivia_categories);
      setLoading(false);
    }

    loadCategories();
  }, []);

  return (
    <Container>
      <Header title="Dev Mobile" />
      {isLoading && <Spinner />}
      <Categories>
        <li>
          <Title>
            <h4>Categories</h4>
          </Title>
        </li>
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
