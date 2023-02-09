import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";

import {Login} from "..";
import { themeLight } from "../../../../constants/styles/themes/light";

jest.mock('@react-native-google-signin/google-signin', () => ({
  GoogleSignin: {}
}))

jest.mock('../../../../hooks/useSignInNavigation', () => () => ({}))

describe('login screen tests', () => {
  it('should render correctly even without text on textInputs and trying to Login', async () => {
    const {debug, container, getByTestId, getByText, findAllByTestId} = render(<Login/>, {
      wrapper: ({children}) => <ThemeProvider theme={themeLight}>{children}</ThemeProvider>
    })

    const button = await getByTestId('button-login-email');

    fireEvent(button, 'onPress')

    await waitFor(() => findAllByTestId('error-input'));

    expect(getByText('Campo Obrigatório')).toBeTruthy();
    expect(getByText('Necessário pelo menos 6 caracteres.')).toBeTruthy();
  })
})
