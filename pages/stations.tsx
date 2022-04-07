import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import {
  Accordion,
  Button,
  Form,
  ListGroup,
  Modal,
  Toast,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import ClipboardToast from "../components/ClipboardToast";
import * as api from "../utils/swr";
import { toDate } from "../utils/date";

const StationModal = (props: {
  showModal: boolean;
  setShowModal: (_: boolean) => void;
  mutate: () => void;
}) => {
  const { showModal, setShowModal, mutate } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<api.CreateStationType>();

  const onSubmit: SubmitHandler<api.CreateStationType> = (data) => {
    setShowModal(false);
    api.CreateStation(data).then((res) => {
      mutate();
      console.log(res);
    });
  };

  const handleClose = () => setShowModal(false);

  return (
    <>
      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Station</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="name">
              <Form.Label>Station Name</Form.Label>
              <Form.Control
                placeholder="Epsilon 13"
                autoFocus
                {...register("name", { required: true })}
              />
            </Form.Group>
            <p>
              {errors.name && (
                <span className="text-danger">Station name is required</span>
              )}
            </p>
            <Form.Group controlId="comment">
              <Form.Label>Comment</Form.Label>
              <Form.Control as="textarea" rows={3} {...register("comment")} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Create Station
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
};

const StationList = () => {
  const {
    data: stations,
    mutate,
    error,
  } = api.useFetcher(api.ListStations, {});
  if (stations) stations.sort((a, b) => a.id - b.id);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [showClipboard, setShowClipboard] = useState<string>("");
  const [xy, setxy] = useState({ x: 0, y: 0 });

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    api.DelStation({ id }).then((res) => {
      console.log(res);
      mutate();
    });
  };

  if (error) {
    return <div className="alert alert-danger">{error?.data?.error}</div>;
  }

  if (!stations) {
    return <div></div>;
  }

  return (
    <>
      <div className="d-flex align-items-center mb-2">
        <h2>Stations</h2>
        <Button className="ms-auto" onClick={() => setShowModal(true)}>
          Create Station
        </Button>
      </div>
      <StationModal
        mutate={mutate}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      {showClipboard && (
        <ClipboardToast
          x={xy.x}
          y={xy.y}
          message={showClipboard}
          setMessage={setShowClipboard}
        />
      )}
      <ListGroup as="ol" numbered>
        <Accordion defaultActiveKey="0" alwaysOpen>
          {stations.map((station) => (
            <Accordion.Item eventKey={`${station.id}`} key={station.id}>
              <Accordion.Header>{station.name}</Accordion.Header>
              <Accordion.Body className="p-0">
                <ListGroup.Item
                  as="li"
                  className="d-flex justify-content-between align-items-start"
                >
                  <table className="table">
                    <tbody>
                      <tr>
                        <th scope="row" className="col-md-1">
                          Name
                        </th>
                        <td className="col-md-6">{station.name}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">
                          ID
                        </th>
                        <td className="col-md-6">{station.id}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">
                          API&nbsp;Key
                        </th>
                        <td className="col-md-6 text-primary">
                          <span
                            onClick={(e) => {
                              setxy({ x: e.clientX, y: e.clientY });
                              setShowClipboard(station.api_key);
                            }}
                          >
                            {station.api_key}
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">
                          Comment
                        </th>
                        <td className="col-md-6">{station.comment}</td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">
                          Created
                        </th>
                        <td className="col-md-6">
                          {toDate(station.created_at)}
                        </td>
                      </tr>
                      <tr>
                        <th scope="row" className="col-md-1">
                          Updated&nbsp;at
                        </th>
                        <td className="col-md-6">
                          {station.updated_at && toDate(station.updated_at)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </ListGroup.Item>
                <ListGroup.Item className="d-flex">
                  <Link
                    key={station.id}
                    href={`/stations/${station.id}`}
                    passHref
                  >
                    <button
                      type="button"
                      className="btn btn-outline-primary m-1"
                    >
                      edit station
                    </button>
                  </Link>
                  <button
                    onClick={(e) => handleRemove(e, station.id)}
                    type="button"
                    className="btn btn-outline-danger btn-sm m-1 ms-auto"
                  >
                    delete
                  </button>
                </ListGroup.Item>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </ListGroup>
    </>
  );
};

const Stations: NextPage = () => {
  return (
    <Layout>
      <StationList />
    </Layout>
  );
};

export default Stations;
