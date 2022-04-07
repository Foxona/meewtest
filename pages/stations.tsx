import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import { Button, Form, ListGroup, Modal } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import Layout from "../components/Layout";
import * as api from "../utils/swr";

// const token =
//   "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjF9.nuILLQ7XJaxFMhhzPP9u-tID7S5opHSA9qaDCmAqE-I";

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
  } = useForm<>();

  const onSubmit: SubmitHandler<> = (data) => {
    setShowModal(false);
    api
      .CreateStation({
        name: data.name,
        comment: data.comment,
      })
      .then((res) => {
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
  const { data: stations, mutate } = api.useFetcher(api.ListStations, {});
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleRemove = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    api.DelStation({ id }).then((res) => {
      console.log(res);
      mutate();
    });
  };

  if (!stations) {
    return <></>;
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
      <ListGroup as="ol" numbered>
        {stations.map((station) => (
          // <div key={station.id} >
          <Link key={station.id} href={`/stations/${station.id}`} passHref>
            <ListGroup.Item
              style={{ cursor: "pointer" }}
              as="li"
              className="d-flex justify-content-between align-items-start"
            >
              <div className="ms-2 me-auto">
                <div>
                  Station: <span className="fw-bold">{station.name}</span>
                </div>
                <div className="mt-1">
                  Id: <span className="fw-bold">{station.id}</span>
                </div>
                <div className="mt-1">
                  Comment: <span className="fw-bold">{station.comment}</span>
                </div>
                <div className="mt-1">
                  ApiKey:{" "}
                  <span className="fw-bold">
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      className="text-primary"
                    >
                      {station.api_key}
                    </a>
                  </span>
                </div>
                <div className="mt-1">
                  Created at:{" "}
                  <span className="fw-bold">{station.created_at}</span>
                </div>
                {station.updated_at && (
                  <div className="mt-1">
                    Updated at:{" "}
                    <span className="fw-bold">{station.updated_at}</span>
                  </div>
                )}
              </div>

              <div>
                <div className="d-flex gap-2">
                  <Button
                    variant="outline-danger"
                    onClick={(e) => handleRemove(e, station.id)}
                  >
                    Remove <i className="bi bi-trash3"></i>
                  </Button>
                </div>
              </div>
            </ListGroup.Item>
          </Link>
        ))}
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
