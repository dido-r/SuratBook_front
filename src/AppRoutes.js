import { Route, Routes } from 'react-router-dom';
import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Profile } from "./components/Profile/Profile";
import { Register } from "./components/Register/Register";
import { UserList } from "./components/UserList/UserList";
import { CreateGroup } from './components/Group/CreateGroup/CreateGroup';
import { GroupPage } from './components/Group/GroupPage/GroupPage';
import { GroupExplore } from './components/Group/GroupExplore/GroupExplore';
import { SearchResults } from './components/SearchResults/SearchResults';
import { UserGuard } from './components/Guards/UserGuard';
import { NoUserGuard } from './components/Guards/NoUserGuard';

export function AppRoutes() {

    return (

        <Routes>
            <Route element={<UserGuard />}>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Route>
            <Route element={<NoUserGuard />}>
                <Route path="/" element={<Home />} />
                <Route path="/user/:id" element={<Profile />} />
                <Route path="/group/:id" element={<GroupPage />} />
                <Route path="/groups" element={<GroupExplore />} />
                <Route path="/users" element={<UserList />} />
                <Route path="/groups/create-group" element={<CreateGroup />} />
                <Route path="/search/:place" element={<SearchResults />} />
            </Route>
        </Routes>
    );
}