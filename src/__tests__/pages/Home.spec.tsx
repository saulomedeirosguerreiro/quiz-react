import React from 'react';
import { act, render } from '@testing-library/react';
import MockAdapter from 'axios-mock-adapter';
import Home from '../../pages/Home';
import api from '../../services/api';

jest.mock('react-router-dom', () => {
  return {
    Link: ({ children }: { children: React.ReactNode }) => children,
  };
});

const apiMock = new MockAdapter(api);

describe('Home Page', () => {
  it('should be able to list of categories', async () => {
    const promise = Promise.resolve();
    apiMock.onGet('api_category.php').reply(200, {
      trivia_categories: [
        { id: 9, name: 'General Knowledge' },
        { id: 10, name: 'Entertainment: Books' },
        { id: 11, name: 'Entertainment: Film' },
      ],
    });

    const { debug } = render(<Home />);

    debug();

    await act(() => promise);
  });
});
