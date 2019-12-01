import request from "@/utils/request";

const BASE_URL =  'http://localhost:8888';
//默认会去public下面找/db.json"
export default {
    getList() {
        const req = request({
        url: '/db.json',
        method: "get"
        });
        return req;

    }
}