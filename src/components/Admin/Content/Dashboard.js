import { ResponsiveContainer, Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import './Dashboard.scss';
import { useEffect, useState } from 'react';
import { getOverview } from '../../../services/apiService';

const Dashboard = (props) => {

    const [dataOverview, setDataOverview] = useState([]);
    const [dataChart, setDataChart] = useState([]);

    useEffect(() => {
        fetchDataOverview();
    }, []);

    const fetchDataOverview = async () => {
        let res = await getOverview();
        if (res && res.EC === 0) {
            setDataOverview(res.DT);
            let Qz = res?.DT?.others?.countQuiz, Qs = res?.DT?.others?.countQuestions, As = res?.DT?.others?.countAnswers;
            const data = [
                { name: "Quizzes", "Qz": Qz },
                { name: "Questions", "Qs": Qs },
                { name: "Answers", "As": As },
            ];
            setDataChart(data);
        }
    }
    return (
        <div className="dashboard-container">
            <div className='title'>
                Analytics Dashboard
            </div>
            <div className='content'>
                <div className='c-left'>
                    <div className='child'>
                        <span className='text-1'>Total Users</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.users && dataOverview.users.total
                                ? dataOverview.users.total : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Quizzes</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuiz
                                ? dataOverview.others.countQuiz : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Questions</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countQuestions
                                ? dataOverview.others.countQuestions : 0}
                        </span>
                    </div>
                    <div className='child'>
                        <span className='text-1'>Total Answers</span>
                        <span className='text-2'>
                            {dataOverview && dataOverview.others && dataOverview.others.countAnswers
                                ? dataOverview.others.countAnswers : 0}
                        </span>
                    </div>
                </div>
                <div className='c-right'>
                    <ResponsiveContainer width="95%" height="100%">
                        <BarChart data={dataChart}>
                            <XAxis dataKey="name" />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="Qz" fill="#8884d8" />
                            <Bar dataKey="Qs" fill="#82ca9d" />
                            <Bar dataKey="As" fill="#15b8ea" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;