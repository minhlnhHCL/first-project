import { useDispatch, useSelector } from "react-redux";
import store from "../../store";
import axios from "axios";
import Form from "./Form";
import {
  cleanup,
  render,
  waitForElementToBeRemoved,
  screen,
  waitFor,
} from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { renderWithRedux } from "../../test-utils";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

jest.mock("axios");

describe("User Form", () => {
  afterAll(cleanup);
  beforeEach(() => {
    useDispatch.mockReturnValue(() => { });
    useSelector.mockReturnValue({
      currentUser: {
        firstName: '',
        lastName: '',
        image: '',
        age: 0,
        company: {
          title: ''
        }
      }
    });
  });

  it("should display empty form for new user", () => {
    const { container } = renderWithRedux(<Form />, {
      preloadedState: {
        currentUser: {
          firstName: '',
          lastName: '',
          image: '',
          age: 0,
          company: {
            title: ''
          }
        }
      }
    });
    expect(container).toMatchSnapshot();
  });
});
