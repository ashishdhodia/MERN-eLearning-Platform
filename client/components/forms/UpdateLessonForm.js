import { Button, Progress, Switch } from "antd";
import ReactPlayer from "react-player";

const UpdateLessonForm = ({
  current,
  setCurrent,
  handleUpdateLesson,
  uploading,
  uploadVideoButtonText,
  handleVideo,
  progress,
  values
}) => {
  return (
    <div className='container pt-3'>
      {/* {JSON.stringify(current)}
      {JSON.stringify(values)} */}
      <form onSubmit={handleUpdateLesson}>
        <input
          type='text'
          className='form-control square'
          onChange={(e) => setCurrent({ ...current, title: e.target.value })}
          value={current.title}
          autoFocus
          required
        />

        <textarea
          className='form-control mt-3'
          cols='7'
          rows='7'
          onChange={(e) => setCurrent({ ...current, content: e.target.value })}
          value={current.content}
        ></textarea>

        {!uploading && current.video && current.video.Location && (
          <div className='pt-3 d-flex justify-content-center'>
            <ReactPlayer
              url={current.video.Location}
              width='430px'
              height='240px'
              controls
            />
          </div>
        )}

        <div className='d-grid'>
          <label className='btn btn-dark btn-lg mt-3'>
            {uploadVideoButtonText}
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

        <div className='d-flex justify-content-between pt-2'>
          <span className='pt-2 badge bg-danger'>Preview</span>
          <Switch
            className="float-right mt-2"
            disabled={uploading}
            checked={current.free_preview}
            name="fee_preview"
            onChange={(v) => setCurrent({ ...current, free_preview: v })}
          />
        </div>

        <div className='d-grid'>
          <Button
            onClick={handleUpdateLesson}
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

export default UpdateLessonForm;
