import "@testing-library/jest-dom";
import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";

describe("Pruebas en authReducer", () => {
  const stateForTestOnly = { name: "Matias", logged: false };

  test("Debe retornar el estado por defecto", () => {
    const action = {};
    const resp = authReducer(stateForTestOnly, action);

    expect(resp).toEqual(stateForTestOnly);
  });

  test("Debe autenticar y colocar el name del usuario", () => {
    const action = { type: types.login, payload: stateForTestOnly };
    const resp = authReducer(stateForTestOnly, action);

    expect(resp.logged).toBe(true);
  });

  test("Debe borrar el name del usuario y logged en false", () => {
    const action = { type: types.logout };
    const resp = authReducer(stateForTestOnly, action);

    expect(resp.name).toBe(undefined);
    expect(resp.logged).toBe(false);
  });
});
