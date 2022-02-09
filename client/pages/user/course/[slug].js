import React, { useState, useEffect, createElement } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import StudentRoute from "../../../components/routes/StudentRoute";
import { Button, Menu, Avatar, Layout } from "antd";
import ReactPlayer from "react-player";
import ReactMarkdown from "react-markdown";
import {
  PlayCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CheckCircleFilled,
  MinusCircleFilled,
} from "@ant-design/icons";

const { Item } = Menu;

const SingleCourse = () => {
  const [clicked, setClicked] = useState(-1);
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [course, setCourse] = useState({ lessons: [] });
  const [completedLessons, setCompletedLessons] = useState([]);
  // force state update
  const [updateState, setUpdateState] = useState(false);

  // router
  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) loadCourse();
  }, [slug]);

  useEffect(() => {
    if (course) loadCompletedLessons();
  }, [course]);

  const loadCourse = async () => {
    const { data } = await axios.get(`/api/user/course/${slug}`);
    setCourse(data);
  };

  const loadCompletedLessons = async () => {
    const { data } = await axios.post(`/api/list-completed`, {
      courseId: course._id,
    });
    console.log("COMPLETED LESSONS => ", data);
    setCompletedLessons(data);
  };

  const markCompleted = async () => {
    const { data } = await axios.post(`/api/mark-completed`, {
      courseId: course._id,
      lessonId: course.lessons[clicked]._id,
    });
    console.log(data);
    setCompletedLessons([...completedLessons, course.lessons[clicked]._id]);
  };

  const markIncompleted = async () => {
    try {
      const { data } = await axios.post(`/api/mark-incomplete`, {
        courseId: course._id,
        lessonId: course.lessons[clicked]._id,
      });
      console.log(data);
      const all = completedLessons;
      console.log("ALL => ", all);
      const index = all.indexOf(course.lessons[clicked]._id);
      if (index > -1) {
        all.splice(index, 1);
        console.log("ALL WITHOUT REMOVED => ", all);
        setCompletedLessons(all);
        setUpdateState(!updateState);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { Header, Content, Footer, Sider } = Layout;

  return (
    <StudentRoute>
      {/* <pre>{JSON.stringify(course, null, 4)}</pre>
      {console.log(course)} */}
      <div className='row mt-2'>
        {/* <div className="pt-2"> */}
        {/* <div className='col'> */}
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            width={320}
            collapsedWidth={100}
            onClick={() => setCollapsed(!collapsed)}
            theme='light'
          >
            {/* <Button
              type='primary'
              block
              onClick={() => setCollapsed(!collapsed)}
              className='mt-2 mb-2'
            >
              {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
              {!collapsed && "Lessons"}
            </Button> */}

            <Menu
              defaultSelectedKeys={[clicked]}
              inlineCollapsed={collapsed}
              style={{
                height: "80vh",
                overflow: "auto",
                overflowX: "hidden",
              }}
              theme='light'
              mode={"inline"}
              className='pt-2'
            >
              {course.lessons.map((lesson, index) => (
                <Item
                  onClick={() => setClicked(index)}
                  key={index}
                  icon={
                    <Avatar
                      size={35}
                      className='pb-2'
                      className='text-dark fw-bold'
                    >
                      {index + 1}
                    </Avatar>
                  }
                >
                  {lesson.title.substring(0, 30)}
                  {completedLessons.includes(lesson._id) ? (
                    <CheckCircleFilled style={{ fontSize: '16px'}} className='text-primary ms-3' />
                  ) : (
                    <MinusCircleFilled style={{ fontSize: '16px'}} className='text-danger ms-3' />
                  )}
                </Item>
              ))}
            </Menu>
          </Sider>
          {/* </div> */}

          {/* <div className='col'> */}
          <Layout className='site-layout pt-2'>
            <Content style={{ margin: "0 16px" }}>
              {clicked !== -1 ? (
                <>
                  <div className='col alert alert-primary square'>
                    <b>{course.lessons[clicked].title.substring(0, 30)}</b>
                    {completedLessons.includes(course.lessons[clicked]._id) ? (
                      <span
                        className='float-end'
                        onClick={markIncompleted}
                      >
                        <a className='pe-auto'>Mark as incomplete</a>
                      </span>
                    ) : (
                      <span
                        className='float-end'
                        onClick={markCompleted}
                      >
                        <a className='pe-auto'>Mark as completed</a>
                      </span>
                    )}
                  </div>

                  {course.lessons[clicked].video &&
                    course.lessons[clicked].video.Location && (
                      <>
                        <div className='wrapper'>
                          <ReactPlayer
                            className='player'
                            url={course.lessons[clicked].video.Location}
                            width='100%'
                            height='100%'
                            controls
                            onEnded={() => markCompleted()}
                          />
                        </div>
                      </>
                    )}

                  <ReactMarkdown
                    children={course.lessons[clicked].content}
                    className='single-post'
                  />
                </>
              ) : (
                <div className='d-flex justify-content-center p-5'>
                  <div className='text-center p-5'>
                    <PlayCircleOutlined className='text-primary display-1 p-5' />
                    <p className='lead'>
                      Click on the lessons to start learning
                    </p>
                  </div>
                </div>
              )}
            </Content>
          </Layout>
        </Layout>
        {/* </div> */}
        {/* </div> */}
      </div>
    </StudentRoute>
  );
};

export default SingleCourse;
