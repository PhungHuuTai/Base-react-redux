import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;

    const [dataQuiz, setDataQuiz] = useState([]);
    const [currQ, setCurrQ] = useState(0);

    useEffect(() => {
        fetchQuestions();
    }, [quizId])

    const fetchQuestions = async () => {
        const res = await getDataQuiz(quizId);
        if (res && res.EC === 0) {
            let raw = res.DT;
            let data = _.chain(raw)
                .groupBy("id")
                .map((value, key) => {
                    let answers = [];
                    let questionDescription, image = null;

                    value.forEach((item, index) => {
                        if (index === 0) {
                            questionDescription = item.description;
                            image = item.image;
                        }
                        answers.push(item.answers);
                    });
                    return { questionId: key, questionDescription, image, answers }
                })
                .value();
            setDataQuiz(data);
        }
    }

    const handlePrev = () => {
        if (currQ > 0) {
            setCurrQ(currQ - 1);
        }
    }

    const handleNext = () => {
        if (currQ < dataQuiz.length - 1) {
            setCurrQ(currQ + 1);
        }
    }

    return (
        <div className="detail-quiz-container">
            <div className="left-content">
                <div className="q-title">
                    Quiz {quizId}: {location?.state?.quizTitle}
                </div>
                <hr />
                <div className="q-body">
                    <img />
                </div>
                <div className="q-content">
                    <Question
                        data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[currQ] : []}
                        currQ={currQ}
                    />
                </div>
                <div className="q-footer">
                    <button
                        className="btn btn-secondary"
                        onClick={handlePrev}
                    >
                        Prev
                    </button>
                    <button
                        className="btn btn-primary"
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
            <div className="right-content">
                Count Down
            </div>
        </div>
    )
}

export default DetailQuiz;