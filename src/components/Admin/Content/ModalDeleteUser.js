import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from 'react-toastify';
import { deleteUser } from '../../../services/apiService';

const ModalDeleteUser = ({ show, setShow, dataDelete, fetchListUsersWithPaginate, curPage, setCurPage }) => {

    const handleClose = () => setShow(false);

    const handleSubmitDeleteUser = async () => {
        let data = await deleteUser(dataDelete.id);

        if (data && data.EC === 0) {
            toast.success(data.EM);
            handleClose();
            setCurPage(1);
            await fetchListUsersWithPaginate(curPage);
        }

        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete the User?</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure to delete this user. Email <b>{dataDelete.email}</b></Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleSubmitDeleteUser}>
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDeleteUser;