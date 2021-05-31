import React from "react";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { PrivateRoute } from "../../routers/PrivateRoute";
import { MemoryRouter } from "react-router";

describe("Pruebas en <PrivateRoute />", () => {
  const rest = {
    location: {
      pathname: "/marvel",
    },
  };

  // Para probar / simular las funciones, hay q mockearla
  Storage.prototype.setItem = jest.fn();

  test("Debe mostrar el componente si esta autenticado y guardar en localStorage", () => {
    //   El MemoryRouter viene con el ReactRouter, es para que podamos usar una Route fuera de un Router real
    //   Sirve para pruebas solamente

    // No se puede usar shallow, porque renderizaria SOLO esta parte, y yo necesito q se renderice todo el componente
    // por eso uso mount, el cual renderiza todos los componentes hijos y no solo el higher order component
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={true}
          component={() => <span>Componente de prueba</span>}
          {...rest}
        />
      </MemoryRouter>
    );

    expect(wrapper.find("span").exists()).toBe(true); // Ojo, recordar q esto no funciona con shallow,
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "lastPath",
      rest.location.pathname
    );
  });

  test("Debe de bloquear el componente si no esta logueado", () => {
    const wrapper = mount(
      <MemoryRouter>
        <PrivateRoute
          isAuthenticated={false}
          component={() => <span>Componente de prueba</span>}
          {...rest}
        />
      </MemoryRouter>
    );
    expect(wrapper.find("span").exists()).toBe(false); // Ojo, recordar q esto no funciona con shallow,
  });
});
