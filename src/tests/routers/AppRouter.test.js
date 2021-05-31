import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { AppRouter } from "../../routers/AppRouter";
import { AuthContext } from "../../auth/AuthContext";

describe("Pruebas en <AppRouter />", () => {
  test("Debe mostrar el login si no esta logueado", () => {
    const contextValueForTesting = {
      dispatch: jest.fn(),
      user: {
        logged: false,
      },
    };
    const wrapper = mount(
      <AuthContext.Provider value={contextValueForTesting}>
        <AppRouter />
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar el componente de marvel si esta autenticado", () => {
    const contextValueForTesting = {
      dispatch: jest.fn(),
      user: {
        name: "Matias",
        logged: true,
      },
    };

    const wrapper = mount(
      <AuthContext.Provider value={contextValueForTesting}>
        <AppRouter />
      </AuthContext.Provider>
    );

    // con q me aparezca la barra de menu al estar logueado me sirve
    expect(wrapper.find(".navbar").exists()).toBe(true);
  });
});
