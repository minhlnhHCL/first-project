import axios from "axios"
import reducer, { getUsers } from "../../store/userSlice"
import { renderWithRedux, screen } from "../../test-utils"
import { fetchData } from "../utils/fetchData"
import UserList from "./UserList"
import { useDispatch, useSelector } from "react-redux";
import { waitFor } from '@testing-library/react';

const sampleUser = [{
    id: 1,
    firstName: "Minh",
    lastName: "Luong",
    image: 'https://robohash.org/hicveldicta.png',
    age: 25,
    company: {
        title: "Front End Engineer",
    },
}, {
    id: 1,
    firstName: "Min",
    lastName: "Min",
    image: 'https://robohash.org/hicveldicta.png',
    age: 21,
    company: {
        title: "Front End Engineer",
    },
}]


// jest.mock('axios')

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: jest.fn(),
    useDispatch: jest.fn(),
}));



let getSpySuccess

describe('User List', () => {
    beforeAll(() => {
        jest.spyOn(axios, 'get').mockImplementation(() => {
            return new Promise((resolve, reject) => {
                return resolve({
                    data: {
                        users: [...sampleUser]
                    }
                });
            });
        });
        useDispatch.mockReturnValue(() => { });
        useSelector.mockReturnValue({
            users: []
        });

    })
    it('should run its side effect and be rendered', async () => {
        // expect(getSpySuccess).toHaveBeenCalledTimes(1);
        // expect(getSpySuccess).toBeCalledWith(
        //     'https://dummyjson.com/users'
        // );
        const { container } = renderWithRedux(<UserList />, {
            preloadedState: {
                users: [...sampleUser]
            }
        })
        // expect(useDispatch).toHaveBeenCalledTimes(1);
        expect(container).toMatchSnapshot();
        // const dispatch = jest.fn();
        // const getUsers = jest.fn()
        // useDispatch.mockReturnValue(dispatch);
        // await waitFor(() => expect(getUsers).toBeCalled());
        // expect(dispatch).toBeCalled()
        // expect(dispatch).toBeCalledWith(
        //     sampleUser
        // );

    })
})