import { useDispatch, useSelector } from "react-redux"
import Form from "./Form"
import {
  cleanup,
  screen,
  waitFor
} from "@testing-library/react"
import { useNavigate } from "react-router-dom"
import { renderWithRedux } from "../../test-utils"
import userEvent from "@testing-library/user-event"
import { act, Simulate } from "react-dom/test-utils"
import { post, put } from "../utils/api-requests"

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

jest.mock('../utils/api-requests')

const mockEmptyUser = {
  id: 0,
  firstName: '',
  lastName: '',
  image: '',
  age: 0,
  company: {
    title: ''
  }
}

const editUserData = {
  id: 1,
  firstName: "Minh",
  lastName: "Luong",
  image: 'https://robohash.org/hicveldicta.png',
  age: 25,
  company: {
    title: "Front End Engineer",
  },
}


const addUserData = {
  firstName: "Bi",
  lastName: "Bi",
  image: 'https://robohash.org/hicveldicta.png',
  age: 25,
  company: {
    title: "Front End Engineer",
  },
}

const sampleUsers = [{
  id: 1,
  firstName: "Minh",
  lastName: "Luong",
  image: 'https://robohash.org/hicveldicta.png',
  age: 25,
  company: {
    title: "Front End Engineer",
  },
}, {
  id: 2,
  firstName: "Min",
  lastName: "Min",
  image: 'https://robohash.org/hicveldicta.png',
  age: 21,
  company: {
    title: "Front End Engineer",
  },
}]

describe("User Form", () => {
  beforeEach(() => {
    useDispatch.mockImplementation(() => jest.fn())
    useNavigate.mockImplementation(() => jest.fn())
    useSelector.mockReturnValue(() => { })
  })

  afterAll(cleanup)

  it("should display an empty form", async () => {
    useSelector.mockReturnValue({
      currentUser: mockEmptyUser
    })
    const { container } = renderWithRedux(<Form />)
    expect(container).toMatchSnapshot()
  })

  it("should add a new user", async () => {

    useSelector.mockReturnValue({
      users: sampleUsers,
      currentUser: addUserData
    })

    const onLoading = jest.fn()
    const offLoading = jest.fn()
    const newInput = {
      ...addUserData,
      id: 3
    }

    post.mockResolvedValue({
      data: newInput
    })

    const { findByText } = renderWithRedux(<Form />, { onLoading, offLoading })
    userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => expect(onLoading).toBeCalled())
    expect(post).toBeCalled()
    expect(post).toBeCalledWith('/add', newInput)
    expect(useDispatch).toBeCalled()
    await waitFor(() => expect(findByText('Bi Bi')).toBeInTheDocument)
    await waitFor(() => expect(offLoading).toBeCalled())

  })

  it("should submit edit user", async () => {
    useSelector.mockReturnValue({
      currentUser: editUserData
    })

    const onLoading = jest.fn()
    const offLoading = jest.fn()

    const newInput = {
      ...editUserData,
      firstName: 'Ter',
      lastName: 'Med'
    }
    put.mockResolvedValue({
      data: newInput
    })

    renderWithRedux(<Form />, { onLoading, offLoading })

    act(() => {
      Simulate.change(screen.getByLabelText('First Name'), {
        target: { value: newInput.firstName, name: 'firstName' }
      })

      Simulate.change(screen.getByLabelText('Last Name'), {
        target: { value: newInput.lastName, name: 'lastName' }
      })
    })

    userEvent.click(screen.getByRole('button', { name: 'submit' }))
    await waitFor(() => expect(onLoading).toBeCalled())
    expect(put).toBeCalled()
    expect(put).toBeCalledWith('/1', newInput)
    expect(useDispatch).toBeCalled()
    await waitFor(() => expect(offLoading).toBeCalled())

  })
})
