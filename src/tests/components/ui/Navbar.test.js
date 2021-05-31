import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router-dom";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../components/ui/Navbar";
import { types } from "../../../types/types";

describe("Pruebas en <Navbar />", () => {
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
      <MemoryRouter>
        <Router history={historyMock}>
          <Navbar />
        </Router>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  afterEach(() => jest.clearAllMocks());

  test("Debe de mostrarse correctamente", () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".text-info").text().trim()).toBe("Juanito");
  });

  test("Debe llamarse el logout y usar history", () => {
    wrapper.find("button").simulate("click");

    expect(contextValueForTesting.dispatch).toHaveBeenCalledWith({
      type: types.logout,
    });

    expect(historyMock.replace).toHaveBeenCalledWith("/login");
  });
});
