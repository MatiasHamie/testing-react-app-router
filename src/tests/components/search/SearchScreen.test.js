import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { SearchScreen } from "../../../components/search/SearchScreen";

describe("Pruebas en <SearchScreen />", () => {
  test("Debe mostrarse correctamente con valores por defecto", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".alert-info").text().trim()).toBe("Search a hero");
  });

  test("Debe mostrar a batman y el input con el valor del queryString", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find("input").prop("value")).toBe("batman");
    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar un error si no se encuentra el Hero", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman123asdsarasa"]}>
        <Route path="/search" component={SearchScreen} />
      </MemoryRouter>
    );

    expect(wrapper.find(".alert-danger").text().trim()).toBe(
      `There is no a hero with batman123asdsarasa`
    );
  });

  test("Debe llamar el push del history", () => {
    const history = {
      push: jest.fn(),
    };

    const wrapper = mount(
      <MemoryRouter initialEntries={["/search?q=batman"]}>
        <Route
          path="/search"
          component={() => <SearchScreen history={history} />}
        />
      </MemoryRouter>
    );

    wrapper
      .find("input")
      .simulate("change", { target: { name: "searchText", value: "batman" } });

    wrapper.find("form").simulate("submit", () => preventDefault());

    expect(history.push).toHaveBeenCalledWith(`?q=batman`);
  });
});
