import { useCookies } from "react-cookie";

function AuthProvider() {
    const [cookies] = useCookies(['user'])
    if (cookies.user)
        return {"Authorization": `Bearer ${cookies.user}`}
    else
        return {};
}
export default AuthProvider;