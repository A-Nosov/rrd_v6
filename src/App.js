import React from 'react'
import {
    Navigate,
    NavLink,
    Outlet,
    useParams,
    useRoutes
} from 'react-router-dom'

const routes = () => [
    { path: '/', element: <MainPage /> },
    {
        path: 'users',
        element: <UsersLayout />,
        children: [
            { path: '/users', element: <UserListPage /> },
            { path: '/users/:userId/profile', element: <UserPage /> },
            { path: '/users/:userId/edit', element: <EditPage /> }
        ]
    },
    { path: '*', element: <Navigate to="/" /> }
]

const MainPage = () => {
    return (
        <>
            <NavLink to="/users">Users list Page</NavLink>
            <h1>MainPage</h1>
        </>
    )
}

const UsersLayout = () => {
    return (
        <>
            <NavLink to="/users">Users list Page</NavLink>
            <h1>Users Layout</h1>
            <NavLink to="/">Main Page</NavLink>
            <Outlet />
        </>
    )
}

const UserListPage = () => {
    const users = [
        { _id: 0, name: 'User 0' },
        { _id: 1, name: 'User 1' },
        { _id: 2, name: 'User 2' },
        { _id: 3, name: 'User 3' },
        { _id: 4, name: 'User 4' }
    ]

    return (
        <>
            <h1>User List Page</h1>
            <ul>
                {users.map((u) => (
                    <NavLink to={`/users/${u._id}/profile`} key={u._id}>
                        <li>{u.name}</li>
                    </NavLink>
                ))}
            </ul>
        </>
    )
}

const UserPage = () => {
    const { userId } = useParams()
    return (
        <>
            <h1>UserPage</h1>
            <ul>
                <li>
                    <NavLink to="/users">Users list Page</NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${userId}/edit`}>
                        Edit this user
                    </NavLink>
                </li>
            </ul>
            <p>{`userId:${userId}`}</p>
        </>
    )
}

const EditPage = () => {
    const { userId } = useParams()
    return (
        <>
            <h1>Edit User Page</h1>
            <ul>
                <li>
                    <NavLink to={`/users/${userId}/profile`}>
                        User profile Page
                    </NavLink>
                </li>
                <li>
                    <NavLink to={`/users/${Number(userId) + 1}/profile`}>
                        Another User
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/users">Users list Page</NavLink>
                </li>
            </ul>
        </>
    )
}

function App() {
    const elements = useRoutes(routes())
    return (
        <>
            <h1>App Layout</h1>
            {elements}
        </>
    )
}

export default App
