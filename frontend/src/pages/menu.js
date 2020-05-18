import { ApiOutlined, HomeOutlined } from '@ant-design/icons';
import Speedtest from './speedtest'
import Home from './home';

const menuItens = [
  {
    text: 'Home',
    icon: HomeOutlined,
    content: Home,
  },
  {
    text: 'Speedtest',
    icon: ApiOutlined,
    content: Speedtest,
  },
];

export default menuItens