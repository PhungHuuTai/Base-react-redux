import Select from 'react-select';
import './ManageQuiz.scss';
import { useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import { isNull } from 'lodash';

const ManageQuiz = () => {
    const options = [
        { value: "EASY", label: "EASY" },
        { value: "MEDIUM", label: "MEDIUM" },
        { value: "HARD", label: "HARD" }
    ]

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quizLevel, setQuizLevel] = useState("");
    const [image, setImage] = useState(null);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setImage(event.target.files[0])
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error('Name/Description is required!');
            return
        }
        let res = await postCreateNewQuiz(description, name, quizLevel?.value, image);
        if (res && res.EC === 0) {
            toast.success(res.EM);
            setName("");
            setDescription("");
            setQuizLevel("");
            setImage(null);
        } else {
            toast.error(res.EM)
        }
    }

    return (
        <div className="quiz-container">
            <div className="title">
                Manage Quizzes
            </div>
            <hr />
            <div className="add-new">
                <fieldset className="border rounded-3 p-3">
                    <legend className="float-none w-auto px-3">Add new Quiz</legend>
                    <div className="form-floating mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Your quiz name'
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                        <label>Name</label>
                    </div>
                    <div className="form-floating">
                        <input
                            type="text"
                            className="form-control"
                            placeholder='Description'
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                        <label>Description</label>
                    </div>
                    <div className='my-3'>
                        <Select
                            defaultValue={quizLevel}
                            onChange={setQuizLevel}
                            options={options}
                            placeholder="Quiz level..."
                        />
                    </div>
                    <div className="more-actions form-group">
                        <label className='mb-1'>Upload Image</label>
                        <input
                            type='file'
                            className='form-control'
                            onChange={(event) => handleChangeFile(event)}
                        />
                    </div>
                    <div className='mt-3'>
                        <button
                            className='btn btn-warning'
                            onClick={handleSubmitQuiz}
                        >
                            Save
                        </button>
                    </div>
                </fieldset>
            </div>
            <div className="list-detail">
                Table
            </div>
        </div>
    )
}

export default ManageQuiz;