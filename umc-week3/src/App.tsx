import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Home } from './pages/Home.tsx';
import RootLayout from './layout/RootLayout.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Movies } from './pages/Movies.tsx';
import { UpComing } from './pages/UpComing.tsx';
import { TopRated } from './pages/TopRated.tsx';
import { NowPlaying } from './pages/NowPlaying.tsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <NotFound/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'movies/:movieId',
                element: <Movies/>
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'upComing/:movieId',
                element: <UpComing/>
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'topRated/:movieId',
                element: <TopRated/>
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'nowPlaying/:movieId',
                element: <NowPlaying/>
            }
        ]
    },

])

function App() {
    return <RouterProvider router={router}/>
}

export default App
