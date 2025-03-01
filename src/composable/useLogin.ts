import { ref } from 'vue';
import { ElNotification } from 'element-plus';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useLogin = () => {
  const router = useRouter();
  const loginForm = ref({
    name: '',
    password: '',
  });

  const login = async () => {
    try {
      const response = await axios.post(
        'https://qr-menu-backend-hxlj.onrender.com/api/auth/login',
        {
          name: loginForm.value.name,
          password: loginForm.value.password,
        }
      );

      if (response.data.statusCode === 200) {
        ElNotification({
          message: response.data.message,
          type: 'success',
        });
        localStorage.setItem('token', response.data.user.token);
        router.push('/admin/dashboard');
      } else {
        ElNotification({
          message: response.data.message,
          type: 'error',
        });
      }

      return response.data;
    } catch (error: any) {
      ElNotification({
        message: error.response.data.message || 'Login failed',
        type: 'error',
      });
    }
  };

  return { login, loginForm };
};
