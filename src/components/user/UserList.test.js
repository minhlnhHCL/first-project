import { renderWithRedux } from "../../test-utils"
import UserList from "./UserList"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { cleanup, waitFor } from '@testing-library/react'
import { baseUrl, get } from "../utils/api-requests"

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


jest.mock('../utils/api-requests')

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}))

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}))

describe('User List', () => {
    beforeEach(() => {
        useDispatch.mockImplementation(() => jest.fn())
        useNavigate.mockReturnValue(() => { })
        useSelector.mockImplementation(callback => callback({ users: [] }))
        get.mockResolvedValue({
            data: {
                users: []
            }
        })
    })

    afterAll(cleanup)

    it('should run its side effect', async () => {
        const onLoading = jest.fn()
        const offLoading = jest.fn()
        get.mockResolvedValueOnce({
            data: {
                users: [...sampleUsers]
            }
        })
        const { container } = renderWithRedux(<UserList />, { offLoading, onLoading })
        await waitFor(() => expect(onLoading).toBeCalled())
        expect(useDispatch).toBeCalled()

        await waitFor(() => expect(offLoading).toBeCalled())
        expect(container).toMatchSnapshot()

    })
})