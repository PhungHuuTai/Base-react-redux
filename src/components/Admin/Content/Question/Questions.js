import { useState } from "react";
import Select from 'react-select';
import './Questions.scss';
import { FcPlus } from "react-icons/fc";
import { BsFillTrashFill } from "react-icons/bs";

const Questions = () => {
    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" }
    ]

    const [selectedQuiz, setSelectedQuiz] = useState({})
    return (
        <div className="questions-container">
            <div className="title">
                Manage Questions
            </div>
            <div className="add-new-question">
                <div className="col-6 form-group">
                    <label>Select Quiz</label>
                    <Select
                        defaultValue={selectedQuiz}
                        onChange={setSelectedQuiz}
                        options={options}
                        placeholder="Quiz level..."
                    />
                </div>
                <div className="mt-3">
                    Add Questions:
                </div>
                <div>
                    <div className="questions-content">
                        <div className="form-floating description">
                            <input type="text" className="form-control" placeholder='Your question description' />
                            <label>Description</label>
                        </div>
                        <div className="group-upload">
                            <label className="label-upload">Upload Image</label>
                            <input type="file" hidden />
                            <span>0 file is upload</span>
                        </div>
                        <div className="btn-add">
                            <span><FcPlus className="icon-add" /></span>
                            <span><BsFillTrashFill className="icon-remove" /></span>
                        </div>

                    </div>
                    <div className="answers-content">
                        <input
                            className="form-check-input iscorrect"
                            type="checkbox"
                        />
                        <div className="form-floating answer-name">
                            <input type="text" className="form-control" placeholder='Your question description' />
                            <label>Answer 1</label>
                        </div>
                        <div className="btn-group">
                            <span><FcPlus className="icon-add" /></span>
                            <span><BsFillTrashFill className="icon-remove" /></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Questions;