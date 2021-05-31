import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { AuthContext } from "../../auth/AuthContext";
import { MemoryRouter } from "react-router";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe("Pruebas en <DashboardRoutes />", () => {
  const contextValueForTesting = {
    user: {
      name: "Juanito",
      logged: true,
    },
    dispatch: jest.fn(),
  };

  test("Debe de mostrarse correctamente", () => {
    const wrapper = mount(
      <AuthContext.Provider value={contextValueForTesting}>
        <MemoryRouter>
          <DashboardRoutes />
        </MemoryRouter>
      </AuthContext.Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
