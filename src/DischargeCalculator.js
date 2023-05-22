import React, { useState } from "react";
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormDatePicker, ProFormDigit } from '@ant-design/pro-form';
import { Alert } from "antd";
import dayjs from "dayjs";
import 'dayjs/locale/he'  // Import the locale
import isLeapYear from 'dayjs/plugin/isLeapYear'  // Import plugin
import isoWeek from 'dayjs/plugin/isoWeek'  // Import plugin
dayjs.extend(isLeapYear)  // Use plugin
dayjs.extend(isoWeek)  // Use plugin

dayjs.locale('he')  // Use Hebrew locale

const DischargeCalculator = () => {
    const [releaseDate, setReleaseDate] = useState(null);

    const calculateReleaseDate = ({ dischargeDate, vacationDays }) => {
        let dischargeDateDayjs = dayjs(dischargeDate).clone();  // Clone the day.js object
        let daysCounted = 0;

        while (daysCounted < vacationDays) {
            dischargeDateDayjs = dischargeDateDayjs.subtract(1, "day");

            // Ignore weekends
            if (dischargeDateDayjs.isoWeekday() <= 4 || dischargeDateDayjs.isoWeekday() === 7) {  // Sunday to Thursday
                daysCounted += 1;
            }
        }

        setReleaseDate(dischargeDateDayjs);
    }

    return (
        <ProCard width="300px" centered>
            <ProForm
                onFinish={calculateReleaseDate}
                submitter={{
                    submitButtonProps: {
                        label: "CALCULATE",
                        size: 'medium',
                        style: {
                            width: '100%',
                        }
                    },
                }}
            >
                <ProFormDatePicker name="dischargeDate" label="Discharge Date" placeholder="Select Discharge Date" />
                <ProFormDigit name="vacationDays" label="Vacation Days" min={0} placeholder="Enter Vacation Days" />
            </ProForm>
            {releaseDate &&
                <Alert
                    message={`The release date is ${releaseDate.format("DD/MM/YYYY")}`}
                    type="success"
                />
            }
        </ProCard>
    );
}

export default DischargeCalculator;
