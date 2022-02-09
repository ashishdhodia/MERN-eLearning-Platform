import { Button, Progress, Tooltip, Badge } from "antd";
import { CloseCircleFilled } from "@ant-design/icons";
const AddLessonForm = ({
  values,
  setValues,
  handleAddLesson,
  uploading,
  uploadButtonText,
  handleVideo,
  progress,
  handleVideoRemove,
}) => {
  return (
    <div className='container pt-3'>
      <form onSubmit={handleAddLesson}>
        <input
          type='text'
          className='form-control square'
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          value={values.title}
          placeholder='Title'
          autoFocus
          required
        />

        <textarea
          className='form-control mt-3'
          cols='7'
          rows='7'
          onChange={(e) => setValues({ ...values, content: e.target.value })}
          value={values.content}
          placeholder='Content'
        ></textarea>

        <div className='d-grid'>
          {!uploading && values.video.Location && (
              <Badge
                count='x'
                style={{ position: "absolute", right: -10, top: 5 }}
                onClick={handleVideoRemove}
              />
          )}

          <label className='btn btn-dark btn-lg mt-3'>
            {uploadButtonText}
            <input onChange={handleVideo} type='file' accept='video/*' hidden />
          </label>
        </div>

        {progress > 0 && (
          <Progress
            className='d-flex justify-content-center pt-2'
            percent={progress}
            steps={10}
          />
        )}

        <div className='d-grid'>
          <Button
            onClick={handleAddLesson}
            className='btn btn-primary btn-lg mt-2'
            size='large'
            type='primary'
            loading={uploading}
            shape='round'
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddLessonForm;
