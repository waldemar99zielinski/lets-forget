import { useNavigate } from "react-router-dom"
import { getPath, Path } from "src/router/routes";

import { UserMenuButton } from "./UserMenuButton"

export const UserMenuPageRedirect = () => {
    const navigate = useNavigate();
    
    return <UserMenuButton onClick={() => navigate(getPath(Path.mobileUserMenu))}/>;
}