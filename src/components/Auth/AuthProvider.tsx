import { useCookies } from "react-cookie";

function AuthProvider() {
    const [cookies] = useCookies(['user'])
    if (cookies.user)
        return {"Authorization": `Bearer ${cookies.user.token}`}
    else
        return {};
}
export default AuthProvider;
