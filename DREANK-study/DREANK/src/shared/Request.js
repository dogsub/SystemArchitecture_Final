import axios from "axios";
const URL = "http://localhost:8080"
const instance = axios.create({
    baseURL: URL // 요청을 www.aa.com/user로 보낸다면, www.aa.com까지 기록
});

export default instance;