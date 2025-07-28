import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./Content/RightContent";

const DetailQuiz = () => {
    const params = useParams();
    const location = useLocation();
    const quizId = params.id;
    const [showModalResult, setShowModalResult] = useState(false);
    const [dataModal, setDataModal] = useState({});

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
                        item.answers.isSelected = false;
                        answers.push(item.answers);
                    });
                    return { questionId: key, questionDescription, image, answers }
                })
                .value();
            setDataQuiz(data);
        }
    }

    const handleCheckBox = (answerId, questionId) => {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let question = dataQuizClone.find(item => +item.questionId === +questionId)
        if (question && question.answers) {
            question.answers = question.answers.map(item => {
                if (+item.id === +answerId) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            })
        }
        let index = dataQuizClone.findIndex(item => +item.questionId === +questionId)
        if (index > -1) {
            dataQuizClone[index] = question;
            setDataQuiz(dataQuizClone);
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

    const handleFinish = async () => {
        let payload = {
            quizId: +quizId,
            answers: []
        };
        let answers = [];
        if (dataQuiz && dataQuiz.length > 0) {
            dataQuiz.forEach(question => {
                let questionId = question.questionId;
                let userAnswerId = [];

                question.answers.forEach(answer => {
                    if (answer.isSelected) {
                        userAnswerId.push(answer.id)
                    }
                })

                answers.push({
                    questionId: +questionId,
                    userAnswerId: userAnswerId
                })
            })
            payload.answers = answers;
            //submit api
            let res = await postSubmitQuiz(payload);
            if (res && res.EC === 0) {
                setDataModal({
                    countCorrect: res.DT.countCorrect,
                    countTotal: res.DT.countTotal,
                    quizData: res.DT.quizData
                })
                setShowModalResult(true);
            } else {
                alert('something wrongs...');
            }
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
                        handleCheckBox={handleCheckBox}
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
                    <button
                        className="btn btn-warning"
                        onClick={handleFinish}
                    >
                        Finish
                    </button>
                </div>
            </div>
            <div className="right-content">
                <RightContent 
                    dataQuiz={dataQuiz}
                    handleFinish={handleFinish}
                    setCurrQ={setCurrQ}
                />
            </div>
            <ModalResult
                show={showModalResult}
                setShow={setShowModalResult}
                dataModal={dataModal}
            />
        </div>
    )
}

export default DetailQuiz;