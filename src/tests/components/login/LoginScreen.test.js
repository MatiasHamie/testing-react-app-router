import React from "react";
import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/login/LoginScreen";
import { mount } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { types } from "../../../types/types";

describe("Pruebas en <LoginScreen />", () => {
  const historyMock = {
    push: jest.fn(),
    location: {},
    // de aca para abajo, lo tuve q crear porque me lo pide en router
    listen: jest.fn(),
    createHref: jest.fn(),
    replace: jest.fn(),
  };

  const contextValueForTesting = {
    user: {
      name: "Juanito",
      logged: true,
    },
    dispatch: jest.fn(),
  };

  const wrapper = mount(
    <AuthContext.Provider value={contextValueForTesting}>
      <LoginScreen history={historyMock} />
    </AuthContext.Provider>
  );
  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe realizar el dispatch, llamar al localStorage con el path y la navegacion", () => {
    // wrapper.find("button").simulate("click");
    const handleClick = wrapper.find("button").prop("onClick");
    handleClick();

    expect(contextValueForTesting.dispatch).toHaveBeenCalledWith({
      type: types.login,
      payload: {
        name: "Fernando",
      },
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/");

    localStorage.setItem("lastPath", "/prueba");
    handleClick();
    expect(historyMock.replace).toHaveBeenCalledWith("/prueba");
  });
});
