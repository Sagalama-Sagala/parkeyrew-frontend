import axios from "axios";
import { getLocal } from "@/common/js/utils.js";

axios.defaults.baseURL = import.meta.env.VITE_APP_API;
axios.defaults.headers.common["Authorization"] = `Bearer ${getLocal("token")}`;
axios.defaults.headers.post["Content-Type"] =
    "application/x-www-form-urlencoded";
