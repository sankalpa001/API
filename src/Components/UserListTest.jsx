import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserList from './UserList';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{ id: 1, name: 'John Doe' }]),
    })
);

describe('UserList', () => {
    it('renders user names after fetching data', async () => {
        render(<UserList />);
        await waitFor(() => expect(screen.getByText('John Doe')).toBeInTheDocument());
    });

    it('displays an error message when the API call fails', async () => {
        fetch.mockImplementationOnce(() => Promise.reject(new Error('API is down')));
        render(<UserList />);
        await waitFor(() => expect(screen.getByText('Error: API is down')).toBeInTheDocument());
    });
});
