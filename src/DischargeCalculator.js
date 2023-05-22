import React, { useState } from "react";
import ProCard from '@ant-design/pro-card';
import ProForm, { ProFormDatePicker, ProFormDigit, ProFormRadio } from '@ant-design/pro-form';
import ProLayout from '@ant-design/pro-layout';
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

    const calculateReleaseDate = ({ dischargeDate, vacationDays, serviceType }) => {
        let totalDays = vacationDays + Number(serviceType);  // Add the service type days to the vacation days
        let dischargeDateDayjs = dayjs(dischargeDate).clone();  // Clone the day.js object
        let daysCounted = 0;

        while (daysCounted < totalDays) {
            dischargeDateDayjs = dischargeDateDayjs.subtract(1, "day");

            // Ignore weekends
            if (dischargeDateDayjs.isoWeekday() <= 4 || dischargeDateDayjs.isoWeekday() === 7) {  // Sunday to Thursday
                daysCounted += 1;
            }
        }

        setReleaseDate(dischargeDateDayjs);
    }

    return (
        <ProLayout
            title="מחשבון חפש״ש"
            navBarRender={false}
            menuRender={false}
            footerRender={() => <div style={{ textAlign: 'center' }}>Made by Liam Mizrahi</div>}
            style={{ minHeight: '100vh' }}
            contentStyle={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
            <ProCard width="300px" centered>
                <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>מחשבון חפש״ש</h1>
                <ProForm
                    onFinish={calculateReleaseDate}
                    submitter={{
                        searchConfig: {
                            resetText: 'איפוס טופס',
                            submitText: 'חישוב תאריך',
                        },
                        submitButtonProps: {
                            size: 'large',
                            style: {
                                width: '100%',
                            },
                            children: 'Calculate',  // Change the text of the submit button
                        },
                        resetButtonProps: {
                            children: 'Clear',  // Change the text of the reset button
                        },
                    }}
                >
                    <ProFormDatePicker name="dischargeDate" label="תאריך שחרור" placeholder="תאריך שחרור" />
                    <ProFormRadio.Group
                        name="serviceType"
                        label="סוג שירות"
                        options={[
                            { label: "עורפי", value: "0" },
                            { label: "תומכ״ל", value: "5" },
                            { label: "לחימה", value: "8" },
                        ]}
                        radioType="button"
                        initialValue="0"
                    />
                    <ProFormDigit
                        label="ימי חופשה"
                        placeholder={"יתרת ימי החופשה"}
                        name="vacationDays"
                        width="sm"
                        min={0}
                        max={25}
                    />
                </ProForm>
                {releaseDate &&
                    <Alert
                        message={`תאריך החפש״ש המשוער הינו  ${releaseDate.format("DD/MM/YYYY")}`}
                        type="success"
                    />
                }
            </ProCard>
        </ProLayout>
    );
}

export default DischargeCalculator;
