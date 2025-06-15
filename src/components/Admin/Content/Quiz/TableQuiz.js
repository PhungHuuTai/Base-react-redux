import { useState } from 'react';
import ModalDeleteQuiz from './ModalDeleteQuiz';

const TableQuiz = ({listQuiz, fetchAllQuiz}) => {
    const [showDeleteQuiz, setShowDeleteQuiz] = useState(false);
    const [dataDelete, setDataDelete] = useState({});

    const handleClickBtnDelete = (quiz) => {
        setShowDeleteQuiz(true);
        setDataDelete(quiz);
    }

    return (
        <>
            <div>List Quizzes</div>
            <table className="table table-hover table-bordered my-2">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Name</th>
                        <th scope="col">Description</th>
                        <th scope="col">Level</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listQuiz && listQuiz.length > 0 &&
                        listQuiz.map((item, index) => {
                            return (
                                <tr key={`table-quizzes-${index}`}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>{item.description}</td>
                                    <td>{item.difficulty}</td>
                                    <td style={{display: "flex", gap: "15px"}}>
                                        <button
                                            className="btn btn-warning"
                                            // onClick={() => handleClickBtnUpdate(item)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleClickBtnDelete(item)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    {
                        listQuiz && listQuiz.length === 0 &&
                        <tr>
                            <td colSpan={4}>Not found data</td>
                        </tr>
                    }
                </tbody>
            </table>
            <ModalDeleteQuiz 
                show={showDeleteQuiz}
                setShow={setShowDeleteQuiz}
                dataDelete={dataDelete}
                fetchAllQuiz={fetchAllQuiz}
            />
        </>
    )
}

export default TableQuiz;