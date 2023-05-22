import { Alert, ConfigProvider } from "antd";
import DischargeCalculator from './DischargeCalculator';
import enUS from 'antd/lib/locale/en_US';
import 'antd/dist/reset.css';
import './App.css';

function App() {
  return (
    <div className="App">
        <ConfigProvider locale={enUS} direction="rtl">
            <DischargeCalculator />
        </ConfigProvider>
    </div>
  );
}

export default App;
