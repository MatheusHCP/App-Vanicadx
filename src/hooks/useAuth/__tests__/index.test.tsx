import React from "react";
import {renderHook} from "@testing-library/react-hooks";
import MockAdapter from 'axios-mock-adapter'
import useAuth from '..'
import api from "../../../services/api";
import {useMock} from '../../../constants/mocks/user.mock'
import { AuthProvider } from "../../../context/Auth";
import { act } from "react-test-renderer";

/**
 * Mock the api service
 */

const apiMock = new MockAdapter(api);


test('should be able to sign in', async () => {
  
  apiMock.onGet(`/users`).reply(200, [useMock])

  const {result, waitForNextUpdate, waitFor} = renderHook(() => useAuth(), {wrapper: ({children}) => <AuthProvider>{children}</AuthProvider>})
  // Verificação para evitar a função que temos que usar a função dentro que é o HydrateUser.
  await waitFor(() => result.current.loading == false);

  await act(async () => {
    await result.current.signIn({
      email: useMock.email,
      password: useMock.password
    })
  });

  expect(result.current.user).toEqual(useMock)
})
