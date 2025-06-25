import { useState } from "react";
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 } from "uuid";
import _ from "lodash";
import LightBox from "react-awesome-lightbox";

const Questions = () => {
    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" }
    ]
    const [selectedQuiz, setSelectedQuiz] = useState({})
    const [questions, setQuestions] = useState(
        [
            {
                id: v4(),
                description: "",
                image: "",
                imageName: "",
                answers: [
                    {
                        id: v4(),
                        description: "",
                        isCorrect: false
                    }
                ]
            }
        ]
    )

    const [isPreviewImage, setIsPreviewImage] = useState(false);
    const [dataImagePreview, setDataImagePreview] = useState({
        title: "",
        url: ""
    })

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: v4(),
                description: "",
                image: "",
                imageName: "",
                answers: [
                    {
                        id: v4(),
                        description: "",
                        isCorrect: false
                    }
                ]
            }
            setQuestions([...questions, newQuestion])
        }
        if (type === "REMOVE") {
            let questionsClone = _.cloneDeep(questions);
            questionsClone = questionsClone.filter(item => item.id !== id);
            setQuestions(questionsClone);
        }
    }

    const handleAddRemoveAnswer = (type, qid, aid) => {
        let questionsClone = _.cloneDeep(questions);
        if (type === "ADD") {
            const newAnswer = {
                id: v4(),
                description: "",
                isCorrect: false
            }
            let index = questionsClone.findIndex(item => item.id === qid);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === "REMOVE") {
            let index = questionsClone.findIndex(item => item.id === qid);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== aid);
            setQuestions(questionsClone);
        }
    }

    const handleOnChange = (type, questionId, value) => {
        if (type === 'QUESTION') {
            let questionsClone = _.cloneDeep(questions);
            let index = questionsClone.findIndex(item => item.id === questionId);
            if (index > -1) {
                questionsClone[index].description = value;
                setQuestions(questionsClone);
            }
        }
    }

    const handleOnChangeImage = (questionId, event) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === questionId);
        if (index > -1 && event.target && event.target.files && event.target.files[0]) {
            questionsClone[index].image = event.target.files[0];
            questionsClone[index].imageName = event.target.files[0].name;
            setQuestions(questionsClone);
        }
    }

    const handleAnswer = (type, ansId, quesId, value) => {
        let questionsClone = _.cloneDeep(questions);
        let index = questionsClone.findIndex(item => item.id === quesId);
        if (index > -1) {
            questionsClone[index].answers =
                questionsClone[index].answers.map(answer => {
                    if (answer.id === ansId) {
                        if (type === "CHECKBOX") {
                            answer.isCorrect = value;
                        }
                        if (type === "INPUT") {
                            answer.description = value;
                        }
                    }
                    return answer;
                })
            setQuestions(questionsClone);
        }
    }

    const handlePreviewImage = (qid) => {
        let index = questions.findIndex(item => item.id === qid);
        if(index > -1) {
            setDataImagePreview({
                title: questions[index].imageName,
                url: URL.createObjectURL(questions[index].image)
            });
            setIsPreviewImage(true);
        }
    }

    const handleSubmitQuestionForQuiz = () => {

    }

    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <hr />
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label className="mb-2">Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        placeholder="Quiz level..."
                    />
                </div>
                <div className="mt-3 mb-2">
                    Add Questions:
                </div>
                {
                    questions && questions.length > 0 &&
                    questions.map((question, index) => {
                        return (
                            <div key={question.id} className="q-main mb-4">
                                <div className="questions-content">
                                    <div className="form-floating description">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder='Your question description'
                                            value={questions.description}
                                            onChange={(event) => handleOnChange('QUESTION', question.id, event.target.value)}
                                        />
                                        <label>Question {index + 1}'s Description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label htmlFor={`${question.id}`}><RiImageAddFill className="label-upload" /></label>
                                        <input
                                            id={`${question.id}`}
                                            onChange={(event) => handleOnChangeImage(question.id, event)}
                                            type="file"
                                            hidden
                                        />
                                        <span>
                                            {question.imageName ?
                                                <span style={{ cursor: "pointer" }} onClick={() => handlePreviewImage(question.id)}>{question.imageName}</span>
                                                :
                                                "0 file is upload"
                                            }
                                        </span>
                                    </div>
                                    <div className="btn-add">
                                        <span onClick={() => handleAddRemoveQuestion('ADD', '')}>
                                            <BsFillPatchPlusFill className="icon-add" />
                                        </span>
                                        {questions.length > 1 &&
                                            <span onClick={() => handleAddRemoveQuestion('REMOVE', question.id)}>
                                                <BsPatchMinusFill className="icon-remove" />
                                            </span>
                                        }
                                    </div>
                                </div>
                                {
                                    question.answers && question.answers.length > 0 &&
                                    question.answers.map((answer, index) => {
                                        return (
                                            <div key={answer.id} className="answers-content">
                                                <input
                                                    className="form-check-input iscorrect"
                                                    type="checkbox"
                                                    checked={answer.isCorrect}
                                                    onChange={(event) => handleAnswer('CHECKBOX', answer.id, question.id, event.target.checked)}
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='Your question description'
                                                        value={answer.description}
                                                        onChange={(event) => handleAnswer('INPUT', answer.id, question.id, event.target.value)}
                                                    />
                                                    <label>Answer {index + 1}</label>
                                                </div>
                                                <div className="btn-group">
                                                    <span onClick={() => handleAddRemoveAnswer("ADD", question.id, "")}>
                                                        <BsFillPatchPlusFill className="icon-add" />
                                                    </span>
                                                    {question.answers.length > 1 &&
                                                        <span onClick={() => handleAddRemoveAnswer("REMOVE", question.id, answer.id)}>
                                                            <BsPatchMinusFill className="icon-remove" />
                                                        </span>
                                                    }
                                                </div>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        )
                    })
                }
                {
                    questions && questions.length > 0 &&
                    <div>
                        <button
                            className="btn btn-warning"
                            onClick={handleSubmitQuestionForQuiz}
                        >
                            Save Questions
                        </button>
                    </div>
                }
                {isPreviewImage &&
                    <LightBox
                        image={dataImagePreview.url}
                        title={dataImagePreview.title}
                        onClose={() => setIsPreviewImage(false)}
                    ></LightBox>
                }
            </div>
        </div>
    )
}

export default Questions;