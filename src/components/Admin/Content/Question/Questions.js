import { useState } from "react";
import Select from 'react-select';
import './Questions.scss';
import { BsFillPatchPlusFill, BsPatchMinusFill } from "react-icons/bs";
import { RiImageAddFill } from "react-icons/ri";
import { v4 } from "uuid";
import _ from "lodash";

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
                description: "Question 1",
                image: "",
                imageFile: "",
                answers: [
                    {
                        id: v4(),
                        description: "Answer 1",
                        isCorrect: false
                    }
                ]
            }
        ]
    )
    console.log(questions)

    const handleAddRemoveQuestion = (type, id) => {
        if (type === "ADD") {
            const newQuestion = {
                id: v4(),
                description: "",
                image: "",
                imageFile: "",
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
            let index = questions.findIndex(item => item.id === qid);
            questionsClone[index].answers.push(newAnswer);
            setQuestions(questionsClone);
        }
        if (type === "REMOVE") {
            let index = questions.findIndex(item => item.id === qid);
            questionsClone[index].answers = questionsClone[index].answers.filter(item => item.id !== aid);
            setQuestions(questionsClone);
        }
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
                                        />
                                        <label>Question {index + 1}'s Description</label>
                                    </div>
                                    <div className="group-upload">
                                        <label><RiImageAddFill className="label-upload" /></label>
                                        <input type="file" hidden />
                                        <span>0 file is upload</span>
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
                                                />
                                                <div className="form-floating answer-name">
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder='Your question description'
                                                        value={answer.description}
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
            </div>
        </div>
    )
}

export default Questions;