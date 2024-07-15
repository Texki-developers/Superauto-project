import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header';
import AuthApiService from '../../services/api-services';
import { useEffect } from 'react';

const Dashboard = () => {
  const navigate = useNavigate();
  const checkUser = async () => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: any = await AuthApiService.getApi('/auth/checkuser')
      if (res.statusCode !== 200) {
        navigate('/login')
      }
    } catch (error) {
      navigate('/login')
      console.log(error)
    }
  }
  useEffect(() => {
    checkUser()
  }, [])
  return (
    <div>
      <Header />
    </div>
  );
};

export default Dashboard;
