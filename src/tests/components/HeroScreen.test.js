import "@testing-library/jest-dom";
import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router-dom";
import { HeroScreen } from "../../components/heroes/HeroScreen";

describe("Pruebas en <HeroScreen />", () => {
  const historyMock = {
    length: 10,
    push: jest.fn(),
    goBack: jest.fn(),
  };

  beforeEach(() => jest.clearAllMocks());

  test("Debe mostrarse correctamente el redirect si no hay argumentos en el URL", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero"]}>
        <HeroScreen history={historyMock} />
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test("Debe mostrar un hero si el parametro existe y se encuentra", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route path="/hero/:heroeId" component={HeroScreen} />
      </MemoryRouter>
    );

    // Cuando lo necesite usar realmente, verificar q haya etiquetas html con los datos del heroe
    expect(wrapper.find(".row").exists()).toBe(true);
  });

  test("Debe regresar a la pantalla anterior con push()", () => {
    const historyMock = {
      length: 1,
      push: jest.fn(),
      goBack: jest.fn(),
    };

    /*
        El componente const HeroScreen = ({ history }) => {}
        como se puede ver, recibe por props una history
        por ende para enviárselo mediante la <Route />
        tengo que hacerlo asi 
    */

    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          // los (props) los dejo a modo de saber q existen a futuro, pero no los uso
          component={(props) => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");

    expect(historyMock.push).toHaveBeenCalledWith("/");
    expect(historyMock.goBack).not.toHaveBeenCalled();
  });

  test("Debe regresar a la pantalla anterior con goBack()", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spider"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    wrapper.find("button").simulate("click");

    expect(historyMock.push).not.toHaveBeenCalled();
    expect(historyMock.goBack).toHaveBeenCalledWith();
  });

  test("Debe llamar al Redirect si el heroe no existe", () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={["/hero/marvel-spiderSARASA123"]}>
        <Route
          path="/hero/:heroeId"
          component={() => <HeroScreen history={historyMock} />}
        />
      </MemoryRouter>
    );

    // El Redirext es un string vacio
    expect(wrapper.text()).toBe("");
  });
});
