import React, { useState } from "react";
import axiosInstance from "../../axiosConfig";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";

interface Props {
  showForm: boolean;
  setShowForm: React.Dispatch<React.SetStateAction<boolean>>;
  onChapterCreated: () => void;
}

export const CreateChapter: React.FC<Props> = ({
  showForm,
  setShowForm,
  onChapterCreated,
}) => {
  const { id } = useParams(); // Получаем ID курса из параметров URL
  const [createChapterData, setCreateChapterData] = useState({
    name: "",
    description: "",
  });

  const handleCreateChapter = async () => {
    try {
      const response = await axiosInstance.post(
        `/api/chapters/createChapter/${id}`,
        {
          name: createChapterData.name,
          description: createChapterData.description,
          courseId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Chapter created:", response.data);
      setShowForm(false);
      onChapterCreated(); // Обновить данные о курсах и разделах
    } catch (error) {
      console.error("Error creating chapter:", error);
    }
  };

  return (
    <Modal
      show={showForm}
      onHide={() => setShowForm(false)}
      size="xl"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Название раздела"
              style={{ width: "400px", marginTop: "10px" }}
              value={createChapterData.name}
              onChange={(e) =>
                setCreateChapterData({
                  ...createChapterData,
                  name: e.target.value,
                })
              }
            />
          </div>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <textarea
          className="form-control"
          style={{ height: "400px" }}
          placeholder="Описание"
          value={createChapterData.description}
          onChange={(e) =>
            setCreateChapterData({
              ...createChapterData,
              description: e.target.value,
            })
          }
        />
      </Modal.Body>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <Button className="button-create-chapter" onClick={handleCreateChapter}>
          Добавить раздел
        </Button>
      </div>
    </Modal>
  );
};

export default CreateChapter;
