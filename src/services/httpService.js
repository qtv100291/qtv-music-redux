import axios from 'axios';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content';
import additionalFunctionDom from '../ultis/additionalFunctionDom';


axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");

axios.interceptors.response.use(null, error=>{
    const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      icon: 'error',
      html: 'Đã Có Lỗi Xảy Ra. Xin Thử Lại',
      showConfirmButton: false,
      timer: 1250,
    }).then(() => {
      additionalFunctionDom.releaseBody();
    })
  }

  return Promise.reject(error);
})

export default {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    put:axios.put,
    patch: axios.patch
}


