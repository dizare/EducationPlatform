import { Navigate, Redirect, Route, Routes } from 'react-router-dom';
import { Group } from "./components/Profile/Group";
import { Profile } from "./components/Profile/Profile";
import { Info } from "./components/Profile/ProfileInfo";
import { Settings } from "./components/Profile/Settings";
import { Title } from './components/Title';

import { Courses } from "./components/Profile/Courses";
import { CreateCourse } from "./components/Courses/CreateCourse";
import { EditingCourse } from './components/Courses/EditingCourse';

export const useRoutes = (isLogin) => {

    if (isLogin) {
        return (
            <Routes>
                <Route path="/profile" element={<Profile />}>
                    <Route path="info" element={<Info />} />
                    <Route path="courses" element={<Courses />} />
                    <Route path="group" element={<Group />} />
                    <Route path="settings" element={<Settings />} />
                    <Route path='*' element={<Navigate to="/profile/info" replace />} />
                </Route>
                <Route>
                    <Route path="/create-course" element={<CreateCourse />} />
                    <Route path="/editcourse/:id" element={<EditingCourse />} />
                </Route>
                <Route path='*' element={<Navigate to="/profile/" replace />} />

            </Routes>
        )
    } else {
        return (
            <Routes>
                <Route path="/login" element={<Title />} />
                <Route path='*' element={<Navigate to="/login" replace />} />
            </Routes>
        )
    }
};
