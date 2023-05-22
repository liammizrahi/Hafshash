import React, { useState } from "react";
import { DatePicker, InputNumber, Button, Alert } from "antd";
import dayjs from "dayjs";
import 'dayjs/locale/he'  // Import the locale
import isLeapYear from 'dayjs/plugin/isLeapYear'  // Import plugin
import isoWeek from 'dayjs/plugin/isoWeek'  // Import plugin
dayjs.extend(isLeapYear)  // Use plugin
dayjs.extend(isoWeek)  // Use plugin

dayjs.locale('he')  // Use Hebrew locale

const ArmyReleaseCalculator = () => {
    const [dischargeDate, setDischargeDate] = useState(null);
    const [vacationDays, setVacationDays] = useState(null);
    const [releaseDate, setReleaseDate] = useState(null);

    const calculateReleaseDate = () => {
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
        <div>
            <DatePicker onChange={(date, dateString) => setDischargeDate(date)} placeholder="Select Discharge Date" />
            <InputNumber min={0} onChange={value => setVacationDays(value)} placeholder="Enter Vacation Days" />
            <Button onClick={calculateReleaseDate}>Calculate</Button>
            {releaseDate &&
                <Alert
                    message={`The release date is ${releaseDate.format("DD/MM/YYYY")}`}
                    type="success"
                />
            }
        </div>
    );
}

export default ArmyReleaseCalculator;
