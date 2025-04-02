import './App.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { Home } from './pages/Home.tsx';
import RootLayout from './layout/RootLayout.tsx';
import { NotFound } from './pages/NotFound.tsx';
import { Movies } from './pages/Movies.tsx';
import { UpComing } from './pages/UpComing.tsx';
import { TopRated } from './pages/TopRated.tsx';
import { NowPlaying } from './pages/NowPlaying.tsx';
import { Detail } from './pages/Detail.tsx';

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
                path: 'movies',
                children:[
                  {
                    index: true,
                    element: <Movies />
                  },{
                    path: ':movieId/detail',
                    element: <Detail />
                  }
                ]
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'upComing',
                element: <UpComing/>
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'topRated',
                element: <TopRated/>
            },
            {
		            // /:을 활용해서, 동적으로 바뀌는 부분의 이름을 정의해줍시다.
                path: 'nowPlaying',
                element: <NowPlaying/>
            }
        ]
    },

])

function App() {
    return <RouterProvider router={router}/>
}

export default App
